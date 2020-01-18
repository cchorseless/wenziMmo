/**Created by the LayaAirIDE*/
module view.scene {
	export class MonsterInSceneItemV15 extends ui.scene.MonsterInSceneItemV15UI {
		constructor() {
			super();
		}
		public isnpc;
		public type;
		public item: GameObject.Monster;
		public setData(item: GameObject.Monster): void {
			this.isnpc = undefined;
			this.img_type.visible = false;
			this.centerX = this.centerY = 0;
			// 相互绑定
			this.item = item;
			item.ui_item = this;
			this.lbl_name.text = this.item.objName;
			// 龙骨
			let configID = '' + this.item.feature.dwCretTypeId;
			// this.addMonster(monsterObj);
			//怪物类型
			this.type = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_TYPE('' + configID)
			//怪物造型图编号
			let skePath = SheetConfig.mydb_monster_tbl.getInstance(null).STYLE_DRAWING('' + configID);
			if (this.type == EnumData.emMonsterType._MON_TYPE_COLLECT_) {
				this.img_type.visible = true;
				this.img_type.skin = 'image/common/daoju/itemicon_0.png';
			}
			this.img_icon.skin = 'image/common/npc/npc_half_' + skePath + '.png'
			this.addEvent();
		}
		public collectHander: Laya.Handler;// 采集物Hander
		public addEvent(): void {
			EventManage.onWithEffect(this.box_view, Laya.UIEvent.CLICK, this, () => {
				if (!this.isnpc) {
					if (this.type == EnumData.emMonsterType._MON_TYPE_COLLECT_) {
						//采集物
						new view.main.Main_TanSuoV0Dialog().setData(this.item, 0).popup();
					} else {
						// let player = GameApp.MainPlayer;
						// let configID = this.item.feature.dwCretTypeId;
						// let skePath: EnumData.emMonsterType = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_TYPE('' + configID);
						// // 怪物类型
						// switch (skePath) {
						// 	// 收集道具
						// 	case EnumData.emMonsterType._MON_TYPE_COLLECT_:
						// 		if (this.collectHander) {
						// 			this.collectHander.run()
						// 		}
						// 		else {
						// 			let closerHander = Laya.Handler.create(this, () => {
						// 				let job = player.job;
						// 				// player["startHandAtk" + job](this.item);
						// 				player.startHandAtk0(this.item);
						// 			}, null, false);
						// 			PanelManage.Main.addNpcPregressItem(this.item, closerHander);
						// 		}
						// 		break;
						// 	// 传送门
						// 	case EnumData.emMonsterType._MON_TYPE_CITYGUARD_:
						// 		if (this.collectHander) {
						// 			this.collectHander.run()
						// 		}
						// 		else {
						// 			let closerHander = Laya.Handler.create(this, () => {
						// 				let job = player.job;
						// 				// player["startHandAtk" + job](this.item);
						// 				player.startHandAtk0(this.item);
						// 			}, null, false);
						// 			PanelManage.Main.addNpcPregressItem(this.item, closerHander);
						// 		}
						// 		break;
						// }
						//怪物
						new view.main.Main_TanSuoV0Dialog().setData(this.item, 1).popup();
					}

				} else {
					//無好感度NPC（功能NPC）弹窗
					new view.main.Main_TanSuoV0Dialog().setData(this.item, 2).popup();
				}
			})
		}
		/**
		 * 
		 * @param data 功能NPC
		 */
		public init_npc(data: GameObject.Npc): void {
			this.item=data;
			this.img_type.visible = true;
			this.img_type.skin = 'image/common/icon_common_shezhi.png';
			this.img_icon.skin = 'image/common/img_danLu.png';
			this.lbl_name.text = data.objName;
			this.isnpc = 1;
			this.addEvent();
		}
	}
}