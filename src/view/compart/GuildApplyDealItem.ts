/**Created by the LayaAirIDE*/
module view.compart {
	export class GuildApplyDealItem extends ui.compart.GuildApplyDealItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.szAskJoinUserInfoBase;
		public setData(item: ProtoCmd.szAskJoinUserInfoBase): void {
			this.item = item;
			this.initUI();
			this.addEvent();
		}

		public initUI(): void {
			this.lbl_playerName.text = '' + this.item.szName;
			this.lbl_lv.text = '' + this.item.dwLevel;
			this.lbl_lastOnLineTime.text = '' + TimeUtils.getFormatBySecond(new Date().getTime() - this.item.dwLastLoginOutTime, 5);
		}

		public addEvent(): void {
			this.btn_agree.on(Laya.UIEvent.CLICK, this, this.updateUI, [true]);
			this.btn_refuse.on(Laya.UIEvent.CLICK, this, this.updateUI, [false]);
		}

		public updateUI(isAgree): void {
			let pkt = new ProtoCmd.stGlobalGuildMasterRetAskJoin()
			pkt.setValue('boAllow', isAgree);
			pkt.setValue("szJoinName", this.item.szName);
			pkt.setValue("dwGuildId", GameApp.MainPlayer.guildInfo.dwID);
			pkt.setValue("szGuildName", GameApp.MainPlayer.guildInfo.szName);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stGlobalGuildMasterRetAskJoin(data);
				let btErrorCode = cbpkt.getValue('btErrorCode');
				console.log('===============>')
				if (btErrorCode == 0) {
					TipsManage.showTips('操作成功');
					this.removeSelf();

				} else {
					TipsManage.showTips('操作失败');
				}
				cbpkt.clear();
				cbpkt = null;
			})

		}

	}
}