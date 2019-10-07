/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildChangeZhiWeiDialog extends ui.guild.GuildChangeZhiWeiDialogUI {
		constructor() {
			super();
		}
		public setData(item, zhiwei: string): GuildChangeZhiWeiDialog {
			this.lbl_lvl.text = '' + item.dwLevel;
			this.lbl_szName.text = '' + item.szName;
			this.lbl_zhiWei.text = zhiwei;
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close);
			this.btn_0.on(Laya.UIEvent.CLICK, this, this.changeZhiWei, [0]);
			this.btn_1.on(Laya.UIEvent.CLICK, this, this.changeZhiWei, [1]);
			this.btn_2.on(Laya.UIEvent.CLICK, this, this.changeZhiWei, [2]);
			this.btn_4.on(Laya.UIEvent.CLICK, this, this.changeZhiWei, [4]);
			this.btn_5.on(Laya.UIEvent.CLICK, this, this.changeZhiWei, [5]);
		}
		public changeZhiWei(i): void {
			let zhiWeiInfo = ['帮会成员', '长老', '副帮主', '帮主', '精英', '大将'];
			if (zhiWeiInfo.indexOf(this.lbl_zhiWei.text) == i) {
				TipsManage.showTips('当前已经是' + this.lbl_zhiWei.text);
				return
			}
			// 自己的职位，只能提拔职位比自己低的
			let selfZhiWei = GameApp.MainPlayer.guildInfo.szAliaNames;
			let zhiWeiSort = ['帮主', '副帮主', '长老', '大将', '精英', '帮会成员'];
			let selfZhiWeiIndex = zhiWeiSort.indexOf(selfZhiWei);
			if (selfZhiWeiIndex >= zhiWeiSort.indexOf(this.lbl_zhiWei.text)) {
				TipsManage.showTips('无权限操作职位高于自己的成员');
				return
			}
			if (selfZhiWeiIndex >= zhiWeiSort.indexOf(zhiWeiInfo[i])) {
				TipsManage.showTips('无权限更改该职位');
				return
			}
			this.close();
			let tips = '确定改变' + this.lbl_szName.text + '的职位为' + zhiWeiInfo[i] + '吗？';
			new view.dialog.SureOrCanelDialog().setData(tips, EnumData.SureCanelModel.BP_CHANGE_ZHIWEI, i).popup(false);
		}
	}
}