/**Created by the LayaAirIDE*/
module view.compart {
	export class MonsterIconV0Item extends ui.compart.MonsterIconV0ItemUI {
		constructor() {
			super();
		}
		public ceng: number;
		public setData(charpterID, key: string, data: { lv: number, monsterid: number, need: number, star: number, type: number }) {
			this.ceng = parseInt(key);
			// 关卡名称
			let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = GameApp.GameEngine.allCharpterInfo[charpterID];
			if (charpterInfo) {
				this.lbl_name.text = charpterInfo.name;
			}
			// 怪物头像
			// todo
			this.img_monsterPic.skin = 'image/common/nppc/npc_icon_' + data.monsterid + '.png';
			let lvl = GameApp.MainPlayer.level;
			let needlvl = data.need;
			let mylvl = 0;
			let name;
			switch (data.type) {
				case 0:
					name = '';
					// this.lbl_needextra.visible = false;
					break;
				case 1:
					name = '装备强化等级'
					// this.lbl_needextra.text = '' + jsonData.need;
					break;
				case 2:
					mylvl = GameApp.MainPlayer.talentInfo[3];
					name = '神盾等级'
					// this.lbl_needextra.text = '' + jsonData.need;
					break;
				case 3:
					mylvl = GameApp.MainPlayer.talentInfo[1];
					name = '龙魂等级'
					// this.lbl_needextra.text = '' + jsonData.need;
					break;
				case 4:
					name = '罡气境界'
					// this.lbl_needextra.text = '' + jsonData.need;
					break;
				case 5:
					name = '武器等级'
					// this.lbl_needextra.text = '' + jsonData.need;
					break;
				case 6:
					name = '装备穿戴等级'
					// this.lbl_needextra.text = '穿戴' + jsonData.lv + '级' + jsonData.need + '件';
					break;
				case 8:
					mylvl = GameApp.MainPlayer.talentInfo[5];
					name = '善缘等级'
					// this.lbl_needextra.text = '' + jsonData.need;
					break;
			}
			if (lvl >= data.lv && mylvl >= needlvl) {
				if (data.star == 0) {
					this.lbl_label.visible = true;
					this.lbl_label.y = 20;
					this.lbl_label.height = 22;
					this.lbl_label.color = '#0f6809';
					this.lbl_label.text = '未通关';
					this.box_star.visible = false;
				} else {
					this.box_star.visible = true;
					this.lbl_label.visible = false;
					// 星级
					for (let i = 0; i < 3; i++) {
						this['btn_star' + i].selected = (i < data.star);
					}
				}
			}
			else {
				this.lbl_label.visible = true;
				this.lbl_label.y = 2;
				this.lbl_label.height = 44;
				this.lbl_label.color = '#a53232';
				if (data.type == 0) {
					this.lbl_label.text = '玩家等级达到' + data.lv + '解锁';
				}
				else {
					this.lbl_label.text = name + '达到' + needlvl + '解锁';
				}
				this.box_star.visible = false;
			}
		}

	}
}
