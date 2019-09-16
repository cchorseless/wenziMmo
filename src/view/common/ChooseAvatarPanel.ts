/**Created by the LayaAirIDE*/
module view.common {
	export class ChooseAvatarPanel extends ui.common.ChooseAvatarPanelUI {
		constructor() {
			super();
		}
		public userLoginInfo: ProtoCmd.UserLoginRet;//角色信息
		public setData(data: ProtoCmd.UserLoginRet): void {
			this.userLoginInfo = data;
			let playerInfo = data.players[0];
			let sex = playerInfo.feature.getValue('sex');
			let job = playerInfo.feature.getValue('job');
			let szName = playerInfo.getValue('szName');
			let nlevel = playerInfo.getValue('nlevel');// 等级
			let zslevel = playerInfo.getValue('zslevel');// 转生等级
			let viplvl = playerInfo.getValue('viplvl');// VIP等级
			GameApp.MainPlayer.objName = szName;
			GameApp.MainPlayer.level = nlevel;
			GameApp.MainPlayer.zslevel = zslevel;
			GameApp.MainPlayer.viplvl = viplvl;
			// 角色图片
			this.img_heroPic.skin = GameApp.MainPlayer.halfAvatarPic;
			// 角色名称
			this.lbl_playerName.text = szName;
			// 角色等级
			this.lbl_level1.text = '' + nlevel + '级';
			// 转生等级
			this.lbl_level0.text = '' + zslevel + '转';
			// VIP等级
			this.vip_level.value = '' + viplvl;

			this.addEvent();
		}

		public addEvent(): void {
			this.btn_notice.on(Laya.UIEvent.CLICK, this, () => { PanelManage.openServerNoticePanel() });
			this.btn_changeServer.on(Laya.UIEvent.CLICK, this, () => { PanelManage.openServerListPanel() });
			this.btn_startGame.on(Laya.UIEvent.CLICK, this, this.startGame);
		}

		/**
  		* 开始游戏
  		*/
		public startGame(): void {
			// let selector: ProtoCmd.SelectPlayer = new ProtoCmd.SelectPlayer();
			// selector.setValue("nselectidx", 0);
			// selector.setValue("szName", GameApp.MainPlayer.realName);
			// selector.setValue("btmapsubline", 1);
			// lcp.send(selector, this, PanelManage.Login.selectPlayerRet);
			// GameApp.GameEngine.isLogin = true;
			PanelManage.Login.startGame();
		}
	}
}