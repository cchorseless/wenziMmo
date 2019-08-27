/**Created by the LayaAirIDE*/
module view.dialog {
	export class GuildDonateShowDialog extends ui.dialog.GuildDonateShowDialogUI {
		constructor() {
			super();
		}
		public model: boolean;

		public setData(model, jsonData): GuildDonateShowDialog {
			this.model = model;
			// 标题
			this.lbl_title.text = model ? '捐献金币' : '捐献元宝';
			this.lbl_danWei.text = model ? '万' : '个';
			// 剩余捐献数量
			this.box_goldleft.visible = model;
			// 剩余金币捐献数量
			this.lbl_goldleft.text = '' + parseInt('' + jsonData.leftGold / 10000);
			// 捐献金币
			if (model) {
				this.box_huoyue.visible = jsonData.goldcnt == 0;
			}
			// 捐献元宝
			else {
				this.box_huoyue.visible = jsonData.rmbcnt == 0;
			}
			this.updateLbl();
			this.addEvent();
			return this;
		}

		public addEvent(): void {
			this.btn_go.on(Laya.UIEvent.CLICK, this, this.goJuanXian);
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close);
			// 价格框输入完成
			this.input_count.on(Laya.UIEvent.BLUR, this, () => {
				if (this.model) {
					this.input_count.text = '' + Math.min(parseInt(this.input_count.text), parseInt(this.lbl_goldleft.text), parseInt('' + GameApp.MainPlayer.wealth.gold / 10000));
				}
				else {
					let yuanBaoALL = GameApp.MainPlayer.wealth.yuanBao;
					this.input_count.text = '' + Math.min(parseInt(this.input_count.text), yuanBaoALL);
				}
				this.updateLbl();
				if (this.input_count.text == '0') { TipsManage.showTips('货币不足') }
			})
		}

		public updateLbl(): void {
			// 倍率 元宝是金币的两倍
			let _temp = this.model ? 1 : 2;
			this.lbl_exp.text = '' + _temp * parseInt(this.input_count.text);
			this.lbl_gongXian.text = '' + _temp * parseInt(this.input_count.text) * 10;
		}

		public goJuanXian(): void {
			this.close();
			if (this.input_count.text == '0') {
				TipsManage.showTips('捐献数量不能为0');
				return
			}
			let idx = this.model ? 2 : 1;//idx:1元宝 2金币
			let count = parseInt(this.input_count.text) * (this.model ? 10000 : 1);
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.BP_JuanXian, [idx, count]);
			lcp.send(pkt);
		}
	}
}