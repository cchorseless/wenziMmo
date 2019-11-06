/**Created by the LayaAirIDE*/
module view.menu {
	export class MenuQiandaoDialog extends ui.menu.MenuQiandaoDialogUI {
		constructor() {
			super();
			this.setData();
		}
		//累计签到奖励组
		public WupinArray;
		//button索引
		public idx;
		public setData(): void {
			this.list_sign.vScrollBarSkin = '';
			this.tab_sign.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_sign.selectedIndex = index;
				this.init_jiangli();
			}, null, false);
			this.addEvent();
			this.init_signPanel();
		}
		public addEvent(): void {
			//关闭弹窗
			this.btn_qiandaoClose.on(Laya.UIEvent.CLICK, this, this.onclose)
			//领取签到累计奖励
			this.btn_get.on(Laya.UIEvent.CLICK, this, () => {
				this.init_get();
			})
			this.addLcpEvent();

		}
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.Menu_QianDao_DaKai, this, (jsonData) => {
				console.log('=====>签到签到', jsonData)
				//可补签次数
				this.lbl_buqian.text = '' + jsonData.buQianNum;
				let date = jsonData.history.split('+')
				//已签到天数
				if (jsonData.history == '') {
					this.lbl_date.text = '0';
				} else {
					let keys = Object.keys(date);
					let dayNum = 0
					for (let key of keys) {
						dayNum = dayNum + 1
					}
					this.lbl_date.text = '' + dayNum;
				}
				//漏签天数
				let count = jsonData.curtimetab[3] - parseInt(this.lbl_date.text) - 1
				if (count < 0) {
					this.lbl_num.text = '0';
				}
				else {
					this.lbl_num.text = '' + count;
				}
				//签到item
				this.list_sign.array = []
				for (let i = 1; i < (jsonData.qiaodaoday + 1); i++) {
					this.list_sign.array.push(i);
				}
				this.list_sign.itemRender = view.menu.MenuQiandaoItem;
				this.list_sign.renderHandler = Laya.Handler.create(this, (cell: view.menu.MenuQiandaoItem, index) => {
					cell.setData(cell.dataSource, date, jsonData.curtimetab[3], jsonData.buQianNum);

				}, null, false)
				this.WupinArray = jsonData.itemtab;
				this.init_jiangli();
			})

		}
		public onclose(): void {
			GameApp.LListener.offCaller(ProtoCmd.Menu_QianDao_DaKai, this);
			this.close();
		}
		/**
		 * 签到面板
		 */
		public init_signPanel(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Menu_QianDao_DaKai);
			lcp.send(pkt);
		}
		/**
		 * 领取
		 */
		public init_get(): void {
			let type = this.tab_sign.selectedIndex;
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Menu_qiandaolingqu, [this.idx]);
			lcp.send(pkt);
		}
		public init_jiangli(): void {
			//签到奖励排序
			let itemsInfo = Object.keys(this.WupinArray)
			let itemArray = [];
			for (let itemInfo of itemsInfo) {
				itemArray.push(this.WupinArray[itemInfo]);
			}
			function compare(property) {
				return function (a, b) {
					var value1 = a[property];
					var value2 = b[property];
					return value1 - value2;
				}
			}
			let array = itemArray.sort(compare('idx'))
			let tabLable = [];
			for (let i = 0; array[i]; i++) {
				this['hbox_sign' + i].removeChildren();
			}
			//签到奖励
			for (let i = 0; i < 5; i++) {
				tabLable.push('签到' + array[i].idx + '天')
				let itemKeys = Object.keys(array[i].items)
				for (let itemKey of itemKeys) {
					let itemdata = array[i].items[itemKey]
					let ui_item = new view.compart.DaoJuItem;
					let info = new ProtoCmd.ItemBase;
					info.dwBaseID = itemdata.indexv;
					info.dwBinding = itemdata.binding;
					info.dwCount = itemdata.num;
					ui_item.setData(info, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					this['hbox_sign' + i].addChild(ui_item)
				}
				let btntype = this.tab_sign.selectedIndex;
				this.idx = array[btntype].idx;
				switch (array[btntype].status) {
					case 0:
						this.btn_get.gray = true;
						this.btn_get.mouseEnabled = false;
						this.btn_get.label = '领取';
						break;
					case 1:
						this.btn_get.gray = false;
						this.btn_get.mouseEnabled = true;
						this.btn_get.label = '领取';
						break;
					case 2:
						this.btn_get.gray = true;
						this.btn_get.mouseEnabled = false;
						this.btn_get.label = '已领取';
						break;
				}
			}
			this.tab_sign.labels = '' + tabLable;
		}
	}
}