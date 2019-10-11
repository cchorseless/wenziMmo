/**Created by the LayaAirIDE*/
module view.zhiNan {
	var arrayIntroduce: string[] = ["玩法介绍", "门派介绍", "武学介绍", "地域介绍", "属性介绍", "疾病介绍", "生活介绍", "战斗介绍", "天鉴介绍"];
	export class ZhiNanPanel extends ui.zhiNan.ZhiNanPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.list_jieshao.vScrollBarSkin = "";
			this.list_jieshao.itemRender = view.zhiNan.ZhiNan_jieshaoItem;
			this.list_jieshao.array = arrayIntroduce;
			this.list_jieshao.renderHandler = new laya.utils.Handler(this, updataPetItem);
			this.list_jieshao.selectEnable = true;
			function updataPetItem(cell: view.zhiNan.ZhiNan_jieshaoItem, index:number) {
				var data: Object  = arrayIntroduce[index];
				cell.setData(data,index)	
			}
			this.addEvent();
		}

		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.showPanel(PanelManage.JuQingMode);
			});
			// EventManage.onWithEffect(this.btn_modeChange, Laya.UIEvent.CLICK, this, () => {
			// 	PanelManage.openMainPanel();
			// });

			// EventManage.onWithEffect(this.btn_rank, Laya.UIEvent.CLICK, this, () => {
			// 	PanelManage.openRankMainPanel();
			// });
			// EventManage.onWithEffect(this.btn_yinDao, Laya.UIEvent.CLICK, this, () => {
			// 	PanelManage.openYinDaoPanel();
			// });
			// EventManage.onWithEffect(this.btn_zhiNan, Laya.UIEvent.CLICK, this, () => {
			// 	PanelManage.openZhiNanPanel();
			// });
			// EventManage.onWithEffect(this.btn_wanfa, Laya.UIEvent.CLICK, this, () => {
			// 	// 打开玩法介绍界面
			// 	console.log("你点击了玩法按钮")
			// 	PanelManage.openZhiNanWanFaPanel();
			// })
			// EventManage.onWithEffect(this.btn_menpai, Laya.UIEvent.CLICK, this, () => {
			// 	// 打开门派介绍界面
			// })
			// EventManage.onWithEffect(this.btn_wuxue, Laya.UIEvent.CLICK, this, () => {
			// 	// 打开武学介绍界面
			// })
			// EventManage.onWithEffect(this.btn_diyu, Laya.UIEvent.CLICK, this, () => {
			// 	// 打开地域介绍界面
			// })
			// EventManage.onWithEffect(this.btn_shuxing, Laya.UIEvent.CLICK, this, () => {
			// 	// 打开属性介绍界面
			// })
			// EventManage.onWithEffect(this.btn_jibing, Laya.UIEvent.CLICK, this, () => {
			// 	// 打开疾病介绍界面
			// })
			// EventManage.onWithEffect(this.btn_shenghuo, Laya.UIEvent.CLICK, this, () => {
			// 	// 打开生活介绍界面
			// })
			// EventManage.onWithEffect(this.btn_zhandou, Laya.UIEvent.CLICK, this, () => {
			// 	// 打开战斗介绍界面
			// })
			// EventManage.onWithEffect(this.btn_tianjian, Laya.UIEvent.CLICK, this, () => {
			// 	// 打开天鉴介绍界面
			// })

		}
	}
}