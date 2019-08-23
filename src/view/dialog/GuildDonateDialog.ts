/**Created by the LayaAirIDE*/
module view.dialog {
	export class GuildDonateDialog extends ui.dialog.GuildDonateDialogUI {
		constructor() {
			super();
			this.setDate();
		}
		public setDate(): void {
			let player = GameApp.MainPlayer;
			this.lbl_goldCount.text = '' + (player.wealth.gold + player.wealth.gold_lock);
			this.lbl_yuanBaoCount.text = '' + (player.wealth.yuanBao + player.wealth.yuanBao_lock);
			this.initUI();
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_guildDonateClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			// 捐献金币
			this.btn_juanXianTongBi.on(Laya.UIEvent.CLICK, this, this.goDonate, [true]);
			// 捐献元宝
			this.btn_juanXianYuanBao.on(Laya.UIEvent.CLICK, this, this.goDonate, [false]);
		}
		public jsonData: { goldcnt: number, rmbcnt: number, leftGold: number };
		public initUI(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.BP_JuanXianInfo, null, this, (magID, jsonData: { goldcnt: number, rmbcnt: number, leftGold: number }) => {
				this.jsonData = jsonData;
				this.lbl_leftGold.text = '' + parseInt('' + jsonData.leftGold / 10000);
			});
			lcp.send(pkt);
		}

		public goDonate(index): void {
			new view.dialog.GuildDonateShowDialog().setData(index, this.jsonData).popup(false);
		}


	}
}