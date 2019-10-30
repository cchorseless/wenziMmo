/**Created by the LayaAirIDE*/
module view.beiBao {
	export class Bag_HuiShouItem extends ui.beiBao.Bag_HuiShouItemUI {
		public baseItemmap = [];  //顺序排序需要取出来的数据   用于添加 至回收面板使用
		public exp0 = 0;
		public exp1 = 0;
		constructor() {
			super();
		}
		public hasInit = false;
		public setData(): void {
			this.panel_a.vScrollBarSkin = '';
			if (this.hasInit) return;
			this.hasInit = true;
			this.initUI();
			this.addEvent();
		}

		public initUI(): void {
			this.img_showSelect.scale(0, 0);
			this.img_showSelect.visible = false;
		}
		//回收规则  1：89级一下   2：1-2转   3：3-4转    4：5-6转    5：7-8转    6：全部装备
		public curSelect: number = 1;

		public addEvent(): void {
			this.btn_center.on(Laya.UIEvent.CLICK, this, () => {
				if (this.img_showSelect.visible) {
					return
				}
				this.img_showSelect.visible = true;
				Laya.Tween.to(this.img_showSelect, { scaleX: 1, scaleY: 1 }, 200);
			})
			for (let i = 1; i <= 6; i++) {
				this['btn_0' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.btn_center.label = this['btn_0' + i].label;
					this.curSelect = i;
					Laya.Tween.to(this.img_showSelect, { scaleX: 0, scaleY: 0 }, 200, null, Laya.Handler.create(this, () => {
						this.img_showSelect.visible = false;
					}));
				})

			}
			// 投入
			this.btn_touRu.on(Laya.UIEvent.CLICK, this, () => {
				this.onPutIn()
			});
			// 取出
			this.btn_quChu.on(Laya.UIEvent.CLICK, this, () => {
				this.onTakeOut()
			});

			// 熔炼
			this.btn_huiShou.on(Laya.UIEvent.CLICK, this, () => {
				this.onRecycle();
			});


		}
		public putInMap: { [index: string]: ProtoCmd.ItemBase } = {};
		public takeOutMap = {};

		public onPutIn() {
			this.onTakeOut();
			switch (this.curSelect) {
				case 1:
					for (let i in GameApp.GameEngine.bagItemDB) {
						let o = GameApp.GameEngine.bagItemDB[i];
						let zsLevel = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(o.dwBaseID)
						let exp = SheetConfig.mydb_item_base_tbl.getInstance(null).RECOVEREXP(o.dwBaseID.toString())
						if (o.itemType == 2 && o.dwLevel <= 89 && zsLevel == 0 && exp > 0) {
							this.putInMap[i] = o;
						}
					}
					break;
				case 2:
					for (let i in GameApp.GameEngine.bagItemDB) {
						let o = GameApp.GameEngine.bagItemDB[i];
						let zsLevel = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(o.dwBaseID)
						let exp = SheetConfig.mydb_item_base_tbl.getInstance(null).RECOVEREXP(o.dwBaseID.toString())
						if (zsLevel >= 1 && zsLevel < 3 && exp > 0) {
							this.putInMap[i] = o;
						}
					}
					break;
				case 3:
					for (let i in GameApp.GameEngine.bagItemDB) {
						let o = GameApp.GameEngine.bagItemDB[i];
						let zsLevel = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(o.dwBaseID)
						let exp = SheetConfig.mydb_item_base_tbl.getInstance(null).RECOVEREXP(o.dwBaseID.toString())
						if (zsLevel >= 3 && zsLevel < 5 && exp > 0) {
							this.putInMap[i] = o;
						}
					}
					break;
				case 4:
					for (let i in GameApp.GameEngine.bagItemDB) {
						let o = GameApp.GameEngine.bagItemDB[i];
						let zsLevel = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(o.dwBaseID)
						let exp = SheetConfig.mydb_item_base_tbl.getInstance(null).RECOVEREXP(o.dwBaseID.toString())
						if (zsLevel >= 5 && zsLevel < 7 && exp > 0) {
							this.putInMap[i] = o;
						}
					}
					break;
				case 5:
					for (let i in GameApp.GameEngine.bagItemDB) {
						let o = GameApp.GameEngine.bagItemDB[i];
						let zsLevel = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(o.dwBaseID)
						let exp = SheetConfig.mydb_item_base_tbl.getInstance(null).RECOVEREXP(o.dwBaseID.toString())
						if (zsLevel >= 7 && zsLevel < 9 && exp > 0) {
							this.putInMap[i] = o;
						}
					}
					break;
				case 6:
					for (let i in GameApp.GameEngine.bagItemDB) {
						let o = GameApp.GameEngine.bagItemDB[i];
						let exp = SheetConfig.mydb_item_base_tbl.getInstance(null).RECOVEREXP(o.dwBaseID.toString())
						if (o.itemType == 2 && exp > 0) {
							this.putInMap[i] = o;
						}
					}
					break;
			}
			this.box_empty.visible = false;
			for (let i in this.putInMap) {
				if (this.putInMap[i]) {
					if (this.putInMap[i]) {
						this.baseItemmap.push(this.putInMap[i])
					}
				}
			}
			if (this.baseItemmap.length > 0) {
				for (let i = 0; i < this.baseItemmap.length; i++) {
					let o = new view.compart.DaoJuItem();
					let itemBaseData = new ProtoCmd.ItemBase()
					itemBaseData.dwBaseID = this.baseItemmap[i].dwBaseID;
					itemBaseData.i64ItemID = this.baseItemmap[i].i64ItemID;
					itemBaseData.dwBinding = this.baseItemmap[i].dwBinding;
					itemBaseData.btQuality = this.baseItemmap[i].btQuality;
					this.baseItemmap[i].ui_item.disabled = true;
					o.setData(itemBaseData, EnumData.ItemInfoModel.SHOW_IN_HUI_SHOU_LU);
					o.y = Math.floor(i / 3) * (o.height + 10)
					o.x = (i % 3) * (o.width + 10) + 5
					this.panel_a.addChild(o)
					this.exp0 += this.jiSuanExp_player(this.baseItemmap[i].dwBaseID)
					this.exp1 += this.jiSuanExp_hero(this.baseItemmap[i].dwBaseID)
				}
				this.onShowExp();
			}
			else {
				TipsManage.showTips("背包无匹配等级装备")
				this.box_empty.visible = true;
			}

		}
		public onTakeOut() {
			if (this.putInMap) {
				this.takeOutMap = this.putInMap;
				for (let i in this.takeOutMap) {
					this.takeOutMap[i].ui_item.disabled = false;
				}
			}
			this.exp0 = this.exp1 = 0;
			this.baseItemmap = [];
			this.putInMap = {};
			this.panel_a.removeChildren();
			this.box_empty.visible = true;
			this.onShowExp();
		}
		public onRecycle() {
			let base64IDArr = [];
			let str = "";
			if (this.baseItemmap.length > 0) {
				for (let i = 0; i < this.baseItemmap.length; i++) {
					if (i == 0) {
						str = this.baseItemmap[i].i64ItemID
					} else {
						str += "+" + this.baseItemmap[i].i64ItemID
					}

				}
			}
			if (str != "") {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.zhuangbeihuishousys, [str], 0, this,
					function (data) {
						TipsManage.showTips("恭喜！获得经验：" + data.playerexp)
						Laya.timer.once(1000, this, function () {
							TipsManage.showTips("恭喜！获得英雄经验：" + data.heroexp)
						})
						this.onRecycleComplete();

					})
				lcp.send(pkt);
			}
			else {
				TipsManage.showTips("当前无可回收装备")
			}
		}
		public onRecycleComplete() {
			this.baseItemmap = [];
			this.putInMap = {};
			this.panel_a.removeChildren();
			this.box_empty.visible = true;
			this.exp0 = this.exp1 = 0;
			this.onShowExp();

		}
		public onShowExp() {
			this.lbl_expHuiShou0.text = "" + this.exp0;
			this.lbl_expHuiShou1.text = "" + this.exp1;
		}



		/**
		 * 计算经验值
		 */
		public jiSuanExp_player(data: number): number {
			return SheetConfig.mydb_item_base_tbl.getInstance(null).RECOVEREXP(data.toString())
		}
		public jiSuanExp_hero(data: any): number {
			return SheetConfig.mydb_item_base_tbl.getInstance(null).RECOVERHEROEXP(data.toString())
		}
	}
}