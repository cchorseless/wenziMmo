/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_InfoItem extends ui.hero.Hero_InfoItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public job;

		public addEvent(): void {
			//激活弟子
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				if (this.job == EnumData.JOB_TYPE.JOB_WARRIOR) {
					//激活弟子1
					this.init_JiHuo(ProtoCmd.Hero_firstGenHero);
				}
				else {
					//激活弟子2|3
					this.init_JiHuo(ProtoCmd.Hero_HeroJiHuo2and3);
				}
			})
			//符文套装
			this.btn_rune.on(Laya.UIEvent.CLICK, this, () => {
				new view.hero.Hero_RuneDialog().setData(this.job).popup(true);
			})
		}
		/**
		 * 弟子基本信息
		 */
		public setData(job: EnumData.JOB_TYPE = EnumData.JOB_TYPE.JOB_WARRIOR): void {
			this.job = job;
			//弟子全身像
			this.img_hero.skin = LangConfig.getPlayerAvatarSkin(GameApp.MainPlayer.heroSex, this.job);
			// 弟子对象
			let hero = GameApp.MainPlayer.heroObj(this.job);
			switch (hero.lockState) {
				case 0:
					this.btn_jihuo.disabled = true;
					this.viw_dizi.selectedIndex = 0;
					break;
				case 1:
					this.btn_jihuo.disabled = false;
					this.btn_jihuo.label = '可激活';
					this.viw_dizi.selectedIndex = 0;
					break;
				case 2:
					this.viw_dizi.selectedIndex = 1;
					break;
			}

		}
		//激活弟子
		public init_JiHuo(proto): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(proto, [this.job])
			lcp.send(pkt);
		}
	}

}