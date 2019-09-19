/**Created by the LayaAirIDE*/
module view.compart {
	export class MonsterIconV0Item extends ui.compart.MonsterIconV0ItemUI {
		constructor() {
			super();
		}
		public ceng: number;
		public setData(charpterID, key: string, data: { star: number, monsterid: number }) {
			this.ceng = parseInt(key);
			// 星级
			for (let i = 0; i < 3; i++) {
				this['btn_star' + i].selected = (i < data.star);
			}
			// 关卡名称
			let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = GameApp.GameEngine.allCharpterInfo[charpterID];
			if (charpterInfo) {
				this.lbl_name.text = charpterInfo.events[key].eventname;
			}
			// 怪物头像
			// todo
			// this.img_monsterPic.skin=''

		}

	}
}
