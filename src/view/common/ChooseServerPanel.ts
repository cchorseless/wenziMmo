/**Created by the LayaAirIDE*/
module view.common {
	export class ChooseServerPanel extends ui.common.ChooseServerPanelUI {
		constructor() {
			super();
			this.setData();
		}
		public index = null;
		public setData(): ChooseServerPanel {
			this.box_view.bottom = (PanelManage.euiLayer.displayHeight - 1136) / 2;
			this.lbl_versionInfo.text = '版本:' + GameApp.GameEngine.version;
			this.lbl_playerName.text = Laya.LocalStorage.getItem('account');
			this.init_selectServer();
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
				if (this.index != null) {
					new view.dialog.ServerListDialog().setData(this.lbl_playerName.text, this.index).popup();
				} else {
					new view.dialog.ServerListDialog().setData(this.lbl_playerName.text).popup();
				}
			});

			// 切换账号
			EventManage.onWithEffect(this.lbl_changeAccount, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.Dispose(this);
			});

			// 開始游戲
			this.btn_startGame.on(Laya.UIEvent.CLICK, this, () => {
				console.warn('登陆中------------------')
				// 初始化客户端
				GameApp.GameEngine.init(Laya.Handler.create(this, () => {
					if (GameApp.GameEngine.isReady != true) {
						// 账号
						GameApp.MainPlayer.playerAccount = Laya.LocalStorage.getItem('account') + '@' + GameApp.GameEngine.zoneid;
					}
					// 登陆前验证
					if (GameApp.Socket.isConnecting) {
						lcp.send(new ProtoCmd.UserPreLogin(), this, this.userRetPreLogin);
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
		public init_selectServer(): void {
			let historyServer = null;
			//拉取近期登陆服务器
			let h = 'name=historyZoneList&tradeId=1&account=' + this.lbl_playerName.text;
			GameApp.HttpManager.get(h, (res) => {
				let resData = JSON.parse(res);
				//查找最近登陆过的服务器
				let trueZoneId = resData.order[0].trueZoneId;
				if (trueZoneId != undefined) {
					for (let list of resData.list) {
						let ListTrueZoneId = list.trueZoneId;
						if (trueZoneId == ListTrueZoneId) {
							//最近登陆的服务器
							historyServer = list;
						}
					}
				}
				// 无历史记录
				if (historyServer == null) {
					let labelNum;
					let info = 'name=zoneCount';
					//拉取服务器数量
					GameApp.HttpManager.get(info, (res) => {
						let resData = JSON.parse(res);
						//服务器数量
						let length = resData[0].count;
						//服务器索引
						this.index = labelNum = Math.floor(length / 100);
						if (length > 0) {
							let str0 = 'name=zoneList&minId=0&maxId=100';
							let str1 = 'name=zoneList&tradeId=1&minId=101&maxId=200';
							let str2 = 'name=zoneList&tradeId=1&minId=201&maxId=300';
							let str3 = 'name=zoneList&tradeId=1&minId=301&maxId=400';
							let str4 = 'name=zoneList&tradeId=1&minId=401&maxId=500';
							let str5 = 'name=zoneList&tradeId=1&minId=501&maxId=600';
							let serverArray = [str0, str1, str2, str3, str4, str5];
							GameApp.HttpManager.get(serverArray[labelNum], (res) => {
								let resData = JSON.parse(res);
								let keys = Object.keys(resData.list);
								let i = keys.length - 1;
								historyServer = resData.list[i];
							});
						}
					});
				}
				if (historyServer != null) {
					GameApp.GameEngine.connectIP = '' + historyServer.url;
					GameApp.GameEngine.connectPort = '' + historyServer.port;
					GameApp.GameEngine.zoneid = historyServer.zoneId;
					GameApp.GameEngine.trueZoneid = historyServer.trueZoneId;
					GameApp.GameEngine.tradeid = historyServer.tradeId
					this.lbl_serverName.text = historyServer.zoneName || 'error';
				}
			});
		}
	}
}