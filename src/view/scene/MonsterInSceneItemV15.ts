/**Created by the LayaAirIDE*/
module view.scene {
	export class MonsterInSceneItemV15 extends ui.scene.MonsterInSceneItemV15UI {
		constructor() {
			super();
		}
		public type;
		public item: GameObject.Monster;
		public setData(item: GameObject.Monster): void {
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
			//状态（有问号是采集物）
			this.img_type.visible = false;
			if (this.type == EnumData.emMonsterType._MON_TYPE_COLLECT_) {
				this.img_type.visible = true;
			}
			this.img_icon.skin = PathUtil.getNpcHalfPath(skePath);
			this.addEvent();
		}
		public clickHander: Laya.Handler;// 采集物Hander
		public addEvent(): void {
			EventManage.onWithEffect(this.box_view, Laya.UIEvent.CLICK, this, () => {
				if (this.clickHander) {
					this.clickHander.run()
				}
				else {
					if (this.type == EnumData.emMonsterType._MON_TYPE_COLLECT_) {
						//采集物
						new view.npc.Main_TanSuoV15Dialog().setData(this.item).popup();
					}
					else {
						//怪物
						new view.npc.Main_TanSuoV0Dialog().setData(this.item, 1).popup();
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
					}
				}
			})
		}

	}
}