/**Created by the LayaAirIDE*/
module view.menu {
	export class MenuGuessDialog extends ui.menu.MenuGuessDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public vip;
		public jingcai;
		public setData(): void {
			this.addEvent();
			this.init_GetData();
		}
		public addEvent(): void {
			//关闭弹窗
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			//前往充值&&参加竞猜
			this.btn_ok.on(Laya.UIEvent.CLICK, this, () => {
				if (this.vip == 0) {
					let o = new view.recharge_vip.Recharge_VipDialog();
					o.setData(1);
					o.popup(true);
					this.close();
				}
				else {
					if (this.jingcai == 0) {
						this.init_guess();
					}
					else {
						TipsManage.showTips('您已参与过竞猜，请等待公布结果')
					}
				}
			})
			//获奖情况
			this.btn_situation.on(Laya.UIEvent.CLICK, this, () => {
				new view.menu.MenuGetSituationDialog().popup();
			})
			this.addLcpEvent();
		}
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.Menu_JingCaiClientOpen, this, (jsonData: ProtoCmd.itf_Menu_GuessInfo) => {
				//活动时间
				this.lbl_time.text = TimeUtils.getFormatBySecond(jsonData.leftsec, 5);
				this.vip = jsonData.vip;
				this.jingcai = jsonData.jingcai;
				//参与竞猜的人数
				this.lbl_num.text = '' + jsonData.num;
				//判断是否是VIP
				if (jsonData.vip == 0) {
					this.input_num.visible = false;
					this.btn_ok.label = '成为VIP';
				}
				else {
					this.input_num.visible = true;
					this.btn_ok.label = '确定';
				}
				//竞猜值
				if (jsonData.jingcai !== 0) {
					this.input_num.text = '' + jsonData.jingcai;
					this.input_num.editable = false;
				}
				else {
					this.input_num.text = '';
					this.input_num.editable = true;
				}
				console.log('====>全民竞猜', jsonData)
			})
		}
		/**
		 * 拉取竞猜面板数据
		 */
		public init_GetData(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Menu_JingCaiClientOpen);
			lcp.send(pkt);
		}
		/**
		 * 参与竞猜
		 */
		public init_guess(): void {
			if (this.input_num.text !== '') {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.Menu_JingCai,[this.input_num.text])
				lcp.send(pkt);
			}
			else {
				TipsManage.showTips('请输入竞猜数字')
			}
		}
	}
}