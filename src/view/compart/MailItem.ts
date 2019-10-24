/**Created by the LayaAirIDE*/
module view.compart {
	export class MailItem extends ui.compart.MailItemUI {
		constructor() {
			super();
		}
		public mailItem: ProtoCmd.stMailSummaryBase;
		public setData(item: ProtoCmd.stMailSummaryBase): MailItem {
			this.mailItem = item;
			// 邮件标题
			this.lbl_mailTitle.text = '' + this.mailItem.szTitle;
			// 发件人
			if (item.boSystem) {
				this.lbl_from.text = '来自系统';
			}
			else {
				this.lbl_from.text = '' + this.mailItem.szSenderName;
			}
			// 发送时间
			this.lbl_timeLeft.text = '' + TimeUtils.getFormatBySecond(this.mailItem.sendTime - new Date().getTime() / 1000, 4);
			this.updateUI();
			this.addEvent()
			return this;
		}

		public addEvent(): void {
			// 查看详情
			this.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.MailGetDialog().setData(this.mailItem.dwMailID).popup(false);
			})
		}
		public updateUI(): void {
			// todo 有无附件应该区分，是否阅读应该区分
			// 有附件
			if (this.mailItem.boAccessory == 1 && this.mailItem.boRead == 0) {
				this.btn_mailIcon.skin = 'image/main/icon_mailGift.png';

			}
			if (this.mailItem.boAccessory == 1 && this.mailItem.boRead == 1) {
				this.btn_mailIcon.skin = 'image/main/icon_mailGiftOpen.png';

			}
			if (this.mailItem.boAccessory == 0 && this.mailItem.boRead == 0) {
				this.btn_mailIcon.skin = 'image/main/icon_mail.png';

			}
			if (this.mailItem.boAccessory == 0 && this.mailItem.boRead == 1) {
				this.btn_mailIcon.skin = 'image/main/icon_mailOpen.png';

			}
		}

		/**
		 * 领取道具
		 */
		public getAllItem(mailUI): void {
			// 无附件
			if (mailUI._childs.length == 0 || mailUI.mailItem.boAccessory == 0) {
				return
			}
			let pkt = new ProtoCmd.stMailGetItemEncoder();
			pkt.setValue('dwMailID', mailUI.mailItem.dwMailID);
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
