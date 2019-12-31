/**Created by the LayaAirIDE*/
module view.compart {
	export class JuQingCharpterInfoItem extends ui.compart.JuQingCharpterInfoItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.itf_JUQING_PIANZHANG;
		public setData(item: ProtoCmd.itf_JUQING_PIANZHANG, key: number): void {
			this.lbl_id.text = '第' +GameUtil.SectionToChinese(key,0) + '卷';
			this.item = item;
			this.lbl_charpterName.text = '' + item.name;
			let nowChapter = GameApp.MainPlayer.pianZhangID;
			if (item.id < nowChapter) {
				this.lbl_charpterCount.fontSize = 30;
				this.lbl_charpterCount.color = '#14790d';
				this.lbl_charpterCount.text = '已完成';
				this.img_charpter.skin = 'image/juQingMode/list_mulu_yiwanchng.png';
				this.img_shuo.visible = false;
			}
			if (item.id == nowChapter) {
				this.lbl_charpterCount.fontSize = 26;
				this.lbl_charpterCount.color = '#623e24';
				this.lbl_charpterCount.text = '合计' + numArray[item.cnt] + '章';
				this.img_charpter.skin = 'image/juQingMode/list_mulu_yijiesuo.png';
				this.img_shuo.visible = false;
			}
			if (item.id > nowChapter) {
				this.lbl_charpterCount.fontSize = 26;
				this.lbl_charpterCount.color = '#a53232';
				this.lbl_charpterCount.text = '未解锁';
				this.img_charpter.skin = 'image/juQingMode/list_mulu_weiwanchng.png';
				this.img_shuo.visible = true;
			}
		}
	}
}