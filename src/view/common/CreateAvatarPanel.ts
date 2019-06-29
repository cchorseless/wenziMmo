/**Created by the LayaAirIDE*/
module view.common {
	export class CreateAvatarPanel extends ui.common.CreateAvatarPanelUI {
		constructor() {
			super();

		}
		public setData(): void {
			this.addEvent();
			this.rad_job.selectHandler = this.rad_sex.selectHandler = Laya.Handler.create(this, () => {
				let path = this.rad_sex.selectedIndex == 0 ? 'image/common/nan' : 'image/common/nv';
				this.img_hero.skin = path + '0' + (this.rad_job.selectedIndex + 1) + '.png'
			}, null, false);
			this.rad_job.selectHandler.run();
		}
		public addEvent(): void {
			this.btn_randomName.on(Laya.UIEvent.CLICK, this, this.randomName);
			this.btn_startGame.on(Laya.UIEvent.CLICK, this, this.startGame);
		}
		// 随机角色姓名
		private randomName(): void {
			this.input_random.text = RandomUtils.randomName(8);
		}

		private startGame(): void {
			if (!this.input_random.text) {
				TipsManage.showTips('请输入昵称')
				return
			}
			// 角色名称
			GameApp.GameEngine.mainPlayer.playerName = this.input_random.text + '@1001';
			// 性别
			GameApp.GameEngine.mainPlayer.sex = this.rad_sex.selectedIndex + 1;
			// 职业
			GameApp.GameEngine.mainPlayer.job = this.rad_job.selectedIndex + 1;
			// 玩家头像
			let path;
			if (GameApp.GameEngine.mainPlayer.sex == EnumData.SEX_TYPE.SEX_MAN) {
				path = 'image/common/icon_nan';
			}
			else {
				path = 'image/common/icon_nv';
			}
			GameApp.GameEngine.mainPlayer.avatarIcon = path + '0' + GameApp.GameEngine.mainPlayer.job + '.png';
			let createusr = new ProtoCmd.CreatePlayer();
			createusr.setValue('szAccount', GameApp.GameEngine.mainPlayer.playerAccount);
			createusr.setValue('countryId', 1);
			createusr.playerinfo.setValue('szName', GameApp.GameEngine.mainPlayer.playerName);
			createusr.playerinfo.feature.setValue('sex', GameApp.GameEngine.mainPlayer.sex);
			createusr.playerinfo.feature.setValue('job', GameApp.GameEngine.mainPlayer.job);
			// 创角协议
			lcp.send(createusr, this, this.createPlayerRet);
		}

		/**
  		* 创角协议回调
  		* @param data 
  		*/
		public createPlayerRet(data: any): void {
			let msg = new ProtoCmd.CreatePlayerRet(data);
			let errorcode = msg.getValue('errorcode');
			if (errorcode == 0) {
				// 单服单角色，这里可以扩展
				let selector: ProtoCmd.SelectPlayer = new ProtoCmd.SelectPlayer();
				selector.setValue("nselectidx", 0);
				selector.setValue("szName", msg.getValue('szPlayerName'));
				selector.setValue("btmapsubline", 1);
				lcp.send(selector, this, PanelManage.Login.selectPlayerRet)
				GameApp.GameEngine.isLogin = true;
			}
			else {
				let strmsg: string;
				switch (errorcode) {
					case -10:
						strmsg = '有非法字符';
						break;
					case -14:
						strmsg = '昵称名检查没通过';
						break;
					case -15:
						strmsg = '昵称名不能超过4个以上的数字';
						break;
					case -16:
						strmsg = '当前服务器正在维护';
						break;
					case -70:
						strmsg = '昵称重复';
						break;
					default:
						strmsg = '昵称重复';
				}
				TipsManage.showTips(strmsg);
			}
			msg.clear();
			msg = null;
		}
	}
}