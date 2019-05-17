/**Created by the LayaAirIDE*/
module view.common {
	export class CreateAvatarPanel extends ui.common.CreateAvatarPanelUI {
		constructor() {
			super();
			this.btn_randomName.on(Laya.UIEvent.CLICK, this, this.randomName);
		}
		public setData(): void {

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
			App.GameEngine.mainPlayer.playerName = this.input_random.text;
			// 性别
			App.GameEngine.mainPlayer.sex = 1;
			// 职业
			App.GameEngine.mainPlayer.job = 1;

			let createusr = new CreatePlayer();
			createusr.setValue('szAccount', App.GameEngine.mainPlayer.playerAccount);
			createusr.setValue('countryId', 1);
			createusr.playerinfo.setValue('szName', App.GameEngine.mainPlayer.playerName);
			createusr.playerinfo.feature.setValue('sex', App.GameEngine.mainPlayer.sex);
			createusr.playerinfo.feature.setValue('job', App.GameEngine.mainPlayer.job);
			// 创角协议
			lcp.send(createusr, this, this.createPlayerRet);
		}

		/**
  		* 创角协议回调
  		* @param data 
  		*/
		public createPlayerRet(data: any): void {
			let msg = new CreatePlayerRet(data);
			let errorcode = msg.getValue('errorcode');
			if (errorcode == 0) {
				let selector: SelectPlayer = new SelectPlayer();
				selector.setValue("nselectidx", 0);
				selector.setValue("szName", msg.getValue('szPlayerName'));
				selector.setValue("btmapsubline", 1);
				lcp.send(selector, this, PanelManage.Login.selectPlayerRet)
				App.GameEngine.isLogin = true;
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