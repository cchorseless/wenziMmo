/**Created by the LayaAirIDE*/
module view.dialog {
	export class MailDialog extends ui.dialog.MailDialogUI {
		public mailDetails: Array<ProtoCmd.stMailSummary> = [];
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
			// 领取附件
			this.img_allGet.on(Laya.UIEvent.CLICK, this, () => {
				for (let mailDetail of this.mailDetails) {
					let pkt = new ProtoCmd.stMailGetItemEncoder();
					pkt.setValue('dwMailID', mailDetail.getValue('dwMailID'));
					let byte: Laya.Byte = new Laya.Byte();
					byte.writeInt32(0);
					byte.writeInt32(-1);
					let i64id: ProtoCmd.Int64 = new ProtoCmd.Int64(byte)
					pkt.setValue('i64itemid', i64id);
					lcp.send(pkt, this, (data) => {
						let cbpkt = new ProtoCmd.stMailGetItemRetDecoder(data);
						this.vbox_mail.disabled = true;
					})
				}
			})
			// 删除邮件
			this.img_deleteRead.on(Laya.UIEvent.CLICK, this, () => {
				for (let a of this.mailDetails) {
					let pkt = new ProtoCmd.stMailDeleteMailEncoder();
					pkt.setValue('dwMailIDs', a.getValue('dwMailID'));
					lcp.send(pkt, this, (data) => {
						let MailDialog: view.dialog.MailDialog = Laya.Dialog.getDialogsByGroup('MailDialog')[0];
						MailDialog && MailDialog.updateUI(data);
					})
				}

			})



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
				this.mailDetails.push(mailItem);

			}
			cbpkt.clear();
			cbpkt = null;

		}
	}
}