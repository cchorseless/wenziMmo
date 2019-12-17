/**Created by the LayaAirIDE*/
module view.compart {
	export class SinglePropsItem extends ui.compart.SinglePropsItemUI {
		constructor() {
			super();
		}
		public setData(effectIDStruct: ProtoCmd.EffectIDStruct, nexteffectIDStruct: ProtoCmd.EffectIDStruct = null): SinglePropsItem {
			if (!effectIDStruct) {
				return;
			}
			this.lbl_label.text = effectIDStruct.label;
			this.lbl_dataDes.x = this.lbl_label.width + 5;
			if (effectIDStruct.onlyValue) {
				this.lbl_dataDes.text = '' + effectIDStruct.value;
			}
			else {
				this.lbl_dataDes.text = '' + effectIDStruct.min + '-' + effectIDStruct.max;
			}
			this.width = this.lbl_dataDes.x + this.lbl_dataDes.width + 5;
			if (nexteffectIDStruct != null) {
				let addValue;
				if (effectIDStruct.onlyValue) {
					addValue = nexteffectIDStruct.value - effectIDStruct.value;
				}
				else {
					addValue = nexteffectIDStruct.max - effectIDStruct.max;
				}
				this.lbl_add.text = '+' + addValue;
			}
			return this;
		}
	}
}