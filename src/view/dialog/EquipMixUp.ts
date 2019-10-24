/**Created by the LayaAirIDE*/
module view.dialog {
	export class EquipMixUp extends ui.dialog.EquipMixUpUI {
		// private godLvArr = [3, 5, 7, 9, 11, 13, 15]
		private data;
		private curType = 0;  //当前打开的装备合成项目   0：60、70等级装备合成   1：神装合成    2：热血装备合成
		private tempData = null;
		public static self: EquipMixUp;
		private checkObjIndex: number = 0;
		private mixID;
		//等级装备合成
		private lvTabID = 1;

		//神装备合成参数
		private godTabID = 0;     //战士、法师、道士
		private godTabTouchState: boolean = false;  //是否是点击装备  即子面板
		private godTouchID = 0;         //子面板中的    显示3、5、7、9、11阶选项、 实际值0、1、2、3、4
		// private godLvID = this.godLvArr[this.godTouchID];   //阶段数 3、5、7、9、11 
		public notChange = false;

		//热血装备合成参数
		private fireTabID = 0;    //神热血:0     圣热血:1     英雄 神:2     英雄 圣:3

		private pageID = 0;
		constructor() {
			super();
			EquipMixUp.self = this;
			this.addEvent();
			this.ui_show0.img_bg.skin = "";
			this.ui_show1.img_bg.skin = "";
			this.list_mix.vScrollBarSkin == "";
			this.list_mix.itemRender = view.compart.EquipMixInfoItem;

		}
		public setData(type: number) {
			this.list_mix.scrollTo(1);
			this.curType = type;
			this.setBoxShow(type);
			if (this.curType == 0) {
				if (this.lvTabID == 1) {
					this.btn_60lv.selected = true;
					this.btn_70lv.selected = false;
				} else {
					this.btn_60lv.selected = false;
					this.btn_70lv.selected = true;
				}
				this.data = SheetConfig.Synthesis.getInstance(null).BLvEquipAlldata(type + 1, this.lvTabID, null)
			} else if (this.curType == 1) {
				this.data = SheetConfig.Synthesis.getInstance(null).BLvEquipAlldata(type + 1, this.godTabID + 3, this.godTouchID + 1)
				this.godEquipBtnState()
			}
			else if (type == 2) {
				this.data = SheetConfig.Synthesis.getInstance(null).BLvEquipAlldata(type + 1, this.fireTabID + 6, null)
				this.changeBtnState();
			}

			this.list_mix.array = this.data;
			this.list_mix.renderHandler = new laya.utils.Handler(this, updataPetItem);
			this.list_mix.selectEnable = true;
			function updataPetItem(cell: view.compart.EquipMixInfoItem, index: number) {
				var data: Object = this.data[index];
				cell.setData(data, index)
				if (cell.itemID == this.checkObjIndex) {
					cell.btn_icon.selected = true;
				} else {
					cell.btn_icon.selected = false;
				}
			}
			this.tempData = this.data[0];
			this.upDataView(this.tempData, 0)
			this.checkObjIndex = 0;
			this.reViewListCells(0);

		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			EventManage.onWithEffect(this.btn_60lv, Laya.UIEvent.CLICK, this, () => {
				this.lvTabID = 1;
				this.setData(this.curType)

			});
			EventManage.onWithEffect(this.btn_70lv, Laya.UIEvent.CLICK, this, () => {
				this.lvTabID = 2;
				this.setData(this.curType)
			});
			for (let i = 0; i < 3; i++) {
				EventManage.onWithEffect(this["btn_god_tab" + i], Laya.UIEvent.CLICK, this, () => {
					if (this.godTabID != i) {
						this.godTabTouchState = false;
					}
					this.godTabID = i;
					this.godTouchID = 0;

					this.godTabTouchState = !this.godTabTouchState;
					this.godEquipBtnState()
					this.notChange = false
					this.setData(this.curType);
				});
			}
			for (let i = 0; i < 7; i++) {
				this["btn_Relive" + i].on(Laya.UIEvent.CLICK, this, () => {
					this.godTouchID = i;
					this.godTouchState();
					this.notChange = true
					this.setData(this.curType);

				});
			}
			for (let i = 0; i < 6; i++) {
				this["btn_god_fire" + i].on(Laya.UIEvent.CLICK, this, () => {
					this.fireTabID = i;
					this.changeBtnState();
					this.setData(this.curType);
				});
			}
			EventManage.onWithEffect(this.btn_mixUp, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.rxEquipCompound, [this.mixID])
				lcp.send(pkt);
			});

		}
		private changeBtnState() {
			for (let i = 0; i < 6; i++) {
				this["btn_god_fire" + i].selected =false;
				if(i == this.fireTabID){
					this["btn_god_fire" + i].selected =true;
				}
			}
		}
		public godTouchState() {
			for (let i = 0; i < 7; i++) {
				this["btn_Relive" + i].selected = false;
				if (i == this.godTouchID) {
					this["btn_Relive" + this.godTouchID].selected = true;
				}
			}

		}
		public godEquipBtnState() {
			for (let i = 0; i < 3; i++) {
				this["btn_god_tab" + i].selected = false;
				if (i == this.godTabID) {
					this["btn_god_tab" + this.godTabID].selected = true;
				}
			}
			this.godTouchState();
			let yNum;
			if (this.godTabID == 0) {
				if (this.godTabTouchState) {
					yNum = (this.btn_god_tab0.height + 2) * (this.godTabID + 1);
					Laya.Tween.to(this.box_god_second, { y: yNum }, 10, Laya.Ease.elasticOut, Laya.Handler.create(this, function () {
						this.box_god_second.visible = true;
						this.btn_god_tab1.y = this.box_god_second.y + this.box_god_second.height + this.btn_god_tab1.height / 2;
						this.btn_god_tab2.y = this.btn_god_tab1.y + this.btn_god_tab1.height + 2;

					}), 10);
				} else {
					this.box_god_second.visible = false;
					this.btn_god_tab1.y = this.btn_god_tab0.y + this.btn_god_tab0.height + 2;
					this.btn_god_tab2.y = this.btn_god_tab1.y + this.btn_god_tab1.height + 2;
				}
			} else if (this.godTabID == 1) {
				if (this.godTabTouchState) {
					yNum = (this.btn_god_tab0.height + 2) * (this.godTabID + 1);
					Laya.Tween.to(this.box_god_second, { y: yNum }, 10, Laya.Ease.elasticOut, Laya.Handler.create(this, function () {
						this.box_god_second.visible = true;
						this.btn_god_tab1.y = this.btn_god_tab0.y + this.btn_god_tab0.height + 2;
						this.btn_god_tab2.y = this.box_god_second.y + this.box_god_second.height + this.btn_god_tab1.height / 2;
					}), 10);
				} else {
					this.box_god_second.visible = false;
					this.btn_god_tab1.y = this.btn_god_tab0.y + this.btn_god_tab0.height + 2;
					this.btn_god_tab2.y = this.btn_god_tab1.y + this.btn_god_tab1.height + 2;
				}
			}
			else if (this.godTabID == 2) {
				if (this.godTabTouchState) {
					yNum = (this.btn_god_tab0.height + 2) * (this.godTabID + 1);
					Laya.Tween.to(this.box_god_second, { y: yNum }, 10, Laya.Ease.elasticOut, Laya.Handler.create(this, function () {
						this.box_god_second.visible = true;
						this.btn_god_tab1.y = this.btn_god_tab0.y + this.btn_god_tab0.height + 2;
						this.btn_god_tab2.y = this.btn_god_tab1.y + this.btn_god_tab1.height + 2;
					}), 10);
				} else {
					this.box_god_second.visible = false;
				}
			}
		}
		private setBoxShow(type) {
			if (type == 0) {
				this.box_level.visible = true;
				this.box_God.visible = false;
				this.box_fire.visible = false;
			}
			else if (type == 1) {
				this.box_level.visible = false;
				this.box_God.visible = true;
				this.box_fire.visible = false;
				if (this.notChange) {
					this.box_god_second.visible = true;
				} else {
					this.box_god_second.visible = false;
				}

			}
			else if (type == 2) {
				this.box_level.visible = false;
				this.box_God.visible = false;
				this.box_fire.visible = true;
			}
		}
		public upDataView(data, index) {

			let needID = data[4];
			let needNum = data[5];
			let resultID = data[3];
			let needName = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(needID.toString());
			let needSkin = SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(needID.toString());
			let resultName = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(resultID.toString());
			let resultSkin = SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(resultID.toString());
			// this.ui_show0.img_icon.skin = needSkin + "";
			this.ui_show0.lab_name.text = needName;
			this.ui_show0.lab_num.text = needNum;
			this.ui_show1.lab_name.text = resultName;
			this.ui_show1.lab_num.text = "1";
			// this.ui_show1.img_icon.skin = resultSkin + "";
			if (this.curType != 0) {
				this.mixID = needID;
			} else {
				this.mixID = resultID;
			}
		}
		//重置list中子项的点击状态
		public reViewListCells(index) {
			for (let i = 0; i < this.list_mix.cells.length - 1; i++) {
				if (this.list_mix.cells[i].itemID == index) {
					this.list_mix.cells[i].btn_icon.selected = true;
				} else {
					this.list_mix.cells[i].btn_icon.selected = false;
				}
			}
		}
		// //神装中 当前阶段数
		// public get godLvIDNum(): number {
		// 	return this.godLvArr[this.godTouchID];
		// }
		//玩家选择list中的子项
		public onChooseItem(index) {
			this.tempData = this.data[index];
			this.upDataView(this.tempData, index)
			this.checkObjIndex = index;
			this.reViewListCells(index);
		}
	}
}