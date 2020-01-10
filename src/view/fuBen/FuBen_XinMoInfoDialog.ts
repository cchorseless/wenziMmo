/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_XinMoInfoDialog extends ui.fuBen.FuBen_XinMoInfoDialogUI {
		constructor() {
			super();
		}
		//心魔信息
		public data: ProtoCmd.itf_FB_XinMoInfo;
		//战斗索引
		public index;
		public setData(data, index): FuBen_XinMoInfoDialog {
			this.index = index;
			this.data = data[index];
			this.panel_item.hScrollBarSkin = '';
			this.hbox_item['sortItem'] = (items) => { };
			this.init_bossInfo();
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			//战斗
			EventManage.onWithEffect(this.btn_battle, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.FB_GeRenBoss_Enter, [this.index])
				lcp.send(pkt);
				this.close();
			});
		}
		public init_bossInfo(): void {
			//boss造型
			let imgItem = SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE('' + this.data.monsterid);
			this.img_icon.skin = 'image/common/npc/npc_half_' + imgItem + '.png';
			//boss[1]名称
			let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + this.data.monsterid).split("_");
			this.lbl_name.text = '' + name[0];
			//boss等级
			let level = SheetConfig.mydb_monster_tbl.getInstance(null).LEVEL('' + this.data.monsterid);
			this.lbl_lvl.text = '[' + level + '级]';
			//BOSS描述
			let detail = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTERDES('' + this.data.monsterid);
			this.lbl_des.text = '' + detail;
			//击败心魔可获得经验
			this.lbl_exp.text = '' + SheetConfig.mydb_monster_tbl.getInstance(null).EMPIRICAL_VALUE('' + this.data.monsterid);
			//掉落奖励
			let jiangli = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES('' + this.data.monsterid);
			this.hbox_item.removeChildren();
			for (let i = 0; jiangli[i]; i++) {
				let _itemUI = new view.compart.DaoJuWithNameItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = jiangli[i];
				_itemUI.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.hbox_item.addChild(_itemUI)
			}
			//挑战等级限制
			let mylvl = GameApp.MainPlayer.level;
			let myzslvl = GameApp.MainPlayer.zslevel;
			this.btn_battle.disabled = false;
			let lvl = ''
			if (this.data.minzslv && myzslvl < this.data.minzslv || this.data.maxzslv && mylvl > this.data.maxzslv) {
				this.btn_battle.disabled = true;
			}
			if (this.data.minlv && mylvl < this.data.minlv || this.data.maxlv && mylvl > this.data.maxlv) {
				this.btn_battle.disabled = true;
			}
			if (this.data.minzslv) { lvl = this.data.minzslv + '转'; }
			if (this.data.minlv) { lvl = this.data.minlv + '级'; }
			//需求等级
			this.lbl_need.text = lvl;
			//已挑战次数
			this.lbl_cont.text = '' + (this.data.maxcnt - this.data.flag);
			//最大挑战次数
			this.lbl_max.text = '/' + this.data.maxcnt;
			//怪物职业
			let job = SheetConfig.mydb_monster_tbl.getInstance(null).OCCUPATION('' + this.data.monsterid);
			this.img_job.skin = 'image/common/img_job0' + job + '.png'
			this.lbl_job.text = LangConfig.JOB_TYPEDES[EnumData.JOB_TYPE[job]];
			//战力
			this.lbl_battle.text = '' + SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_COMBAT('' + this.data.monsterid);
			//技能
			this.panel_skill.removeChildren();
			let skills = SheetConfig.mydb_monster_tbl.getInstance(null).SKILL_NUMBER('' + this.data.monsterid).split(',');
			for (let i in skills) {
				let skill = skills[i].split('/');
				let num = parseInt(i);
				if (skill) {
					let ui_skill = new view.compart.SkillItemWithName();
					ui_skill.x = num % 3 * (ui_skill.width + 20);
					ui_skill.y = Math.floor(num / 3) * (ui_skill.height + 10);
					ui_skill.setData(skill[0], skill[1]);
					this.panel_skill.addChild(ui_skill);
				}
			}
		}
	}
}