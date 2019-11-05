/**Created by the LayaAirIDE*/
module view.menu {
	export class MenuGetSituationDialog extends ui.menu.MenuGetSituationDialogUI {
		constructor() {
			super();
			this.setData();
		}
		//获奖记录数据
		public data = null;;
		//当前页数
		public index = 1;
		//最大页数
		public maxNum;
		public setData(): void {
			this.addEvent();
			this.init_GetData()
		}
		public addEvent(): void {
			//关闭弹窗
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			//下一页
			this.btn_next.on(Laya.UIEvent.CLICK, this, () => {
				if (this.index < this.maxNum) {
					this.index = this.index + 1
					this.init_changeData();
				}
			})
			//上一页
			this.btn_last.on(Laya.UIEvent.CLICK, this, () => {
				if (this.index > 1) {
					this.index = this.index - 1;
					this.init_changeData();
				}
			})

		}
		public init_GetData(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Menu_JingCaiClientOpenEx, null, null, this, (jsonData: ProtoCmd.itf_Menu_GetSituationInfo) => {
				console.log('====>全民竞猜获奖情况', jsonData)
				this.data = jsonData.tab;
				this.init_changeData();
			});
			lcp.send(pkt);
		}
		public init_changeData(): void {
			if (this.data !== null) {
				let keys = Object.keys(this.data)
				//最大页数
				let max = Math.ceil(keys.length / 12)
				this.maxNum = max;
				this.lbl_max.text = '' + max;
				//当前页数
				this.lbl_now.text = '' + this.index;
				//每页从tab[begin]开始取值
				let begin = (this.index - 1) * 12 + 1;
				//最大页之前的每页从tab[end]结束取值
				let end = this.index * 12 + 1
				//最后一页记录的数量
				let shang = keys.length % 12
				this.vbox_record.removeChildren();
				if (this.index == this.maxNum) {
					//当前页就是最大页时
					for (let i = begin; i < (begin + shang); i++) {
						this.vbox_record.addChild(new view.menu.MenuGetSituationItem().setData(this.data[i]))
					}
				} else {
					//当前页不是最大页时
					for (let i = begin; i < end; i++) {
						this.vbox_record.addChild(new view.menu.MenuGetSituationItem().setData(this.data[i]))
					}
				}
			}

		}
	}
}