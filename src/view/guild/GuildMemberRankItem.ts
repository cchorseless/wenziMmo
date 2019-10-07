/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildMemberRankItem extends ui.guild.GuildMemberRankItemUI {
		constructor() {
			super();
			this.name = 'GuildMemberRankItem';
		}
		public item: ProtoCmd.stSingleGuildMemberInfoBase;
		public setData(item: ProtoCmd.stSingleGuildMemberInfoBase, index: number): void {
			this.item = item;
			switch (index) {
				case 0:
					this.lbl_conditiontitle.text = '等级';
					this.lbl_conditionText.text = '' + this.item.dwLevel;
					break;
				case 1:
					this.lbl_conditiontitle.text = '日贡献';
					this.lbl_conditionText.text = '' + this.item.dwDayGuildDedication;
					break;
				case 2:
					this.lbl_conditiontitle.text = '战力';
					this.lbl_conditionText.text = '' + this.item.dwFightNum;
					break;
			}
			// 排名
			this.lbl_rankCount.text = '' + this.item.dwRank;
			// 名字
			this.lbl_szName.text = '' + this.item.szName;
			// 职位
			this.lbl_zhiWei.text = '' + this.item.szAliaName;
			// 判断是自己 隐藏管理按钮
			if (this.item.szName === GameApp.MainPlayer.objName) {
				this.btn_manage.visible = false;
			}
			this.addEvent();
		}

		public addEvent(): void {
			this.btn_manage.on(Laya.UIEvent.CLICK, this, () => {
				new view.guild.GuildManageMemberDialog().setData(this, this.lbl_zhiWei.text).popup(true);
			});
		}
		/**
		 * 更新自己的职位
		 * @param dwPowerLvl 
		 */
		public updateszAliaName(dwPowerLvl: EnumData.emGuildMemberPowerLvl) {
			let szAliaName = ['帮会成员', '长老', '副帮主', '帮主', '精英', '大将'][dwPowerLvl];
			this.item.szAliaName = szAliaName;
			// 职位
			this.lbl_zhiWei.text = '' + szAliaName;
		}

	}
}