/**Created by the LayaAirIDE*/
module view.common {
	export class LoginPanel extends ui.common.LoginPanelUI {
		constructor() {
			super();
			// this.btn_Login.on(Laya.UIEvent.CLICK, this, this.loginGame);
			// this.btn_selectServer.on(Laya.UIEvent.CLICK, this, this.openPanel, [0]);
			// this.btn_startGame.on(Laya.UIEvent.CLICK, this, this.startGame);
			this.btn_randomName.on(Laya.UIEvent.CLICK, this, this.randomName);
			this.btn_notice.on(Laya.UIEvent.CLICK, this, this.openPanel, [1]);
		}

		public setData(): void {
			// 登陆组隐藏
			this.box_start.visible = false;
			this.box_fail.visible = false;
			let oldAccountName = Laya.LocalStorage.getItem('account');
			let oldPassworld = Laya.LocalStorage.getItem('passworld');
			if (oldAccountName) {
				this.input_account.text = oldAccountName;
			}
			if (oldPassworld) {
				this.input_passworld.text = oldPassworld;
			}
		}

		private openPanel(d): void {
			// 服务器列表界面
			if (d === 0) {
				PanelManage.openServerListPanel()
			}
			// 服务器公告界面
			else if (d === 1) {
				PanelManage.openServerNoticePanel()
			}
		}

		public curServer;//当前选择的服务器
		public curAvatar;//当前选择的角色

		// 随机角色姓名
		private randomName(): void {
			this.input_random.text = RandomUtils.randomName(8);
		}

	}
}