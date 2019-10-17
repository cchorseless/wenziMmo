/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_GangQiItem extends ui.juese.Person_GangQiItemUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.panel_gangqi.hScrollBarSkin = '';
			this.hbox_gangqi['sortItem'] = (items) => { };
			this.addEvent();
			this.wingInfo();
		}

		public wingInfo(): void {
			//判断翅膀是否存在（存在则已激活）
			if (this.getItemInfo()) {
				this.vstack_gangqi.selectedIndex = 1;
				this.init_Info(this.getItemInfo());
				this.init_gangqi();
			}
			else {
				this.vstack_gangqi.selectedIndex = 0;
			}
		}

		//查找自己身上的翅膀
		public getItemInfo(): ProtoCmd.ItemBase {
			return GameUtil.findEquipInPlayer(EnumData.emEquipPosition.EQUIP_WING);
		}

		public addEvent(): void {
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				this.init_JiHuo();
			})
			this.btn_upLevel.on(Laya.UIEvent.CLICK, this, () => {
				this.init_upLevel();
			})
			this.addLcpEvent();
		}

		public addLcpEvent(): void {
			//拉取我的罡气物品信息
			GameApp.LListener.on(ProtoCmd.JS_playerWingPanel, this, (jsonData) => {
				let keys = Object.keys(jsonData)
				let i = 0;
				for (let key of keys) {
					let data = jsonData[key];
					i = i + 1;
					let _itemUI = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					let num = GameUtil.findItemInBag(key, GameApp.GameEngine.bagItemDB);
					itemInfo.dwBaseID = parseInt(key);
					itemInfo.dwCount = num;
					//经验值
					_itemUI.img_exp.visible = true;
					_itemUI.lbl_exp.visible = true;
					_itemUI.lbl_exp.text = data.exp;
					_itemUI.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_BAG_EQUIP);
					this['box_gangqi' + i].addChild(_itemUI);
				}
				this.init_GangQIInfo();
			})
		}

		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.JS_playerWingPanel, this);
			super.destroy(isbool);
		}

		//激活
		public init_JiHuo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_activePlayerWing, null, null, this, (jsonData) => {
				this.wingInfo();
			})
			lcp.send(pkt);
		}

		//罡气界面信息
		public init_Info(data: ProtoCmd.ItemBase): void {
			//罡气星级
			let xing = data.dwLevel % 10
			for (let i = 0; i < xing; i++) {
				let g = i + 1
				this['btn_xingxing' + g].selected = true;
			}
			//当前经验/最大经验
			this.lbl_value.text = data.nValue + '/' + data.nMaxValue;
			//经验进度
			this.img_progress.width = 470 * data.nValue / data.nMaxValue;
			//当前罡气名
			let gangqiName = SheetConfig.mydb_effect_base_tbl.getInstance(null).NAME('' + data.dwEffId);
			this.lbl_dangqian.text = '' + gangqiName;
			//当前属性生命
			let life = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_HP('' + data.dwEffId);
			this.lbl_mylife.text = '' + life;
			//当前属性攻击值
			let minkill = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_ATTACK('' + data.dwEffId);
			let maxkill = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_ATTACK('' + data.dwEffId);
			this.lbl_kill.text = minkill + '-' + maxkill;
			//当前物理防御值
			let minprotect = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_PHYSICAL('' + data.dwEffId);
			let maxprotect = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_PHYSICAL('' + data.dwEffId);
			this.lbl_wprotect.text = minprotect + '-' + maxprotect;
			//当前魔法防御值
			let minprotectmofa = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_SPELLS('' + data.dwEffId);
			let maxprotectmofa = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_SPELLS('' + data.dwEffId);
			this.lbl_wprotect.text = minprotectmofa + '-' + maxprotectmofa;
			//下阶属性ID
			let xiajieID = SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + data.dwEffId);
			//下阶罡气名
			let xgangqiName = SheetConfig.mydb_effect_base_tbl.getInstance(null).NAME('' + xiajieID);
			this.lbl_xiaji.text = '' + xgangqiName;
			//下阶属性生命
			let xlife = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_HP('' + xiajieID);
			this.lbl_xiajieLife.text = '' + xlife;
			//下阶属性攻击值
			let xminkill = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_ATTACK('' + xiajieID);
			let xmaxkill = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_ATTACK('' + xiajieID);
			this.lbl_xiajieKill.text = xminkill + '-' + xmaxkill;
			//下阶物理防御值
			let xminprotect = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_PHYSICAL('' + xiajieID);
			let xmaxprotect = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_PHYSICAL('' + xiajieID);
			this.lbl_xiajieProtectw.text = xminprotect + '-' + xmaxprotect;
			//下阶魔法防御值
			let xminprotectmofa = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_SPELLS('' + xiajieID);
			let xmaxprotectmofa = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_SPELLS('' + xiajieID);
			this.lbl_xiajieProtectm.text = xminprotectmofa + '-' + xmaxprotectmofa;
		}

		/**
		 * 罡气下阶预览
		 */
		public init_GangQIInfo(): void {
			for (let i = 0; i < 10; i++) {
				let j = i + 1;
				this.hbox_gangqi.addChild(new view.juese.Person_GangQiBtnItem().setData(j));
			}
		}

		//罡气信息拉取发包
		public init_gangqi(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_playerWingPanel)
			lcp.send(pkt);
		}
		
		/**
		 * 罡气进阶
		 */
		public init_upLevel(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_advancePlayerWing)
			lcp.send(pkt);
		}
	}
}