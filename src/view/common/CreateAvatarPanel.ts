/**Created by the LayaAirIDE*/
module view.common {
	export class CreateAvatarPanel extends ui.common.CreateAvatarPanelUI {
		constructor() {
			super();

		}
		public setData(): void {
			this.chooseSex(1);
			this.chooseMenPai(1);
			this.addEvent();
		}

		public addEvent(): void {
			this.btn_randomName.on(Laya.UIEvent.CLICK, this, this.randomName);
			this.btn_startGame.on(Laya.UIEvent.CLICK, this, this.startGame);
			// 职业选择
			this.rad_menPai1.on(Laya.UIEvent.CLICK, this, this.chooseMenPai, [1]);
			this.rad_menPai2.on(Laya.UIEvent.CLICK, this, this.chooseMenPai, [2]);
			this.rad_menPai3.on(Laya.UIEvent.CLICK, this, this.chooseMenPai, [3]);
			this.rad_menPai4.on(Laya.UIEvent.CLICK, this, () => { TipsManage.showTips('敬请期待') });
			this.rad_menPai5.on(Laya.UIEvent.CLICK, this, () => { TipsManage.showTips('敬请期待') });
			// 性别选择
			this.lbl_nan.on(Laya.UIEvent.CLICK, this, this.chooseSex, [1]);
			this.lbl_nv.on(Laya.UIEvent.CLICK, this, this.chooseSex, [2]);
		}

		public curMenPai: number = 1;
		public chooseMenPai(menPai): void {
			this.curMenPai = menPai;
			for (let i = 1; i < 4; i++) {
				this['rad_menPai' + i].selected = (menPai == i);
			}
			// 门派名字
			this.lbl_menPai.text = ['华山派', '武当派', '魔 教'][menPai - 1];
			this.updateHeroPic();
		}

		public curSex: number = 1;
		public chooseSex(xingBie): void {
			this.curSex = xingBie;
			switch (xingBie) {
				case 1:
					this.img_nanBg.visible = true;
					this.img_nvBg.visible = false;
					break;
				case 2:
					this.img_nanBg.visible = false;
					this.img_nvBg.visible = true;
					break;
			}
			this.updateHeroPic();
		}

		private updateHeroPic(): void {
			// 英雄形象
			let path = (this.curSex == 1) ? 'image/common/nan' : 'image/common/nv';
			this.img_hero.skin = path + '0' + this.curMenPai + '.png';
			// this.img_heroSmall.skin = path + '0' + this.curMenPai + '_half.png';
		}
		// 随机角色姓名
		private randomName(): void {
			this.input_random.text = RandomUtils.randomName(6);
		}

		private startGame(): void {
			if (!this.input_random.text) {
				TipsManage.showTips('请输入昵称')
				return
			}
			// 角色名称
			GameApp.GameEngine.mainPlayer.objName = this.input_random.text;
			// 性别
			GameApp.GameEngine.mainPlayer.sex = this.curSex;
			// 职业
			GameApp.GameEngine.mainPlayer.job = this.curMenPai;
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
			createusr.playerinfo.setValue('szName', GameApp.GameEngine.mainPlayer.objName);
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
			console.log('==========errorcode', errorcode)
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
						break;
				}
				TipsManage.showTips(strmsg);
			}
			msg.clear();
			msg = null;
		}
	}
}