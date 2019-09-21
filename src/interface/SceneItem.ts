/**
* name 
*/
module itf {
	export interface SceneItem {

		addPlayer(obj): void;
		addMonster(obj): void;
		clearPlayer(): void;
		clearMonster(): void;
	}
}