/**Created by the LayaAirIDE*/
module view.common {
	export class LoginPanel extends ui.common.LoginPanelUI {
		constructor() {
			super();

			let h = 'name=historyZoneList&tradeId=1&account=1';
			let str = 'name=zoneList&tradeId=1&minId=1&maxId=100';
			GameApp.HttpManager.get(str,(res) => {

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
			// 监听正式进入游戏
			GameApp.LListener.on(LcpEvent.GAME_INIT_FINISH, this, this.realLoginGame)
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
			// 初始化客户端
			GameApp.GameEngine.init(Laya.Handler.create(this, () => {
				if (GameApp.GameEngine.isReady != true) {
					// 账号
					GameApp.MainPlayer.playerAccount = this.input_account.text + '@1001';
					// 密码
					GameApp.MainPlayer.playerPassword = this.input_password.text;
				}


				// 登陆前验证
				if (GameApp.Socket.isConnecting) {
					lcp.send(ProtoCmd.UserPreLogin.create(), this, this.userRetPreLogin);
				}
				else {
					GameApp.Socket.connect();
					this.btn_Login.once(Laya.UIEvent.CLICK, this, this.loginGame);
				}
			}, null, false))
		}

		/**
		* 
		* @param data 登陆验证成功
		*/
		public userRetPreLogin(data: any): void {
			// let msgData: ProtoCmd.UserRetPreLogin = new ProtoCmd.UserRetPreLogin(data);
			let msgData = ProtoCmd.UserRetPreLogin.create(data);
			// 成功连接至服务器
			let login = new ProtoCmd.NormalUserLogin();
			login.setValue('queryhistory', 0);
			login.setValue('tokenlogin', 0);
			login.setValue('force_login', 1);
			login.setValue('ip_type', 255);
			login.setValue('fclientver', 0);
			login.setValue('szAccount', GameApp.MainPlayer.playerAccount);
			login.setValue('szAccountDis', 1);
			login.setValue("dwZoneid", 1001);
			login.setValue("dwTrueZoneid", 1);
			let crc32: number = FunctionUtils.passwordCrc32(GameApp.MainPlayer.playerPassword);
			login.setValue('dwPassCrc32', crc32);
			login.setValue('isSaveEncodePass', false);
			login.setValue('szADUrl', "1");
			login.setValue('szMac', "1");
			lcp.send(login, this, this.userRetPreLoginRet)
			msgData.clear();
		}
		/**
		 * 登陆回调
		 * @param data 
		 */
		public userRetPreLoginRet(data: any): void {
			let userLoginInfo = new ProtoCmd.UserLoginRet(data);
			if (userLoginInfo.getValue("nErrorCode") == 0) {
				GameApp.GameEngine.zoneid = userLoginInfo.getValue('nSvrZoneid');
				GameApp.GameEngine.svrIndex = userLoginInfo.getValue("nSvrIndex");
				GameApp.GameEngine.loginsvrIdType = userLoginInfo.getValue('loginsvr_id_type');
				// 是否是重连进来的
				if (GameApp.GameEngine.isReady == true) {
					this.startGame();
				} else {
					// 判断是否有角色
					if (userLoginInfo.count > 0) {
						// 选择角色
						PanelManage.openChooseAvatarPanel(userLoginInfo);
					}
					else {
						// 创建角色
						PanelManage.openCreateAvatarPanel();
					}
				}
			}
			else {
				TipsManage.showTips('账号密码错误');
				this.btn_Login.once(Laya.UIEvent.CLICK, this, this.loginGame);
				Log.trace('请输入正确的账号密码 errorcode' + userLoginInfo.getValue("nErrorCode"));
			}
		}

		/**
		 * 选择角色回调，返回服务器分配的端口，需要重联
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
		/**
		 * 正式进入游戏
		 */
		public realLoginGame(): void {
			if (GameApp.GameEngine.isReady != true) {
				Laya.LocalStorage.setItem('account', this.input_account.text);
				Laya.LocalStorage.setItem('password', this.input_password.text);
			}
			PanelManage.openMainPanel();
		}

		/**
		* 开始游戏
		*/
		public startGame(): void {
			let selector: ProtoCmd.SelectPlayer = new ProtoCmd.SelectPlayer();
			selector.setValue("nselectidx", 0);
			selector.setValue("szName", GameApp.MainPlayer.realName);
			selector.setValue("btmapsubline", 1);
			lcp.send(selector, this, this.selectPlayerRet);
			GameApp.GameEngine.isLogin = true;
		}

	}
}
