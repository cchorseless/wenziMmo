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
		public monsterID;
		public setData(obj: GameObject.Npc, exp, lvl) {
			this.curExp = exp;
			this.lvl = lvl;
			this.npcObj = obj;
			this.npcID = obj.feature.dwCretTypeId;
			this.img_npc.skin = 'image/common/npc/npc_half_' + SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_ICON_NUMBER(this.npcID) + '.png'
			this.lab_name.text = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(this.npcID)
			this.lab_des.text = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_DES1(this.npcID)
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
					this.view_S_Show.selectedIndex = 0;
					this.showNPCMsg();
					this.box_send.visible = false;
					break;
				case 1:
					this.view_S_Show.selectedIndex = 1;
					this.showWuxue();
					this.box_send.visible = false;
					break;
				case 2:
					this.view_S_Show.selectedIndex = 2;
					this.showPingJia();
					this.box_send.visible = true;
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
			let arr = ['中庸','守序','唯我']
			this.lab_haogan.text = this.textArr[this.lvl] + ' ' + this.curExp;
			this.lab_lichang.text = arr[SheetConfig.mydb_npcgen_tbl.getInstance(null).ATTITUDE(this.npcID)]
			let itemMsg = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_LOVE(this.npcID);
			let itemlist = itemMsg.split('|');
			let xihaoStr = [];
			for (let i = 0; i < itemlist.length; i++) {
				xihaoStr.push(SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(itemlist[i]));
			}
			this.lab_xihao.text = xihaoStr.join('-');

			let mingyu = SheetConfig.mydb_npcgen_tbl.getInstance(null).REPUTATION(this.npcID);
			this.lab_mingyu.text = SheetConfig.reputation.getInstance(null).getNameByNum(mingyu)
			let menpaiID = SheetConfig.mydb_npcgen_tbl.getInstance(null).SECTS(this.npcID);

			this.lab_lishu.text = SheetConfig.BaseMenPaiSheet.getInstance(null).NAME(menpaiID);

			this.lab_bili.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).STRENGTH(this.npcID);
			this.lab_dongcha.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).INSIGHT(this.npcID);
			this.lab_meili.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).CHARM(this.npcID);
			this.lab_koucai.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).ELOQUENCE(this.npcID);

			this.lab_gengu.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).BONE(this.npcID);
			this.lab_wuxing.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).UNDERSTANDING(this.npcID);

			this.monsterID = SheetConfig.mydb_npcgen_tbl.getInstance(null).MONSTERID(this.npcID);
			this.lab_shenfen.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_NICKNAME(this.npcID);
			this.lab_zhanlli.text = '' + SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_COMBAT(this.monsterID);
			this.lab_gongji.text = '' + SheetConfig.mydb_monster_tbl.getInstance(null).MAX_ATK(this.monsterID);
			this.lab_fangyu.text = '' + SheetConfig.mydb_monster_tbl.getInstance(null).MAX_PD(this.monsterID);
			this.lab_shengming.text = '' + SheetConfig.mydb_monster_tbl.getInstance(null).MAX_HP(this.monsterID);

		}
		public showWuxue() {
			let skillArray = SheetConfig.mydb_npcgen_tbl.getInstance(null).SKILLS_UP_ITEM(this.npcID).split('|');
			let shu = 0;
			for (let i = 0; i < 6; i++) {
				this['ui_wuxue' + i].setInit();
			}
			for (let i = 0; i < skillArray.length; i++) {
				if (parseInt(skillArray[i]) > 0) {
					let configID = parseInt(skillArray[i]) * 100 + 1;
					this['ui_wuxue' + i].setData(configID);
				}
			}
			let items = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES(this.monsterID);
			let jiangliArr = items.split('|');
			let resultArr = [];
			for (let i = 0; i < jiangliArr.length; i++) {
				let base = jiangliArr[i].split('`');
				resultArr.push(parseInt(base[0]))
			}
			for (let i = 0; i < 8; i++) {
				this.ui_item0.initView
				this['ui_item' + i].initView()
			}
			if (resultArr.length > 0) {
				for (let i = 0; i < resultArr.length; i++) {
					if (i >= 8) {
						return;
					}
					if (resultArr[i] > 0) {
						this['ui_item' + i].setData(items[i], 10, 0, i);
					}
				}
			}

		}
		public showPingJia() {

		}
	}
}