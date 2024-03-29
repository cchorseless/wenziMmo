/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_IntegralDialog extends ui.luckDraw.LuckDraw_IntegralDialogUI {
		constructor() {
			super();
		}
		public score;
		public setData(score): LuckDraw_IntegralDialog {
			this.score = score;
			this.panel_integral.vScrollBarSkin = '';
			this.vbox_integral['sortItem'] = (items) => { };
			this.panel_record.vScrollBarSkin = '';
			this.vbox_record['sortItem'] = (items) => { };
			this.addEvent();
			let i = 1;
			this.init_Integral(i);
			this.btn_duihuan1.selected=true;
			// this.init_record();
			this.addLcpEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			for(let i=1;i<6;i++){
			this['btn_duihuan'+i].on(Laya.UIEvent.CLICK, this, () => {
				for(let j=1;j<6;j++){
					this['btn_duihuan'+j].selected=false;
				}
				this['btn_duihuan'+i].selected=true;
				this.init_Integral(i);
			})
			}
		}
		public init_Integral(i): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_BZ_SendPlaneMsg, [i], null, this, (jsonData) => {
				if (jsonData.wupinnum == '') {
					this.vbox_integral.removeChildren();
					this.box_none.visible = true;
				}
				else {
					let jifenInfo = jsonData.wupinnum.split('+')
					let keys = Object.keys(jifenInfo)
					this.vbox_integral.removeChildren();
					for (let key of keys) {
						this.vbox_integral.addChild(new view.luckDraw.LuckDraw_IntegralSingleItem().setData(jifenInfo[key], this.score,i))
					}
					this.box_none.visible = false;
				}

			})
			lcp.send(pkt);
		}
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.LD_DuiHuanSysRecord, this, (jsonData) => {
				let singleInfo = jsonData.record.split('+')
				this.vbox_record.removeChildren();
				for (let i = 0; singleInfo[i]; i++) {
					if (i % 2 == 0) {
						let j = i + 1
						this.vbox_record.addChild(new view.luckDraw.LuckDraw_RecordItem().init_jifenRecord(singleInfo[i], singleInfo[j]))
					}
				}
				console.log('====>兑换记录积分', jsonData)
			})
		}

		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.LD_DuiHuanSysRecord, this);
			super.destroy(isbool);
		}
	}
}