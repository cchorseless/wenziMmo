/**Created by the LayaAirIDE*/
module view.dialog {
	export class Daoju_ShangJiaDialog extends ui.dialog.Daoju_ShangJiaDialogUI {
		constructor() {
			super();
		}
		public itemObj: ProtoCmd.ItemBase;
		public prize: number;
		public num: number;
		public setData(item: ProtoCmd.ItemBase): Daoju_ShangJiaDialog {
			let data = new ProtoCmd.ItemBase();
			data.clone(item.data);
			this.itemObj = data;
			this.ui_item.setData(data);
			if (data.itemType == 2) {
				this.box_job.visible = true;
				let job = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB(data.dwBaseID);
				this.lbl_job.text = LangConfig.JOB_TYPEDES[EnumData.JOB_TYPE[job]];
			} else {
				this.box_job.visible = false;
			}
			//道具名
			this.lbl_name.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + data.dwBaseID);
			// 道具等级，使用等级
			let zs_level = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL('' + data.dwBaseID);
			let lvl = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVNEED('' + data.dwBaseID);
			this.lbl_lvl.text = LangConfig.getLevelDes(zs_level, lvl);
			//最大數量
			this.lbl_max.text = '/' + data.dwCount;
			this.num = 0;
			this.lbl_num.text = '' + this.num;
			//售卖价格
			this.prize = SheetConfig.mydb_item_base_tbl.getInstance(null).JYH_PRICE('' + data.dwBaseID)
			this.lbl_prize.text = '' + this.prize;
			//摊位使用数量
			this.lbl_tanwei.text = PanelManage.BeiBao.ui_tanWei.lbl_tanWeiCount.text;
			this.addEvent();
			this.init_sellItem();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			//加数量
			this.btn_jia1.on(Laya.UIEvent.CLICK, this, () => {
				if (this.num < this.itemObj.dwCount) {
					this.num += 1;
					this.lbl_num.text = '' + this.num;
				}
			})
			//减数量
			this.btn_jian1.on(Laya.UIEvent.CLICK, this, () => {
				if (this.num > 0) {
					this.num -= 1;
					this.lbl_num.text = '' + this.num;
				}
			})
			//加价格
			this.btn_jia2.on(Laya.UIEvent.CLICK, this, () => {
				this.prize += 10;
				this.lbl_prize.text = '' + this.prize;
			})
			//减价格
			this.btn_jian2.on(Laya.UIEvent.CLICK, this, () => {
				if (this.prize > 10) {
					this.prize -= 10;
					this.lbl_prize.text = '' + this.prize;
				} else {
					this.prize = 0;
					this.lbl_prize.text = '' + this.prize;
				}
			})
			//最大数量
			this.btn_max.on(Laya.UIEvent.CLICK, this, () => {
				this.num = this.itemObj.dwCount;
				this.lbl_num.text = '' + this.num;
			})
			this.btn_ok.on(Laya.UIEvent.CLICK, this, () => {
				this.goToSell();
			})
		}
		/**
	  * 上架道具
	  */
		public goToSell(): void {
			if (this.itemObj.dwBinding) {
				TipsManage.showTips('绑定物品不能交易');
				return
			}
			if (PanelManage.BeiBao && PanelManage.BeiBao.checkTanWeiIsFull()) {
				let pkt = new ProtoCmd.stAuctionSellItem();
				pkt.setValue('i64Id', this.itemObj.i64ItemID);
				pkt.setValue('dwCount', parseInt(this.lbl_num.text));
				pkt.setValue('dwPrice', parseInt(this.lbl_prize.text));
				pkt.setValue('btDays', 1);
				pkt.setValue('boShowName', false);
				lcp.send(pkt, this, (data) => {
					let cbpkt = new ProtoCmd.stStallRet(data);
					if (cbpkt.result === 0) {
						TipsManage.showTips('上架成功');
						PanelManage.BeiBao && PanelManage.BeiBao.updateTanWei();
						this.close();
					}
					else {
						TipsManage.showTips('上架失败');
						this.close();
					};
					cbpkt.clear();
					cbpkt = null;
					this.close();
				});

			}
			else {
				TipsManage.showTips('摊位已满无法上架');
			}
		}
		public init_sellItem(): void {
			// 初始化交易行界面
			let pkt = new ProtoCmd.stAuctionSearch();
			lcp.send(pkt, this, (data) => {
				let pktcb = new ProtoCmd.stAuctionItemsRet(data);
				let itemArray = pktcb.items;
				let index = 0;
				this.panel_item.removeChildren();
				for (let i in itemArray) {
					let data = itemArray[i];
					if (data.dwBaseID == this.itemObj.dwBaseID) {
						let ui_shangjiaItem = new view.compart.DaoJu_ShangJiaItem();
						ui_shangjiaItem.x = index % 2 * (ui_shangjiaItem.width + 5);
						ui_shangjiaItem.y = Math.floor(index / 2) * (ui_shangjiaItem.height + 5);
						this.panel_item.addChild(ui_shangjiaItem.setData(data));
						index += 1;
					}
				}
				if (index == 0) {
					this.lbl_null.visible = true;
				} else {
					this.lbl_null.visible = false;
				}
				// pktcb.clear();
				// pktcb = null;
			})
		}
	}
}