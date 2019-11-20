/**Created by the LayaAirIDE*/
module view.compart {
	export class SinglePropsItem extends ui.compart.SinglePropsItemUI {
		constructor() {
			super();
		}
		public setData(effectIDStruct: ProtoCmd.EffectIDStruct): SinglePropsItem {
			this.lbl_label.text = effectIDStruct.label;
			if (effectIDStruct.onlyValue) {
				this.lbl_dataDes.text = '' + effectIDStruct.value;
			}
			else {
				this.lbl_dataDes.text = '' + effectIDStruct.min + '-' + effectIDStruct.max;
			}
			return this;
		}
	}
}