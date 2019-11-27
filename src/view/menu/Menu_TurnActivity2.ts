/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_TurnActivity2 extends ui.menu.Menu_TurnActivity2UI {
		public static self:Menu_TurnActivity2;
		public getCfgData: ProtoCmd.itf_FB_XianshiDetailInfo = null;
		public touchID = 0;
		public showData = [];
		public num = 0;
		constructor() {
			super();
			Menu_TurnActivity2.self = this;
			this.pan_actList.vScrollBarSkin = '';
			this.addEvent();
		}
		public setData() {
			let pkt1 = new ProtoCmd.QuestClientData().setString(ProtoCmd.FB_LimitActivitiesCfg, null, null, this, (jsonData: ProtoCmd.itf_FB_XianshiDetailInfo) => {
				this.getCfgData = jsonData;
			})
			lcp.send(pkt1);
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.FB_LimitActivities, null, null, this,
				(jsonData) => {
					this.num = 0;
					let keys = Object.keys(jsonData.state);
					for (let key of keys) {
						let data = jsonData.state[key]
						this.setView(data.id, jsonData.now)
					}
				})
			lcp.send(pkt);
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
		}
		public setView(id, curTime) {
			
			for (let i in this.getCfgData) {
				if (id == this.getCfgData[i].id) {
					let o = new Menu_TurnActivity2_listInfo_item();
					o.setData(this.getCfgData[i], this.num, curTime)
					this.showData.push({ id: this.num, data: this.getCfgData[i] })
					o.x = 5
					o.y = this.num * (o.height + 5)
					this.pan_actList.addChild(o)
					this.num++
				}
			}
			this.touchInfoShow()
		}
		public chooseInfo(id) {
			this.touchID = id;
			this.touchInfoShow();
		}
		public touchInfoShow() {
			let n = this.pan_actList.numChildren;
			if (n > 0) {
				for (let i = 0; i < n; i++) {
					let p: any = this.pan_actList.getChildAt(i);
					p.img_circle.visible = false;
					if (i == this.touchID) {
						p.img_circle.visible = true;
					}
				}
			}
			this.showDetai()
		}
		public showDetai(){
			this.panel_detail.removeChildren();
			for(let i = 0; i <this.showData.length;i++){
				if(this.touchID == this.showData[i].id){
					let  o = new Menu_TurnActivity2_Detail_item()
					o.setData(this.showData[i].data)
					this.panel_detail.addChild(o);
				}
			}
		}



	}
}