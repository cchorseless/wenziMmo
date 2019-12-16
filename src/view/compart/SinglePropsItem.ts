/**Created by the LayaAirIDE*/
module view.compart {
	export class SinglePropsItem extends ui.compart.SinglePropsItemUI {
		constructor() {
			super();
		}
		public setData(effectIDStruct: ProtoCmd.EffectIDStruct, nextEffectIDStruct: ProtoCmd.EffectIDStruct = null): SinglePropsItem {
			this.lbl_label.text = effectIDStruct.label;
			this.lbl_dataDes.x = this.lbl_label.width + 5;
			let des;
			if (effectIDStruct.onlyValue) {
				des = '' + effectIDStruct.value;
			}
			else {
				des = '' + effectIDStruct.min + '-' + effectIDStruct.max;
			}
			this.lbl_dataDes.text = des;
			this.width = this.lbl_dataDes.x + this.lbl_dataDes.width + 5;
			//升阶后的属性增长值
			if (nextEffectIDStruct != null) {
				this.lbl_add.visible=true;
				let addValue;
				if (effectIDStruct.onlyValue) {
					addValue = nextEffectIDStruct.value - effectIDStruct.value;
				}
				else {
					addValue = nextEffectIDStruct.max - effectIDStruct.max;
				}
				this.lbl_add.text='+'+addValue;
			}
			return this;
		}
	}
}