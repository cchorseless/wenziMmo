/**Created by the LayaAirIDE*/
module view.compart{
	export class ChatInfo extends ui.compart.ChatInfoUI{
		public maxLength = 390;
		public minLength = 100;
		constructor(){
			super();
			this.addEvent();
		}
		public setData(data){
			console.log("我是谁谁谁",data)
		}
		public addEvent(){
			this.img_head.on(Laya.UIEvent.CLICK,this,function(){

			})
		}
	}
}