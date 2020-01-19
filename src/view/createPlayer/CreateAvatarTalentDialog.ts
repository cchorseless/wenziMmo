/**Created by the LayaAirIDE*/
module view.createPlayer {
	export class CreateAvatarTalentDialog extends ui.createPlayer.CreateAvatarTalentDialogUI {
		constructor() {
			super();
		}

		public setData(): CreateAvatarTalentDialog {

			this.updateTalent()
			this.updateXingGe()
			this.addEvent();
			return this
		}

		public addEvent() {
			// 性格资质随机
			EventManage.onWithEffect(this.btn_randomXingGe, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.JS_randomXingGeValue, null, null, this, (jsonData) => {
					GameApp.MainPlayer.xingGeInfo = jsonData;
					this.updateXingGe();
				})
				lcp.send(pkt);
			});

			// 性格资质确定
			EventManage.onWithEffect(this.btn_xingGeSure, Laya.UIEvent.CLICK, this, () => {
				PanelManage.CreateAvatar.showDialog(0);
			});

			// 随机天赋
			EventManage.onWithEffect(this.btn_randomtalent, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.JS_randomZiZhiValue, null, null, this, (jsonData) => {
					GameApp.MainPlayer.talentInfo = jsonData;
					this.updateTalent();
				})
				lcp.send(pkt);
			});
		}

		/**
  		 * 更新天赋性格
  		 */
		public updateTalent(): void {
			for (let i = 1; i < 6; i++) {
				let count = GameApp.MainPlayer.talentInfo[i];
				// 阶数
				this['lbl_talent' + i].text = '' + count;
			}
		}

		public updateXingGe(): void {
			this.list_xingGe.repeatX = 4;
			this.list_xingGe.array = [];
			let keys = Object.keys(GameApp.MainPlayer.xingGeInfo);
			for (let key of keys) {
				let id = GameApp.MainPlayer.xingGeInfo[key].id
				this.list_xingGe.array.push(id);
			}
			this.list_xingGe.itemRender = view.juese.Person_SpeLabelItem;
			this.list_xingGe.renderHandler = Laya.Handler.create(this, (cell: view.juese.Person_SpeLabelItem, index) => {
				cell.scaleX = cell.scaleY = 0.8;
				cell.setData(cell.dataSource);
			}, null, false);
		}
	}
}