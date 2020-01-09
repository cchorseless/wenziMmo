/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBenDailyXinMoItem extends ui.fuBen.FuBenDailyXinMoItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		/**
		 * 心魔
		 */
		public item;
		//数据类型0心魔，1悬赏
		public type;
		public index;
		// public setData(data: ProtoCmd.itf_FB_XinMoInfo): FuBenDailyXinMoItem {
		// 	this.type = 0;
		// 	this.item = data;
		// 	//心魔副本名称
		// 	let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + data.monsterid).split("_");
		// 	this.btn_xinmo.label = '' + name[0];
		// 	//心魔副本图档
		// 	let iconID = SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE('' + data.monsterid);
		// 	this.btn_xinmo.skin = 'image/common/npc/npc_half_' + iconID + '.png'
		// 	let mylvl = GameApp.MainPlayer.level;
		// 	let myzslvl = GameApp.MainPlayer.zslevel;
		// 	this.img_shuo.visible = false;
		// 	//心魔副本等级限制
		// 	// if (data.minzslv && myzslvl < data.minzslv || data.maxzslv && myzslvl > data.maxzslv) {
		// 	// 	this.mouseEnabled = false;
		// 	// 	this.img_boss.gray = true;
		// 	// 	this.img_shuo.visible = true;
		// 	// }
		// 	if (data.minlv && mylvl < data.minlv || data.maxlv && mylvl > data.maxlv) {
		// 		this.mouseEnabled = false;
		// 		this.img_boss.gray = true;
		// 		this.img_shuo.visible = true;
		// 	}
		// 	return this;
		// }
		/**
		 * 
		 * @param data 悬赏
		 */
		public init_liLian(data: ProtoCmd.itf_FB_JiDaoInfo, key): FuBenDailyXinMoItem {
			this.type = 1;
			this.item = data;
			this.index = key;
			this.img_shuo.visible = false;
			//boss名称
			let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + data.monid).split("_");
			this.btn_xinmo.label = '' + name[0];
			//BOSS头像
			let imgH = SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE('' + data.monid);
			this.btn_xinmo.skin = 'image/common/npc/npc_half_' + imgH + '.png';
			return this;
		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				//数据类型0心魔，1悬赏
				if (this.type == 0) {
					// PanelManage.FuBenDaily.update_XinMo(this.item);
				}
				if (this.type == 1) {
					PanelManage.FuBenDaily.update_yeWai(this.item, this.index);
				}
			})
		}
	}
}