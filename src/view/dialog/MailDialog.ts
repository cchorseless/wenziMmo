/**Created by the LayaAirIDE*/
module view.dialog {
	export class MailDialog extends ui.dialog.MailDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.panel_mail.vScrollBarSkin = '';
			this.vbox_mail['sortItem'] = (items) => { };
			this.initUI();
			this.addEvent();

		}
		public addEvent(): void {
			this.btn_mailClose.on(Laya.UIEvent.CLICK, this, () => { this.close() });
		}
		public initUI(): void {
			let pkt = new ProtoCmd.stMailQueryEncoder();
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stMailQueryRetDecoder(data);
				console.log(cbpkt.mails);
				for (let item of cbpkt.mails) {


					let mail_UI = new view.compart.MailItem();
					let mailItem = new ProtoCmd.stMailSummary();
					mailItem.clone(item.data);
					mail_UI.setData(mailItem);

					this.vbox_mail.addChild(mail_UI);
				}
				cbpkt.clear(); 
				cbpkt = null;

			})

		}
	}
}