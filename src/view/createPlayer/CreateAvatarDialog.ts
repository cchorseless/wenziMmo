/**Created by the LayaAirIDE*/
module view.createPlayer {
	export class CreateAvatarDialog extends ui.createPlayer.CreateAvatarDialogUI {
		constructor() {
			super();
		}


		public setData():CreateAvatarDialog {
			this.tab_jobSelect.selectHandler = Laya.Handler.create(this, (index) => {
				let configID = '' + (index + 101);
				this.lbl_job.text = SheetConfig.HeroInfoSheet.getInstance(null).JOBDES(configID);
				this.job = SheetConfig.HeroInfoSheet.getInstance(null).JOB(configID);
				this.sex = SheetConfig.HeroInfoSheet.getInstance(null).SEX(configID);
				this.lbl_jueSeName.text = '' + SheetConfig.HeroInfoSheet.getInstance(null).NAME(configID);
				this.lbl_jueSedes0.text = '' + SheetConfig.HeroInfoSheet.getInstance(null).DES0(configID);
				this.lbl_jueSedes1.text = '           ' + SheetConfig.HeroInfoSheet.getInstance(null).DES1(configID);
				this.lbl_jueSedes2.text = '           ' + SheetConfig.HeroInfoSheet.getInstance(null).DES2(configID);
				// 半身像
				this.img_avatarPic.skin = LangConfig.getPlayerAvatarHalfSkinV3(this.sex, this.job);
			}, null, false);
			this.tab_jobSelect.selectedIndex = 0;
			this.addEvent();
			return this
		}

		public playerName: string;
		public job = 1;// 职业
		public sex = 1;// 性别
		public addEvent(): void {
			// 随机名字
			EventManage.onWithEffect(this.btn_randomName, Laya.UIEvent.CLICK, this, () => {
				let name = this.randomName();
				this.input_name.text = name;
				this.playerName = name;
			});
			// 输入名字
			this.input_name.on(Laya.UIEvent.BLUR, this, () => {
				this.playerName = this.input_name.text;
			});
			// 确定形象
			EventManage.onWithEffect(this.btn_avatarSure, Laya.UIEvent.CLICK, this, () => {
				this.createAvatar();
			});
		}


		/**
  		 * 创建角色
  		 */
		private createAvatar(): void {
			if (!this.playerName) {
				TipsManage.showTips('你还没有地府注册过')
				return
			}
			if (!this.sex) {
				TipsManage.showTips('是男是女不知道，容易多多少少')
				return
			}
			if (!this.job) {
				TipsManage.showTips('出身没选过，往哪投胎呢')
				return
			}
			// 角色名称
			GameApp.MainPlayer.objName = this.playerName;
			let createusr = new ProtoCmd.CreatePlayer();
			createusr.setValue('szAccount', GameApp.MainPlayer.playerAccount);
			createusr.setValue('countryId', 1);
			createusr.playerinfo.setValue('szName', this.playerName);
			createusr.playerinfo.feature.setValue('sex', this.sex);
			createusr.playerinfo.feature.setValue('job', this.job);
			// 创角协议
			lcp.send(createusr);
		}


		// 随机角色姓名
		private randomName(): string {
			let index = RandomUtils.randomInt(1, 101);
			let index2 = RandomUtils.randomInt(1, 101);
			let xingShi = SheetConfig.randomNameSheet.getInstance(null).SURNAME('' + index);
			let mingZi = '';
			if (this.sex == EnumData.SEX_TYPE.SEX_MAN) {
				mingZi = SheetConfig.randomNameSheet.getInstance(null).BOYNAME('' + index);
			}
			else {
				mingZi = SheetConfig.randomNameSheet.getInstance(null).GIRLNAME('' + index);
			}
			return xingShi + mingZi
		}
	}
}