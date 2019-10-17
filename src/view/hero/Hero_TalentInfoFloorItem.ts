/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_TalentInfoFloorItem extends ui.hero.Hero_TalentInfoFloorItemUI {
		constructor() {
			super();
		}
		public skill = 1;
		public warrior = 1;
		public master = 1;
		public taoist = 1;
		public sum;
		public point;
		public type;
		public setData(key, data): Hero_TalentInfoFloorItem {
			let floor = parseInt(key) + 1;
			this.lbl_fool.text = '第' + floor + '重'
			this.init_type(data);
			this.init_panel(key);
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			if (this.sum !== 0) {
				this.box_skill1.on(Laya.UIEvent.CLICK, this, () => {
					this.box_skill1.gray = false;
					this.init_talentSkillType();
				})
				if (this.point == 5) {
					this.box_warrior1.on(Laya.UIEvent.CLICK, this, () => {
						this.box_skill1.gray = false;
						this.init_talentType();
					})
					this.box_master1.on(Laya.UIEvent.CLICK, this, () => {
						this.box_skill1.gray = false;
						this.init_talentType();
					})
					this.box_Taoist1.on(Laya.UIEvent.CLICK, this, () => {
						this.box_skill1.gray = false;
						this.init_talentType();
					})
				}
			}
		}
		/**
		 * 
		 * 技能状态
		 */
		public init_type(data): void {
			for (let i = 0; i < 4; i++) {
				let name;
				for (let j = 0; j < data[i]; j++) {
					switch (i) {
						case 0:
							name = 'skill';
							break;
						case 1:
							name = 'warrior';
							break;
						case 2:
							name = 'master';
							break;
						case 3:
							name = 'Taoist';
							break;
					}
					let num = j + 1;
					this['box_' + name + num].gray = false;
				}
			}
		}
		public init_panel(key): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_heroGeniusPanel, [key], null, this, (jsonData: ProtoCmd.itf_Hero_TalentInfo) => {
				console.log('========>弟子天赋', jsonData);
				let sum = jsonData.lvltab[0] + jsonData.lvltab[1] + jsonData.lvltab[2] + jsonData.lvltab[3];
				this.lbl_talentPoint.text = sum + '/10';
				this.sum = sum;
				this.point = jsonData.lvltab[0];
				PanelManage.DiZi.ui_talent.init_talentData(jsonData);
			})
			lcp.send(pkt)
		}
		public init_talentSkillType(): void {
			for (let i = 1; i < 6; i++) {
				this["box_skill" + i].on(Laya.UIEvent.CLICK, this, () => {
					if (i !== 1) {
						let b = i - 1;
						if (this.skill != b) {
							TipsManage.showTips("不能点亮")
						} else {
							//点亮
							this["box_skill" + i].gray = false;
							this.skill = i;
							this.type = this["box_skill" + i].gray;
						}
					}
				})
			}
		}
		public init_talentType(): void {
			for (let i = 1; i < 6; i++) {
				this["box_warrior" + i].on(Laya.UIEvent.CLICK, this, () => {
					if (i !== 1) {
						let b = i - 1;
						if (this.skill != b) {
							TipsManage.showTips("不能点亮")
						} else {
							//点亮
							this["box_warrior" + i].gray = false;
							this.warrior = i;
						}
					}
				})
				this["box_master" + i].on(Laya.UIEvent.CLICK, this, () => {
					if (i !== 1) {
						let b = i - 1;
						if (this.skill != b) {
							TipsManage.showTips("不能点亮")
						} else {
							//点亮
							this["box_master" + i].gray = false;
							this.master = i;
						}
					}
				})
				this["box_Taoist" + i].on(Laya.UIEvent.CLICK, this, () => {
					if (i !== 1) {
						let b = i - 1;
						if (this.skill != b) {
							TipsManage.showTips("不能点亮")
						} else {
							//点亮
							this["box_Taoist" + i].gray = false;
							this.taoist = i;
						}
					}
				})
			}
		}
	}
}