/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildRecordPanel extends ui.guild.GuildRecordPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			for (let i = 0; i < 3; i++) {
				this['vbox_' + i]['sortItem'] = (items) => { };
				this['panel_' + i].vScrollBarSkin = '';
			}
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
				this.updateEventLog(index);
			}, null, false);
			this.initUI();
			this.updateEventLog(0);
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_guildRecordReturn.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			});
			// 投票事件查看
			this.btn_touPiaoEvent.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.GuildTouPiaoEventDialog().setData().popup(true);
			});
		}
		/**
		 * 拉取日志
		 * @param index 
		 */
		public updateEventLog(index): void {
			let vbox: Laya.VBox = this['vbox_' + index];
			let pkt = new ProtoCmd.stGloalClientGuildEvent();
			pkt.setValue('btType', index);//0 普通事件 1 捐献事件
			pkt.setValue('i64OnlyId', GameApp.MainPlayer.onlyId);
			pkt.setValue('dwGuildId', GameApp.MainPlayer.guildInfo.dwID);
			lcp.send(pkt, this, (data) => {
				vbox.removeChildren();
				let cbpkt = new ProtoCmd.stGloalClientGuildEventRet(data);
				for (let eventInfo of cbpkt.stGuildeveArray) {
					let uiitem = new view.compart.GuildEventInfoItem();
					let item = new ProtoCmd.stGuildEventBase()
					item.clone(eventInfo.data);
					uiitem.setData(item);
					vbox.addChild(uiitem);
				}
			})
		}

		public initUI(): void {
			// 创建时间
			this.lbl_guildCreateTime.text = '' + GameApp.MainPlayer.guildInfo.dwCreateTime;
			// 拉取数据
			let pkt = new ProtoCmd.stClientGetGuildShowInfo();
			pkt.setValue('guildId', GameApp.MainPlayer.guildInfo.dwID);

			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stClientGetGuildShowInfoRet(data);
				// 累计金币
				this.lbl_goldCount.text = '' + cbpkt.getValue('dwGoldDonateCnt') / 10000 + '万';

				// 累计元宝
				this.lbl_yuanBaoCount.text = '' + cbpkt.getValue('dwRmbDonateCnt');

				// 沙巴克次数
				this.lbl_shabakeCount.text = '' + cbpkt.getValue('dwShaBaKeCnt');

				// 行会信息
				this.lbl_rank.text = '' + GameApp.MainPlayer.guildInfo.dwRank;

				// 宣战行会
				this.lbl_xuanZhanCount.text = '' + cbpkt.getValue('dwFightCnt');

				// 结盟行会数
				this.lbl_jieMengCount.text = '' + cbpkt.getValue('dwAllianceCnt');

				cbpkt.clear();
				cbpkt = null
			})
		}
	}
}