/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_ZhuXianContent_Dialog extends ui.fuBen.FuBen_ZhuXianContent_DialogUI {
		public static self: FuBen_ZhuXianContent_Dialog;
		public cengID;
		public hasGet;
		constructor() {
			super();
			FuBen_ZhuXianContent_Dialog.self = this;
			this.addEvent();
		}
		public setData(stageData, data) {
			this.cengID = stageData.ceng;
			this.hbox_1.removeChildren();
			this.hbox_2.removeChildren();
			this.panel_reward1.removeChildren();
			this.panel_reward2.removeChildren();
			this.hasGet = stageData.star > 0;
			this.html_StageName.style.fontFamily = 'STXingkai';
			this.html_StageName.style.fontSize = 28;
			this.html_StageName.style.align = 'center';
			this.html_StageName.style.color = '#000000';
			this.html_StageName.innerHTML = "<span>" + stageData.title + '</span>';
			this.html_first.style.fontFamily = this.html_drop.style.fontFamily = this.html_wuxue.style.fontFamily = 'STXingkai';
			this.html_first.style.fontSize = this.html_drop.style.fontSize = this.html_wuxue.style.fontSize = 26;
			this.html_first.style.align = this.html_drop.style.align = this.html_wuxue.style.align = 'center';
			this.html_first.style.color = this.html_drop.style.color = this.html_wuxue.style.color = '#000000';
			this.html_wuxue.innerHTML = "<span>" + '修炼武学' + '</span>';
			this.html_first.innerHTML = "<span>" + '普通奖励' + '</span>';
			this.html_drop.innerHTML = "<span>" + '几率掉落' + '</span>';

			this.html_times.style.fontFamily = 'STKaiti';
			this.html_times.style.fontSize = 22;
			this.html_times.style.align = 'center';
			this.html_times.innerHTML = "<span style='color:#ff8b8b'>" + FuBen_MainPanel.self.curTimes
				+ '</span>' + "<span style='color:#000000'>/" + FuBen_MainPanel.self.maxTimes + '</span>';

			let attack = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_COMBAT(stageData.monsterid)
			let desc = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTERDES(stageData.monsterid)
			// let exp = SheetConfig.mydb_monster_tbl.getInstance(null).EMPIRICAL_VALUE(stageData.monsterid)
			let monsterSkillID = SheetConfig.mydb_monster_tbl.getInstance(null).SKILL_NUMBER(stageData.monsterid)
			let iconID = SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE(stageData.monsterid)
			let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME(stageData.monsterid)
			this.lab_BossName.text = name;
			this.lab_Attack.text = attack + '';
			this.img_Icon.skin = 'image/common/npc/npc_icon_' + iconID + '.png';
			// this.lab_exp.text = exp + '';
			this.lab_desc.text = desc;
			let skillArr = monsterSkillID.split(',');
			if (skillArr.length > 1) {
				this.showSkill(skillArr);
			} else if (skillArr.length == 1) {
				let base = monsterSkillID.split('/');
				let skillID = parseInt(base[0]) * 100 + parseInt(base[1])
				let o = new FuBen_BossWuXueItem();
				o.setData(skillID)
				this.hbox_1.addChild(o);
			}
			let firstReward = SheetConfig.Thread_sweep_tbl.getInstance(null).FIRST_AWARD(this.cengID);
			let dropReward = SheetConfig.Thread_sweep_tbl.getInstance(null).SWEEPING_AWARD(this.cengID);
			let item;
			let dropItems;

			item = firstReward.split('|');
			for (let i = 0; i < item.length; i++) {
				let o = new FuBen_RewardItem();
				let itembase = new ProtoCmd.ItemBase();
				let base = item[i].split('`')
				itembase.dwBaseID = base[0];
				itembase.dwCount = base[1];
				o.setData(itembase, this.hasGet)
				o.x = i * o.width + 20;
				this.panel_reward1.addChild(o)
			}

			dropItems = dropReward.split('|');
			let item0 = { index: 0, num: 0, bind: 0 };
			let item1 = { index: 0, num: 0, bind: 0 };
			for (let i = 0; i < dropItems.length; i++) {
				let o = new compart.DaoJuWithNameItem();
				let itembase = new ProtoCmd.ItemBase();
				let base = dropItems[i].split('`')

				if (parseInt(base[0]) != 20001 && parseInt(base[0]) != 20015) {
					itembase.dwBaseID = parseInt(base[0]);
					itembase.dwCount = parseInt(base[1]);
					o.setData(itembase)
					o.x = this.panel_reward2.numChildren * o.width + 20;
					this.panel_reward2.addChild(o);
				} else if (parseInt(base[0]) == 20015) {
					this.lab_yuanbao.text = base[1];
					item0.index = 20015;
					item0.num = base[1];
					item0.bind = 1;
					GameApp.MainPlayer.zhuxianFuBenReward[0] = item0
				} else if (parseInt(base[0]) == 20001) {
					this.lab_exp.text = base[1];
					item1.index = 20001;
					item1.num = base[1];
					item1.bind = 1;
					GameApp.MainPlayer.zhuxianFuBenReward[1] = item1;
				}


			}
		}
		public addEvent() {
			this.btn_fight.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.FB_ChuMoEnter, [this.cengID], 0, this, function (res) {
					console.log('CHUMO' + res)
				});
				lcp.send(pkt);
				this.close();
			})
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			})
			this.btn_timesAdd.on(Laya.UIEvent.CLICK, this, function () {
				// TODO
			})
		}
		public showSkill(skillArr) {
			for (let i = 0; i < skillArr.length; i++) {
				let base = skillArr[i].split('/')
				let skillID = parseInt(base[0]) * 100 + parseInt(base[1])
				let o = new FuBen_BossWuXueItem();
				o.setData(skillID)
				if (i < 3) {
					this.hbox_1.addChild(o);
				} else {
					this.hbox_2.addChild(o);
				}
			}
		}
	}
}