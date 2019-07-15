/**Created by the LayaAirIDE*/
module view.common {
	export class StartLoadingPanel extends ui.common.StartLoadingPanelUI {
		constructor() {
			super();
			this.mouseEnabled = true;
		}

		public gameInit(): void {
			// 加载错误
			let errorFunc = () => { };
			// 先加载通用的界面素材
			ResManage.loadResource(ResData.PanelRes.Common, () => { this.loadSheetJson() }, (data) => { this.lbl_progress.text = '加载通用资源过程中---' + data * 100 + '%' }, errorFunc)

		}
		private loadSheetJson(): void {
			ResManage.loadResource(ResData.JsonRes.AllClientData, () => {
				for (let jsonInfo of ResData.JsonRes.AllClientData) {
					// jsonInfo.CLASSTYPE.getInstance(Laya.Loader.getRes(jsonInfo.url));
				}
				PanelManage.openLoginPanel();
			}, (data) => { this.lbl_progress.text = '加载配置表过程中---' + data * 100 + '%' })

		}

	}
}