/**Created by the LayaAirIDE*/
module view.common {
	export class StartLoadingPanel extends ui.common.StartLoadingPanelUI {
		constructor() {
			super();
			this.mouseEnabled = true;
			lcp.LListener.getInstance().once(LcpEvent.GAME_INIT_FINISH, this, this.gameReady)
		}

		public gameInit(): void {
			// 加载完成
			let complete = () => {
				// 初始化KBE
				GameUtils.getInstance().initGame();			
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
		private gameReady(msg): void {
			if (msg) {
				// 打开主界面
				PanelManage.loadMainPanel();
			}
			else {
				console.log('登陆失败')
				TipsManage.showTips('游戏登陆失败，请重新登录')
			}
		}

	}
}