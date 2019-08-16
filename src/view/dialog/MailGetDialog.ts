/**Created by the LayaAirIDE*/
module view.dialog {
	export class MailGetDialog extends ui.dialog.MailGetDialogUI {

		// 读取邮件信息
		public mailDetail: ProtoCmd.stMailDetail;

		constructor(mailDetail: ProtoCmd.stMailDetail) {
			super();
			this.mailDetail = mailDetail;
			this.setData(mailDetail);
		}

		public setData(mailDetail: ProtoCmd.stMailDetail): void {
			this.addEvent();
			this.getMail(mailDetail);
		}

		public addEvent(): void {
			this.img_delete.visible = false;
			this.img_geted.visible = false;
			this.btn_mailGetClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
				this.panel_mailGet.hScrollBarSkin = '';
				this.hbox_mailGet['sortItem'] = (items) => { };
			});

			if (!this.mailDetail.nCount) {
				this.img_getJiangLi.visible = false;
				this.img_delete.visible = true;
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

			}
			else {
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

		}
		public getMail(mailItem: ProtoCmd.stMailDetail): void {
			this.lbl_mailDeatilTime.text = '' + mailItem.tSendTime;
			this.lbl_mailDetailTitle.text = '' + mailItem.szTitle;
			this.lbl_mailDetail.text = '' + mailItem.szNotice;
			for (let obj of mailItem.items) {
				let itema = new view.compart.DaoJuItem();
				itema.setData(obj, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.hbox_mailGet.addChild(itema);
			}



		}

	}
}