/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_HeHuaChiDialog extends ui.zhaiYuan.ZhaiYuan_HeHuaChiDialogUI {
		public static self: ZhaiYuan_HeHuaChiDialog
		public curConfigID;
		public type;  //荷花池1    丹炉2  种地3   磨石4
		public makeStatus;
		public speed;
		constructor() {
			super();
			ZhaiYuan_HeHuaChiDialog.self = this;
			this.panel_show.vScrollBarSkin = '';
			this.addEvent();
		}
		public setData(type, data) {
			this.type = type;
			this.makeStatus = data;
			this.setView();
			this.showPanel();
		}
		public setView() {
			this.lab_name.text = ['', '荷花池', '丹炉', '农田', '磨石'][this.type];
			let arr: ProtoCmd.itf_ZHAIYUAN_INFO = GameApp.GameEngine.zhaiYuaninfo;
			let curlv = arr.levels[this.type];
			if (curlv == 10) {
				this.btn_LvUp.visible = false;
				this.panel_show.height = 576;
			} else {
				this.btn_LvUp.visible = true;
				this.panel_show.height = 472;
			}
			this.curConfigID = this.type * 1000 + curlv;
			let skin = SheetConfig.zhaiyuan_upgrade.getInstance(null).ICON(this.curConfigID);
			this.img_icon.skin = "image/zhaiYuan/" + skin + ".png";
			let costFood = SheetConfig.zhaiyuan_upgrade.getInstance(null).CONSUME_FOOD(this.curConfigID);
			this.speed = SheetConfig.zhaiyuan_upgrade.getInstance(null).EFFICIENCY(this.curConfigID);
			this.lab_lv.text = "LV." + curlv;
			this.lab_foodNum.text = arr.foodValue + "";
			let span = arr.servants - arr.leisureServants
			this.lab_servantNum.text = span + '/' + arr.servants;
			this.html_eff.style.fontFamily = "STKaiti";
			this.html_eff.style.fontSize = 20;
			this.html_eff.style.bold = true;
			this.html_eff.style.align = 'center';
			this.html_eff.innerHTML = "<span style='color:#000000'>生长时间加速：</span>"
				+ "<span style='color:#f06205'>" + this.speed + "%</span>";
			this.html_detail.style.fontFamily = "STKaiti";
			this.html_detail.style.fontSize = 18;
			this.html_detail.style.bold = true;
			this.html_detail.innerHTML = "<span style='color:#000000'>每位仆役消耗</span>"
				+ "<span style='color:#63491a'>" + costFood + "</span>"
				+ "<span style='color:#000000'>粮食/分钟粮食不足时自动停止生产</span>";

		}
		public showPanel() {
			this.panel_show.removeChildren();
			let arr: ProtoCmd.itf_ZHAIYUAN_INFO = GameApp.GameEngine.zhaiYuaninfo;
			let curlv = arr.levels[this.type];
			for (let i = 1; i < curlv + 1; i++) {
				let o = new ZhaiYuan_HeHuaChi_Info();
				let configID = this.type * 1000 + i;
				o.setData(configID, this.makeStatus[i], this.speed);
				o.y = (i - 1) * (o.height + 15);
				this.panel_show.addChild(o);
			}
		}
		public upDateServantNum() {
			let arr: ProtoCmd.itf_ZHAIYUAN_INFO = GameApp.GameEngine.zhaiYuaninfo;
			let span = arr.servants - arr.leisureServants
			this.lab_servantNum.text = span + '/' + arr.servants;
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			})
			this.btn_LvUp.on(Laya.UIEvent.CLICK, this, function () {
				let o = new ZhaiYuan_Build_ContentDialog();
				o.setData(this.curConfigID, false, 1);
				o.show()
			})
		}
	}
}