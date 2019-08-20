/**Created by the LayaAirIDE*/
module view.dialog {
	export class MailDialog extends ui.dialog.MailDialogUI {
		constructor() {
			super();
			this.group = 'MailDialog';
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
			// 一键领取
			this.img_allGet.on(Laya.UIEvent.CLICK, this, () => {
				for (let mailUI of this.vbox_mail._childs) {
					(mailUI as view.compart.MailItem).getAllItem();
				}
			})
			// 一键删除邮件
			this.img_deleteRead.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.stMailDeleteMailEncoder();
				pkt.setValue('bodeleteAll', true);
				lcp.send(pkt, this, (data) => {
					this.updateUI(data);
				})
			})
		}
		//获得邮件列表
		public initUI(): void {
			let pkt = new ProtoCmd.stMailQueryEncoder();
			lcp.send(pkt, this, this.updateUI);
		}
		//获得邮件列表返回
		public updateUI(data): void {
			//更新邮件列表，已领取附件的邮件移除
			this.vbox_mail.removeChildren();
			let cbpkt = new ProtoCmd.stMailQueryRetDecoder(data);
			//邮件数量
			this.lbl_mailCount.text = '' + cbpkt.mails.length;
			for (let item of cbpkt.mails) {
				let mail_UI = new view.compart.MailItem();
				let mailItem = new ProtoCmd.stMailSummaryBase();
				mailItem.clone(item.data);
				mail_UI.setData(mailItem);
				this.vbox_mail.addChild(mail_UI);
			}
			cbpkt.clear();
			cbpkt = null;
		}
	}
}