/**Created by the LayaAirIDE*/
module view.dialog {
	export class MailGetDialog extends ui.dialog.MailGetDialogUI {
		constructor() {
			super();
		}
		// 读取邮件信息
		public mailID;
		public setData(mailID): MailGetDialog {
			this.mailID = mailID;
			this.img_geted.visible = false;
			this.panel_mailGet.hScrollBarSkin = '';
			this.hbox_mailGet['sortItem'] = (items) => { };
			this.addEvent();
			this.init_ReadMail(mailID);
			return this;
		}
		public init_ReadMail(mailID): void {
			let pkt = new ProtoCmd.stMailQueryDetailEncoder();
			pkt.setValue('dwMailID', mailID)
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stMailQueryDetailRetDecoder(data);
				console.log('=====>邮件我的', cbpkt.MailDetail.items.length, cbpkt.MailDetail)
				// 是否有道具
				this.box_hasGeted.visible = (cbpkt.MailDetail.nCount !== 0);
				// 附件是否领取
				this.btn_getDaoju.visible = Boolean(cbpkt.MailDetail.wReveivedItem);
				if (cbpkt.MailDetail.nCount == 0 && cbpkt.MailDetail.boRead == 1) {
					this.btn_delete.visible = true;
				}
				//邮件发送时间
				this.lbl_mailDeatilTime.text = '' + TimeUtils.getFormatBySecond(cbpkt.MailDetail.tSendTime - new Date().getTime() / 1000, 4);
				// 邮件标题
				this.lbl_mailDetailTitle.text = '' + cbpkt.MailDetail.szTitle;
				// 邮件文本内容
				this.lbl_mailDetail.text = '' + cbpkt.MailDetail.szNotice;
				// 道具
				this.hbox_mailGet.removeChildren()
				let keys = Object.keys(cbpkt.MailDetail.items);
				for (let key of keys) {
					let ui_gift = new view.compart.DaoJuWithNameItem;
					let item = new ProtoCmd.ItemBase;
					item.dwBaseID = cbpkt.MailDetail.items[key].dwBaseID;
					item.dwCount = cbpkt.MailDetail.items[key].dwCount;
					ui_gift.setData(item)
					this.hbox_mailGet.addChild(ui_gift);
				}
			})
		}
		public addEvent(): void {
			this.btn_mailGetClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			// 删除邮件
			this.btn_delete.on(Laya.UIEvent.CLICK, this, () => {
				this.init_delete();
			})
			// 领取附件
			this.btn_getDaoju.on(Laya.UIEvent.CLICK, this, () => {
				this.init_get();
			})
		}
		/**
		 * 删除邮件
		 */
		public init_delete(): void {
			let pkt = new ProtoCmd.stMailDeleteMailEncoder();
			pkt.setValue('dwMailIDs0', this.mailID);
			lcp.send(pkt, this, (data) => {
				this.close();
				let MailDialog: view.dialog.MailDialog = Laya.Dialog.getDialogsByGroup('MailDialog')[0];
				MailDialog && MailDialog.updateUI(data);
			})
		}
		/**
		 * 领取邮件
		 */
		public init_get(): void {
			let pkt = new ProtoCmd.stMailGetItemEncoder();
			pkt.setValue('dwMailID', this.mailID);
			let byte: Laya.Byte = new Laya.Byte();
			byte.writeInt32(0);
			byte.writeInt32(-1);
			let i64id: ProtoCmd.Int64 = new ProtoCmd.Int64(byte)
			pkt.setValue('i64itemid', i64id);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stMailGetItemRetDecoder(data);
				//邮件附件列表被领取后变灰
				this.hbox_mailGet.disabled = true;
				//邮件附件被领取后，隐藏领取按钮
				this.btn_getDaoju.visible = false;
				//邮件附件被领取后，显示已领取
				this.img_geted.visible = true;
			})
		}
	}
}