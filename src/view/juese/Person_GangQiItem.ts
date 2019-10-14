/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_GangQiItem extends ui.juese.Person_GangQiItemUI {
		constructor() {
			super();
		}
		public hasInit = false;// 初始化自己
		public setData(): void {
			this.panel_gangqi.hScrollBarSkin = '';
			this.hbox_gangqi['sortItem'] = (items) => { };
			this.wingInfo();
			this.addEvent();
		}

		public wingInfo(): void {
			if (this.hasInit) { return };
			this.hasInit = true;
			if (this.getItemInfo()) {
				this.vstack_gangqi.selectedIndex = 1;
				this.init_GangQIInfo();
				this.init_Info(this.getItemInfo());
			}
			else {
				this.vstack_gangqi.selectedIndex = 0;
			}

		}
		public getItemInfo(): ProtoCmd.ItemBase {
			return GameUtil.findEquipInPlayer(EnumData.emEquipPosition.EQUIP_WING)
		}

		public addEvent(): void {
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				this.init_JiHuo();

			})
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
			// console.log(SheetConfig.mydb_effect_base_tbl.getInstance(null).)
			this.lbl_dangqian.text = '' + gangqiName;
			//当前属性攻击值
			let minkill = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_ATTACK('' + data.dwEffId);
			let maxkill = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_ATTACK('' + data.dwEffId);
			this.lbl_kill.text = minkill + '-' + maxkill;
			//当前属性防御值
			let minprotect = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_PHYSICAL('' + data.dwEffId);
			let maxprotect = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_PHYSICAL('' + data.dwEffId);
			this.lbl_protect.text = minprotect + '-' + maxprotect;
			//拉取我得罡气信息
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_playerWingPanel, null, null, this, (jsonData) => {
				let keys = Object.keys(jsonData)
				let i = 0;
				for (let key of keys) {
					i = i + 1;
					let _itemUI = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = parseInt(key);
					_itemUI.setData(itemInfo);
					this['box_gangqi' + i].addChild(_itemUI)
				}

				console.log('=====>罡气罡气', data)
			})
			lcp.send(pkt);
		}
		public init_GangQIInfo(): void {
			for (let i = 0; i < 10; i++) {
				let j=i+1;
				this.hbox_gangqi.addChild(new view.juese.Person_GangQiBtnItem().setData(j));
			}
		}
	}
}