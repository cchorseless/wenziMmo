/**Created by the LayaAirIDE*/
module view.beiBao {
	export class Bag_HuiShouItem extends ui.beiBao.Bag_HuiShouItemUI {
		constructor() {
			super();
		}
		public hasInit = false;
		public setData(): void {
			this.panel_a.vScrollBarSkin = '';
			this.vbox_huishou0['sortItem'] = (items) => { };
			this.vbox_huishou1['sortItem'] = (items) => { };
			this.vbox_huishou2['sortItem'] = (items) => { };
			if (this.hasInit) return;
			this.hasInit = true;
			this.initUI();
			this.addEvent();


		}

		public initUI(): void {
			this.img_showSelect.scale(0, 0);
			this.img_showSelect.visible = false;

		}
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


			});
			// 取出

			// 熔炼

		}
		public allHuiShouItem = {};
		/**
		 * 添加熔炼道具
		 * @param item 
		 */
		public addItem(item: ProtoCmd.ItemBase): void {
			this.box_empty.visible = false;
			let _itemBase = new ProtoCmd.ItemBase();
			_itemBase.clone(item.data);
			let ui_item = new view.compart.DaoJuItem();
			ui_item.setData(_itemBase, EnumData.ItemInfoModel.SHOW_IN_HUI_SHOU_LU);
			// 添加到本地缓存中
			this.allHuiShouItem[_itemBase.i64ItemID.toString()] = _itemBase;
			// 添加UI
			let numCount0 = this.vbox_huishou0.numChildren;
			let numCount1 = this.vbox_huishou1.numChildren;
			let numCount2 = this.vbox_huishou2.numChildren;
			// 第一个数量最少
			if (numCount0 <= numCount1 && numCount0 <= numCount2) {
				this.vbox_huishou0.addChild(ui_item);
			}
			// 第二个数量最少
			else if (numCount1 < numCount0 && numCount1 <= numCount2) {
				this.vbox_huishou1.addChild(ui_item);
			}
			// 第三个数量最少
			else {
				this.vbox_huishou2.addChild(ui_item);
			}
			this.jiSuanExp();
		}

		/**
		 * 计算经验值
		 */
		public jiSuanExp(): void {



		}
	}
}