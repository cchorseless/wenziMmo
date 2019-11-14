/**
* name 
*/
module SceneManager {

	/**
	 * 初始化角色
	 * @param scene 
	 */
	export function updateSelfPlayer(scene): void {
		let selfPlayerUI: view.scene.PlayerInSceneItem = GameApp.MainPlayer.ui_item;
		if (selfPlayerUI == null) {
			let _uiItem = new view.scene.PlayerInSceneItem();
			_uiItem.setData(GameApp.MainPlayer);
			_uiItem.centerX = _uiItem.centerY = 0;
			scene.box_self.addChild(_uiItem);
		}
		else {
			selfPlayerUI.updateUI();
			selfPlayerUI.centerX = selfPlayerUI.centerY = 0;
			scene.box_self.addChild(selfPlayerUI);
		}
	}

	/**
  	 * 初始化弟子
  	 */
	export function updateDiziPlayer(scene): void {
		let selfHero = GameApp.MainPlayer.curHero;
		// 判断自己有没有英雄
		if (selfHero) {
			let selfHeroUI: view.scene.HeroInSceneItem = selfHero.ui_item;
			if (selfHeroUI == null) {
				let _uiItem = new view.scene.HeroInSceneItem();
				_uiItem.setData(selfHero);
				_uiItem.centerX = _uiItem.centerY = 0;
				scene.box_diZi.addChild(_uiItem);
			}
			else {
				selfHeroUI.updateUI();
				selfHeroUI.centerX = selfHeroUI.centerY = 0;
				scene.box_diZi.addChild(selfHeroUI);
			}
		}

	}
}