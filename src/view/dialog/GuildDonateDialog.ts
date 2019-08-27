/**Created by the LayaAirIDE*/
module view.dialog {
	export class GuildDonateDialog extends ui.dialog.GuildDonateDialogUI {
		constructor() {
			super();
			this.group = 'GuildDonateDialog';
			this.setDate();
		}
		public setDate(): void {
			this.addEvent();
			this.initUI();
		}
		public addEvent(): void {
			this.btn_guildDonateClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			// 捐献金币
			this.btn_juanXianTongBi.on(Laya.UIEvent.CLICK, this, this.goDonate, [true]);
			// 捐献元宝
			this.btn_juanXianYuanBao.on(Laya.UIEvent.CLICK, this, this.goDonate, [false]);
			// 监听刷新界面
			GameApp.LListener.on(ProtoCmd.BP_JuanXianInfo, this, this.updateUI)
		}
		public initUI(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.BP_JuanXianInfo);
			lcp.send(pkt);
		}
		public jsonData: ProtoCmd.itf_Guild_JuanXianInfo;
		/**
		 * 刷新界面
		 * @param magID 
		 * @param jsonData 
		 */
		public updateUI(magID, jsonData: ProtoCmd.itf_Guild_JuanXianInfo) {
			this.jsonData = jsonData;
			let player = GameApp.MainPlayer;
			this.lbl_goldCount.text = '' + (player.wealth.gold + player.wealth.gold_lock);
			this.lbl_yuanBaoCount.text = '' + player.wealth.yuanBao;
			this.lbl_leftGold.text = '' + parseInt('' + this.jsonData.leftGold / 10000);
		}

		public goDonate(index): void {
			// 金币需要大于1万
			if (index) {
				if (parseInt(this.lbl_goldCount.text) < 10000) {
					TipsManage.showTips('金币不足，最低捐赠1万')
					return
				}
			}
			// 元宝需要大于1个
			else {
				if (parseInt(this.lbl_yuanBaoCount.text) < 1) {
					TipsManage.showTips('元宝不足，最低捐赠1个')
					return
				}
			}
			new view.dialog.GuildDonateShowDialog().setData(index, this.jsonData).popup(false);
		}
	}
}