/**Created by the LayaAirIDE*/
module view.dialog {
	export class ItemInfoV1Dialog extends ui.dialog.ItemInfoV1DialogUI {
		constructor() {
			super();
			this.addEvent();
		}

		public itemObj: ItemBase;
		public setData(obj: ItemBase, mode = 0): ItemInfoV1Dialog {
			this.itemObj = obj;
			this.viw_button.selectedIndex = mode;
			let dwBaseID = '' + obj.dwBaseID;
			// 物品名称
			this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(dwBaseID);
			// 物品描述
			this.div_itemDes.innerHTML = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES(dwBaseID);
			// 玩家回收经验
			this.lbl_playerRecover.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).RECOVEREXP(dwBaseID);
			// 帮会回收贡献值
			this.lbl_guildRecover.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).CONTRIBUTIONVALUE(dwBaseID);
			// this.div_itemDes.innerHTML = "<font style='fontSize:25' color='#ffc000'>【活动礼包】</font><br><font color='#000000'>世界BOSS活动中成功击败BOSS后，对BOSS造成伤害排名第一的勇士的奖励</font><br><font color='#bfbfbf'>打开礼包可获得以下奖励：</font><br><font color='#00ff00'>金砖（小）X6</font><br><font color='#00ff00'>成就令(小)X6</font>";
			// 
			this.ui_item.lbl_count.text = '' + obj.dwCount;
			this.ui_item.img_item.skin = 'image/common/daoju/itemicon_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID('' + obj.dwBaseID) + '.png';
			this.ui_item.img_bg.skin = 'image/common/daoju/quality_' + obj.btQuality + '.png';
			return this;
		}
		public addEvent(): void {
			// 关闭
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			// 丢弃\销毁物品
			this.btn_destroy.on(Laya.UIEvent.CLICK, this, () => {
				let packect = new ProtoCmd.CretForsakeItem()
				packect.setValue('i64id', this.itemObj.i64ItemID)
				lcp.send(packect, this, (data) => {
					this.close();
					let msg = new ProtoCmd.CretForsakeItem(data);
					let errorcode = msg.getValue('btErrorCode');
					switch (errorcode) {
						case 0:
							TipsManage.showTips('丢弃物品成功');
							break;
						case 33:
							TipsManage.showTips('绑定物品不允许丢弃');
							break;
						default:
							TipsManage.showTips('该物品不允许丢弃');
							break;
					}
					msg.clear();
					msg = null;
				});
			});

		}
	}
}