/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_BuildEquipSelectDialog extends ui.juese.Person_BuildEquipSelectDialogUI {
		constructor() {
			super();
		}
		//显示的装备的限制等级
		public level;
		//选择的装备数组
		public selectData = [];
		//所需材料装备数量
		public maxNum;
		//选择的装备索引
		public index = [];
		public setData(level, maxNum): Person_BuildEquipSelectDialog {
			this.panel_item.vScrollBarSkin = '';
			this.maxNum = parseInt(maxNum);
			this.level = level;
			this.addEvent();
			this.itemInfo();
			this.init_selectEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_ok.on(Laya.UIEvent.CLICK, this, () => {
				this.onclose();
				GameApp.GameEngine.buildEquip = this.index;
				GameApp.LListener.event(ProtoCmd.JS_buildEquip, [this.selectData]);
			})
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.onclose();
			})
			this.addLcpEvent();
		}
		public itemInfo(): void {
			if (this.level) {
				//根据等级查找背包内大于这个等级的所有装备
				let itemArray = GameUtil.findItemInfoInBagByLevel(this.level);
				let finalArray = itemArray;
				//初始化道具框个数
				let num;
				if (itemArray.length >= 30) {
					num = Math.ceil(itemArray.length / 5) * 5 - itemArray.length;
				} else {
					num = 30 - itemArray.length;
				}
				for (let i = 0; i < num; i++) {
					finalArray.push(i);
				}
				this.panel_item.removeChildren();
				for (let index in finalArray) {
					let ui_item = new view.juese.Person_BuildEquipSelectItem();
					let yu = parseInt(index) % 5;
					let ceng = Math.floor(parseInt(index) / 5)
					ui_item.x = yu * (ui_item.width + 2);
					ui_item.y = ceng * (ui_item.height + 10);
					if (finalArray[index].dwBaseID) {
						ui_item.ui_item.lbl_count.visible = true;
						ui_item.ui_item.img_item.visible = true;
						ui_item.btn_select.visible = true;
						ui_item.setData(finalArray[index], parseInt(index));
					} else {
						ui_item.ui_item.lbl_count.visible = false;
						ui_item.ui_item.img_item.visible = false;
						ui_item.btn_select.visible = false;;
					}
					this.panel_item.addChild(ui_item);
				}
			}
		}
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.JS_updateBuildEquipItem, this, (jsonData, select: boolean, index: number) => {
				//select为装备选中状态
				//index为装备索引
				this.init_selectEvent(jsonData, select, index);
			})
		}
		public onclose(): void {
			GameApp.LListener.offCaller(ProtoCmd.JS_updateBuildEquipItem, this);
			GameApp.LListener.offCaller(ProtoCmd.JS_buildEquip, this);
			this.close();
		}
		public init_selectEvent(jsonData = null, select: boolean = null, index: number = null): void {
			let itemArray = this.panel_item._childs[0]._childs;
			if (jsonData != null) {
				if (select) {
					//若选中数量小于所需材料装备数量
					if (this.selectData.length < this.maxNum) {
						this.selectData.push(jsonData);
						this.index.push(index);
					} else {
						//若选中数量大于或等于所需材料装备数量
						TipsManage.showTips('选择数量达到上限')
					}
				} else {
					//取消选中，删除装备数组中相应信息
					for (let key in this.selectData) {
						if (this.selectData[key].dwBaseID == jsonData.dwBaseID) {
							//取消选中
							this.selectData.splice(parseInt(key), 1);
							break;
						}
					}
					for (let shu in this.index) {
						if (this.index[shu] == index) {
							this.index.splice(parseInt(shu), 1);
						}
					}
				}
				for (let num in itemArray) {
					let isBuild = false;
					itemArray[num].btn_select.selected = false;
					for (let i in this.index) {
						if (num == this.index[i]) { isBuild = true; }
					}
					if (isBuild) {
						itemArray[num].btn_select.selected = true;
					} else {
						itemArray[num].btn_select.selected = false;
					}
				}
			} else {
				if (GameApp.GameEngine.buildEquip) {
					this.index = GameApp.GameEngine.buildEquip;
					for (let num in itemArray) {
						let isBuild = false;
						itemArray[num].btn_select.selected = false;
						for (let i of this.index) {
							if (num == i) {
								isBuild = true;
								this.selectData.push(itemArray[num].data);
							}
						}
						if (isBuild) {
							itemArray[num].btn_select.selected = true;
						} else {
							itemArray[num].btn_select.selected = false;
						}
					}
				}
			}
		}
	}
}