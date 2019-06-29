/**Created by the LayaAirIDE*/
module view.common {
	export class LoginPanel extends ui.common.LoginPanelUI {
		constructor() {
			super();
			this.btn_Login.once(Laya.UIEvent.CLICK, this, this.loginGame);
			// this.btn_selectServer.on(Laya.UIEvent.CLICK, this, this.openPanel, [0]);
			this.btn_startGame.on(Laya.UIEvent.CLICK, this, this.startGame);
			this.btn_notice.on(Laya.UIEvent.CLICK, this, this.openPanel, [1]);
			// 监听正式进入游戏
			GameApp.LListener.on(LcpEvent.GAME_INIT_FINISH, this, this.realLoginGame)
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

		public loginGame(): void {
			if (!this.input_account.text) {
				TipsManage.showTips('账号不能为空');
				return
			}
			if (!this.input_password.text) {
				TipsManage.showTips('密码不能为空');
				return
			}
			// 初始化客户端
			GameApp.GameEngine.init(Laya.Handler.create(this, () => {
				// 账号
				GameApp.MainPlayer.playerAccount = this.input_account.text + '@1001';
				// 密码
				GameApp.MainPlayer.playerPassword = this.input_password.text;
				// 登陆前验证
				if (GameApp.Socket.isConnecting) {
					lcp.send(new ProtoCmd.UserPreLogin(), this, this.userRetPreLogin);
				}
				else {
					GameApp.Socket.connect();
					this.btn_Login.once(Laya.UIEvent.CLICK, this, this.loginGame);
				}
			}))
		}

		/**
		* 
		* @param data 登陆验证成功
		*/
		public userRetPreLogin(data: any): void {
			let msgData: ProtoCmd.UserRetPreLogin = new ProtoCmd.UserRetPreLogin(data);
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
			//var cyptoPasswd:Laya.Byte = FunctionUtils.passwdCypto("1", msgData.getValue('passkey'));
			//login.setValue('szPassMd5', new Laya.Byte(1));
			login.setValue('dwPassCrc32', crc32);
			login.setValue('isSaveEncodePass', false);
			login.setValue('szADUrl', "1");
			login.setValue('szMac', "1");
			lcp.send(login, this, this.userRetPreLoginRet)
			msgData.clear();
			////GameApp.MainPanel.addSysChat("您正在用账号:" + GameApp.MainPlayer.playerAccount + '登录1区')
		}
		private userLoginInfo: ProtoCmd.UserLoginRet;//角色信息
		/**
		 * 登陆回调
		 * @param data 
		 */
		public userRetPreLoginRet(data: any): void {
			this.userLoginInfo = new ProtoCmd.UserLoginRet(data);
			if (this.userLoginInfo.getValue("nErrorCode") == 0) {
				GameApp.GameEngine.zoneid = this.userLoginInfo.getValue('nSvrZoneid');
				GameApp.GameEngine.svrIndex = this.userLoginInfo.getValue("nSvrIndex");
				GameApp.GameEngine.loginsvrIdType = this.userLoginInfo.getValue('loginsvr_id_type');
				// 判断是否有角色
				if (this.userLoginInfo.count > 0) {
					let playerInfo = this.userLoginInfo.players[0];
					let sex = this.userLoginInfo.players[0].feature.getValue('sex');
					let job = this.userLoginInfo.players[0].feature.getValue('job');
					let szName = playerInfo.getValue('szName');
					let nlevel = playerInfo.getValue('nlevel');
					let path;
					if (sex == EnumData.SEX_TYPE.SEX_MAN) {
						path = 'image/common/icon_nan';
					}
					else {
						path = 'image/common/icon_nv';
					}
					GameApp.MainPlayer.sex = sex;
					GameApp.MainPlayer.job = job;
					GameApp.MainPlayer.playerName = szName;
					GameApp.MainPlayer.avatarIcon = path + '0' + job + '.png';
					GameApp.MainPlayer.level = nlevel;
					this.img_avatarIcon.skin = GameApp.MainPlayer.avatarIcon;
					this.lbl_avatarDes.text = nlevel + '-' + GameApp.MainPlayer.realName;
					this.stack_login.selectedIndex = 1;
				}
				else {
					this.userLoginInfo.clear();
					// 创建角色
					PanelManage.openCreateAvatarPanel();
				}
			}
			else {
				this.userLoginInfo.clear();
				TipsManage.showTips('账号密码错误');
				this.btn_Login.once(Laya.UIEvent.CLICK, this, this.loginGame);
				Log.trace('请输入正确的账号密码 errorcode' + this.userLoginInfo.getValue("nErrorCode"));
			}
		}
		/**
		 * 开始游戏
		 */
		public startGame(): void {
			let selector: ProtoCmd.SelectPlayer = new ProtoCmd.SelectPlayer();
			selector.setValue("nselectidx", 0);
			selector.setValue("szName", this.userLoginInfo.players[0].getValue('szName'));
			selector.setValue("btmapsubline", 1);
			lcp.send(selector, this, this.selectPlayerRet);
			Log.trace("您选择了昵称:" + this.userLoginInfo.players[0].getValue('szName'));
			GameApp.GameEngine.isLogin = true;
			this.userLoginInfo.clear();
		}
		/**
		 * 选择角色回调，返回服务器分配的端口，需要重联
		 * @param data 
		 */
		public selectPlayerRet(data: any): void {
			let msgData: ProtoCmd.SelectPlayerRet = new ProtoCmd.SelectPlayerRet(data);
			if (msgData.getValue('nErrorCode') == 0) {
				GameApp.GameEngine.gamesvrIdType = msgData.getValue('gamesvr_id_type');
				GameApp.MainPlayer.userOnlyid = msgData.getValue('dwUserOnlyId');
				GameApp.MainPlayer.playerName = msgData.getValue('szName');
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
			Laya.LocalStorage.setItem('account', this.input_account.text);
			Laya.LocalStorage.setItem('password', this.input_password.text);
			PanelManage.openMainPanel();
		}
	}
}
