/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_ZhuXIan_Panel_info extends ui.fuBen.FuBen_ZhuXIan_Panel_infoUI {
		public isUnLock = false;
		public dbid;
		public curStage;
		public myStage;
		public jsonData;
		public hasGet = false;
		public needLv;
		constructor() {
			super();
			this.addEvent();
		}
		public addEvent() {
			this.on(Laya.UIEvent.CLICK, this, function () {
				if (!this.isUnLock) {
					if (GameApp.MainPlayer.level < this.needLv) {
						TipsManage.showTips('未达到关卡等级')
					} else {
						if (this.myStage < this.curStage) {
							TipsManage.showTips('未通关该关卡前置')
						} else {
							if (GameApp.MainPlayer.talkID < this.dbid) {
								TipsManage.showTips('未解锁对应章节')
							}
						}
					}
				}
				else {
					this.showDialog();
				}
			})
		}
		public showDialog() {
			if (this.jsonData.ceng == null) { return };
			let pkt = new ProtoCmd.QuestClientData();
			// type(1强化等级，2神盾，3龙魂，4光翼，5武器等级,6穿戴多少件多少等级的装备，8勋章ID)
			pkt.setString(ProtoCmd.FB_ChuMoCengOpen, [this.jsonData.ceng], null, this, (jsonData: { type?: number, need?: number, lv?: number, item: any, times: number }) => {
				console.log(jsonData)
				let o = new FuBen_ZhuXianContent_Dialog();
				o.setData(this.jsonData, jsonData, this.hasGet);
				o.popup();
			});
			lcp.send(pkt);
		}
		public setData(curCeng, jsonData, stageID) {
			this.dbid = jsonData.dbid;
			this.needLv = jsonData.lv;
			this.jsonData = jsonData;
			this.myStage = curCeng;
			this.curStage = jsonData.ceng
			if (GameApp.MainPlayer.level >= jsonData.lv) {
				if (curCeng >= jsonData.ceng) {
					if (GameApp.MainPlayer.talkID >= jsonData.dbid) {
						this.isUnLock = true
					}
				}
			}

			if (curCeng > jsonData.ceng) {
				this.hasGet = true
			}
			if (this.isUnLock) {
				this.img_bg.visible = true;
				this.img_bg1.visible = false;
			} else {
				this.img_bg.visible = false;
				this.img_bg1.visible = true;
			}
			let curStageID = SheetConfig.Thread_sweep_tbl.getInstance(null).NUMBER_CHECKPOINTS(jsonData.ceng)
			this.html_StageID.style.fontFamily = 'STXingkai';
			this.html_StageID.style.fontSize = 30;
			this.html_StageID.style.align = 'center';
			this.html_StageID.style.color = '#ffffff';
			this.html_StageID.innerHTML = "<span>" + curStageID + '</span>';

			this.html_StageID1.style.fontFamily = 'STXingkai';
			this.html_StageID1.style.fontSize = 30;
			this.html_StageID1.style.align = 'center';
			this.html_StageID1.style.color = '#ffffff';
			this.html_StageID1.innerHTML = "<span>" + curStageID + '</span>';

			let iconID = SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE(jsonData.monsterid)
			let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME(jsonData.monsterid)
			this.img_icon.skin = this.img_icon1.skin = 'image/common/npc/npc_half_' + iconID + '.png';
			this.lab_BossName.text = this.lab_BossName1.text = name;
			this.lab_StageName1.text = this.lab_StageName.text = jsonData.title;
			for (let i = 1; i < 4; i++) {
				this['img_Star' + i].skin = 'image/fuben/star_big_02.png'
				this['img_Star' + i + '_1'].skin = 'image/fuben/star_small_02.png'
			}
			if (jsonData.star > 0) {
				for (let i = 1; i < jsonData.star+1; i++) {
					this['img_Star' + i].skin = 'image/fuben/star_big_1.png'
					this['img_Star' + i + '_1'].skin = 'image/fuben/star_small_01.png'
				}
			}

		}
	}
}