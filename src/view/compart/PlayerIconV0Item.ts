/**Created by the LayaAirIDE*/
module view.compart {
	export class PlayerIconV0Item extends ui.compart.PlayerIconV0ItemUI {
		constructor() {
			super();
		}
		public setData(data: GameObject.OtherPlayer): void {
			//玩家姓名
			this.lbl_name.text = '' + data.objName;
			//玩家等级
			this.lbl_lvl.text = data.zslevel + '转' + data.level + '级';
			//玩家头像
			this.img_player.skin = LangConfig.getPlayerIconSkin(data.sex, data.job)
		}
	}
}