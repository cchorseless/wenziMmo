/**Created by the LayaAirIDE*/
module view.dialog {
	export class MailGetDialog extends ui.dialog.MailGetDialogUI {
		constructor() {
			super();
		}
		// 读取邮件信息
		public mailDetail: ProtoCmd.stMailDetailBase;
		public setData(mailDetail: ProtoCmd.stMailDetailBase): MailGetDialog {
			this.mailDetail = mailDetail;
			this.panel_mailGet.hScrollBarSkin = '';
			this.hbox_mailGet['sortItem'] = (items) => { };
			this.initUI();
			this.addEvent();
			return this;
		}

		public addEvent(): void {
			this.btn_mailGetClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			// 删除邮件
			this.img_delete.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.stMailDeleteMailEncoder();
				pkt.setValue('dwMailIDs0', this.mailDetail.getValue('dwMailID'));
				lcp.send(pkt, this, (data) => {
					this.close();
					let MailDialog: view.dialog.MailDialog = Laya.Dialog.getDialogsByGroup('MailDialog')[0];
					MailDialog && MailDialog.updateUI(data);
				})

			})

			// 领取附件
			this.img_getDaoju.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.stMailGetItemEncoder();
				pkt.setValue('dwMailID', this.mailDetail.getValue('dwMailID'));
				let byte: Laya.Byte = new Laya.Byte();
				byte.writeInt32(0);
				byte.writeInt32(-1);
				let i64id: ProtoCmd.Int64 = new ProtoCmd.Int64(byte)

				pkt.setValue('i64itemid', i64id);
				lcp.send(pkt, this, (data) => {
					let cbpkt = new ProtoCmd.stMailGetItemRetDecoder(data);
					this.hbox_mailGet.disabled = true;
					this.img_delete.visible = true;
					this.img_geted.visible = true;
					this.img_geted.disabled = true;

					// 删除邮件
					this.img_delete.on(Laya.UIEvent.CLICK, this, () => {
						let pkt = new ProtoCmd.stMailDeleteMailEncoder();
						pkt.setValue('dwMailIDs0', this.mailDetail.getValue('dwMailID'));
						lcp.send(pkt, this, (data) => {
							this.close();
							let MailDialog: view.dialog.MailDialog = Laya.Dialog.getDialogsByGroup('MailDialog')[0];
							MailDialog && MailDialog.updateUI(data);
						})

					})
				})

			})


		}
		public initUI(): void {
			// 是否有道具
			this.box_hasGeted.visible = (this.mailDetail.nCount > 0);
			// 附件是否领取
			this.img_geted.visible = this.img_delete.visible = Boolean(this.mailDetail.wReveivedItem);
			this.img_getDaoju.visible = !this.mailDetail.wReveivedItem;
			//邮件发送时间
			this.lbl_mailDeatilTime.text = '' + this.mailDetail.tSendTime;
			// 邮件标题
			this.lbl_mailDetailTitle.text = '' + this.mailDetail.szTitle;
			// 邮件文本内容
			this.lbl_mailDetail.text = '' + this.mailDetail.szNotice;
			// 道具
			this.hbox_mailGet.removeChildren()
			for (let obj of this.mailDetail.items) {
				let itema = new view.compart.DaoJuItem();
				itema.setData(obj, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.hbox_mailGet.addChild(itema);
			}
		}

	}
}