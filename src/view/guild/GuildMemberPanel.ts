/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildMemberPanel extends ui.guild.GuildMemberPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_all.vScrollBarSkin = '';
			this.vbox_all['sortItem'] = (items) => { };
			for (let i = 0; i < 6; i++) {
				this['vbox_' + i]['sortItem'] = (items) => { };
			}
			this.initUI()
			this.addEvent();
		}

		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			});
			// 伸缩展开
			for (let i = 0; i < 6; i++) {
				this['btn_' + i].on(Laya.UIEvent.CLICK, this, this.getMemberInfo, [i]);
			}
		}
		
		public initUI(): void {
			// 获取称号列表和人数
			let pkt1 = new ProtoCmd.stGlobalGuildGetAlia();
			lcp.send(pkt1, this, (data) => {
				let cbpkt1 = new ProtoCmd.stGlobalGuildGetAliaRet(data);
				//格式：称号:人数/称号:人数
				let szAliaNames: string = cbpkt1.getValue('szAliaNames');
				let _strList: Array<string> = szAliaNames.split('/');
				let memberInfo = { '帮主': 0, '副帮主': 1, '长老': 2, '大将': 3, '精英': 4, '帮会成员': 5 };
				for (let _data of _strList) {
					let _dataList = _data.split(':');
					if (_dataList[0]) { this['lbl_' + memberInfo[_dataList[0]]].text = '' + _dataList[1] }
				}
				cbpkt1.clear();
				cbpkt1 = null;
			})
		}

		/**
		 * 拉取成员列表
		 */
		public getMemberInfo(i): void {
			let btn: Laya.Button = this['btn_' + i];
			let vbox: Laya.VBox = this['vbox_' + i];
			let lbl: Laya.Label = this['lbl_' + i];
			// 数量为0不能展开
			if (lbl.text === '0') { return };
			let memberInfo = { 0: '帮主', 1: '副帮主', 2: '长老', 3: '大将', 4: '精英', 5: '帮会成员' };
			// 更改按钮状态
			this['btn_' + i].selected = !this['btn_' + i].selected;
			// 无子对象 则发协议拉取.默认有一个子对象
			if (vbox.numChildren == 1) {
				let pkt = new ProtoCmd.stGlobalGuildGetAliaMember();
				pkt.setValue('szAliaName', memberInfo[i]);
				lcp.send(pkt, this, (data) => {
					let cbpkt = new ProtoCmd.stGlobalGuildGetAliaMemberRet(data);
					for (let _memberInfo of cbpkt.stZeroArray) {
						let ui = new view.compart.GuildMemberItem();
						let item = new ProtoCmd.AliaMemberInfoBase()
						item.clone(_memberInfo.data);
						ui.setData(item, memberInfo[i]);
						vbox.addChild(ui);
					}
				});
			}
			else {
				for (let j = 1; j < vbox.numChildren; j++) {
					vbox.getChildAt(j)['scaleY'] = btn.selected ? 1 : 0;
				}
			}
		}
	}
}