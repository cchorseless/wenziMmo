/**Created by the LayaAirIDE*/
module view.dialog {
	export class SureOrCanelDialog extends ui.dialog.SureOrCanelDialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public model: EnumData.SureCanelModel;
		public extData;
		/**
		 * 
		 * @param model 
		 * @param txt 
		 * @param data 
		 */
		public setData(txt: string, model: EnumData.SureCanelModel, extData = null): SureOrCanelDialog {
			this.model = model;
			this.lbl_context.text = txt;
			this.extData = extData;
			return this;
		}
		public addEvent(): void {
			this.btn_canel.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			this.btn_sure.on(Laya.UIEvent.CLICK, this, () => {
				this.close('sure');
			});
		}
		public onClosed(type?: string): void {
			if (type === 'sure') {
				let pkt;
				switch (this.model) {
					// 背包内删除道具
					case EnumData.SureCanelModel.DELET_ITEM:
						pkt = new ProtoCmd.CretForsakeItem()
						pkt.setValue('i64id', this.extData)
						lcp.send(pkt, this, (data) => {
							let msg = new ProtoCmd.CretForsakeItem(data);
							let errorcode = msg.getValue('btErrorCode');
							switch (errorcode) {
								case 0:
									TipsManage.showTips('丢弃物品成功');
									break;
								case 33:
									TipsManage.showTips('绑定物品不允许丢弃');
									break;
								default:
									TipsManage.showTips('该物品不允许丢弃');
									break;
							}
							msg.clear();
							msg = null;
						});
						break;
					// 交易行购买道具
					case EnumData.SureCanelModel.JYH_BUY_ITEM:
						pkt = new ProtoCmd.stAuctionBuyItem();
						pkt.dwIndex = this.extData.dwIndex;
						lcp.send(pkt);
						break;
					// 公会界面购买沃玛号角
					case EnumData.SureCanelModel.BP_BUY_CREATEITEM:
						pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.BP_GouMaiCreateItem, null, this, (msgid, data: { tips: string }) => {
							TipsManage.showTips(data.tips);
							PanelManage.GuildSelect && PanelManage.GuildSelect.updateCreateUI();
						});
						lcp.send(pkt);
						break;
					// 公会界面驱逐成员
					case EnumData.SureCanelModel.BP_QUIT_MEMBER:
						let _dialog: view.dialog.GuildManageMemberDialog = Laya.Dialog.getDialogsByGroup('GuildManageMemberDialog')[0]
						_dialog.quitMemberCB();
						break;
					// 公会界面改变职位
					case EnumData.SureCanelModel.BP_CHANGE_ZHIWEI:
						let _dialog1: view.dialog.GuildManageMemberDialog = Laya.Dialog.getDialogsByGroup('GuildManageMemberDialog')[0]
						_dialog1.changeZhiWeiCB(this.extData);
						break;
				}

			}
		}
	}
}