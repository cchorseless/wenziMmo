/**
* name 
*/
module itf {
	export interface SceneItem {
		updateUI(): void;
		addPlayer(obj): void;
		addHero(obj): void;
		addMonster(obj): void;
		clearPlayer(): void;
		clearMonster(): void;
	}

	export interface BattleItem {
		updateUI(): void;

	}
}