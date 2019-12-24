/**Created by the LayaAirIDE*/
module view.common {
	export class LoginPanel extends ui.common.LoginPanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.box_view.bottom = (PanelManage.euiLayer.displayHeight - 1136) / 2;
			this.lbl_versionInfo.text = '版本:' + GameApp.GameEngine.version;
			console.log(this.lbl_versionInfo.text);
			// 判断是否SDK登录
			if (GameApp.SDKManager.SDK) {
				this.stack_login.visible = false;
			}
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
			EventManage.onWithEffect(this.btn_Login, Laya.UIEvent.CLICK, this, this.loginGame);
			this.btn_text.on(Laya.UIEvent.CLICK, this, () => {
				TipsManage.showTxt('1111111111111');
			});
		}


		public loginGame(): void {
			if (this.input_account.text == '') {
				TipsManage.showTips('账号不能为空');
				return
			}
			if (this.input_password.text == '') {
				TipsManage.showTips('密码不能为空');
				return
			}
			Laya.LocalStorage.setItem('account', this.input_account.text);
			Laya.LocalStorage.setItem('password', this.input_password.text);
			PanelManage.openChooseServerPanel();

		}
		/**
  		 * 选择界面登录
  		 * @param data 
  		 */
		public selectPlayerRet(data: any): void {
			let msgData: ProtoCmd.SelectPlayerRet = new ProtoCmd.SelectPlayerRet(data);
			if (msgData.getValue('nErrorCode') == 0) {
				GameApp.GameEngine.gamesvrIdType = msgData.getValue('gamesvr_id_type');
				GameApp.MainPlayer.onlyId = msgData.getValue('dwUserOnlyId');
				GameApp.MainPlayer.objName = msgData.getValue('szName');
				// 这里重置一下socket,启用重连协议进入服务器
				GameApp.Socket.resetSocket(FunctionUtils.ipbytestoipstr(msgData.getValue('ip')), msgData.getValue('port'));
			} else {
				TipsManage.showTips("选择昵称失败：" + msgData.getValue('nErrorCode'))
			}
			msgData.clear();

		}
	}
}
