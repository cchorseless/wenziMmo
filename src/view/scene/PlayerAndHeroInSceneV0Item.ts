/**Created by the LayaAirIDE*/
module view.scene {
	export class PlayerAndHeroInSceneV0Item extends ui.scene.PlayerAndHeroInSceneV0ItemUI {
		constructor() {
			super();
		}
		
		public masterItem: GameObject.OtherPlayer;
		public setMaster(obj: GameObject.OtherPlayer): void {
			this.masterItem = obj;
			obj.ui_item = this;
			this.img_heroAva.visible = false;
			this.img_playerAva.visible = false;
			this.img_playerAvaBig.visible = true;
			this.lbl_name.text = '' + this.masterItem.objName;
			// if (this.masterItem.guildInfo.szName) {
			// 	this.lbl_guildName.text = '' + this.masterItem.guildInfo.szName;
			// }
			// else {
			// 	this.img_guildInfo.visible = false;
			// }
		}

		public setHero(obj: GameObject.Hero) {
			console.log('---------添加了弟子---------');
			this.masterItem.curHero = obj;
			this.img_heroAva.visible = true;
			this.img_playerAva.visible = true;
			this.img_playerAvaBig.visible = false;
		}

		public addEvent (){


		}

	}
}