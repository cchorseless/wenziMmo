/**Created by the LayaAirIDE*/
module view.main {
	export class Main_LuYinDialog extends ui.main.Main_LuYinDialogUI {

		constructor() {
			super();
		}

		public luyinData: ProtoCmd.itf_Main_openChuangSongRecord;

		public setData(): Main_LuYinDialog {
			// 拉取数据
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.openChuangSongRecord, null, 0, this,
				(data: ProtoCmd.itf_Main_openChuangSongRecord) => {
					this.luyinData = data;
					let s = "";
					for (let i = 1; this.luyinData.recordtab[i]; i++) {
						// 标签
						let needVip = this.luyinData.recordtab[i].viplvl;
						// 解锁
						if (GameApp.MainPlayer.viplvl >= needVip) {
							s += "存档" + i + ',';
							let new_list = new Laya.List();
							new_list.itemRender = view.main.LuYin_PlaceItem;
							new_list.repeatX = 3;
							new_list.spaceX = 10;
							new_list.repeatY = 3;
							new_list.spaceY = 10;
							new_list.centerY = new_list.centerX = 0;
							this.vstak_luyin.addItem(new_list);
							this.updateList(i);
						}
						else {
							s += "VIP" + needVip + "解锁,";
						}
					}
					this.vstak_luyin.selectedIndex = 0;
					s = s.slice(0, s.length - 1);
					// tab
					this.tab_luyin.labels = s;
					this.tab_luyin.selectHandler = Laya.Handler.create(this, (index) => {
						// 判定有无解锁
						if (this.checkIsLock(index + 1)) {
							this.vstak_luyin.selectedIndex = index;
						}
						else {
							TipsManage.showTips('Vip等级不足，无法解锁');
							this.tab_luyin.selectedIndex = 0;
						}
					}, null, false);
					this.addEvent();
				});
			lcp.send(pkt);

			return this
		}

		/**
		 * 更新列表数据
		 */
		public updateList(tabID): void {
			let new_list = this.vstak_luyin.getChildAt(tabID - 1) as Laya.List;
			new_list.array = [];
			// 本页的数据
			let _tabdata = this.luyinData.datatab[tabID];
			for (let index = 1; index < 10; index++) {
				if (_tabdata[index]) {
					new_list.array.push(_tabdata[index]);
				}
				else {
					new_list.array.push({ idx: index });
				}
			}
			new_list.renderHandler = Laya.Handler.create(this, (CELL: view.main.LuYin_PlaceItem, index) => {
				CELL.setData(CELL.dataSource, tabID)
			}, null, false);
			new_list.refresh();

		}

		/**
		 * 判断是否解锁
		 * @param tabID 
		 */
		public checkIsLock(tabID): boolean {
			if (this.luyinData) {
				// 标签
				let needVip = this.luyinData.recordtab[tabID].viplvl;
				return GameApp.MainPlayer.viplvl >= needVip
			}
			return
		}


		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})

			EventManage.onWithEffect(this.btn_delete, Laya.UIEvent.CLICK, this, () => {
				this.btn_delete.selected = !this.btn_delete.selected;
				if (this.btn_delete.selected) {
					this.btn_delete.label = "保  存";
				}
				else {
					this.btn_delete.label = "编  辑";
				}
				for (let _list of this.vstak_luyin._childs) {
					for (let _item of _list.cells) {
						_item.showDelete(this.btn_delete.selected);
					}
				}
			});
			this.addLcpEvent();
		}

		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.openChuangSongRecord, this, (jsonData) => {
				this.luyinData = jsonData;
				this.updateList(this.vstak_luyin.selectedIndex + 1)
			})
		}
		public onClosed(TYPE?) {
			GameApp.LListener.offCaller(ProtoCmd.openChuangSongRecord, this)
		}
	}
}