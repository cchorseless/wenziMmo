/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_TalentInfoFloorItem extends ui.hero.Hero_TalentInfoFloorItemUI {
		constructor() {
			super();
		}
		public setData(key, data): Hero_TalentInfoFloorItem {
			let floor = parseInt(key) + 1;
			this.lbl_fool.text = '第' + floor + '重'
			this.init_type(data);
			this.init_panel(key);

			return this;
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
				let sum=jsonData.lvltab[0]+jsonData.lvltab[1]+jsonData.lvltab[2]+jsonData.lvltab[3];
				this.lbl_talentPoint.text = sum+'/10';
				
			})
			lcp.send(pkt)
			
		}
	}
}