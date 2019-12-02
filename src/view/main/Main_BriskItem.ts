/**Created by the LayaAirIDE*/
module view.main {
	export class Main_BriskItem extends ui.main.Main_BriskItemUI {
		constructor() {
			super();
		}
		//任务活跃
		public setData(item): Main_BriskItem {
			//任务名称+任务进度
			this.lbl_taskName.text = item.name+'('+item.cur + '/' + item.max+')';
			//任务描述
			this.lbl_detail.text = item.desc;
			//可获得活跃度
			this.lbl_huoyuedu.text = item.addvalue + '活跃度';
			if (item.cur == item.max) {
				this.btn_get.visible=false;
				this.lbl_finish.visible=true;
			}else{
				this.btn_get.visible=true;
				this.lbl_finish.visible=false;
			}
			return this;
		}
	}
}