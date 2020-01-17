/**Created by the LayaAirIDE*/
module view.compart {
	export class DaoJu_UseDialog extends ui.dialog.DaoJu_UseDialogUI {
		constructor() {
			super();
		}
		/**
		 * 
		 * @param item 道具数据
		 * @param type 道具的随机物品类型0无随机物品1有随机物品
		 */
		public itemObj: ProtoCmd.ItemBase;
		public setData(item: ProtoCmd.ItemBase, type: number = 0): DaoJu_UseDialog {
			let data = new ProtoCmd.ItemBase();
			data.clone(item.data);
			this.itemObj = data;
			this.ui_item.setData(data);
			//道具名
			this._lbl_name.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + item.dwBaseID);
			// 道具等级，使用等级
			let zs_level = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL('' + item.dwBaseID);
			let lvl = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVNEED('' + item.dwBaseID);
			this.lbl_lvl.text = LangConfig.getLevelDes(zs_level, lvl);
			//简介
			this.lbl_des.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMBGDES('' + item.dwBaseID);
			if (type == 0) {
				this.img_bg.height = 343;
				this.box_random.visible = false;
			} else {
				this.img_bg.height = 444;
				this.box_random.visible = true;
				this.panel_item.hScrollBarSkin = '';
				this.hbox_item['sortItem'] = (items) => { };
				// let itemArray=
			}
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			//使用一次
			this.btn_once.on(Laya.UIEvent.CLICK, this, () => {
				this.useOnceItem();
			})
			//使用十次
			this.btn_tenTimes.on(Laya.UIEvent.CLICK, this, () => {
				this.UseManyTimes();
			})
		}
		/**
	  * 物品使用一次
	  */
		public useOnceItem(): void {
			let pkt = new ProtoCmd.CretGetUseItem();
			pkt.setValue('i64id', this.itemObj.i64ItemID);
			pkt.setValue('dwCretOwnerTempId', GameApp.MainPlayer.tempId);
			lcp.send(pkt, this, (data) => {
				let pktCB = new ProtoCmd.CretGetUseItemRet(data);
				let btErrorCode = pktCB.getValue('btErrorCode');
				if (btErrorCode == 0) {
					TipsManage.showTips('道具使用成功');
					this.close();
				}
				else {
					TipsManage.showTips('道具使用失败');
					this.close();
				}
			})
		}
		/**
		 * 使用十次
		 */
		public UseManyTimes(): void {
			//是否允许批量使用
			let canbatchuse = SheetConfig.mydb_item_base_tbl.getInstance(null).CANBATCHUSE('' + this.itemObj.dwBaseID);
			// 是否可以批量使用
			if (canbatchuse) {
				let data = [this.itemObj.dwBaseID, 10, this.itemObj.i64ItemID.toString()];
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.ITEM_LoopUseItem, data);
				lcp.send(pkt);
				this.close();
			}
			else {
				TipsManage.showTips('该物品不能批量使用')
			}
		}
	}
}