/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_Npc_Detail_Dialog extends ui.npc.Main_Npc_Detail_DialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public npcID;
		public npcObj;
		public curExp;
		public lvl;
		public setData(obj: GameObject.Npc, exp, lvl) {
			this.curExp = exp;
			this.lvl = lvl;
			this.npcObj = obj;
			this.npcID = obj.feature.dwCretTypeId;
			this.init_Detail(0)
		}
		public addEvent() {
			this.tab_des.selectHandler = Laya.Handler.create(this, (index) => {
				this.init_Detail(index);
			}, null, false);
			this.btn_send.on(Laya.UIEvent.CLICK, this, function () {

			})
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			})
		}
		public init_Detail(index) {
			switch (index) {
				case 0:
					this.showNPCMsg();
					break;
			}
		}
		public textArr = [
			'死敌',
			'仇恨',
			'敌意',
			'冷淡',
			'初见',
			'融洽',
			'喜爱',
			'亲密',
			'灵犀',
			'不渝',
		];
		public showNPCMsg() {
			this.lab_haogan.text = this.textArr[this.lvl] + ' ' + this.curExp;
			// this.lab_lichang.text = SheetConfig.mydb_npcgen_tbl.getInstance(null)
			let itemMsg = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_LOVE(this.npcID);
			let itemlist = itemMsg.split('|');
			let xihaoStr = '';
			for (let i = 0; i < itemlist.length; i++) {
				xihaoStr += SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(itemlist[i]);
			}
			this.lab_xihao.text = xihaoStr;

			this.lab_mingyu.text = '中立';
			let menpaiID = SheetConfig.mydb_npcgen_tbl.getInstance(null).SECTS(this.npcID);

			// this.lab_lishu.text = SheetConfig.BaseMenPaiSheet.getInstance(null).NAME(menpaiID);

			this.lab_bili.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).STRENGTH(this.npcID);
			this.lab_dongcha.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).INSIGHT(this.npcID);
			this.lab_meili.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).CHARM(this.npcID);
			this.lab_koucai.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).ELOQUENCE(this.npcID);

			this.lab_gengu.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).BONE(this.npcID);
			this.lab_wuxing.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).UNDERSTANDING(this.npcID);


			this.lab_shenfen.text = '';
			this.lab_zhanlli.text = '';
			this.lab_gongji.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).ELOQUENCE(this.npcID);
			this.lab_fangyu.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).ELOQUENCE(this.npcID);
			this.lab_shengming.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).ELOQUENCE(this.npcID);

		}
		public showWuxue() {
			let skillArray = SheetConfig.mydb_npcgen_tbl.getInstance(null).SKILLS_UP_ITEM(this.npcID).split('|');
			let shu = 0;
			for (let i in skillArray) {
				if (parseInt(skillArray[i]) > 0) {
					let ui_item = new view.wuXue.WuXue_logoWithNameItem();
					let id = SheetConfig.mydb_magic_tbl.getInstance(null).getAllData(parseInt(skillArray[i]))[0];
					
				}
			}
		}
	}
}