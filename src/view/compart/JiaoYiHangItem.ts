/**Created by the LayaAirIDE*/
module view.compart {
	export class JiaoYiHangItem extends ui.compart.JiaoYiHangItemUI {
		constructor() {
			super();
			this.setData();
			this.addEvent();
		}

		public setData(): void {
			this.panel_0.vScrollBarSkin = '';
			this.img_jobShow.scaleY = this.img_levelShow.scaleY = this.img_typeShow.scaleY = 0;
			this.img_jobShow.visible = this.img_levelShow.visible = this.img_typeShow.visible = false;

			this.tab_job.selectHandler = Laya.Handler.create(this, (index) => {
				this.showTab('btn_job');
				this.btn_job.label = this.tab_job.labels.split(',')[index];
			}, null, false);
			this.tab_level.selectHandler = Laya.Handler.create(this, (index) => {
				this.showTab('btn_level');
				this.btn_level.label = this.tab_level.labels.split(',')[index];
			}, null, false);
			this.tab_type.selectHandler = Laya.Handler.create(this, (index) => {
				this.showTab('btn_type');
				this.btn_type.label = this.tab_type.labels.split(',')[index];
			}, null, false);
			this.initUI();
		}

		public addEvent(): void {
			this.btn_job.on(Laya.UIEvent.CLICK, this, this.showTab, ['btn_job']);
			this.btn_level.on(Laya.UIEvent.CLICK, this, this.showTab, ['btn_level']);
			this.btn_type.on(Laya.UIEvent.CLICK, this, this.showTab, ['btn_type']);
			// 翻页下一页
			this.btn_nextPage.on(Laya.UIEvent.CLICK, this, this.fanYe, [true]);
			// 翻页上一页
			this.btn_lastPage.on(Laya.UIEvent.CLICK, this, this.fanYe, [false])
			// 查询
			this.btn_search.on(Laya.UIEvent.CLICK, this, this.chaXun)
		}

		public showTab(btnSign): void {
			let btn;
			let img;
			switch (btnSign) {
				case 'btn_job':
					btn = this.btn_job;
					img = this.img_jobShow;
					break;
				case 'btn_level':
					btn = this.btn_level;
					img = this.img_levelShow;
					break;
				case 'btn_type':
					btn = this.btn_type;
					img = this.img_typeShow;
					break;
			}
			btn.selected = !btn.selected;
			if (btn.selected) {
				img.visible = true;
				Laya.Tween.to(img, { scaleY: 1 }, 300)
			}
			else {
				Laya.Tween.to(img, { scaleY: 0 }, 300, null, Laya.Handler.create(this, () => {
					img.visible = false;
				}))
			}
		}

		public initUI(): void {
			this.vbox_0.removeChildren();
			// 初始化交易行界面
			let pkt = new ProtoCmd.stAuctionSearch();
			lcp.send(pkt, this, (data) => {
				let pktcb = new ProtoCmd.stAuctionItemsRet(data);
				// 每页显示20条
				this.lbl_pageCount.text = '' + (pktcb.curPage + 1);
				this.lbl_maxPage.text = '' + (Math.floor(pktcb.totalItem / 20) + 1);
				for (let _item of pktcb.items) {
					let _ui_item = new view.compart.BaiTanBuyItem();
					let new_item = new ProtoCmd.stAuctionItemBase();
					new_item.clone(_item.data);
					_ui_item.setData(new_item);
					this.vbox_0.addChild(_ui_item);
				}
				pktcb.clear();
				pktcb = null;
			})
		}
		/**
		 * 翻页
		 */
		public fanYe(data): void {
			if (this.lbl_maxPage.text == this.lbl_pageCount.text || this.lbl_pageCount.text == '1') {
				TipsManage.showTips('无法翻页');
				return
			}
			let pkt = new ProtoCmd.stAuctionChangePage();
			pkt.setValue('btType', 0);
			if (data) {
				pkt.setValue('nPage', parseInt(this.lbl_pageCount.text) + 1);
			}
			else {
				pkt.setValue('nPage', parseInt(this.lbl_pageCount.text) - 1);
			}

			lcp.send(pkt, this, (data) => {
				this.vbox_0.removeChildren();
				let pktcb = new ProtoCmd.stAuctionItemsRet(data);
				// 每页显示20条
				this.lbl_pageCount.text = '' + (pktcb.curPage + 1);
				this.lbl_maxPage.text = '' + (Math.floor(pktcb.totalItem / 20) + 1);
				for (let _item of pktcb.items) {
					let _ui_item = new view.compart.BaiTanBuyItem();
					let new_item = new ProtoCmd.stAuctionItemBase();
					new_item.clone(_item.data);
					_ui_item.setData(new_item);
					this.vbox_0.addChild(_ui_item);
				}
				pktcb.clear();
				pktcb = null;
			})

		}

		/**
		 * 查询
		 */
		public chaXun(): void {
			let pkt = new ProtoCmd.stAuctionSearch();
			let wType;
			let wSubType;
			let dwLowLv;
			let dwHighLv;
			switch (this.tab_type.selectedIndex) {
				case 0:
					break;
				// 帽子 项链 衣服 武器 手镯
				case 1: case 2: case 3: case 4: case 5:
					wType = this.tab_type.selectedIndex;
					wSubType = this.tab_job.selectedIndex * 100;
					dwLowLv = [0, 1, 70, 80, 1 * 1000, 3 * 1000, 5 * 1000, 7 * 1000][this.tab_level.selectedIndex];
					dwHighLv = [0, 60, 70, 80, 2 * 1000, 4 * 1000, 6 * 1000, 8 * 1000][this.tab_level.selectedIndex];
					break;
				// 戒指 
				case 6:
					wType = this.tab_type.selectedIndex + 1;
					wSubType = this.tab_job.selectedIndex * 100;
					dwLowLv = [0, 1, 70, 80, 1 * 1000, 3 * 1000, 5 * 1000, 7 * 1000][this.tab_level.selectedIndex];
					dwHighLv = [0, 60, 70, 80, 2 * 1000, 4 * 1000, 6 * 1000, 8 * 1000][this.tab_level.selectedIndex];
					break;
				// 鞋子 腰带
				case 7: case 8:
					wType = this.tab_type.selectedIndex + 2;
					wSubType = this.tab_job.selectedIndex * 100;
					dwLowLv = [0, 1, 70, 80, 1 * 1000, 3 * 1000, 5 * 1000, 7 * 1000][this.tab_level.selectedIndex];
					dwHighLv = [0, 60, 70, 80, 2 * 1000, 4 * 1000, 6 * 1000, 8 * 1000][this.tab_level.selectedIndex];
					break;
				case 9: case 10: case 11:
					wType = this.tab_job.selectedIndex;
					break;
			}
			// console.log( )
			// 类型条件筛选
			wType && pkt.setValue('wType', wType);
			// 职业类型筛选
			wSubType && pkt.setValue('wSubType', wSubType);
			// 等级筛选
			dwLowLv && pkt.setValue('dwLowLv', dwLowLv);
			dwHighLv && pkt.setValue('dwHighLv', dwHighLv);
			// 模糊查询
			pkt.setValue('btFuzzyQuery', 0);
			lcp.send(pkt, this, (data) => {
				this.vbox_0.removeChildren();
				let pktcb = new ProtoCmd.stAuctionItemsRet(data);
				// 每页显示20条
				this.lbl_pageCount.text = '' + (pktcb.curPage + 1);
				this.lbl_maxPage.text = '' + (Math.floor(pktcb.totalItem / 20) + 1);
				for (let _item of pktcb.items) {
					let _ui_item = new view.compart.BaiTanBuyItem();
					let new_item = new ProtoCmd.stAuctionItemBase();
					new_item.clone(_item.data);
					_ui_item.setData(new_item);
					this.vbox_0.addChild(_ui_item);
				}
				pktcb.clear();
				pktcb = null;
			})
		}
	}
}