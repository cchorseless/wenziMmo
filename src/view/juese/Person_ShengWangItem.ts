/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_ShengWangItem extends ui.juese.Person_ShengWangItemUI {
		constructor() {
			super();
		}
		public hasInit = false;// 初始化自己
		private client_func_index = 18;// 功能ID编号
		public setData(): void {
			this.panel_shengWang.hScrollBarSkin = '';
			this.hbox_shengWang['sortItem'] = (items) => { };
			if (this.hasInit) { return };
			this.hasInit = true;
			this.addEvent();
			this.activation();
		}
		public addEvent(): void {
			//开启
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				GameUtil.setServerData(this.client_func_index);
				this.activation();
			})

		}
		public activation(): void {
			//判断是否激活
			if (GameUtil.getServerData(this.client_func_index)) {
				this.viw_shengwang.selectedIndex = 1;
				this.getShengWangInfo();
			}
			else {
				this.viw_shengwang.selectedIndex = 0;
			}
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
				//声望排名
				this.lbl_one.text = '声望第一：' + jsonData.rank[1];
				this.lbl_two.text = '声望第二：' + jsonData.rank[2];
				this.lbl_three.text = '声望第三：' + jsonData.rank[3];
				//当前属性
				let hp = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_HP('' + jsonData.effid);
				this.lbl_hp.text = '' + hp;
				let minfight = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_NATURAL('' + jsonData.effid);
				let maxfight = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_NATURAL('' + jsonData.effid);
				this.lbl_magic.text = minfight + '-' + maxfight;
				//预览属性
				let id = parseInt(SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + jsonData.effid));
				if (id !== 0) {
					let hp1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_HP('' + id);
					this.lbl_hp1.text = '' + hp1;
					let minfight1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_NATURAL('' + id);
					let maxfight1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_NATURAL('' + id);
					this.lbl_magic1.text = minfight1 + '-' + maxfight1;
				}
				else {
					this.lbl_hp1.text = '无';
					this.lbl_magic1.text = '无';

				}
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