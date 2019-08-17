/**Created by the LayaAirIDE*/
module view.compart {
	export class GuildItem extends ui.compart.GuildItemUI {
		constructor() {
			super();
		}

		public item: ProtoCmd.stSingleGuildinfoBase;
		public setData(item: ProtoCmd.stSingleGuildinfoBase): void {
			this.item = item;
			this.lbl_lv.text = 'lv.' + item.dwLevel;
			this.lbl_guildName.text = '' + item.szName;
			this.lbl_lvNeed.text = '' + item.dwJoinNeedLvl;
			this.lbl_playerCount.text = '' + item.curPlayerCount + '/' + item.dwMaxPlayerCount;
			this.addEvent();
		}
		public addEvent(): void {
			// 申请帮会
			this.btn_applyJoin.on(Laya.UIEvent.CLICK, this, this.applyJoinGuild);
			// 查看详细信息
			this.btn_getInfo.on(Laya.UIEvent.CLICK, this, this.getGuildInfo);



		}

		/**
		 * 申请加入行会
		 */
		public applyJoinGuild(): void {
			// if()
			let pkt = new ProtoCmd.stGlobalGuildAskJoinGuild();
			pkt.setValue("szGuildName", this.item.szName);
			pkt.setValue('szName', GameApp.MainPlayer.objName);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stGlobalGuildAskJoinGuildRet(data);
				let errorcode = cbpkt.getValue('btErrorCode');
				if (errorcode == 0) {
					TipsManage.showTips('申请公会成功');
				}
				else{
					
				}
			})
		}

		/**
		 * 查看行会信息
		 */
		public getGuildInfo(): void {

		}
	}
}