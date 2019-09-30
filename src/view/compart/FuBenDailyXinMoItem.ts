/**Created by the LayaAirIDE*/
module view.compart {
	export class FuBenDailyXinMoItem extends ui.compart.FuBenDailyXinMoItemUI {
		constructor() {
			super();
		}
		public setData(boss: any, name: any, bossLvl: string, img_bossID: number, bossGet: any): FuBenDailyXinMoItem {
			this.on(Laya.UIEvent.CLICK, this, () => {
				//boss名称
				PanelManage.FuBenDaily.lbl_bossName.text = '' + name[0];
				PanelManage.FuBenDaily.lbl_bossTitle.text = '' + name[0];
				//boss坐标
				PanelManage.FuBenDaily.lbl_position.text = '(' + boss.x + ',' + boss.y + ')';
				//boss等级
				PanelManage.FuBenDaily.lbl_bossLvl.text = '' + bossLvl;
				//boss挑战等级
				PanelManage.FuBenDaily.lbl_challengeLvl.text = '' + boss.minlv;
				//boss造型
				PanelManage.FuBenDaily.img_boss.skin = 'image/common/npc/npc_half_' + img_bossID + '.png';
				//boss掉落奖励
				for (let i = 0; bossGet[i]; i++) {
					let itemData = new ProtoCmd.ItemBase();
					itemData.dwBaseID = 1111;
					let itemUI = new view.compart.DaoJuItem();
					itemUI.setData(itemData);
					PanelManage.FuBenDaily.hbox_xinMo1.addChild(itemUI);
				}
			})
			return this;
		}

	}
}