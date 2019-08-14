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
		//   let mailsTitile = this.lbl_mailTitle.text;
		//   let mailsTime = this.lbl_timeLeft.text;
		//   lcp.send(pkt, this, (data) => {
			  
		// 		let cbpkt = new ProtoCmd.stMailQueryDetailRetDecoder(data);
		// 		for (let item of cbpkt.MailDetail) {

		// 			let mailDetail_UI = new view.dialog.MailGetDialog();
		// 			let mailGetDetail = new ProtoCmd.stMailDetail();
		// 			mailGetDetail.clone(item.data);
		// 			MailDetail.setData(mailGetDetail);
					

		// 		}
		// 		cbpkt.clear();
		// 		cbpkt = null;

		// 	})
		// }
		// public seeMail(item: ProtoCmd.stMailDetail):void{
		// 	this.mailGetDetail=item;
		}
	}
}
