/**Created by the LayaAirIDE*/
module view.compart {
	export class DaoJuItem extends ui.compart.DaoJuItemUI {
		public item: ItemBase;
		constructor() {
			super();

		}
		public setDate(item: ItemBase): void {
			this.item = item;
			// this.img_item.skin = 'image/common/daoju/' + this.item.dwBaseID + '.png';
			this.img_bg.skin = 'image/common/daoju/quality_' + this.item.btQuality + '.png';
			this.lbl_count.text = '' + this.item.dwCount;
			this.addEvent();
		}

		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				console.log(this.item.dwBaseID);
			});
		}
	}
}