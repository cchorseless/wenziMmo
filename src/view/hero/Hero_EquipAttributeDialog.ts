/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_EquipAttributeDialog extends ui.hero.Hero_EquipAttributeDialogUI {
		constructor() {
			super();
		}
		public job;
		public setData(job): Hero_EquipAttributeDialog {
			this.job = job;
			this.init_attribute();
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
		public init_attribute(): void {
			let data: GameObject.Ability = GameApp.MainPlayer.heroObj(this.job).ability;
			// 血-生命值
			let func = LangConfig.getBigNumberDes;
			this.lbl_hp.text = '' + func(data.nowHP) + '/' + func(data.nMaxHP);
			this.img_hppro.width = 356 * data.nowHP / data.nMaxHP;
			// 气量
			this.lbl_gas.text = '' + func(data.nowMP) + '/' + func(data.nMaxMP);
			this.img_gaspro.width = 356 * data.nowMP / data.nMaxMP;
			// 经验
			this.lbl_exp.text = '' + func(data.nowexp) + '/' + func(data.maxexp);
			if (data.nowexp == 0 && data.maxexp == 0) {
				this.img_exppro.width = 0;
			} else {
				this.img_exppro.width = 356 * data.nowexp / data.maxexp;
			}
			// 外功攻击
			this.lbl_waikill.text = func(data.nMinDC) + '-' + func(data.nMaxDC);
			// 外功防御
			this.lbl_waiprotect.text = func(data.nMinAC) + '-' + func(data.nMaxAC);
			// 内功防御
			this.lbl_neiprotect.text = func(data.nMinMAC) + '-' + func(data.nMaxMAC);
			// 准-准确
			this.lbl_zhun.text = '' + func(data.nHit);
			// 躲-闪避
			this.lbl_shan.text = '' + func(data.nJuck);
			// 会心-暴击
			this.lbl_huixin.text = '' + func(data.nCrit);
			// 重击-爆伤
			this.lbl_zhongji.text = '' + func(data.nAtkCrit);
			// 幸-幸运
			this.lbl_luck.text = '' + func(data.nLucky);
			// 韧-韧性
			this.lbl_renxing.text = '' + func(data.nCritResi);
			//战力
			this.lbl_battle.text = '' + func(GameApp.MainPlayer.heroObj(this.job).ability.nFight);
		}
	}
}