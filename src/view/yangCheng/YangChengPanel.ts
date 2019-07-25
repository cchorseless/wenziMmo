/**Created by the LayaAirIDE*/
module view.yangCheng{
	export class YangChengPanel extends ui.yangCheng.YangChengPanelUI{
		constructor(){
			super();
		}
		public setData():void{
			this.panel_yangCheng.hScrollBarSkin = '';
			this.panel_yangCheng.scrollTo(640,0);
		}
	}
}