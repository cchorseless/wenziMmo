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
			this.group = 'MailDialog';

		}
		public addEvent(): void {
			this.btn_mailClose.on(Laya.UIEvent.CLICK, this, () => { this.close() });
		}
		public initUI(): void {
			let pkt = new ProtoCmd.stMailQueryEncoder();
			lcp.send(pkt, this, this.updateUI);
		}

		public updateUI(data): void {
			this.vbox_mail.removeChildren();
			let cbpkt = new ProtoCmd.stMailQueryRetDecoder(data);
			this.lbl_mailCount.text = '' + cbpkt.mails.length;
			for (let item of cbpkt.mails) {
				let mail_UI = new view.compart.MailItem();
				let mailItem = new ProtoCmd.stMailSummary();
				mailItem.clone(item.data);
				mail_UI.setData(mailItem);
				this.vbox_mail.addChild(mail_UI);
			}
			cbpkt.clear();
			cbpkt = null;

		}
	}
}