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
			ResManage.loadResource(ResData.PanelRes.Common, () => {
				Laya.SoundManager.playMusic('music/bg.mp3', 0)
				// 加载字体文件
				ResManage.loadTTF(ResData.TTFRes.AllTTFData, () => {
					// 加载配置表文件
					ResManage.loadJSON(ResData.JsonRes.AllClientData, () => {
						PanelManage.openMainPanel();
						PanelManage.openLoginPanel();
						
					},
						(data) => {
							this.lbl_progress.text = '加载配置表过程中';
							this.updatePregressPic(data);
						}, errorFunc)
				})
			}, (data) => {
				this.lbl_progress.text = '加载通用资源过程中';
				this.updatePregressPic(data);
			}, errorFunc)

		}
		public updatePregressPic(data): void {
			console.log(data);
			this.img_pregress.width = 550 * data;
		}
	}
}