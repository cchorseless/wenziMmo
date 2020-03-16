/**Created by the LayaAirIDE*/
module view.scene {
	export class Battle_ArgueSkill_item extends ui.scene.Battle_ArgueSkill_itemUI {
		constructor() {
			super();
		}
		public isCD = false;
		public setData(id) {
			this.img_pai.skin = 'image/npc_jiaohu/img_pai'+id+'.png';
			this.addEvent();
		}
		public addEvent (){

		}
		public showCD() {
			let cd = 1;
			let self = this;
			let spanH = (100 / (cd * 1000)) * 213;
			self.img_mask.visible = true;
			self.img_mask.height = 213;
			self.isCD = true
			Laya.timer.loop(100, self, function CD() {
				if (self.img_mask.height > 0) {
					self.img_mask.height -= spanH
					// console.log('遮罩高度0'+self.img_mask.height)
				} else {
					// console.log('遮罩高度1'+self.img_mask.height)
					self.img_mask.visible = false;
					self.img_mask.height = 69;
					self.isCD = false;
					Laya.timer.clear(self, CD)
				}
			})
		}
	}
}