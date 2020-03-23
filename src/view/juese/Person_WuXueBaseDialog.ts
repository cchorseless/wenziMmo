/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_WuXueBaseDialog extends ui.juese.Person_WuXueBaseDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public basePos;
		public cailiaoItem;
		//修炼时材料是否足够
		public count = false;
		//修炼时金币是否足够
		public moneyEnough = false;
		public setData(): void {
			this.vbox_shuxing['sortItem'] = (items) => { };
			this.addEvent();
			this.init_EquipBase();
		}
		public addEvent(): void {
			//关闭弹窗
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			this.box_add.on(Laya.UIEvent.CLICK, this, () => {
				if (this.cailiaoItem) {
					new view.dialog.GetItemWayDialog().setData(this.cailiaoItem).popup();
				}
			})
			//修炼
			this.btn_xiulian.on(Laya.UIEvent.CLICK, this, () => {
				this.init_xiuLian();
			})
		}
		/**
		 * 基础武学面板信息
		 */
		public init_EquipBase(): void {
			let data1 = GameUtil.findEquipInPlayer(EnumData.emEquipPosition.EQUIP_SHOULDER);
			this.ui_base1.setData(data1, this);
			this.ui_base1.lbl_name.text = '基础拳脚';
			let data2 = GameUtil.findEquipInPlayer(EnumData.emEquipPosition.EQUIP_KNEE);
			this.ui_base2.setData(data2, this);
			this.ui_base2.lbl_name.text = '基础刀剑';
			let data3 = GameUtil.findEquipInPlayer(EnumData.emEquipPosition.EQUIP_PENDANT);
			this.ui_base3.setData(data3, this);
			this.ui_base3.lbl_name.text = '基础长兵';
			let data4 = GameUtil.findEquipInPlayer(EnumData.emEquipPosition.EQUIP_FACE);
			this.ui_base4.setData(data4, this);
			this.ui_base4.lbl_name.text = '基础奇门';
			this.init_selectEvent(data1);
		}
		public init_selectEvent(BaseData: ProtoCmd.ItemBase): void {
			//选中状态
			let index;
			for (let i = 1; i < 5; i++) {
				if (BaseData.dwBaseID == this['ui_base' + i].data.dwBaseID) {
					this['ui_base' + i].img_select.visible = true;
					index = i;
				} else {
					this['ui_base' + i].img_select.visible = false;
				}
			}
			switch (index) {
				case 1:
					this.basePos = EnumData.emEquipPosition.EQUIP_SHOULDER;
					break;
				case 2:
					this.basePos = EnumData.emEquipPosition.EQUIP_KNEE;
					break;
				case 3:
					this.basePos = EnumData.emEquipPosition.EQUIP_PENDANT;
					break;
				case 4:
					this.basePos = EnumData.emEquipPosition.EQUIP_FACE;
					break;
			}
			//icon
			let itemInfo = new ProtoCmd.ItemBase();
			itemInfo.clone(BaseData.data);
			this.ui_item.setData(itemInfo)
			//名称
			this.lbl_name.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + BaseData.dwBaseID);
			let attribute = GameUtil.parseEffectidToObj(['' + BaseData.dwEffId]);
			//战力
			let job = GameApp.MainPlayer.job
			this.lbl_battle.text = '' + attribute.battle[job];
			//升级后战力增加
			let nextEffid = SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + BaseData.dwEffId)
			let nextAttribute = GameUtil.parseEffectidToObj(['' + nextEffid]);
			let nextBattle = nextAttribute.battle[job];
			let nextDes = nextAttribute.des;
			this.lbl_battleAdd.text = '+' + (nextBattle - attribute.battle[job]);
			//属性
			this.vbox_shuxing.removeChildren();
			for (let part in attribute.des) {
				this.vbox_shuxing.addChild(new view.compart.SinglePropsItem().setData(attribute.des[part], nextDes[part]))
			}
			let info = GameConfigFunc.GETDATABYTYPEANDLVL(index, BaseData.dwLevel);
			let cailiao = info[3].split('`');
			let cailiaoInfo = new ProtoCmd.ItemBase();
			cailiaoInfo.dwBaseID = cailiao[0];
			this.cailiaoItem = cailiao[0];
			this.ui_cailiao.setData(cailiaoInfo);
			this.ui_cailiao.lbl_count.visible = false;
			let num = GameUtil.findItemInBag(parseInt(cailiao[0]), GameApp.GameEngine.bagItemDB)
			//背包里材料数量/所需材料数量
			this.lbl_num.text = num + '/' + cailiao[1];
			if (num < cailiao[1]) {
				this.img_enough.visible = true;
				this.count = false;
			} else {
				this.img_enough.visible = false;
				this.count = true;
			}
			//需要金币
			this.lbl_need.text = '' + info[4];
			this.lbl_have.text = '' + GameApp.MainPlayer.wealth.gold;
			let cha = GameApp.MainPlayer.wealth.gold - info[4];
			if (cha >= 0) {
				this.lbl_have.color = '#ffffff';
				this.moneyEnough = true;
			} else {
				this.lbl_have.color = '#a53232';
				this.moneyEnough = false;
			}
		}
		/**
		 * 修炼
		 */
		public init_xiuLian(): void {
			if (this.count) {
				if (this.moneyEnough) {
					let pkt = new ProtoCmd.QuestClientData();
					pkt.setString(ProtoCmd.JS_upgradeWuXueSiFa, [this.basePos], null, this, (jsonData) => {
						this.init_EquipBase();
					})
					lcp.send(pkt);
				} else {
					TipsManage.showTips('金币不足，无法修炼')
				}
			} else {
				TipsManage.showTips('材料不足，无法修炼')
			}
		}
	}
}