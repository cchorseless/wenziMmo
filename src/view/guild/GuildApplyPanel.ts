/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildApplyPanel extends ui.guild.GuildApplyPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.box_guildNoApply.visible = false;
			this.panel_guildApply.vScrollBarSkin = '';
			this.vbox_guildApply['sortItem'] = (items) => { };
			this.updateUI();
			this.addEvent();
		}

		public addEvent(): void {
			this.btn_guildApplyReturn.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this, );
			});
			// 翻页
			this.btn_addPage.on(Laya.UIEvent.CLICK, this, this.changePage, [true]);
			this.btn_reducePage.on(Laya.UIEvent.CLICK, this, this.changePage, [false]);
		}


		public updateUI(page = 1): void {
			let pkt = new ProtoCmd.stGlobalGuildAskJoinGuildUser();
			pkt.setValue('nPage', page);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stGlobalGuildAskJoinGuildUserRet(data);
				this.lbl_allPage.text = cbpkt.getValue('nMaxPage');
				this.lbl_curPage.text = cbpkt.getValue('nPage');
				this.vbox_guildApply.removeChildren();
				for (let applyInfo of cbpkt.stZeroArray) {
					let ui = new view.compart.GuildApplyItem();
					let item = new ProtoCmd.szAskJoinUserInfoBase()
					item.clone(applyInfo.data);
					ui.setData(item);
					this.vbox_guildApply.addChild(ui);
				}
				cbpkt.clear();
				cbpkt = null;
			})
		}

		/**
		 * 翻页逻辑
		 * @param isAdd 
		 */
		public changePage(isAdd): void {
			if (this.lbl_curPage.text == this.lbl_allPage.text) { return }
			let page = 1;
			if (isAdd) {
				page = parseInt(this.lbl_curPage.text) + 1;
			} else {
				if (this.lbl_curPage.text == '1') { return }
				page = parseInt(this.lbl_curPage.text) - 1;
			}
			this.updateUI(page);

		}
	}
}