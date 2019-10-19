/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_TalentInfoItem extends ui.hero.Hero_TalentInfoItemUI {
		constructor() {
			super();
			this.setData();
		}
		public client_func_index = 54;
		public setData(): void {
			this.panel_talent.vScrollBarSkin = '';
			this.vbox_talent['sortItem'] = items => { };
			this.addEvent();
			this.activation();
			
		}
		public addEvent(): void {
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				GameUtil.setServerData(this.client_func_index);
				this.activation();
			})
		}
		public activation(): void {
			//判断是否激活
			if (GameUtil.getServerData(this.client_func_index)) {
				this.viw_talent.selectedIndex = 1;
				this.init_talentNum();
			}
			else {
				this.viw_talent.selectedIndex = 0;
			}
		}
		public init_talentNum(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_heroAllGeniusLvl, null, null, this, (jsonData) => {
				let keys = Object.keys(jsonData.lvltab);
				for (let key of keys) {
					let data = jsonData.lvltab[key];
					this.vbox_talent.addChild(new view.hero.Hero_TalentInfoFloorItem().setData(key))
				}
			})
			lcp.send(pkt);
		}
		public init_talentData(data: ProtoCmd.itf_Hero_TalentInfo): void {
			this.lbl_talentMagic.text = '' + data.gssecore;
		}
	}
}