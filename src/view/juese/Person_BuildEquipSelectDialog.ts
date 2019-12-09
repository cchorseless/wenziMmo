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
		//最大选择数量
		public maxNum;
		//选择的装备索引
		public index = [];
		public setData(level, maxNum): Person_BuildEquipSelectDialog {
			this.maxNum = parseInt(maxNum);
			this.level = level;
			this.addEvent();
			this.itemInfo();
			this.init_select();
			return this;
		}
		public addEvent(): void {
			this.btn_ok.on(Laya.UIEvent.CLICK, this, () => {
				this.onclose();
				GameApp.LListener.event(ProtoCmd.JS_updateBuildEquipItem, [this.selectData, 1]);
			})
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.onclose();
			})
		}
		public itemInfo(): void {
			this.list_item.array = [];
			this.list_item.vScrollBarSkin = '';
			if (this.level) {
				//根据等级查找背包内大于这个等级的所有装备
				let itemArray = GameUtil.findItemInfoInBagByLevel(this.level);
				//初始化道具框个数
				let num = 30;
				if (itemArray.length > 30) {
					num = Math.ceil(itemArray.length / 5) * 5;
				}
				for (let i = 0; i < num; i++) {
					this.list_item.array.push(i);
				}
				//若有装备满足等级条件则添加装备
				if (itemArray.length > 0) {
					let items = Object.keys(itemArray);
					for (let item of items) {
						let iteminfo = new ProtoCmd.ItemBase;
						this.list_item.array[item] = itemArray[item];
					}
				}
			}
			let num = -1;
			this.list_item.itemRender = view.juese.Person_BuildEquipSelectItem;
			this.list_item.renderHandler = Laya.Handler.create(this, (cell: view.juese.Person_BuildEquipSelectItem, index) => {
				num += 1;
				cell.setData(cell.dataSource, num);
			}, null, false)

		}
		public init_select(): void {
			GameApp.LListener.on(ProtoCmd.JS_updateBuildEquipItem, this, (jsonData, type, select: boolean, index: number) => {
				//type为选择材料弹窗响应1为打造装备弹窗响应
				//select为装备选中状态
				//index为装备索引
				if (type == 0) {
					//初始化全部为不选中状态
					for (let child0 of this.list_item.cells) {
						child0.btn_select.selected = false;
					}
					if (select) {
						//若选中数量小于最大选中数量
						if (this.selectData.length < this.maxNum) {
							this.selectData.push(jsonData);
							this.index.push(index);
						} else {
							//若选中数量大于或最大选中数量
							TipsManage.showTips('选择数量达到上限')
						}
					} else {
						//取消选中，删除装备数组中相应信息
						let keys = Object.keys(this.selectData);
						for (let key of keys) {
							if (this.selectData[key].dwBaseID == jsonData.dwBaseID) {
								//删除
								this.selectData.splice(parseInt(key), 1);
								break;
							}
						}
						//删除装备索引数组中相应信息
						for (let shu in this.index) {
							if (this.index[shu] == index) {
								this.index.splice(parseInt(shu), 1);
							}
						}
					}
					//根据装备索引在list中查找病显示选中||非选择状态
					for (let num of this.index) {
						for (let child in this.list_item.cells) {
							let allData = this.list_item.cells
							if (child == num) {
								allData[child].btn_select.selected = true;
								break;
							}
						}
					}
				}
			})
		}
		public onclose(): void {
			GameApp.LListener.offCaller(ProtoCmd.JS_updateBuildEquipItem, this);
			this.close();
		}
	}
}