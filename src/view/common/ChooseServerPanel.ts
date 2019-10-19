/**Created by the LayaAirIDE*/
module view.common {
	export class ChooseServerPanel extends ui.common.ChooseServerPanelUI {
		constructor() {
			super();
		}
		public setData(): ChooseServerPanel {
			this.lbl_versionInfo.text = '版本:' + GameApp.GameEngine.version;
			this.lbl_playerName.text = Laya.LocalStorage.getItem('account');
			
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			// 公告
			EventManage.onWithEffect(this.btn_notice, Laya.UIEvent.CLICK, this, () => {
				new view.common.ServerNoticeDialog().setData().show(true);
			});

			//打开服务器列表
			EventManage.onWithEffect(this.btn_changeServer, Laya.UIEvent.CLICK, this, () => {
				new view.dialog.ServerListDialog().setData(this.lbl_playerName.text).popup()
			});

			// 切换账号
			EventManage.onWithEffect(this.lbl_changeAccount, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.Dispose(this);
			});

			// 開始游戲
			EventManage.onWithEffect(this.btn_startGame, Laya.UIEvent.CLICK, this, () => {
				// 初始化客户端
				GameApp.GameEngine.init(Laya.Handler.create(this, () => {
					if (GameApp.GameEngine.isReady != true) {
						// 账号
						GameApp.MainPlayer.playerAccount = Laya.LocalStorage.getItem('account') + '@' + GameApp.GameEngine.zoneid;
					}
					// 登陆前验证
					if (GameApp.Socket.isConnecting) {
						lcp.send(ProtoCmd.UserPreLogin.create(), this, this.userRetPreLogin);
					}
					else {
						GameApp.Socket.connect();
					}
				}, null, false))
			});
		}


		/**
		* 
		* @param data 登陆验证成功
		*/
		public userRetPreLogin(data: any): void {
			let msgData: ProtoCmd.UserRetPreLogin = new ProtoCmd.UserRetPreLogin(data);
			// let msgData = ProtoCmd.UserRetPreLogin.create(data);
			// 成功连接至服务器
			let login = new ProtoCmd.NormalUserLogin();
			login.setValue('queryhistory', 0);
			login.setValue('tokenlogin', 0);
			login.setValue('force_login', 1);
			login.setValue('ip_type', 255);
			login.setValue('fclientver', 0);
			login.setValue('szAccount', GameApp.MainPlayer.playerAccount);
			login.setValue('szAccountDis', 1);
			login.setValue("dwZoneid", GameApp.GameEngine.zoneid);
			login.setValue("dwTrueZoneid", GameApp.GameEngine.trueZoneid);
			let crc32: number = FunctionUtils.passwordCrc32(Laya.LocalStorage.getItem('password'));
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
				}
				else {
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
				// this.btn_Login.once(Laya.UIEvent.CLICK, this, this.loginGame);
				Log.trace('请输入正确的账号密码 errorcode' + userLoginInfo.getValue("nErrorCode"));
			}
		}
		/**
		 * 开始游戏
		 */
		public startGame(): void {
			let selector: ProtoCmd.SelectPlayer = new ProtoCmd.SelectPlayer();
			selector.setValue("nselectidx", 0);
			selector.setValue("szName", GameApp.MainPlayer.objName);
			selector.setValue("btmapsubline", 1);
			lcp.send(selector, this, this.selectPlayerRet);
			GameApp.GameEngine.isLogin = true;
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
	}
}