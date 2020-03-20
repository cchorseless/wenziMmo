module view.wuXue{
	export class WuXue_ZaXue_Panel extends ui.wuXue.WuXue_ZaXue_PanelUI{
		constructor(){
			super();
		}
		public baseSkillId = 400500;

		public setData():void{
			this.vbox_show.space = 15;
			this.addEvent();
			this.createItems();
		}
		private createItems(){
			for (var i = 0; i < 5; i++) {
				let item = new WuXue_ZaXue_VS_Info_Item;
				let itemSkillId = (this.baseSkillId + i);
				item.setData(itemSkillId);
				this.vbox_show.addChild(item);
			}
		}
		private addEvent():void{
			this.btn_miji.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueMiJiPanel();
			})
			this.btn_waigong.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueWaiGongPanel();
			})
			this.btn_zaxue.on(Laya.UIEvent.CLICK,this,() => {
				return;
			})
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this)
				PanelManage.openMainPanel();
			});
		}
		private setView
	}
}