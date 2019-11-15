/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildMemberItem extends ui.guild.GuildMemberItemUI {
		constructor() {
			super();
			this.name = 'GuildMemberItem';
		}
		public item: ProtoCmd.AliaMemberInfoBase;
		public setData(item: ProtoCmd.AliaMemberInfoBase, zhiWei: string) {
			this.item = item;
			this.lbl_zhiWei.text = zhiWei;
			this.initUI();
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_manage.on(Laya.UIEvent.CLICK, this, () => {
				new view.guild.GuildManageMemberDialog().setData(this, this.item.dwLevel).popup(true);
			});
		}
		public initUI(): void {
			this.lbl_lvl.text = '' + this.item.dwLevel;
			this.lbl_playerName.text = '' + this.item.szName;
			// 判断是自己 隐藏管理按钮
			if (this.item.szName === GameApp.MainPlayer.objName) {
				this.btn_manage.visible = false;
			}
		}

		/**
		 * 更新自己的职位
		 * @param szAliaName 
		 */
		public updateszAliaName(szAliaName) {
		}
	}
}