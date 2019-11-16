/**Created by the LayaAirIDE*/
module view.compart {
	export class SinglePropsItem extends ui.compart.SinglePropsItemUI {
		constructor() {
			super();
		}
		public setData(effectIDStruct: ProtoCmd.EffectIDStruct): SinglePropsItem {
			this.div_des.style.fontSize = 24;
			this.div_des.innerHTML = effectIDStruct.des;
			return this;
		}
	}
}