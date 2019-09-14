/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQingCharpterItem extends ui.juQingMode.JuQingCharpterItemUI {
		constructor() {
			super();
		}
		/**
		 * 
		 * @param index 章节编号
		 * @param data 章节数据
		 */
		public setData(index, data: ProtoCmd.itf_JUQING_CHARPTERINFO): void {
			this.lbl_charpterName.text = data.name;
			this.lbl_charpterNo.text = '第' + index + '章';
			// 解锁条件
			let player = GameApp.MainPlayer;
			// 未解锁
			if (player.zslevel * 1000 + player.level < data.zslvl * 1000 + data.lvl) {
				let des = '';
				if (data.zslvl > 0) {
					des = '' + data.zslvl + '转';
				}
				this.lbl_conDes.text = des + data.lvl + '级解锁';
			}
			// 解锁
			else {
				this.lbl_conDes.visible = false;
			}

		}
	}
}