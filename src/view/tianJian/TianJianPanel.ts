/**Created by the LayaAirIDE*/
module view.tianJian {
	export class TianJianPanel extends ui.tianJian.TianJianPanelUI {
		public imgSkin = { 1: "huanyun", 2: "bingpo", 3: "xinghe", 4: "jiaoyue", 5: "lianhua", 6: "fenyang", 7: "yizhen", 8: "jiuyou", 9: "liangyi", }
		public tempData = null;
		private touchStartTime;
		private isTouch: boolean = false;
		private activateID: number = 0;
		public nowSkillID;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data: any) {
			this.tempData = data;
			for (let i = 1; i < 10; i++) {
				if (data.status[i] == 1) {
					this.upDataView(i)
					this.activateID = i;
					break;
				} else {
					this.upDataView(1)
					this.activateID = 1;
				}
			}

			// this.onShowShuXing(true);
			let st = PopUpManager.curPanel.name;
			console.log(st)
		}
		public onShowShuXing(boo: boolean) {
			if (boo) {
				// this.lab_shuxingdetail.visible = false;
				this.box_shuxing.visible = true;
			}
			else {
				// this.lab_shuxingdetail.visible = true;
				this.box_shuxing.visible = false;
			}
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {
				// PopUpManager.checkPanel(this);
				this.close();
			})
			for (let i = 1; i < 10; i++) {
				this["box_" + i].on(Laya.UIEvent.CLICK, this, () => {
					this.activateID = i;
					this.upDataView(i)
				})
			}
			this.box_skillIcon.on(Laya.UIEvent.CLICK, this, this.onTouchStart);
			// this.box_skillIcon.on(Laya.Event.MOUSE_UP, this, this.onTouchEnd);
			EventManage.onWithEffect(this.btn_center, Laya.UIEvent.CLICK, this, () => {
				this.onActivate();
			})
		}
		private onActivate() {
			let base = this.tempData;
			let status = base.status[this.activateID]
			if (status == 1) {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.activeSpecialRing, [this.activateID], 0, this,
					() => {
						base.status[this.activateID] = 2;
						this.setData(base)
					});
				lcp.send(pkt);
			} else if (status == 0) {
				TipsManage.showTips('暂时不可激活');
			} else {
				TipsManage.showTips('您已经激活');
			}

		}
		private onTouchStart(e) {
			let o = new TianJian_DIalog()
			o.setData(this.nowSkillID);
			o.show()

		}
		public upDataView(index) {
			// console.log("当前显示数据",JSON.stringify(data));
			let arr = this.tempData.cfgtab[index]
			let job = GameApp.MainPlayer.job;
			let skillKey;
			let effKey;
			this.setUnlockShow(index);
			this.changeChoose(index);

			this.lab_tianjianDetail.text = arr.introduce;
			skillKey = arr.skilltab[job] + '';
			this.nowSkillID = skillKey;
			effKey = arr.effid + "";
			// this.lab_term.text = arr.condition;//根据questID去获取说明
			this.img_shuxingIcon.skin = PathUtil.getSkillIconPath(SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(skillKey));
			let nameStr: string = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(skillKey);
			let indexOf = nameStr.indexOf('_');
			nameStr = nameStr.slice(0, indexOf);
			this.lab_shuxingName.text = nameStr;
			// this.lab_shuxingdetail.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_DESCRIPTION(skillKey);
			let effData = GameUtil.parseEffectidToObj([this.tempData.cfgtab[index].effid + ""])
			// this.lab_fight.text = effData.battle[GameApp.GameEngine.mainPlayer.job].toString();

			this.vbox_equip0.removeChildren();
			for (let i = 0; i < effData.des.length; i++) {

				this.vbox_equip0.addChild(new view.compart.SinglePropsItem().setData(effData.des[i]));


			}

			// this.list_down.array = [];
			// this.list_down.array = effData.des;
			// this.list_down.itemRender = view.compart.SinglePropsItem;
			// this.list_down.renderHandler = Laya.Handler.create(this, (cell: view.compart.SinglePropsItem, index) => {
			// 	cell.setData(cell.dataSource);
			// }, null, false)
		}
		public setUnlockShow(index) {
			let data = this.tempData.cfgtab[index];
			this.lab_unlock_Detail.text = data.condition;
		}
		public changeChoose(index) {
			let arr = this.tempData.status
			for (let i = 1; i < 10; i++) {
				if (i == index) {
					this.img_center.skin = this['img_tianjian' + i].skin;
					if (arr[i] == 1) {
						this['img_circle' + i].visible = true;
						this.hasUnlock.visible = false;
						this.unlock.visible = true;
					}
					if (arr[i] == 2) {
						this['img_circle' + i].visible = true;
						this.hasUnlock.visible = true;
						this.unlock.visible = false;
					}
				} else {
					this['img_circle' + i].visible = false;
				}
				if (arr[i] == 0) {
					this['box_' + i].disabled = true;
					// this["lab_canActive" + i].visible = false;
					this['img_canUnLock' + i].visible = false
					this['img_Lock' + i].visible = true

				}
				else if (arr[i] == 1) {
					this['box_' + i].disabled = false;
					// this["lab_canActive" + i].visible = true;
					this['img_canUnLock' + i].visible = true
					this['img_Lock' + i].visible = false
				} else if (arr[i] == 2) {
					this['box_' + i].disabled = false;
					// this["lab_canActive" + i].visible = false;
					this['img_canUnLock' + i].visible = false
					this['img_Lock' + i].visible = false
				}
			}
		}

	}
}