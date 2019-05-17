/**Created by the LayaAirIDE*/
module view.common {
	export class StartLoadingPanel extends ui.common.StartLoadingPanelUI {
		constructor() {
			super();
			this.mouseEnabled = true;
		}

		public gameInit(): void {
			// 加载完成
			let complete = () => {
				PanelManage.openLoginPanel();			

			}
			// 加载进度
			let progress = (data) => {
				this.lbl_progress.text = '' + data * 100 + '%'
			}
			// 加载错误
			let errorFunc = () => {

			}
			// 加载通用的界面素材
			ResManage.loadResource(ResData.PanelRes.Common, complete, progress, errorFunc)

		}

	}
}