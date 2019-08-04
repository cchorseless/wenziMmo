/**Created by the LayaAirIDE*/
module view.dialog {
	export class ItemInfoV1Dialog extends ui.dialog.ItemInfoV1DialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public model = 0;
		public itemObj: ItemBase;
		public setData(obj: ItemBase, model = 0): ItemInfoV1Dialog {
			this.itemObj = obj;
			this.model = model;
			switch (this.model) {
				// 背包-回收
				case 0:
				// 背包-仓库
				case 1:
				// 背包-摆摊
				case 2:
				// 仓库内
				case 3:
				// 角色身上
				case 4:
					this.viw_model.selectedIndex = model;
					break;
				// 商店内,无操作按钮，所以需要缩短界面高度
				case 5:
					this.viw_model.selectedIndex = model;
					this.height -= this.viw_model.height;
					break;
			}
			let dwBaseID = '' + obj.dwBaseID;
			this.lbl_isLock.visible = !obj.dwBinding;
			// 物品名称
			this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(dwBaseID);
			// 物品描述
			this.div_itemDes.innerHTML = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES(dwBaseID);
			// 玩家回收经验
			this.lbl_playerRecover.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).RECOVEREXP(dwBaseID);
			// 帮会回收贡献值
			this.lbl_guildRecover.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).CONTRIBUTIONVALUE(dwBaseID);
			// 道具类型
			this.lbl_type.text = ['头盔', '项链', '衣服', '武器', '手镯', '手镯', '戒指', '戒指', '鞋字', '腰带'][SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMPOSITION(dwBaseID)];
			// 道具职业
			this.lbl_job.text = '职业：' + ['通用', '战士', '法师', '道士'][SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB(dwBaseID)];
			// 道具等级
			// 使用等级
			let zs_level = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(dwBaseID);
			this.lbl_level.text = '等级：' + (zs_level == 0 ? '' : '' + zs_level + '转') + SheetConfig.mydb_item_base_tbl.getInstance(null).LVNEED(dwBaseID) + '级';
			// 道具性别
			this.lbl_sex.text = ['通用', '男', '女'][SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMSEX(dwBaseID)];
			// 道具ICON信息赋值
			this.ui_item.setData(obj);
			return this;
		}
		public addEvent(): void {
			// 关闭
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			// 丢弃\销毁物品
			this.btn_destroy.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.SureOrCanelDialog().setData('确定要删除该物品吗？', EnumData.SureCanelModel.DELET_ITEM, this.itemObj.i64ItemID).popup(true);
			});
			// 角色穿戴
			this.btn_playerUse.on(Laya.UIEvent.CLICK, this, () => {

			})
			// 英雄穿戴
			this.btn_tuDiUse.on(Laya.UIEvent.CLICK, this, () => {

			})
		}


	}
}