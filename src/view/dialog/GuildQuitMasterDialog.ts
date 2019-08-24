/**Created by the LayaAirIDE*/
module view.dialog {
	export class GuildQuitMasterDialog extends ui.dialog.GuildQuitMasterDialogUI {
		constructor() {
			super();
		}
		public setData(item): GuildQuitMasterDialog {
			this.lbl_lvl.text = '' + item.dwLevel;
			this.lbl_szName.text = '' + item.szName;
			this.lbl_zhiWei.text = '帮主';
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close);
			this.btn_sure.on(Laya.UIEvent.CLICK, this, this.quitMaster)
		}

		/**
		 * 发起罢黜帮主
		 */
		public quitMaster(): void {
			if (this.txt_context.text.length <= 30) {
				TipsManage.showTips('请输入不小于30字的罢黜理由');
				return
			}
			let pkt = new ProtoCmd.stGlobalGuildBeginBanMaster();
			pkt.setValue('btType', 0);
			pkt.setValue('szDesc', this.txt_context.text);
			lcp.send(pkt, this, (data) => {
				this.close();
				let cbpackt = new ProtoCmd.stGlobalGuildBeginBanMasterRet(data);
				let errorcode = cbpackt.getValue('btErrorCode');
				if (errorcode == 0) {
					TipsManage.showTips('发起罢黜成功,请前往日志界面投票');
				}
				else {
					TipsManage.showTips('发起罢黜失败');
				}
				cbpackt.clear();
				cbpackt = null;
			})

		}
	}
}