/**Created by the LayaAirIDE*/
module view.main {
	export class Main_BriskItem extends ui.main.Main_BriskItemUI {
		constructor() {
			super();
		}
		//任务活跃
		public setData(item): Main_BriskItem {
			//任务名称+任务进度
			// this.lbl_taskName.text = item.name + '(' + item.cur + '/' + item.max + ')';

			this.html_titleName.style.fontFamily = 'STKaiti';
			this.html_titleName.style.fontSize = 26;
			// this.html_titleName.style.align = 'center'
			if (item.cur < item.max) {
				this.html_titleName.innerHTML = "<span style='color:#000000;'>" + item.name + "</span>"
					+ "<span style='color:#000000;'>" + '(' + "</span>"
					+ "<span style='color:#cd3735;'>" + item.cur + "</span>"
					+ "<span style='color:#000000;'>/" + item.max + ")</span>"
			} else {
				this.html_titleName.innerHTML = "<span style='color:#000000;'>" + item.name + "</span>"
					+ "<span style='color:#000000;'>" + '(' + "</span>"
					+ "<span style='color:#000000;'>" + item.cur + "</span>"
					+ "<span style='color:#000000;'>/" + item.max + ")</span>"
			}

			//任务描述
			this.lbl_detail.text = item.desc;
			//可获得活跃度
			this.lbl_huoyuedu.text = item.addvalue + '活跃度';
			if (item.cur == item.max) {
				this.btn_get.visible = false;
				this.lbl_finish.visible = true;
			} else {
				this.btn_get.visible = true;
				this.lbl_finish.visible = false;
			}
			return this;
		}
	}
}