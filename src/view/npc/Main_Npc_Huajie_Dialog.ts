/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_Npc_Huajie_Dialog extends ui.npc.Main_Npc_Huajie_DialogUI {
		constructor() {
			super();
		}

		public npcID;
		public parentUI;
		public titleArr = ['化解仇恨', '获得体力'];
		public detailArr = [
			'好感度从敌意及以上阶段恢复到初见',
			'获得额外体力50点'];
		public coinArr = ['200', '50'];
		public dialogType;
		/**
		 * 
		 * @param npcid      NPC  id
		 * @param uiParent   父UI
		 * @param type       0：化解  1：体力购买
		 */
		public setData(npcid, uiParent, type) {
			this.addEvent();
			this.npcID = npcid;
			this.parentUI = uiParent;
			this.dialogType = type;
			this.lab_coinNum.text = this.coinArr[type];
			this.lab_detail.text = this.detailArr[type];
			this.lab_titleName.text = this.titleArr[type];
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			})
			this.btn_confirm.on(Laya.UIEvent.CLICK, this, function () {
				if (this.dialogType == 0) {
					this.onHuajie();
				}else if(this.dialogType == 1){
					this.onBuyTili();
				}

			})
		}
		public onBuyTili(){
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.buyTili,null, 0, this,
				function (res) {
					console.log('化解回调' + res)
					GameApp.LListener.event(view.main.Main_tanSuoItem.upDataTILI)
					this.close();
				})
				lcp.send(pkt);

		}
		public onHuajie() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.clickNpc, [this.npcID], 0, this,
				function (res) {
					console.log('化解回调' + res)
					this.parentUI.curExp = res.likeValue;
					this.parentUI.lvl = res.lvl;
					this.parentUI.updataHaoGan();
					this.parentUI.view_npc.selectedIndex = 0;
					let str = '';
					let npcName = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(this.npcID)
					if (res.ret == 0) {
						str = '化解仇恨成功'

					} else {
						str = '化解仇恨失败'
					}
					GameApp.LListener.event(Main_TanSuoV1Dialog.UPDATE_DETAIL, str)
					this.close();
				})
			lcp.send(pkt);
		}
	}
}