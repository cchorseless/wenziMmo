/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBenLiLianV0Item extends ui.fuBen.FuBenLiLianV0ItemUI {
		constructor() {
			super();
			this.viw_1.visible = false;
			this.viw_2.visible = false;
			this.viw_3.visible = false;
		}
		public setData(num, data: ProtoCmd.itf_FB_JiDaoInfo): FuBenLiLianV0Item {
			if (num == 1) {
				this.viw_1.visible = true;
				//boss名称
				let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + data.monid).split("_");
				this.lbl_boss1.text = '' + name[0];
				//bosss所在地
				let map = SheetConfig.mydb_mapinfo_tbl.getInstance(null).NAME('' + data.mapid);
				this.lbl_place1.text = '' + map;
				//BOSS头像
				let imgH = SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE('' + data.monid);
				this.img_boss1.skin = 'image/common/npc/npc_half_' + imgH + '.png';
				//boss状态
				if (data.time !== 0) {
					let time = TimeUtils.getFormatBySecond(data.time, 1)
					this.lbl_time1.text = '' + time;
				}
				//掉落奖励
				let jiangli = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES('' + data.monid);
				// console.log('===>通缉通缉', jiangli)
				let ui_box=null;	
				for (let i = 0; i<6; i++) {
					let j = i + 1;
					let _itemUI = new view.compart.DaoJuItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = jiangli[i];
					_itemUI.setData(itemInfo,EnumData.ItemInfoModel.SHOW_IN_MAIL);
					ui_box =this['box_1' + j];
					ui_box.addChild(_itemUI);
					// console.log('===>通缉通缉',this['box1' + j].width)
				}

			}
			if (num == 2) {
				this.viw_2.visible = true;
				//boss名称
				let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + data.monid).split("_");
				this.lbl_boss2.text = '' + name[0];
				//bosss所在地
				let map = SheetConfig.mydb_mapinfo_tbl.getInstance(null).NAME('' + data.mapid);
				this.lbl_place2.text = '' + map;
				//BOSS头像
				let imgH = SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE('' + data.monid);
				this.img_boss2.skin = 'image/common/npc/npc_half_' + imgH + '.png';
				//boss状态
				if (data.time !== 0) {
					let time = TimeUtils.getFormatBySecond(data.time, 1)
					this.lbl_time2.text = '' + time;
				}
				//掉落奖励
				let jiangli = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES('' + data.monid);
				// console.log('===>通缉通缉', jiangli)
				let ui_box=null;	
				for (let i = 0; i<6; i++) {
					let j = i + 1;
					let _itemUI = new view.compart.DaoJuItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = jiangli[i];
					_itemUI.setData(itemInfo,EnumData.ItemInfoModel.SHOW_IN_MAIL);
					ui_box =this['box_2' + j];
					ui_box.addChild(_itemUI);
					// console.log('===>通缉通缉',this['box1' + j].width)
				}
			}
			if (num == 0) {
				this.viw_3.visible = true;
				//boss名称
				let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + data.monid).split("_");
				this.lbl_boss3.text = '' + name[0];
				//bosss所在地
				let map = SheetConfig.mydb_mapinfo_tbl.getInstance(null).NAME('' + data.mapid);
				this.lbl_place3.text = '' + map;
				//BOSS头像
				let imgH = SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE('' + data.monid);
				this.img_boss3.skin = 'image/common/npc/npc_half_' + imgH + '.png';
				//boss状态
				if (data.time !== 0) {
					let time = TimeUtils.getFormatBySecond(data.time, 1)
					this.lbl_time3.text = '' + time;
				}
					//掉落奖励
				let jiangli = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES('' + data.monid);
				// console.log('===>通缉通缉', jiangli)
				let ui_box=null;	
				for (let i = 0; i<6; i++) {
					let j = i + 1;
					let _itemUI = new view.compart.DaoJuItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = jiangli[i];
					_itemUI.setData(itemInfo,EnumData.ItemInfoModel.SHOW_IN_MAIL);
					ui_box =this['box_3' + j];
					ui_box.addChild(_itemUI);
					// console.log('===>通缉通缉',this['box1' + j].width)
				}
			}
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_ji1.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_1.selectedIndex = 1
			})
			this.btn_ji2.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_2.selectedIndex = 1
			})
			this.btn_ji3.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_3.selectedIndex = 1
			})
			this.btn_shang1.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_1.selectedIndex = 0
			})
			this.btn_shang2.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_2.selectedIndex = 0
			})
			this.btn_shang3.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_3.selectedIndex = 0
			})
		}
	}
}