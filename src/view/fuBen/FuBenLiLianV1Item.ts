/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBenLiLianV1Item extends ui.fuBen.FuBenLiLianV1ItemUI {
		constructor() {
			super();
		}
		public setData(key, data: ProtoCmd.itf_FB_XueYuInfo, i): FuBenLiLianV1Item {
			this.panel_xueYu.hScrollBarSkin = '';
			let keys = Object.keys(data);
			let num = 0;
			this.hbox_xueYu.removeChildren();
			for (let id of keys) {
				let type = data[id];
				if (type = 1) {
					num = num + 1
				}
				//奖励
				let jiangli = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES('' + id);
				for (let i = 0; jiangli[i]; i++) {
					let _itemUI = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = jiangli[i];
					_itemUI.setData(itemInfo);
					this.hbox_xueYu.addChild(_itemUI)
				}
			}
			//稀有boss存活数量
			this.num.text = '' + num;
			//层数
			// this.floor=i;
			let arr=['零','一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
			this.lbl_ceng.text = '第' + arr[i] + '层';
			this.img_liLianMore.scaleY = 0;
			this.height = this.btn_selected.height;
			this.addEvent();
			this.getBossInfo(key);
			return this;
		}
		public addEvent(): void {
			this.btn_selected.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_selected.selected = !this.btn_selected.selected;
				this.showMore(this.btn_selected.selected);
			})
		}
		public showMore(v: boolean): void {
			if (v) {
				Laya.Tween.to(this.img_liLianMore, { scaleY: 1 }, 500);
				Laya.Tween.to(this, { height: this.btn_selected.height + this.img_liLianMore.height }, 500);
			}
			else {
				Laya.Tween.to(this.img_liLianMore, { scaleY: 0 }, 500);
				Laya.Tween.to(this, { height: this.btn_selected.height }, 500)
			}
		}

		public getBossInfo(key): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_GetWorldBossInfo, [key], null, this, (jsonData: { any }) => {

			})
			lcp.send(pkt);
		}
	}
}