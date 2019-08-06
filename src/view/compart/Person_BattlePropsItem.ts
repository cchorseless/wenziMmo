/**Created by the LayaAirIDE*/
module view.compart {
	export class Person_BattlePropsItem extends ui.compart.Person_BattlePropsItemUI {
		constructor() {
			super();
			this.setData();
		}

		public setData(): void {
			let player = GameApp.MainPlayer;
			let ability = player.ability;
			// 生命值
			this.lbl_Hp.text = '' + ability.nowHP + '/' + ability.nMaxHP;
			// 魔法值
			this.lbl_Mp.text = '' + ability.nowMP + '/' + ability.nMaxMP;
			// 内功值
			this.lbl_neiGong.text = '' + ability.nowInnerValue + '/' + ability.nInnerValue;
			// 攻击
			switch (player.job) {
				case EnumData.JOB_TYPE.JOB_WARRIOR:
					this.lbl_atk.text = '' + ability.nMinDC + '-' + ability.nMaxDC;
					break;
				case EnumData.JOB_TYPE.JOB_MAGE:
					this.lbl_atk.text = '' + ability.nMinMC + '-' + ability.nMaxMC;
					break;
				case EnumData.JOB_TYPE.JOB_MONK:
					this.lbl_atk.text = '' + ability.nMinSC + '-' + ability.nMaxSC;
					break;
			}
			// 物理防御
			this.lbl_phyDef.text = '' + ability.nMinAC + '-' + ability.nMaxAC;
			// 魔法防御
			this.lbl_migDef.text = '' + ability.nMinMAC + '-' + ability.nMaxMAC;
			// 准确
			this.lbl_zhunQue.text = '' + ability.nHit;
			// 闪避
			this.lbl_shanbi.text = '' + ability.nJuck;
			// 暴击
			this.lbl_baoJi.text = '' + ability.nCrit;
			// 爆伤
			this.lbl_baoShang.text = '' + ability.nAtkCrit;
			// 幸运
			this.lbl_xingYun.text = '' + ability.nLucky;
			// 韧性
			this.lbl_renxing.text = '' + ability.nCritResi;
			// PK值
			this.lbl_pk.text = '' + player.feature.getValue('wNowKilling');

			this.addEvent();
		}
		public addEvent(): void {

		}
	}
}