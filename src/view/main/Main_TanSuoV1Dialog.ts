/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_TanSuoV1Dialog extends ui.npc.Main_TanSuoV1DialogUI {
		constructor() {
			super();
		}
		//npc信息
		public item: GameObject.Npc;
		//好感度级别
		public lvl;
		public setData(obj: GameObject.Npc): Main_TanSuoV1Dialog {
			this.item = obj;
			//NPC姓名
			this.lbl_name.text = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME('' + obj.feature.dwCretTypeId);
			//造型图
			let icon = SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_NUMBER('' + obj.feature.dwCretTypeId);
			this.img_npc.skin = 'image/common/npc/npc_half_' + icon + '.png';
			this.init_haoganEvent();
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			//请教武学
			this.btn_wuxue.on(Laya.UIEvent.CLICK, this, () => {
				if (this.lvl) {
					new view.npc.Main_NPCWuXueDialog().setData(this.item, this).popup();
				}

			})
		}
		public init_haoganEvent(): void {
			let pkID = this.item.feature.dwCretTypeId
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.clickNpc, [pkID], 0, this, function (data: ProtoCmd.itf_NPC_HaoGanInfo) {
				this.lvl = data.lvl;
				this.lbl_now.text = '' + data.curexp;
				this.lbl_max.text = '/' + data.maxexp;
				let num = data.curexp / data.maxexp * 120;
				if (data.curexp == 0 && data.maxexp == 0) {
					this.img_haogan.width = 0;
				} else {
					this.img_haogan.width = num;
				}
				// new view.npc.NpcInfoV1Dialog().setData(this.item).popup(true);
			})
			lcp.send(pkt);
		}
	}
}