/**Created by the LayaAirIDE*/
module view.compart {
	export class JuQingCharpterInfoItem extends ui.compart.JuQingCharpterInfoItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.itf_JUQING_PIANZHANG;
		public setData(item: ProtoCmd.itf_JUQING_PIANZHANG): void {
			this.item = item;
			this.lbl_charpterCount.text='合计'+item.cnt+'章';
			this.lbl_charpterName.text=''+item.name;
			// this.lbl_id
		}
	}
}