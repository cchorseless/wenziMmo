/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_Skill_Effect_item extends ui.wuXue.WuXue_Skill_Effect_itemUI {
		public keyMap = {
			4: { key: '3_4', label: '攻击:' },
			6: { key: '5_6', label: '力道:' },
			8: { key: '7_8', label: '柔劲:' },
			10: { key: '9_10', label: '刚劲:' },
			12: { key: '11_12', label: '卸力:' },
			14: { key: '13_14', label: '化劲:' },
		}
		constructor() {
			super();
		}
		public setData(effectIDStruct: ProtoCmd.EffectIDStruct, isCur: boolean, lv: number = -1, zizhi: number = -1) {
			this.lab_desName.text = effectIDStruct.label;
			this.des_Num.x = this.lab_desName.width + 5;
			if (isCur) {
				this.des_Num.color = '#63491a';
			} else {
				//下一级
				this.des_Num.color = '#38ad32';
			}
			let extra = 0;
			let k_Value = 1;
			if (lv > 0) {
				switch (effectIDStruct.index) {
					//血量
					case 1:
						k_Value = ((lv / 150) + 1);
						break;
					//攻击
					case '3_4':
						k_Value = ((lv / 150) + 2);
						break;
					//物防
					case '11_12':
						k_Value = ((lv / 150) + 0.1);
						break;
					//法防
					case '13_14':
						k_Value = ((lv / 150) + 0.12);
						break;
					//暴击
					case 19:
						k_Value = ((lv / 150) + 1.31);
						break;
					//韧性
					case 21:
						k_Value = ((lv / 150) + 1.34);
						break;
					//命中
					case 15:
						k_Value = ((lv / 150) + 1.304);
						break;
					//闪避
					case 17:
						k_Value = ((lv / 150) + 1.32);
						break;
					//爆伤
					case 21:
						k_Value = ((lv / 150) + 1.23);
						break;

				}
				extra = Math.floor(zizhi * (lv - 1) * k_Value);
			}

			if (effectIDStruct.onlyValue) {
				this.des_Num.text = '+' + (effectIDStruct.value + extra);
			}
			else {
				this.des_Num.text = '+' + (effectIDStruct.min + extra) + '-' + (effectIDStruct.max + extra);
			}
			this.width = this.des_Num.x + this.des_Num.width + 5;
			return this;
		}
	}
}