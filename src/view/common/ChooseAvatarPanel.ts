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
			let szName = playerInfo.getValue('szName');
			let nlevel = playerInfo.getValue('nlevel');// 等级
			let zslevel = playerInfo.getValue('zslevel');// 转生等级
			let viplvl = playerInfo.getValue('viplvl');// VIP等级
			GameApp.MainPlayer.objName = szName;
			GameApp.MainPlayer.level = nlevel;
			GameApp.MainPlayer.zslevel = zslevel;
			GameApp.MainPlayer.viplvl = viplvl;
			console.log('-----viplvl----', viplvl);
			GameApp.MainPlayer.sex = playerInfo.feature.getValue('sex');
			GameApp.MainPlayer.job = playerInfo.feature.getValue('job');
			// PanelManage.Main.ui_battleSkill.init_skillView();
			// 角色图片
			this.img_heroPic.skin = LangConfig.getPlayerAvatarHalfSkin();
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

			EventManage.onWithEffect(this.btn_notice, Laya.UIEvent.CLICK, this, () => {
				new view.common.ServerNoticeDialog().setData().show(true);
			});

			EventManage.onWithEffect(this.btn_startGame, Laya.UIEvent.CLICK, this, () => {
				PanelManage.ChooseServer.startGame();
			});
		}

		/**
  		* 开始游戏
  		*/
		public startGame(): void {
			let selector: ProtoCmd.SelectPlayer = new ProtoCmd.SelectPlayer();
			selector.setValue("nselectidx", 0);
			selector.setValue("szName", GameApp.MainPlayer.objName);
			selector.setValue("btmapsubline", 1);
			lcp.send(selector, this, PanelManage.Login.selectPlayerRet);
			GameApp.GameEngine.isLogin = true;
			PanelManage.ChooseServer.startGame();
		}
	}
}