/**Created by the LayaAirIDE*/
module view.main {
	export class Main_BriskDialog extends ui.main.Main_BriskDialogUI {
		constructor() {
			super();
			this.setData();
		}
		//宝箱奖励信息
		public prize;
		public setData(): void {
			this.panel_brisk.vScrollBarSkin = '';
			this.vbox_brisk['sortItem'] = (items) => { };
			this.addEvent();
			this.init_huoYue();
		}
		public addEvent(): void {
			//关闭弹窗
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			//监听宝箱奖励
			for (let i = 1; i < 5; i++) {
				this['img_baoxiang' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.init_baoxiangClick(i);
				})
			}
			this.addLcpEvent();
		}
		/**
		 * 活跃发包
		 */
		public init_huoYue(): void {
			let pkt = new ProtoCmd.QuestClientData;
			pkt.setString(ProtoCmd.TASK_HuoYueDuClientOpen)
			lcp.send(pkt);

		}
		/**
	* 活跃
	* 
	*/
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.TASK_HuoYueDuClientOpen, this, (jsonData) => {
				this.prize = jsonData.wardtab;
				let keys = Object.keys(jsonData.tab);
				console.log('=====>宝箱活跃度', jsonData)
				//当前活跃度
				if (jsonData.value < jsonData.maxvalue) {
					//当前活跃度<最大活跃度时
					this.lbl_huoyue.text = '' + jsonData.value;
					//当前活跃度/最大活跃度时<1时，进度条长度
					this.img_pregress.width = 447 * jsonData.value / jsonData.maxvalue;
				}
				else {
					//当前活跃度>=最大活跃度时,显示最大活跃度
					this.lbl_huoyue.text = '' + jsonData.maxvalue;
					//当前活跃度/最大活跃度时>=1时，进度条长度
					this.img_pregress.width = 447;
				}
				for (let key of keys) {
					let data = jsonData.tab[key];
					this.vbox_brisk.addChild(new view.main.Main_BriskItem().setData(data));
				}
				for (let i = 1; jsonData.wardtab[i]; i++) {
					switch (jsonData.wardtab[i].bj) {
						case 0:
							this['img_baoxiang' + i].skin = 'image/common/icon_baoxiang' + i + '_close.png'
							break;
						case 1:
							this['img_baoxiang' + i].skin = 'image/common/icon_baoxiang' + i + '_light.png'
							break;
						case 2:
							this['img_baoxiang' + i].skin = 'image/common/icon_baoxiang' + i + '_open.png'
							break;
					}
				}
			})
		}
		public Dispose(): void {
			GameApp.LListener.offCaller(ProtoCmd.TASK_HuoYueDuClientOpen, this);
			PopUpManager.Dispose(this);
		}
		/**
		 * 宝箱监听事件
		 * @param i 宝箱索引
		 */
		public init_baoxiangClick(i): void {
			if (this.prize) {
				if (this.prize[i].bj == 1) {
					//领取宝箱奖励
					this.init_getPrize(i);
				} else {
					//查看宝箱奖励
					this.addChild(new view.compart.BaoxiangPrizeItem().init_pos(this['img_baoxiang' + i], this.prize[i].item));
				}
			}
		}
		/**
		 * 领取宝箱奖励
		 * @param i 宝箱索引
		 */
		public init_getPrize(i): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.TASK_HuoYueGetWard, [i])
			lcp.send(pkt);
		}
	}
}