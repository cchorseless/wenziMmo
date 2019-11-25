/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBenDailyXinMoItem extends ui.fuBen.FuBenDailyXinMoItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.itf_FB_XinMoInfo;
		public setData(data: ProtoCmd.itf_FB_XinMoInfo): FuBenDailyXinMoItem {
			this.item = data;
			//心魔副本名称
			let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + data.monsterid).split("_");
			this.btn_xinmo.label = '' + name[0];
			//心魔副本图档
			this.btn_xinmo.skin='image/common/npc/npc_half_'+data.monsterid+'.png'
			let mylvl = GameApp.MainPlayer.level;
			let myzslvl = GameApp.MainPlayer.zslevel;
			this.img_shuo.visible = false;
			//心魔副本等级限制
			if (data.minzslv && myzslvl < data.minzslv || data.maxzslv && myzslvl > data.maxzslv) {
				this.mouseEnabled = false;
				this.img_boss.gray = true;
				this.img_shuo.visible = true;
			}
			if (data.minlv && mylvl < data.minlv || data.maxlv && mylvl > data.maxlv) {
				this.mouseEnabled = false;
				this.img_boss.gray = true;
				this.img_shuo.visible = true;
			}
			this.addEvent();
			return this;

		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.FuBenDaily.update_XinMo(this.item);
			})
		}

	}
}