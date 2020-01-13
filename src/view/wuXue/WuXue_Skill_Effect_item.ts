/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_Skill_Effect_item extends ui.wuXue.WuXue_Skill_Effect_itemUI {
		constructor() {
			super();
		}
		public setData(effectIDStruct: ProtoCmd.EffectIDStruct, isCur: boolean) {
			this.lab_desName.text = effectIDStruct.label;
			this.des_Num.x = this.lab_desName.width + 5;
			if(isCur){
				this.des_Num.color = '#63491a';
			}else
			{
				this.des_Num.color = '#38ad32';
			}
			if (effectIDStruct.onlyValue) {
				this.des_Num.text = '+' + effectIDStruct.value;
			}
			else {
				this.des_Num.text = '+' + effectIDStruct.min + '-' + effectIDStruct.max;
			}
			this.width = this.des_Num.x + this.des_Num.width+5;
			return this;
		}
	}
}