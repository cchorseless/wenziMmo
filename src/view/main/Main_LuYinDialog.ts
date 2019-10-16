/**Created by the LayaAirIDE*/
module view.main {
	export class Main_LuYinDialog extends ui.main.Main_LuYinDialogUI {
		public tempData;
		constructor() {
			super();
			this.tempData = GameApp.GameEngine["luyinData" + [GameApp.GameEngine.luyinTabID]];
			let aa:boolean = this.tempData.open;
			this.tab_luyin.visible = this.tempData.open;
			this.setData();
		}
		public setData(): void {
			this.tab_luyin.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstak_luyin.selectedIndex = index;
			}, null, false);
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			this.tab_luyin.on(Laya.UIEvent.CLICK, this, () => {
				this.tab_luyin.selectedIndex;
				GameApp.GameEngine.luyinTabID = this.tab_luyin.selectedIndex + 1;
				this.getNewLuYinData();
				this.upDataView();
			})
		}
		//点击后根据tab的selectedIndex重新获取路引的数据
		public getNewLuYinData() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.openChuangSongRecord, [GameApp.GameEngine.luyinTabID], 0, this,
				(data) => {
					GameApp.GameEngine["luyinData" + [GameApp.GameEngine.luyinTabID]] = data
				});
			lcp.send(pkt);
		}
		public upDataView(){
			if(this.tempData.open){
				console.log("|||||||",this.tempData.open)
			}
			else{
				TipsManage.showTips('升级VIP获取');
			}
		}
	}
}