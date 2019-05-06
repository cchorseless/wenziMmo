/**Created by the LayaAirIDE*/
module view.common {
	export class LoginPanel extends ui.common.LoginPanelUI {
		constructor() {
			super();
			Laya.Font.defaultFont = 'mini';
			this.btn_Login.on(Laya.UIEvent.CLICK, this, this.loginGame.bind(this));
			this.btn_selectServer.on(Laya.UIEvent.CLICK, this, this.openPanel.bind(this));
			this.btn_startGame.on(Laya.UIEvent.CLICK, this, this.startGame.bind(this));
			this.btn_randomName.on(Laya.UIEvent.CLICK, this, this.randomName.bind(this));
			// 监听服务器更新列表事件
			lcp.LListener.getInstance().on(LcpEvent.SERVER_LIST_FINISH, this, this.initUI.bind(this))
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

		private openPanel(): void {
			PanelManage.openServerListPanel()
		}

		public curServer;//当前选择的服务器
		public curAvatar;//当前选择的角色
		// 更新服务器列表
		private initUI(data): void {
			// 更新成功
			if (data) {
				this.box_login.visible = false;
				this.box_start.visible = true;
				// 将账号密码存到本地缓存
				Laya.LocalStorage.setItem('account', this.input_account.text);
				Laya.LocalStorage.setItem('passworld', this.input_passworld.text);
				// 选角创角，默认为上一次选择的角色
				let _avatarInfo = GlobalData.AppServerInfo.avatarInfo;
				let _serverInfo = GlobalData.AppServerInfo.serverInfo;
				if (GlobalData.account.lastSelAvatar) {
					console.log(GlobalData.account.lastSelAvatar);
					this.curAvatar = _avatarInfo.filter((item) => { return item.avatarDbid == GlobalData.account.lastSelAvatar })[0];
					this.curServer = _serverInfo.filter((item) => { return item.appServerDbid == this.curAvatar.appServerDbid })[0];
				}
				else {
					this.curServer = _serverInfo[_serverInfo.length - 1];
				}
				// 显示数据
				this.UpdateUI();
			}
			// 更新失败
			else {
				this.box_login.visible = false;
				this.box_fail.visible = true;
			}
		}
		// 刷新界面
		private UpdateUI(): void {
			this.lbl_server.text = '' + this.curServer.appServerDbid + '-' + this.curServer.appServerName;
			if (this.curAvatar) {
				this.box_randomName.visible = false;
				this.lbl_avatarDes.visible = true;
				this.lbl_avatarDes.text = 'LV.' + this.curAvatar.avatarLevel + '-' + this.curAvatar.avatarName;
			}
			else {
				this.lbl_avatarDes.visible = false;
				this.box_randomName.visible = true;
			}
		}
		// 更新当前选择的服务器
		public updateCurServer(Dbid): void {
			this.curServer = GlobalData.AppServerInfo.serverInfo.filter((item) => { return item.appServerDbid == Dbid })[0];
			this.curAvatar = GlobalData.AppServerInfo.avatarInfo.filter((item) => { return item.appServerDbid == Dbid })[0];
			// 刷新界面
			this.UpdateUI();

		}
		// 随机角色姓名
		private randomName(): void {
			this.input_random.text = RandomUtils.randomName(8);
		}
		// 输入的账号登陆游戏
		private loginGame(): void {
			console.log(this.input_account.text, this.input_passworld.text);
			if (this.input_account.text != '账号' && this.input_passworld.text != 'nnnnnnn') {
				// 登陆时附带平台数据
				let data = { platform: GlobalData.platform }
				lcp.send(Protocol.ReqLogin, [this.input_account.text, this.input_passworld.text, JSON.stringify(data)])
				console.log('正在登陆');
			}
			else {
				TipsManage.showTips('请输入账号密码')
			}

		}
		// 登陆成功后进入游戏
		private startGame(): void {
			// 登陆appServer
			let _appServerDbid = this.curServer.appServerDbid;
			let _avatarName;
			let _avatarDbid;
			let _roleType;
			if (this.curAvatar) {
				_avatarName = this.curAvatar.avatarName;
				_avatarDbid = this.curAvatar.avatarDbid;
				_roleType = this.curAvatar.avatarRoleType;
			}
			else {
				_avatarName = this.input_random.text;
				_avatarDbid = 1;
				_roleType = 1;
			}
			console.log(this.curAvatar, '11111111111111111111111')
			// let _avatarDbid;单服多角色备用
			// let _roleType;多职业备用
			if (!_appServerDbid) {
				TipsManage.showTips('未选择服务器')
				return
			}
			if (!_avatarName) {
				TipsManage.showTips('请输入角色名称')
				return
			}
			console.log('正在初始化角色--------------------')
			lcp.send(Protocol.LoginAppServer,
				[{ appServerDbid: _appServerDbid, avatarName: _avatarName, roleType: _roleType, avatarDbid: _avatarDbid }],
				this.LoginAppServerCB.bind(this));
		}
		/**
 		* 登陆到小游戏服务器回调
 		* @param msg 
 		*/
		private LoginAppServerCB(msg): void {
			// 创建角色完成，开始更新avatar属性
			let code = msg.code;
			let data = JSON.parse(msg.data);
			if (code == 0) {
				console.log('创建角色成功，更新角色属性');
			}
			else {
				console.log('创建角色失败，无法进入游戏');
				lcp.LListener.getInstance().event(new lcp.LEvent(LcpEvent.GAME_INIT_FINISH, false));
			}
		}
	}
}