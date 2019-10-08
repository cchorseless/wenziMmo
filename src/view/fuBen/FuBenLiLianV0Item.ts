/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBenLiLianV0Item extends ui.fuBen.FuBenLiLianV0ItemUI {
		constructor() {
			super();
		}
		public setData(data: ProtoCmd.itf_FB_JiDaoInfo): FuBenLiLianV0Item {
			this.panel_jidao.hScrollBarSkin = '';
			this.hbox_jidao['sortItem'] = (items) => { };
			this.img_liLianMore.scaleY = 0;
			this.height = this.img_liLian.height;
			//boss名称
			let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + data.monid).split("_");
			this.lbl_bossName.text = '' + name[0];
			this.lbl_name.text = '' + name[0];
			//bosss所在地
			let map = SheetConfig.mydb_mapinfo_tbl.getInstance(null).NAME('' + data.mapid);
			this.lbl_place.text = '' + map;
			//BOSS头像
			let imgH = SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE('' + data.monid);
			this.img_bossHead.skin = 'image/common/npc/npc_half_' + imgH + '.png';
			//BOSS半身像
			let img = SheetConfig.mydb_monster_tbl.getInstance(null).STYLE_DRAWING('' + data.monid);
			this.img_boss.skin = 'image/common/npc/npc_half_' + img + '.png';
			//boss状态
			if (data.time == 0) {

			}
			else {
				let time = TimeUtils.getFormatBySecond(data.time, 1)
				this.lbl_time.text = '' + time;
			}
			//掉落奖励
			let jiangli = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES('' + data.monid);
			this.hbox_jidao.removeChildren();
			for (let i = 0; jiangli[i]; i++) {
				let _itemUI = new view.compart.DaoJuWithNameItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = jiangli[i];
				_itemUI.setData(itemInfo);
				this.hbox_jidao.addChild(_itemUI)
			}

			this.addEvent();
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
	}
}