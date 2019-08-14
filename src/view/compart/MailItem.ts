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
			this.lbl_timeLeft.text = '' ;
			this.addEvent()

		}
		public addEvent():void{
        //   let pkt = new ProtoCmd.stMailQueryDetailEncoder();
		// //   let mailsTitile = this.lbl_mailTitle.text;
		// //   let mailsTime = this.lbl_timeLeft.text;
		//   lcp.send(pkt, this, (mailItem) => {
		// 		let cbpkt = new ProtoCmd.stMailQueryDetailRetDecoder(mailItem);
		// 	
		// 		cbpkt.clear();
		// 		cbpkt = null;

		// 	})
		}
	}
}
