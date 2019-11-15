/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_logoBgItem extends ui.wuXue.WuXue_logoBgItemUI {

		constructor() {
			super();
		}

		public addItem(node): void {
			this.img_bg.visible = false;
			this.box_view.addChild(node);
		}
		public changeItemState(boo:boolean) {
			if (this.box_view.numChildren > 0) {
				let o:any = this.box_view.getChildAt(0)
				o.showligth(boo);
			}
			
		}

		public removeItem(): void {
			this.img_bg.visible = true;
			this.setLogoState(true)
			if (this.box_view.numChildren > 0) {
				this.box_view.removeChildren();
			}

		}
		public setLogoState(islock: boolean) {
			//该武学槽是否解锁
			if (islock) {    //已解锁
				this.img_bg.skin = "image/common/frame_ketianjia.png"
				this.lab_isAdd.visible = true;
				this.lbl_buWei.color = "#63491a"
			} else {         //待解锁
				this.img_bg.skin = "image/common/frame_suoding.png"
				this.lab_isAdd.visible = false;
				this.lbl_buWei.color = "#s53232"
			}
		}
	}
}