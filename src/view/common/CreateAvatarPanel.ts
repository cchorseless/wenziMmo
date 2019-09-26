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
			this.btn_menPaiBg1.on(Laya.UIEvent.CLICK, this, this.chooseMenPai, [1]);
			this.btn_menPaiBg2.on(Laya.UIEvent.CLICK, this, this.chooseMenPai, [2]);
			this.btn_menPaiBg3.on(Laya.UIEvent.CLICK, this, this.chooseMenPai, [3]);
			this.btn_menPaiBg4.on(Laya.UIEvent.CLICK, this, () => {
				TipsManage.showTips('敬请期待')
			});
			this.btn_menPaiBg5.on(Laya.UIEvent.CLICK, this, () => {
				TipsManage.showTips('敬请期待')
			});
			// 性别选择
			this.lbl_nan.on(Laya.UIEvent.CLICK, this, this.chooseSex, [1]);
			this.lbl_nv.on(Laya.UIEvent.CLICK, this, this.chooseSex, [2]);
		}

		public curMenPai: number = 1;
		public chooseMenPai(menPai): void {
			this.curMenPai = menPai;
			for (let i = 1; i < 4; i++) {
				this['btn_menPaiBg' + i].selected = this['btn_menPai' + i].selected = (menPai == i);
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
			GameApp.MainPlayer.objName = this.input_random.text;
			let createusr = new ProtoCmd.CreatePlayer();
			createusr.setValue('szAccount', GameApp.MainPlayer.playerAccount);
			createusr.setValue('countryId', 1);
			createusr.playerinfo.setValue('szName', this.input_random.text);
			createusr.playerinfo.feature.setValue('sex', this.curSex);
			createusr.playerinfo.feature.setValue('job', this.curMenPai);
			// 创角协议
			lcp.send(createusr);
		}
	}
}