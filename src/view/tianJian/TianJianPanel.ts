/**Created by the LayaAirIDE*/
module view.tianJian {
	export class TianJianPanel extends ui.tianJian.TianJianPanelUI {
		public imgSkin = {1:"huanyun",2:"bingpo",3:"xinghe",4:"jiaoyue",5:"lianhua",6:"fenyang",7:"yizhen",8:"jiuyou",9:"liangyi",}
		public tempData = null;
		private touchStartTime;
		private isTouch: boolean = false;
		private activateID: number = 0;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data: any) {
			this.tempData = data;
			this.upDataView(1)
			this.onShowShuXing(true);
		}
		public onShowShuXing(boo: boolean) {
			if (boo) {
				this.lab_shuxingdetail.visible = false;
				this.box_shuxing.visible = true;
			}
			else {
				this.lab_shuxingdetail.visible = true;
				this.box_shuxing.visible = false;
			}
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
			for (let i = 1; i < 10; i++) {
				EventManage.onWithEffect(this["box_" + i], Laya.UIEvent.CLICK, this, () => {
					this.activateID = i;
					this.upDataView(i)
				})
			}
			this.box_skillIcon.on(Laya.Event.MOUSE_DOWN, this, this.onTouchStart);
			this.box_skillIcon.on(Laya.Event.MOUSE_UP, this, this.onTouchEnd);
			EventManage.onWithEffect(this.btn_center, Laya.UIEvent.CLICK, this, () => {
				this.onActivate();
			})
		}
		private onActivate() {
			let base = this.tempData;
			let status = base.status[this.activateID]
			if ( status == 1) {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.activeSpecialRing, [this.activateID], 0, this,
					() => {
						base.status[this.activateID] = 2;
						this.setData(base)
					});
				lcp.send(pkt);
			}else if(status == 0){
				TipsManage.showTips('暂时不可激活');
			}else{
				TipsManage.showTips('您已经激活');
			}

		}
		private onTouchStart(e) {
			this.isTouch = true;
			Laya.timer.once(500, this, () => {
				if (this.isTouch) {
					this.onShowShuXing(false);
				}

			})
			// let o = e.currentTarget

		}
		private onTouchEnd() {
			this.isTouch = false;
			this.onShowShuXing(true);
		}

		public upDataView(index) {
			// console.log("当前显示数据",JSON.stringify(data));
			let arr = this.tempData.cfgtab[index]
			let job = GameApp.MainPlayer.job;
			let skillKey;
			let effKey;
			this.changeChoose(index);
			this["lab_tianjian" + index].text = arr.name;
			this.lab_tianjianDetail.text = arr.introduce;
			skillKey = arr.skilltab[job] * 100 + 1 + "";
			effKey = arr.effid + "";
			// this.img_shuxingIcon.skin= (SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(skillKey).toString();
			this.lab_shuxingName.text = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(skillKey);
			this.lab_shuxingdetail.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_DESCRIPTION(skillKey);

			SheetConfig.mydb_effect_base_tbl.getInstance(null).DODGE(effKey)

			this.lab_fight.text = "";
			this.lab_health.text = "";
			this.lab_defense.text = "";
			this.lab_physicalAttack.text = "";
			this.lab_magicAttack.text = "";
			this.lab_term.text = arr.condition;
		}
		public changeChoose(index) {
			let arr = this.tempData.status
			for (let i = 1; i < 10; i++) {
				if (i == index) {
					this["btn_tianjian" + i].selected = true;
					this["lab_tianjian" + i].visible = true;

				} else {
					this["btn_tianjian" + i].selected = false;
					this["lab_tianjian" + i].visible = false;
				}
				if (arr[i] == 0) {
					this["btn_tianjian" + i].gray = true;
					this["img_tianjian" + i].skin = "image/juQingMode/icon_" + this.imgSkin[i] + "0.png"
					this["lab_canActive" +i].visible = false;
				}
				else if(arr[i] == 1){
					this["btn_tianjian" + i].gray = true;
					this["img_tianjian" + i].skin = "image/juQingMode/icon_" + this.imgSkin[i] + "0.png"
					this["lab_canActive" +i].visible = true;
				}else if(arr[i] == 2){
					this["btn_tianjian" + i].gray = false;
					this["img_tianjian" + i].skin = "image/juQingMode/icon_" + this.imgSkin[i] + "2.png"
					this["lab_canActive" +i].visible = false;
				}
			}
		}






	}
}