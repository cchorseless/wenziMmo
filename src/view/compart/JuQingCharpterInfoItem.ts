/**Created by the LayaAirIDE*/
module view.compart {
	export class JuQingCharpterInfoItem extends ui.compart.JuQingCharpterInfoItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.itf_JUQING_PIANZHANG;
		public setData(item: ProtoCmd.itf_JUQING_PIANZHANG): void {
			let numArray = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三']
			this.item = item;
			this.lbl_charpterCount.text = '合计' + numArray[item.cnt] + '章';
			this.lbl_charpterName.text = '' + item.name;
			//已完成，lbl_charpterCount字号变成30，颜色变#14790d,label变已完成;未解锁状态字号26，加锁标志，颜色#a53232,label未解锁
		}
	}
}