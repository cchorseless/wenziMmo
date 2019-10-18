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
		public data: ProtoCmd.itf_Hero_TalentInfo;
		public index;
		public setData(key): Hero_TalentInfoFloorItem {
			let floor = parseInt(key) + 1;
			this.lbl_fool.text = '第' + floor + '重'
			this.init_panel(key);
			this.sendData(key);
			this.addEvent(key);
			return this;
		}
		public addEvent(key): void {
			for (let i = 1; i < 6; i++) {
				this['box_skill' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.index = 0;
					new view.hero.Hero_talentInfoDialog().setData(this.index, i, this.data,key).popup(true);
				})
				this['box_warrior' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.index = 1;
					new view.hero.Hero_talentInfoDialog().setData(this.index, i, this.data,key).popup(true);
				})
				this['box_master' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.index = 2;
					new view.hero.Hero_talentInfoDialog().setData(this.index, i, this.data,key).popup(true);
				})
				this['box_Taoist' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.index = 3;
					new view.hero.Hero_talentInfoDialog().setData(this.index, i, this.data,key).popup(true);
				})
			}
		}
		/**
		 * 
		 * 天赋状态
		 */
		public init_type(data): void {
			//初始化天赋
			for (let i = 0; i < 4; i++) {
				let name;
				for (let j = 0; j < 5; j++) {
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
					this['box_' + name + num].gray = true;
				}
			};
			//刷新天赋状态
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
			GameApp.LListener.on(ProtoCmd.Hero_heroGeniusPanel, this, (jsonData: ProtoCmd.itf_Hero_TalentInfo) => {
				console.log('========>弟子天赋', jsonData);
				let sum = jsonData.lvltab[0] + jsonData.lvltab[1] + jsonData.lvltab[2] + jsonData.lvltab[3];
				this.lbl_talentPoint.text = sum + '/10';
				this.data = jsonData;
				PanelManage.DiZi.ui_talent.init_talentData(jsonData);
				this.init_type(jsonData.lvltab);
			})
			lcp.send(pkt)
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.Hero_heroGeniusPanel, this);
			super.destroy(isbool);
		}
		public sendData(key): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_heroGeniusPanel, [key])
			lcp.send(pkt);
		}
	}
}