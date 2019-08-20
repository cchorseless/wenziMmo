/**Created by the LayaAirIDE*/
module view.dialog {
	export class GuildManageMemberDialog extends ui.dialog.GuildManageMemberDialogUI {
		constructor() {
			super();
			this.group = 'GuildManageMemberDialog';
		}

		public ui_GuildMemberItem: view.compart.GuildMemberItem;
		public setData(ui: view.compart.GuildMemberItem, zhiWei: string): GuildManageMemberDialog {
			// 这里关联一下，方便移除
			this.ui_GuildMemberItem = ui;
			this.lbl_lvl.text = '' + ui.item.dwLevel;
			this.lbl_szName.text = '' + ui.item.szName;
			this.lbl_zhiWei.text = '' + zhiWei;
			this.btn_touPiao.visible = (zhiWei == '帮主');
			this.addEvent();
			return this
		}
		public addEvent(): void {
			this.btn_touPiao.on(Laya.UIEvent.CLICK, this, this.touPiaoBaMian);
			this.btn_changeZhiWei.on(Laya.UIEvent.CLICK, this, this.changeZhiWei);
			this.btn_sendMail.on(Laya.UIEvent.CLICK, this, this.sendMail);
			this.btn_quitMember.on(Laya.UIEvent.CLICK, this, this.quitMember);
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => { this.close() });
		}

		/**
		 * 投票罢免帮主
		 */
		public touPiaoBaMian(): void {

		}

		/**
		 * 改变职位
		 */
		public changeZhiWei(): void {

		}

		/**
		 * 寄送邮件
		 */
		public sendMail(): void {
			TipsManage.showTips('暂未开放')
		}

		/**
		 * 开除成员
		 */
		public quitMember(): void {
			// 会长 副会长可以
			let canDoArray = [EnumData.emGuildMemberPowerLvl._GUILDMEMBER_POWERLVL_FITMASTER,
			EnumData.emGuildMemberPowerLvl._GUILDMEMBER_POWERLVL_MASTER]
			// 职位
			let self_zhiWei = GameApp.MainPlayer.feature.btClanMaster;
			if (canDoArray.indexOf(self_zhiWei) == -1) {
				TipsManage.showTips('只有会长和副会长才有权限');
			}
			else {
				new view.dialog.SureOrCanelDialog().setData('你确定要驱逐该成员吗？', EnumData.SureCanelModel.BP_QUIT_MEMBER).popup(false);
			}
		}
		/**
  		 * 被驱逐的回调
  		 */
		public quitMemberCB(): void {
			// 关闭自己
			this.close();
			//踢人协议
			let pkt = new ProtoCmd.stGlobalGuildMemberLeave();
			pkt.setValue('btType', 1);
			pkt.setValue('szName', this.lbl_szName.text);
			pkt.setValue('szMasterName', GameApp.MainPlayer.objName);
			// 踢人的时候有返回包
			pkt.cbPacket = ProtoCmd.stGlobalGuildMemberLeave;
			lcp.send(pkt, this, (data) => {
				TipsManage.showTips(this.lbl_szName.text + '已经离开帮派');
				this.ui_GuildMemberItem.removeSelf();
				// 刷新公会成员的UI
				PanelManage.GuildMember && PanelManage.GuildMember.initUI();
			});
		}
	}
}