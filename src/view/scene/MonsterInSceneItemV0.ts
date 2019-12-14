/**Created by the LayaAirIDE*/
module view.scene {
	export class MonsterInSceneItemV0 extends ui.scene.MonsterInSceneItemV0UI {
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
			this.lab_LV.text = 'LV.' + this.item.level;
			// this.addMonster(monsterObj);
			// this.img_bg.skin = 'image/main/frame_boss_03.png'
			let wuxing = SheetConfig.mydb_monster_tbl.getInstance(null).WUXINGPROPS(configID)
			this.img_wx.skin = "image/common/skill/icon_wx_" + wuxing + ".png"
			skePath = SheetConfig.mydb_monster_tbl.getInstance(null).STYLE_DRAWING('' + configID);
			this.img_icon.skin = 'image/common/npc/npc_icon_' + skePath + '.png'
			this.addEvent();

			this.updateUI();
		}
		public collectHander: Laya.Handler;// 采集物Hander
		public addEvent(): void {
			EventManage.onWithEffect(this.box_view, Laya.UIEvent.CLICK, this, () => {
				let player = GameApp.MainPlayer;
				let job = player.job;
				// player["startHandAtk" + job](this.item);
				player.startHandAtk0(this.item);
			})
		}
		public updateUI(): void {
			this.img_hp_cur.width = Math.ceil((this.item.ability.nowHP / this.item.ability.nMaxHP) * this.img_hp_bg.width)
		}
		/**
		 * 更新血条
		 */
		public updateHp(): void {
			this.img_hp_cur.width = Math.ceil((this.item.ability.nowHP / this.item.ability.nMaxHP) * this.img_hp_bg.width)
		}

	}
}