/**Created by the LayaAirIDE*/
module view.scene {
	export class MonsterInSceneItemV15 extends ui.scene.MonsterInSceneItemV15UI {
		constructor() {
			super();
		}
		public item: GameObject.Monster; 
		public setData(item: GameObject.Monster): void {
			this.centerX = this.centerY = 0;
			// 相互绑定
			this.item = item;
			item.ui_item = this;
			this.lbl_name.text = this.item.objName;
			// this.lbl_zuoBiao.text = '(' + this.item.location.ncurx + ',' + this.item.location.ncury + ')';
			// 龙骨
			let configID = '' + this.item.feature.dwCretTypeId;
			let skePath
			// this.addMonster(monsterObj);
			skePath = SheetConfig.mydb_monster_tbl.getInstance(null).STYLE_DRAWING('' + configID);
			this.img_icon.skin = 'image/common/npc/npc_half_' + skePath + '.png'
			this.addEvent();
		}
		public collectHander: Laya.Handler;// 采集物Hander
		public addEvent(): void {
			EventManage.onWithEffect(this.box_view, Laya.UIEvent.CLICK, this, () => {
				let player = GameApp.MainPlayer;
				let configID = this.item.feature.dwCretTypeId;
				let skePath: EnumData.emMonsterType = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_TYPE('' + configID);
				// 怪物类型
				switch (skePath) {
					// 收集道具
					case EnumData.emMonsterType._MON_TYPE_COLLECT_:
						if (this.collectHander) {
							this.collectHander.run()
						}
						else {
							let closerHander = Laya.Handler.create(this, () => {
								let job = player.job;
								// player["startHandAtk" + job](this.item);
								player.startHandAtk0(this.item);
							}, null, false);
							PanelManage.Main.addNpcPregressItem(this.item, closerHander);
						}
						break;
					// 传送门
					case EnumData.emMonsterType._MON_TYPE_CITYGUARD_:
						if (this.collectHander) {
							this.collectHander.run()
						}
						else {
							let closerHander = Laya.Handler.create(this, () => { 
								let job = player.job;
								// player["startHandAtk" + job](this.item);
								player.startHandAtk0(this.item);
							 }, null, false);
							PanelManage.Main.addNpcPregressItem(this.item, closerHander);
						}
						break;
				}

			})
		}

	}
}