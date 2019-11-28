/**Created by the LayaAirIDE*/
module view.juese {
	export class Task_ChengJiuDialog extends ui.juese.Task_ChengJiuDialogUI {
		constructor() {
			super();
		}
		public setData(data: ProtoCmd.itf_JS_ShengWangInfo): Task_ChengJiuDialog {
			this.panel_achieve.vScrollBarSkin = '';
			this.vbox_achieve['sortItem'] = (items) => { };
			//声望名称
			for (let i = 0; data.titletab[i]; i++) {
				if (data.prestigeid == i) {
					this.lbl_prestigeName.text = '' + data.titletab[i].name;
				}
			}
			//我的声望icon
			this.img_prestige.skin = 'image/juese/icon_shengwang' + data.prestigeid + '.png';
			//声望经验值进度条
			this.img_jingyan.width = 280 * data.minexp / data.maxexp;
			//声望经验值
			this.lbl_jingyan.text = data.minexp + '/' + data.maxexp;
			//当前战力
			let battle = GameUtil.parseEffectidToObj(['' + data.effid]).battle[GameApp.MainPlayer.job];
			this.lbl_battle.text = '' + battle;
			//生命上限
			this.lbl_life.text = '' + SheetConfig.mydb_effect_base_tbl.getInstance(null).NONPAREIL_TYPE_MAXHP('' + data.effid);
			//物理攻击
			let min = SheetConfig.mydb_effect_base_tbl.getInstance(null).NONPAREIL_TYPE_MINDC('' + data.effid);
			let max = SheetConfig.mydb_effect_base_tbl.getInstance(null).NONPAREIL_TYPE_MAXDC('' + data.effid);
			this.lbl_phKill.text = min + '-' + max;
			this.init_taskList();
			return this;
		}
		public init_taskList(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.TASK_achievementPanel, [1], null, this, (jsonData) => {
				let keys = Object.keys(jsonData);
				this.vbox_achieve.removeChildren();
				for (let key of keys) {
					//key是成就ID
					this.vbox_achieve.addChild(new view.compart.TaskInfoV2Item());
				}
			})
			lcp.send(pkt);
		}
	}
}