/**Created by the LayaAirIDE*/
module view.compart {
	export class TaskInfoV0Item extends ui.compart.TaskInfoV0ItemUI {
		constructor() {
			super();
		}
		//任务每日
		public daily(item: ProtoCmd.itf_Task_DailyInfo): TaskInfoV0Item {
			//任务名称
			this.lbl_taskName.text = item.title;
			//任务描述
			this.lbl_detail.text = item.desc;
			//任务进度
			this.lbl_jindu.text = item.curcnt + '/' + item.maxcnt;
			//任务可购买次数
			this.lbl_huoyuedu.text = '可购买次数：' + item.buycnt;
			if (item.curcnt == item.maxcnt) {
				this.img_baoxiang.skin = 'image/common/icon_baoxiang3_light.png'
			}
			return this;
		}
	}
}