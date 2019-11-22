/**Created by the LayaAirIDE*/
module view.compart {
	export class MonsterIconV0Item extends ui.compart.MonsterIconV0ItemUI {
		constructor() {
			super();
		}
		public ceng: number;
		public setData(charpterID, key: string, data: {lv:number, monsterid: number,need:number,star: number,type:number }) {
			this.ceng = parseInt(key);
			// 星级
			if (data.star == 0 || data.star == undefined) {
				this.lbl_label.visible=true;
				this.lbl_label.height = 22;
				this.lbl_label.color = '#0f6809';
				this.lbl_label.text = '未通关';
				this.box_star.visible = false;
			} else {
				if(data.need!==undefined||data.need!==0){

				}
				this.box_star.visible = true;
				this.lbl_label.visible=false;
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
				this.img_monsterPic.skin='image/common/nppc/npc_icon_'+data.monsterid

			}
		}

	}
}
