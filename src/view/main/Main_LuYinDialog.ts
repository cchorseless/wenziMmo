/**Created by the LayaAirIDE*/
module view.main {
	export class Main_LuYinDialog extends ui.main.Main_LuYinDialogUI {
		public tempData;
		public touchID = 0;
		public isDelete = false;
		public deleteTabID = null;
		public deleteStr = "";
		constructor() {
			super();
			this.tempData = GameApp.GameEngine["luyinData" + [GameApp.GameEngine.luyinTabID]];
			this.setData();
			this.addEvent();
		}
		public setData(): void {

			this.upDataView()
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.dialogClose();
			})
			this.tab_luyin.on(Laya.UIEvent.CLICK, this, () => {
				this.tab_luyin.selectedIndex;
				GameApp.GameEngine.luyinTabID = this.tab_luyin.selectedIndex + 1;

				this.getNewLuYinData();
				if (this.deleteStr != "" && this.deleteTabID) {
					this.deleteData();
				}
			})
			for (let i = 1; i < 10; i++) {
				this["btn_add" + i].on(Laya.UIEvent.CLICK, this, () => {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.addChuangSongRecord, [GameApp.GameEngine.luyinTabID, i])
					lcp.send(pkt);
					this.getNewLuYinData();
				})
			}
			for (let i = 1; i < 10; i++) {
				this["btn_delete" + i].on(Laya.UIEvent.CLICK, this, () => {

					let o = new view.main.Main_ConfirmDelete();
					let p = Laya.Handler.create(this, () => {
						this.deleteTabID = GameApp.GameEngine.luyinTabID;
						this["btn_delete" + i].visible = false;
						this.changeLuYinState(i, false, null);
						if (this.deleteStr == "") {
							this.deleteStr = i.toString();
						}
						else {
							this.deleteStr += "+" + i;
						}
					})
					o.setData(p);
					o.show();
				})
			}
			EventManage.onWithEffect(this.btn_add, Laya.UIEvent.CLICK, this, () => {
				for (let i = 1; i < 10; i++) {
					if (this["box_guide" + i].visible == false) {
						let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.addChuangSongRecord, [GameApp.GameEngine.luyinTabID, i])
						lcp.send(pkt);
						this.getNewLuYinData();
						break;
					}
				}
			});
			EventManage.onWithEffect(this.btn_delete, Laya.UIEvent.CLICK, this, () => {
				this.isDelete = !this.isDelete;
				this.onShowDelete(this.isDelete);
			});


		}
		public async dialogClose() {
			await this.deleteData();
			this.close();
		}

		public onShowDelete(boo: boolean) {
			for (let i = 1; i < 10; i++) {
				if (this["box_guide" + i].visible == true) {
					this["btn_delete" + i].visible = this.isDelete;
				}
			}
		}
		//点击后根据tab的selectedIndex重新获取路引的数据   切tab
		public getNewLuYinData() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.openChuangSongRecord, [GameApp.GameEngine.luyinTabID], 0, this,
				(data) => {
					GameApp.GameEngine["luyinData" + [GameApp.GameEngine.luyinTabID]] = data;
					this.tempData = GameApp.GameEngine["luyinData" + [GameApp.GameEngine.luyinTabID]]
					this.upDataView();
					this.onShowDelete(this.isDelete)

				});
			lcp.send(pkt);
		}
		//删除  路引数据并发送到服务器
		public deleteData() {

			let pk = new ProtoCmd.QuestClientData().setString(ProtoCmd.delChuangSongRecord, [this.deleteTabID, this.deleteStr])
			lcp.send(pk);
			this.deleteStr = "";
			this.getNewLuYinData();
		}
		//刷新界面
		public upDataView() {
			if (this.tempData.open) {
				this.touchID = this.tab_luyin.selectedIndex;
				//充值显示的9个Item状态 为初始状态
				for (let i = 1; i < 10; i++) {
					this["btn_delete" + i].visible = false;
					this.changeLuYinState(i, false, null)
				}
				//根据数据重新设置
				this.onShowView();
			}
			else {
				this.tab_luyin.selectedIndex = this.touchID
				TipsManage.showTips('升级VIP获取');
			}
		}
		//根据服务器给的数据改变当前路引Item的显示状态和显示信息   单个数据
		public changeLuYinState(id: number, state: boolean, data) {
			this["box_guide" + id].visible = state;
			this["btn_add" + id].visible = !state;
			if (data) {
				let str = SheetConfig.mapRoomSheet.getInstance(null).MAPNAME(data) + "-" + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME(data);
				this["lab_locationName" + id].text = str;
			}
		}
		//根据数据显示相应的结果
		public onShowView() {
			let baseData = this.tempData.datatab
			for (let i in baseData) {
				this.changeLuYinState(baseData[i].idx, true, baseData[i].roomID)
			}
		}
	}
}