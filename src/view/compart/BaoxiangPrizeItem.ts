/**Created by the LayaAirIDE*/
module view.compart {
	export class BaoxiangPrizeItem extends ui.compart.BaoxiangPrizeItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public setData(item): BaoxiangPrizeItem {
			this.panel_baoxiang.hScrollBarSkin = '';
			this.hbox_baoxiang['sortItem'] = (items) => { };
			this.hbox_baoxiang.removeChildren();
			//宝箱奖励
			for (let i = 1; item[i]; i++) {
				let _itemUI = new view.compart.DaoJuWithNameItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = item[i].index;
				itemInfo.dwCount = item[i].num;
				_itemUI.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.hbox_baoxiang.addChild(_itemUI)
			}
			return this;
		}

		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				this.destroy(true);
			})
		}
		//幸运抽奖
		public init_luckDrawView(data): BaoxiangPrizeItem {
			this.panel_baoxiang.hScrollBarSkin = '';
			this.hbox_baoxiang['sortItem'] = (items) => { };
			this.hbox_baoxiang.removeChildren();
			//宝箱奖励
			let keys = Object.keys(data);
			for (let key of keys) {
				let itemData = data[key]
				let _itemUI = new view.compart.DaoJuWithNameItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = itemData.item.index;
				itemInfo.dwCount = itemData.item.num;
				itemInfo.dwBinding = itemData.item.binding;
				_itemUI.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				// _itemUI.lbl_des.visible = true;
				//获得奖励条件
				// _itemUI.lbl_des.x = 6;
				// _itemUI.lbl_des.text = '累计抽' + itemData.cnt + '次可获得'
				this.hbox_baoxiang.addChild(_itemUI)
			}
			return this;
		}
		public init_pos(btn: Laya.Sprite,data,type=0): BaoxiangPrizeItem {
			let posPoint = btn.localToGlobal(new Laya.Point(btn.width / 2, btn.height / 2))
			let X = posPoint.x;
			let Y = posPoint.y;
			let MAX_WIDTH = Laya.stage.desginWidth;
			let Max_height = Laya.stage.desginHeight;
			if (X > (MAX_WIDTH / 2)) {
				this.anchorX = 1;
			} else {
				this.anchorX = 0;
			}
			if (Y > (Max_height  / 2)) {
				this.anchorY = 1;
			} else {
				this.anchorY = 0;
			}
			this.pos(X, Y);
			this.scaleX = this.scaleY = 0;
			Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, 200);
			if(type==0){
				this.setData(data);
			}
			if(type==1){
				this.init_luckDrawView(data);
			}
			return this;
		}
	}
}