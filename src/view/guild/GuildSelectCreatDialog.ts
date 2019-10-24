/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildSelectCreatDialog extends ui.guild.GuildSelectCreatDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.addEvent();
			this.updateCreateUI();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			// 创建行会
			this.btn_create.on(Laya.UIEvent.CLICK, this, this.createBangPai);
			// 购买沃玛号角
			this.btn_createItemBuy.on(Laya.UIEvent.CLICK, this, this.buyCreateItem);
		}
		/**
	  * 创建帮会
	  */
		public createBangPai(): void {
			// 防止重复点击
			this.btn_createItemBuy.disabled = true;
			let bangPaiName = this.input_bangPaiName.text;
			let bangPaiKouHao = this.input_bangPaiSlogan.text;

			if (!bangPaiKouHao) {
				TipsManage.showTips('请输入帮派名称');
				this.btn_createItemBuy.disabled = false;
				return
			}

			if (!bangPaiKouHao) {
				TipsManage.showTips('请输入帮派口号');
				this.btn_createItemBuy.disabled = false;
				return
			}
			// 创建行会
			let pkt = new ProtoCmd.stCreatGlobalGuild();
			pkt.setValue('btOPType', 0);
			pkt.setValue('szGuildName', this.input_bangPaiName.text);
			pkt.setValue('szGuildNotice', this.input_bangPaiSlogan.text);
			lcp.send(pkt, this, (data) => {
				let cbpkt1 = new ProtoCmd.stCreatGlobalGuildRet(data);
				let dwGuildId = cbpkt1.getValue('dwGuildId');// 行会ID
				let errorcode: EnumData.emGuildDonateErrorCode = cbpkt1.getValue('errorcode');
				switch (errorcode) {
					// 创建成功
					case 0:
						PanelManage.openGuildTeamPanel(dwGuildId);
						this.close();
						break;
					// 创建失败
					default:
						TipsManage.showTips('帮派名称重复');
						this.btn_createItemBuy.disabled = false;
						break;
				}

				cbpkt1.clear();
				cbpkt1 = null;
			})
		}
		/**
		 * 购买号角
		 */
		public buyCreateItem(): void {
			if (GameApp.MainPlayer.wealth.yuanBao < 1000) {
				TipsManage.showTips('元宝不足');
				return
			}
			new view.dialog.SureOrCanelDialog().setData('确花费1000元宝购买沃玛号角吗？', EnumData.SureCanelModel.BP_BUY_CREATEITEM).popup(true);
		}
		/**
			 * 更新创建公会UI
			 */
		public updateCreateUI(): void {
			// 检查背包内 沃玛号角
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.BP_getHaoJaoInfo, null, 0, this, (data: ProtoCmd.itf_Guild_HaoJiaoInfo) => {
				console.log(data);
				let needItemID = data.index;
				let needCount = GameUtil.findItemInBag(needItemID, GameApp.GameEngine.bagItemDB);
				if (needCount < data.num) {
					this.img_createItem.disabled = true;
					this.btn_createItemBuy.disabled = false;
				}
				else {
					this.img_createItem.disabled = false;
					this.btn_createItemBuy.disabled = true;
					// this.btn_createItemBuy.label = '已拥有';
				}
			})
			lcp.send(pkt);
		}

	}
}