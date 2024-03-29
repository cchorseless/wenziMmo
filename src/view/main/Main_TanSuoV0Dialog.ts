/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_TanSuoV0Dialog extends ui.npc.Main_TanSuoV0DialogUI {
		constructor() {
			super();
		}
		/**
		 * 
		 * @param data 采集物信息
		 * @param type 类型：0采集物1怪物2无好感NPC（功能NPC）
		 */
		public item;
		public setData(data, type: number): Main_TanSuoV0Dialog {
			this.panel_jiaohu.vScrollBarSkin = '';
			this.vbox_jiaohu['sortItem'] = (items) => { };
			this.item = data;
			this.img_battle.visible = false;
			this.view_type.selectedIndex = type;
			this.lbl_level.text = 'LV.' + data.level;
			if (type == 0) {
				//采集物頭像图
				let head = SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE('' + data.feature.dwCretTypeId);
				this.img_tu.skin = PathUtil.getNpcIconPath(head);

			} else if (type == 1) {
				this.img_battle.visible = true;
				this.lbl_battle.text = '' + SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_COMBAT('' + data.feature.dwCretTypeId)
				//造型图
				let half = SheetConfig.mydb_monster_tbl.getInstance(null).STYLE_DRAWING('' + data.feature.dwCretTypeId);
				this.img_tu.skin = PathUtil.getNpcHalfPath(half);
			}
			switch (type) {
				//0采集物1怪物2无好感NPC（功能NPC）
				case 0:
				case 1:
					let bossInfo: GameObject.Monster = data;
					//怪物名称
					this.lbl_name.text = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + bossInfo.feature.dwCretTypeId);
					let lbl1 = new Laya.Label();
					lbl1.fontSize = 20;
					lbl1.font = 'FZXK';
					lbl1.color = '#000000'
					lbl1.x = 0;
					lbl1.text = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTERDES('' + bossInfo.feature.dwCretTypeId);
					lbl1.width = this.vbox_jiaohu.width;
					lbl1.wordWrap = true;
					this.vbox_jiaohu.addChild(lbl1);
					break;
				case 2:
					//无好感NPC（功能NPC）
					let npcInfo: GameObject.Npc = data;
					//NPC名称
					this.lbl_name.text = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME('' + npcInfo.feature.dwCretTypeId);
					//造型图
					let half = SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_NUMBER('' + data.feature.dwCretTypeId);
					this.img_tu.skin = PathUtil.getNpcHalfPath(half);
					this.init_npcTalk();
					break;
			}
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
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