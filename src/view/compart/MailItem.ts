/**Created by the LayaAirIDE*/
module view.compart {
	export class MailItem extends ui.compart.MailItemUI {
		constructor() {
			super();
		}
		public mailItem: ProtoCmd.stMailSummaryBase;
		public setData(item: ProtoCmd.stMailSummaryBase): void {
			this.mailItem = item;
			// 邮件标题
			this.lbl_mailTitle.text = '' + this.mailItem.szTitle;
			// 发件人
			this.lbl_from.text = '' + this.mailItem.szSenderName;
			// 发送时间
			this.lbl_timeLeft.text = '' + TimeUtils.getFormatBySecond(this.mailItem.sendTime - new Date().getTime() / 1000, 4);
			this.updateUI();
			this.addEvent()
		}

		public addEvent(): void {
			// 查看详情
			this.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.stMailQueryDetailEncoder();
				pkt.setValue('dwMailID', this.mailItem.getValue('dwMailID'))
				lcp.send(pkt, this, (data) => {
					let cbpkt = new ProtoCmd.stMailQueryDetailRetDecoder(data);
					let mailDetail = new ProtoCmd.stMailDetailBase();
					mailDetail.clone(cbpkt.MailDetail.data);
					new view.dialog.MailGetDialog().setData(mailDetail).popup(false);
					cbpkt.clear();
					cbpkt = null;
				})
			})

		}

		public updateUI(): void {
			// todo 有无附件应该区分，是否阅读应该区分
			// 有附件
			if (this.mailItem.boAccessory) {
				this.btn_mailIcon.skin = 'image/common/fram_common_28.png';
			}
			else {
				this.btn_mailIcon.skin = 'image/common/fram_common_28.png';
			}
			// 是否已读
			this.btn_mailIcon.selected = Boolean(this.mailItem.boRead);
		}

		/**
		 * 领取道具
		 */
		public getAllItem(): void {
			// 无附件
			if (!this.mailItem.boAccessory) {
				return
			}
			let pkt = new ProtoCmd.stMailGetItemEncoder();
			pkt.setValue('dwMailID', this.mailItem.getValue('dwMailID'));
			let byte: Laya.Byte = new Laya.Byte();
			byte.writeInt32(0);
			byte.writeInt32(-1);
			let i64id: ProtoCmd.Int64 = new ProtoCmd.Int64(byte)
			pkt.setValue('i64itemid', i64id);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stMailGetItemRetDecoder(data);
				// todo 需要弹出奖励
				// todo 需要刷新邮件界面
				this.updateUI();
			})
		}

	}
}
