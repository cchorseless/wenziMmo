/**Created by the LayaAirIDE*/
module view.compart {
	export class DaoJuInfoV1Item extends ui.compart.DaoJuInfoV1ItemUI {
		constructor() {
			super();
		}
		public setData(obj: ProtoCmd.ItemBase): void {
			let dwBaseID = '' + obj.dwBaseID;
			// 物品名称
			// this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(dwBaseID).split('_')[0];
			// this.lbl_itemName.color = ColorUtils.nameColor[SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(dwBaseID)];
			// 物品描述
			this.div_itemDes.innerHTML = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES(dwBaseID);
			// 玩家回收经验
			this.lbl_playerRecover.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).RECOVEREXP(dwBaseID);
			// 帮会回收贡献值
			this.lbl_guildRecover.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).CONTRIBUTIONVALUE(dwBaseID);
			// 道具类型
			let pos = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMPOSITION(dwBaseID);
			this.lbl_type.text = LangConfig.emEquipPositionDes[EnumData.emEquipPosition[pos]];
			// 道具职业
			let jobLimit = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB(dwBaseID)
			this.lbl_job.text = LangConfig.JOB_TYPEDES[EnumData.JOB_TYPE[jobLimit]];
			// 道具等级，使用等级
			let zs_level = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(dwBaseID);
			let lvl = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVNEED(dwBaseID);
			this.lbl_level.text = LangConfig.getLevelDes(zs_level, lvl);
			// 道具性别
			let sex = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMSEX(dwBaseID);
			this.lbl_sex.text = LangConfig.SEX_TYPEDes[EnumData.SEX_TYPE[sex]];
			// 战斗评分
			this.lbl_sorce.text =obj.battleScore[jobLimit] + "";
			// 装备属性

			// 基本属性
			let effid0;
			switch (jobLimit) {
				case EnumData.JOB_TYPE.JOB_NONE:
				case EnumData.JOB_TYPE.JOB_WARRIOR:
					effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB1_EFFICTID(dwBaseID);
					break;
				case EnumData.JOB_TYPE.JOB_MAGE:
					effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB2_EFFICTID(dwBaseID);
					break;
				case EnumData.JOB_TYPE.JOB_MONK:
					effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB3_EFFICTID(dwBaseID);
					break;
			}
			if (effid0) {
				let effResult0 = GameUtil.parseEffectidToString('' + effid0);
				this.tab_props.labels = '基础属性';
				this.list_propsDes0.itemRender = view.compart.SinglePropsItem;
				this.list_propsDes0.array = effResult0.des;
				this.list_propsDes0.renderHandler = Laya.Handler.create(this, (ceil: view.compart.SinglePropsItem, data) => {
					ceil.setData(ceil.dataSource);
				}, null, false)
			}
			// 套装属性
			let effid1 = SheetConfig.mydb_item_base_tbl.getInstance(null).SUIT_EFFICTID(dwBaseID);
			if (effid1) {
				let effResult1 = GameUtil.parseEffectidToString('' + effid1);
				this.tab_props.labels += ',套装属性';
				this.list_propsDes1.itemRender = view.compart.SinglePropsItem;
				this.list_propsDes1.array = effResult1.des;
				this.list_propsDes1.renderHandler = Laya.Handler.create(this, (ceil: view.compart.SinglePropsItem, data) => {
					ceil.setData(ceil.dataSource);
				}, null, false);
			}
			// 特殊属性
			if (obj.stNpPropertyString.length > 0) {
				this.tab_props.labels += ',极品属性';
				this.list_propsDes2.itemRender = view.compart.SinglePropsItem;
				this.list_propsDes2.array = obj.stNpPropertyString;
				this.list_propsDes2.renderHandler = Laya.Handler.create(this, (ceil: view.compart.SinglePropsItem, data) => {
					ceil.setData(ceil.dataSource);
				}, null, false);
			}
			this.tab_props.selectHandler = Laya.Handler.create(this, (index) => {
				switch (this.tab_props.items[index].label) {
					case '基础属性':
						this.viw_prop0.selectedIndex = 0;
						break;
					case '套装属性':
						this.viw_prop0.selectedIndex = 1;
						break;
					case '极品属性':
						this.viw_prop0.selectedIndex = 2;
						break;
				}
			}, null, false);
			// 道具ICON信息赋值
			this.ui_item.initUI(obj);
		}
	}
}