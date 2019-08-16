/**Created by the LayaAirIDE*/
module view.compart {
	export class MailItem extends ui.compart.MailItemUI {
		constructor() {
			super();
		}
		public mailItem: ProtoCmd.stMailSummary;
		public setData(item: ProtoCmd.stMailSummary): void {
			this.mailItem = item;
			
			this.lbl_mailTitle.text = '' + this.mailItem.szTitle;
			this.lbl_timeLeft.text = '' + this.mailItem.sendTime;
			this.addEvent()

		}
	
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {

				let pkt = new ProtoCmd.stMailQueryDetailEncoder();
				pkt.setValue('dwMailID', this.mailItem.getValue('dwMailID'))
				lcp.send(pkt, this, (data) => {

					let cbpkt = new ProtoCmd.stMailQueryDetailRetDecoder(data);
					let mailDetail = new ProtoCmd.stMailDetail();
					mailDetail.clone(cbpkt.MailDetail.data)
					for (let o of cbpkt.MailDetail.items) {
						let item = new ProtoCmd.ItemBase();
						item.clone(o.data);
						mailDetail.items.push(item);
					}
					new view.dialog.MailGetDialog(mailDetail).popup(false);
					cbpkt.clear();
					cbpkt = null;

				})
			})

		}
	}
}
