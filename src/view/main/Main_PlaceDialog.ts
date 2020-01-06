/**Created by the LayaAirIDE*/
module view.main {
	export class Main_PlaceDialog extends ui.main.Main_PlaceDialogUI {
		constructor() {
			super();
		}
		//地图id
		public mapid: number;
		public setData(mapid: number): Main_PlaceDialog {
			this.panel_item.hScrollBarSkin = '';
			this.mapid = mapid;
			this.addEvent();
			this.init_mapInfo();
			return this;
		}
		public addEvent(): void {
			//关闭
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			//传送
			EventManage.onWithEffect(this.btn_chuansong, Laya.UIEvent.CLICK, this, () => {
				 let roomid=SheetConfig.mapRoomSheet.getInstance(null).GETBEGINROOMIDBYMAPID(this.mapid);
				if (this.mapid == GameApp.MainPlayer.location.mapid) {
					TipsManage.showTips('已在该地点')
				} else {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [roomid, 0]);
					lcp.send(pkt);
				}
				this.close();
			});
		}
		public init_mapInfo(): void {
			//地图名称
			this.img_name.skin = 'image/main/main_zonglan/diming_'+this.mapid+'.png';
			//地图描述
			this.lbl_des.text = SheetConfig.Introduction_play.getInstance(null).CONTENT('' + this.mapid);
			//怪物掉落一览
			let monarray = SheetConfig.mydb_mongen_tbl.getInstance(null).GETALLMONSTERBYMAPID(this.mapid);
			let itemArray = [];
			for (let mon of monarray) {
				let items = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES(mon);
				for (let item of items) {
					if (itemArray.length > 1) {
						let num = 0;
						let haveSame = true;
						for (let nowItem of itemArray) {
							num += 1;
							//怪物掉落去掉相同物品
							if (parseInt(nowItem) == item) {
								haveSame = false;
							}
							if (num == itemArray.length && haveSame) {
								itemArray.push(item);
							}
						}
					} else {
						itemArray.push(item);
					}
				}
			}
			this.panel_item.removeChildren();
			let num = 0;
			for (let index in itemArray) {
				if (itemArray[index] != 0) {
					let ui_item = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = itemArray[index];
					ui_item.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
					if (parseInt(index) % 2 == 0) {
						ui_item.y = 0;
					} else {
						ui_item.y = ui_item.height;
					}
					ui_item.x = Math.floor(num / 2) * (ui_item.width + 10);
					this.panel_item.addChild(ui_item);
					num += 1;
				}
			}
			if (this.panel_item._childs[0]._childs.length == 0) {
				this.lbl_null.visible = true;
			} else {
				this.lbl_null.visible = false;
			}
		}
	}
}