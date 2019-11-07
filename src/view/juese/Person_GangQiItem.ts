/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_GangQiItem extends ui.juese.Person_GangQiItemUI {
		constructor() {
			super();
		}
		private client_func_index = 16;// 功能ID编号
		//角色职业
		private job = GameApp.MainPlayer.job;
		private hasInit = false;
		public setData(): void {
			if (this.hasInit) { return };
			this.hasInit = true;
			this.panel_gangqi.hScrollBarSkin = '';
			this.hbox_gangqi['sortItem'] = (items) => { };
			this.vbox_left['sortItem'] = (items) => { };
			this.vbox_right['sortItem'] = (items) => { };
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
				this.notActivation();
			}
		}

		/**
		  * 未激活时
		  */
		public notActivation(): void {
			let id = this.client_func_index + 1000;
			this.lbl_detail.text = SheetConfig.Introduction_play.getInstance(null).CONTENT('' + id);
			this.lbl_condition.text = '' + SheetConfig.Introduction_play.getInstance(null).TEXT1('' + id)

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

		public destroy(isbool = true): void {
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
			//获取途径
			this.lbl_from.text = SheetConfig.Introduction_play.getInstance(null).GROWUPDES('1016')
			//初始化星星
			for (let i = 1; i < 11; i++) {
				this['btn_xingxing' + i].selected = false;
			}
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
			// //当前属性
			let shuxing1 = GameUtil.parseEffectidToString('' + data.dwEffId)
			let attribute1 = shuxing1.des;
			let battle1 = shuxing1.battle[this.job];
			this.clip_power1.value = '' + battle1;
			let keys1 = Object.keys(attribute1)
			this.vbox_left.removeChildren();
			for (let key of keys1) {
				this.vbox_left.addChild(new view.juese.Person_LableItem().setData(attribute1[key]))
			}
			//下级属性
			let xiajieID = SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + data.dwEffId);
			//下阶罡气名
			let xgangqiName = SheetConfig.mydb_effect_base_tbl.getInstance(null).NAME('' + xiajieID);
			this.lbl_xiaji.text = '' + xgangqiName;
			let shuxing2 = GameUtil.parseEffectidToString('' + xiajieID)
			let attribute2 = shuxing2.des;
			let battle2 = shuxing2.battle[this.job];
			this.clip_power2.value = '' + battle2;
			let keys2 = Object.keys(attribute2)
			this.vbox_right.removeChildren();
			for (let key of keys2) {
				this.vbox_right.addChild(new view.juese.Person_LableItem().setData(attribute2[key]))
			}
		}

		/**
		 * 罡气下阶预览
		 */
		public init_GangQIInfo(): void {
			this.hbox_gangqi.removeChildren();
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