/**
* name 
*/
module itf {
	export interface SceneItem {
		updateUI(): void;
		addPlayer(obj): void;
		addMonster(obj): void;
		clearPlayer(): void;
		clearMonster(): void;
	}
}