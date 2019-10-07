/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildManageMemberDialog extends ui.guild.GuildManageMemberDialogUI {
		constructor() {
			super();
			this.group = 'GuildManageMemberDialog';
		}

		public ui_GuildMemberItem: view.guild.GuildMemberItem | view.guild.GuildMemberRankItem;
		public zhiWei: string;
		public setData(ui: view.guild.GuildMemberItem | view.guild.GuildMemberRankItem, zhiWei: string): GuildManageMemberDialog {
			// 这里关联一下，方便移除
			this.ui_GuildMemberItem = ui;
			this.zhiWei = zhiWei;
			this.lbl_lvl.text = '' + ui.item.dwLevel;
			this.lbl_szName.text = '' + ui.item.szName;
			this.lbl_zhiWei.text = '' + zhiWei;
			this.btn_changeZhiWei.label = (zhiWei == '帮主') ? '投票罢黜' : '更改职位';
			this.addEvent();
			return this
		}
		public addEvent(): void {
			this.btn_changeZhiWei.on(Laya.UIEvent.CLICK, this, this.changeZhiWei);
			this.btn_sendMail.on(Laya.UIEvent.CLICK, this, this.sendMail);
			this.btn_quitMember.on(Laya.UIEvent.CLICK, this, this.quitMember);
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => { this.close() });
		}

		/**
		 * 罢黜帮主 || 改变职位
		 */
		public changeZhiWei(): void {
			// 投票罢免帮主
			if (this.zhiWei == '帮主') {
				if (GameApp.MainPlayer.checkSelfIsGuildMaster()) {
					new view.guild.GuildQuitMasterDialog().setData(this.ui_GuildMemberItem.item).popup(false);
				} else {
					TipsManage.showTips('只有副会长才有权限');
				}
			}
			// 改变职位
			else {
				new view.guild.GuildChangeZhiWeiDialog().setData(this.ui_GuildMemberItem.item, this.lbl_zhiWei.text).show(false);
			}
			//  todo 帮派主动升级
			//  TODO 帮派扩展人数
		}
		/**
		 * 改变职位的回调
		 */
		public changeZhiWeiCB(dwPowerLvl): void {
			let pkt = new ProtoCmd.stGlobalGuildChangePowerLvl();
			pkt.setValue('szName', this.lbl_szName.text);
			pkt.setValue('dwPowerLvl', dwPowerLvl);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stGlobalGuildChangePowerLvlRet(data);
				let dochanged = cbpkt.getValue('boChanged');
				if (dochanged) {
					TipsManage.showTips('修改成功');
					switch (this.ui_GuildMemberItem.name) {
						// 排行榜界面刷新自己
						case 'GuildMemberRankItem':
							(this.ui_GuildMemberItem as view.guild.GuildMemberRankItem).updateszAliaName(cbpkt.getValue('dwPowerLvl'));
							break;
						// 成员界面刷新整个界面
						case 'GuildMemberItem':
							PanelManage.GuildMember && PanelManage.GuildMember.updateUI();
							break;
					}
					this.close();
				}
				else {
					TipsManage.showTips('修改失败');
				}
			})
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
			if (GameApp.MainPlayer.checkSelfIsGuildMaster()) {
				new view.dialog.SureOrCanelDialog().setData('你确定要驱逐该成员吗？', EnumData.SureCanelModel.BP_QUIT_MEMBER).popup(false);
			}
			else {
				TipsManage.showTips('只有会长和副会长才有权限');
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