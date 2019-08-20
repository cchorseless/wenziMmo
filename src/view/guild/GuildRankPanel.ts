/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildRankPanel extends ui.guild.GuildRankPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			for (let i = 0; i < 3; i++) {
				this['panel_' + i].hScrollBarSkin = '';
				this['vbox_' + i]['sortItem'] = (items) => { };
			}
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
			}, null, false);
			this.updateUI(0);
			this.updateUI(1);
			this.updateUI(2);
			this.addEvent();
		}
		/**
		 * 更新UI数据
		 * @param index 哪个界面
		 * @param page 页数
		 */
		public updateUI(index = 0, page = 1): void {
			let lbl_curPage: Laya.Label = this['lbl_curPage' + index];
			let lbl_maxPage: Laya.Label = this['lbl_maxPage' + index];
			let vbox: Laya.VBox = this['vbox_' + index];
			vbox.removeChildren();
			let pkt = new ProtoCmd.stGlobalGuildMemberList();
			pkt.setValue('btType', index + 1)
			pkt.setValue('dwPageNum', page);
			pkt.setValue('boShowOffLine', true);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stGlobalGuildMemberListRet(data);
				let dwMaxPag = cbpkt.getValue('dwMaxPage');
				lbl_curPage.text = '' + page;
				lbl_maxPage.text = '' + dwMaxPag;
				for (let _item of cbpkt.stZeroArray) {
					let ui = new view.compart.GuildMemberRankItem();
					let item = new ProtoCmd.stSingleGuildMemberInfoBase();
					item.clone(_item.data);
					ui.setData(item)
					vbox.addChild(ui);
				}

			})

		}
		public addEvent(): void {
			for (let i = 0; i < 3; i++) {
				this['btn_addPage' + i].on(Laya.UIEvent.CLICK, this, this.changePage, [true, i]);
				this['btn_reducePage' + i].on(Laya.UIEvent.CLICK, this, this.changeData, [false, i]);
			}
		}
		/**
		 * 翻页
		 * @param index 
		 */
		public changePage(isAdd, index): void {
			let lbl_curPage: Laya.Label = this['lbl_curPage' + index];
			let lbl_maxPage: Laya.Label = this['lbl_maxPage' + index];
			if (lbl_curPage.text == lbl_maxPage.text) {
				return
			}
			let page = 1;
			// 增加
			if (isAdd) {
				page = parseInt(lbl_curPage.text) + 1;
			}
			// 减少
			else {
				if (lbl_curPage.text == '1') { return }
				page = parseInt(lbl_curPage.text) - 1;
			}
			this.updateUI(index, page)
		}



	}
}