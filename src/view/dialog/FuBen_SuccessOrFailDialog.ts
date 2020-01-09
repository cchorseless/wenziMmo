/**Created by the LayaAirIDE*/
module view.dialog {
	export class FuBen_SuccessOrFailDialog extends ui.dialog.FuBen_SuccessOrFailDialogUI {
		constructor() {
			super();
		}
		/**
		 * 
		 * @param data {index:副本类型1金钱庄2矿坑3龙魂4魂石，reward:扫荡成功所获得奖励}
		 */
		public setData(data: { index: number, reward: any }): FuBen_SuccessOrFailDialog {
			this.lbl_count.text = PanelManage.FuBenRes.lbl_fuben.text;
			this.hbox_reward.removeChildren();
			for (let i in data.reward) {
				let item=data.reward[i];
				let ui_item = new view.compart.DaoJuWithNameItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = item.index;
				itemInfo.dwCount = item.num;
				ui_item.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.hbox_reward.addChild(ui_item);
			}
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_chose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}