/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_LianQi_HQitem extends ui.zhaiYuan.ZhaiYuan_LianQi_HQitemUI {
		public touchID = 1;
		public nameStrArr = ['头盔', '项链', '衣服', '武器', '手镯', '手镯', '戒指', '戒指', '鞋子', '裤子']
		public panelDatap = null;
		public totalLvArr = [[0, 10, '地阶'], [11, 20, '人阶'], [21, 30, '道阶'], [31, 40, '玄阶'], [41, 50, '黄阶'], [51, 60, '天阶']];
		public isJDFullLv: boolean = false;     //每一阶段是否到达满级，如黄阶10级
		public isDevelopFullLv: boolean = false;  //最终50级  
		public isAllJDFullLv: boolean = false;    //是否全部阶段满级;
		constructor() {
			super();
			this.addEvent();
			this.ui_show.img_circle.visible = false;
		}
		public setData() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.WX_warSoulPanel)
			lcp.send(pkt);
			let index = 1;
			this.init_soulUpPanel(index);
		}
		public addEvent() {
			GameApp.LListener.on(ProtoCmd.WX_warSoulPanel, this, (jsonData) => {
				this.panelDatap = jsonData;
				console.log(this.panelDatap);
				this.setView();
			})
			GameApp.LListener.on(ProtoCmd.WX_updateWarSoulPanel, this, (jsonData) => {
				let data = jsonData;
				console.log(data);
				this.showContentMsg(data);
			})
			for (let i = 1; i < 9; i++) {
				this['ui_' + i].on(Laya.UIEvent.CLICK, this, function () {
					this.touchID = i;
					this.setView();
				})
			}
		}
		public totalLV(nowlv: number): any {
			for (let i = 0; i < this.totalLvArr.length; i++) {
				if (nowlv >= this.totalLvArr[i][0] && nowlv <= this.totalLvArr[i][1]) {
					return this.totalLvArr[i][1]
				}
			}
		}
		public lv_jieduan(nowlv: number): any {
			for (let i = 0; i < this.totalLvArr.length; i++) {
				if (nowlv >= this.totalLvArr[i][0] && nowlv <= this.totalLvArr[i][1]) {
					return this.totalLvArr[i][2]
				}
			}
		}
		public setView() {
			for (let i = 1; i < 9; i++) {
				this['ui_' + i].img_circle.visible = false;
				this['ui_' + i].lab_name.text = this.nameStrArr[this.panelDatap.wstab[i].realpos];
				if (this.panelDatap.wstab[i].lvl == 999) {
					this['ui_' + i].img_lock.visible = true;
					this['ui_' + i].btn_icon.gray = true;
					this['ui_' + i].box_HQ.visible = false;
				} else {
					this['ui_' + i].img_lock.visible = false;
					this['ui_' + i].btn_icon.gray = false;
					this['ui_' + i].box_HQ.visible = true;
					this['ui_' + i].curLV.text = this.panelDatap.wstab[i].lvl + '';
					this['ui_' + i].maxLV.text = '/' + this.totalLV(this.panelDatap.wstab[i].lvl);
				}
				if (this.touchID == i) {
					this['ui_' + i].img_circle.visible = true;
					this.ui_show.lab_name.text = this.nameStrArr[this.panelDatap.wstab[i].realpos];
					if (this.panelDatap.wstab[i].lvl == 999) {
						this.ui_show.img_lock.visible = true;
						this.ui_show.btn_icon.gray = true;
						this.ui_show.box_HQ.visible = false;
					} else {
						this.ui_show.img_lock.visible = false;
						this.ui_show.btn_icon.gray = false;
						this.ui_show.box_HQ.visible = true;
						this.ui_show.curLV.text = this.panelDatap.wstab[i].lvl + '';
						let jd_Lv = this.totalLV(this.panelDatap.wstab[i].lvl);
						this.ui_show.maxLV.text = '/' + jd_Lv;
						if (this.panelDatap.wstab[i].lvl == jd_Lv) {
							this.isJDFullLv = true;
						}
						this.lab_jieduan.text = this.lv_jieduan(this.panelDatap.wstab[i].lvl);
					}
				}
			}
			if (this.isJDFullLv) {
				this.btn_intensify.disabled = true;
				this.btn_intensify.label = '已满级';
			} else {
				this.btn_intensify.disabled = false;
				this.btn_intensify.label = '炼 器';
			}
			this.showEff();
		}
		public showEff() {
			let item = GameUtil.findEquipInPlayer(this.panelDatap.wstab[this.touchID].realpos);
			if (item != undefined) {
				let id = item.dwBaseID;
				let effid0;
				switch (GameApp.MainPlayer.job) {
					case 1:
						effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB1_EFFICTID('' + id);
						break;
					case 2:
						effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB2_EFFICTID('' + id);
						break;
					case 3:
						effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB3_EFFICTID('' + id);
						break;
				}
				let effData0 = GameUtil.parseEffectidToObj([effid0 + ""]);
				console.log(effData0)
			}
		}
		public showContentMsg(data) {
			this.html_increase.style.align = 'center';
			this.html_increase.style.fontSize = 22;
			this.html_increase.style.bold = true;
			this.html_increase.style.fontFamily = 'STKaiti'
			let increaseStr = (data.addpro * 100).toFixed(2) + '%';
			this.html_increase.innerHTML = "<span style='color:#000000'>" + this.nameStrArr[this.panelDatap.wstab[this.touchID].realpos] + "基本属性</span>"
				+ "<span style='color:#5f4429'>+" + increaseStr + "</span>";

		}
		public init_soulUpPanel(index): void {
			//index的排序对应戾气面板的jsonData.wstab排序
			let pkt = new ProtoCmd.QuestClientData();
			this.touchID = index;
			pkt.setString(ProtoCmd.WX_updateWarSoulPanel, [index])
			lcp.send(pkt);
		}
		public destroy(e = true) {
			GameApp.LListener.offCaller(ProtoCmd.WX_warSoulPanel, this);
			GameApp.LListener.offCaller(ProtoCmd.WX_updateWarSoulPanel, this);
			super.destroy(e)
		}
	}
}