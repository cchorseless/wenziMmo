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
		//技能是否第一次学
		public skillFirst;
		public setData(obj: GameObject.Npc): Main_TanSuoV1Dialog {
			this.panel_jiaohu.vScrollBarSkin = '';
			this.vbox_jiaohu['sortItem'] = (items) => { };
			this.item = obj;
			//NPC姓名
			this.lbl_name.text = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME('' + obj.feature.dwCretTypeId);
			//造型图
			let icon = SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_NUMBER('' + obj.feature.dwCretTypeId);
			this.img_npc.skin = 'image/common/npc/npc_half_' + icon + '.png';
			this.init_haoganEvent();
			this.addEvent();
			this.init_npcTalk();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			//请教武学
			this.btn_wuxue.on(Laya.UIEvent.CLICK, this, () => {
				this.view_npc.selectedIndex = 1;
			})
		}
		public init_haoganEvent(): void {
			let pkID = this.item.feature.dwCretTypeId
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.clickNpc, [pkID], 0, this, function (data: ProtoCmd.itf_NPC_HaoGanInfo) {
				this.lvl = data.lvl;
				let haogan = LangConfig.RELATIONSHIP_TYPEDES(data.lvl);
				this.lbl_haogan.text = haogan[0];
				this.lbl_haogan.color = haogan[1];
				this.skillFirst = data.skillFirst;
				this.lbl_now.text = '' + data.curexp;
				this.lbl_max.text = '/' + data.maxexp;
				// let num = data.curexp / data.maxexp * 120;
				// if (data.curexp == 0 && data.maxexp == 0) {
				// 	this.img_haogan.width = 0;
				// } else {
				// 	this.img_haogan.width = num;
				// }
				//好感度冷淡以下得界面显示状态
				if (this.lvl > 3) {
					this.img_relation1.disabled = false;
					this.img_relation3.disabled = false;
					this.img_relation4.disabled = false;
				} else {
					//好感度冷淡以上
					this.img_relation1.disabled = true;
					this.img_relation3.disabled = true;
					this.img_relation4.disabled = true;
				}
				this.ui_wuxue.setData(this.item, this);
				// new view.npc.NpcInfoV1Dialog().setData(this.item).popup(true);
			})
			lcp.send(pkt);
		}
		/**
		 * npc对白
		 */
		public init_npcTalk(): void {
			//随机对白
			let talkArray = SheetConfig.mydb_npcgen_tbl.getInstance(null).TALKINFO_RANDOM('' + this.item.feature.dwCretTypeId).split('~');
			let index = Math.floor((Math.random() * talkArray.length));
			let lbl = new Laya.Label();
			lbl.fontSize = 20;
			lbl.font = 'FZXK';
			lbl.color = '#000000'
			lbl.x = 0;
			lbl.text = SheetConfig.NPC_specialtalkInfoSheet.getInstance(null).TALKINFO('' + talkArray[index]);
			lbl.width = this.panel_jiaohu.width;
			lbl.wordWrap = true;
			this.vbox_jiaohu.addChild(lbl);
		}
	}
}