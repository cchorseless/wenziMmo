/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_TotalLogin_Item extends ui.menu.Menu_TotalLogin_ItemUI {
		public id;
		public data;
		public desc;
		constructor() {
			super();
			this.addEvent()
		}
		public addEvent() {
			this.on(Laya.UIEvent.CLICK,this,function(){
				Menu_TotalLogin.self.onChooseItem(this.id);
			})
			this.img_box_State.on(Laya.UIEvent.CLICK,this,function(){
				let o = new view.activity.Active_Luck_Gift_Dialog()
				o.setData(this.data.items,this.desc)
				o.show();
			})
		}
		public setData(data) {
			this.data = data;
			this.id = data.day;
			this.desc = data.desc;
			this.lab_title.text = data.day + "天";
			if(data.status == 0){
				this.img_box_State.skin = "image/common/icon_baoxiang4_close.png"
			}else if(data.status == 1){
				this.img_box_State.skin = "image/common/icon_baoxiang4_light.png"
			}else if(data.status == 2){
				this.img_box_State.skin = "image/common/icon_baoxiang4_open.png"
				this.box_hasGet.visible = true;
			}
		}
	}
}