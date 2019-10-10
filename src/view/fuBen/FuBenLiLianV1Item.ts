/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBenLiLianV1Item extends ui.fuBen.FuBenLiLianV1ItemUI {
		constructor() {
			super();
		}
		public setData(key, data: ProtoCmd.itf_FB_XueYuInfo): FuBenLiLianV1Item {
			this.panel_xueYu.hScrollBarSkin = '';
			//boss名称
			let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + data.bossid).split("_");
			this.lbl_name.text = '' + name[0];
			//BOSS地图
			let map = SheetConfig.mydb_mapinfo_tbl.getInstance(null).NAME('' + data[1].mapid);
			this.lbl_ceng.text = '' + map;
			//奖励
			let jiangli = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES('' + data.bossid);
			this.hbox_xueYu.removeChildren();
			for (let i = 0; jiangli[i]; i++) {
				let _itemUI = new view.compart.DaoJuWithNameItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = jiangli[i];
				_itemUI.setData(itemInfo);
				this.hbox_xueYu.addChild(_itemUI)
			}

			this.img_liLianMore.scaleY = 0;
			this.height = this.img_liLian.height;
			this.addEvent();
			this.getBossInfo(key);
			return this;
		}
		public addEvent(): void {
			this.img_liLian.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_selected.selected = !this.btn_selected.selected;
				this.showMore(this.btn_selected.selected);
			})
		}
		public showMore(v: boolean): void {
			if (v) {
				Laya.Tween.to(this.img_liLianMore, { scaleY: 1 }, 500);
				Laya.Tween.to(this, { height: this.img_liLian.height + this.img_liLianMore.height }, 500);
			}
			else {
				Laya.Tween.to(this.img_liLianMore, { scaleY: 0 }, 500);
				Laya.Tween.to(this, { height: this.img_liLian.height }, 500)
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