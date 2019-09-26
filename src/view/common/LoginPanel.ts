/**Created by the LayaAirIDE*/
module view.common {
	export class LoginPanel extends ui.common.LoginPanelUI {
		constructor() {
			super();

			let h = 'name=historyZoneList&tradeId=1&account=1';
			let str = 'name=zoneList&tradeId=1&minId=1&maxId=100';
			GameApp.HttpManager.get(str, (res) => {
				console.log('get response=', res);
			});

			// GameApp.HttpManager.post('test text string', (res) => {
			// 	console.log('post text response=', res)
			// });

			// GameApp.HttpManager.postJson({ name: 'playerLogin', emil: 'email@email.com' }, (res) => {
			// 	console.log('post json response=', res);
			// 	let data = JSON.parse(res);
			// 	console.log(data);
			// });
		}

		public setData(): void {
			// 登陆组隐藏
			this.stack_login.selectedIndex = 0;
			let oldAccountName = Laya.LocalStorage.getItem('account');
			let oldPassworld = Laya.LocalStorage.getItem('password');
			if (oldAccountName) {
				this.input_account.text = oldAccountName;
			}
			if (oldPassworld) {
				this.input_password.text = oldPassworld;
			}
			this.addEvent();
		}

		public addEvent() {
			this.btn_Login.once(Laya.UIEvent.CLICK, this, this.loginGame);
			this.btn_notice.on(Laya.UIEvent.CLICK, this, () => { PanelManage.openServerNoticePanel() });
		}


		public loginGame(): void {
			if (this.input_account.text == '') {
				TipsManage.showTips('账号不能为空');
				this.btn_Login.once(Laya.UIEvent.CLICK, this, this.loginGame);
				return
			}
			if (this.input_password.text == '') {
				TipsManage.showTips('密码不能为空');
				this.btn_Login.once(Laya.UIEvent.CLICK, this, this.loginGame);
				return
			}
			Laya.LocalStorage.setItem('account', this.input_account.text);
			Laya.LocalStorage.setItem('password', this.input_password.text);
			PanelManage.openChooseServerPanel();
		}
	}
}
