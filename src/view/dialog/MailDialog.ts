/**Created by the LayaAirIDE*/
module view.dialog {
	export class MailDialog extends ui.dialog.MailDialogUI {
		constructor() {
			super();
			this.group = 'MailDialog';
			this.setData();
		}
		public data;
		public setData(): void {
			this.panel_mail.vScrollBarSkin = '';
			this.vbox_mail['sortItem'] = (items) => { };
			this.initUI();
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_mailClose.on(Laya.UIEvent.CLICK, this, () => { this.close() });
			// 一键领取
			this.btn_allGet.on(Laya.UIEvent.CLICK, this, () => {
				for (let mailUI of this.vbox_mail._childs) {
					(mailUI as view.compart.MailItem).getAllItem(mailUI);
				}
			})
			// 一键删除邮件
			this.btn_deleteRead.on(Laya.UIEvent.CLICK, this, () => {
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
			let keys = Object.keys(cbpkt.mails)
			for (let key of keys) {
				let data = cbpkt.mails[key];
				this.vbox_mail.addChild(new view.compart.MailItem().setData(data))
			}
			cbpkt.clear();
			cbpkt = null;
		}
		/**
		 * 
		 * @param data 领取邮件刷新
		 */
		public GetCacheData(data: ProtoCmd.stMailGetItemRetDecoder): void {
			let id = data.getValue('dwMailID')
			for (let mailUI of this.vbox_mail._childs) {
				(mailUI as view.compart.MailItem).init_type(id, data);
			}
		}
		public updataBoRead(data: ProtoCmd.stMailDetailBase): void {
			for (let mailUI of this.vbox_mail._childs) {
				(mailUI as view.compart.MailItem).init_boRead(data);
			}
		}
	}
}