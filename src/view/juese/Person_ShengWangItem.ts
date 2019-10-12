/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_ShengWangItem extends ui.juese.Person_ShengWangItemUI {
		constructor() {
			super();
		}
		public hasInit = false;// 初始化自己
		public setData(): void {
			this.panel_shengWang.hScrollBarSkin = '';
			this.hbox_shengWang['sortItem'] = (items) => { };
			if (this.hasInit) { return };
			this.hasInit = true;
			this.addEvent();
			this.getShengWangInfo();
		}
		public addEvent(): void {

		}
		/**
		 * 获取江湖声望信息
		 */
		public getShengWangInfo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_PrestigePanel, null, null, this, (jsonData: ProtoCmd.itf_JS_ShengWangInfo) => {
				console.log('=====>声望声望', jsonData)
				//我的声望头衔
				for (let i = 0; jsonData.titletab[i]; i++) {
					if (jsonData.prestigeid == i) {
						this.lbl_title.text = '' + jsonData.titletab[i].name;
					}
				}
				//声望经验值
				this.lbl_value.text = jsonData.minexp + '/' + jsonData.maxexp;
				//声望经验值进度条
				this.img_progress.width = 211 * jsonData.damage;
				for (let i = 0; jsonData.titletab[i]; i++) {
					this.hbox_shengWang.addChild(new view.juese.Person_ShengWangQiZiItem().setData(jsonData.titletab[i]))
				}
			})
			lcp.send(pkt);
		}

	}
}