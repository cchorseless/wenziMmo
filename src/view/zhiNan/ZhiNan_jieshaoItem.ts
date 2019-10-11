/**Created by the LayaAirIDE*/
module view.zhiNan {
	export class ZhiNan_jieshaoItem extends ui.zhiNan.ZhiNan_jieshaoItemUI {
		public index: number;
		constructor() {
			super();
			this.addEvent()
			// this.btn_wanfa.anchorX = this.btn_wanfa.anchorY = 0.5;
		}
		public setData(data, index) {
			this.lab_jieshaotext.text = data;
			this.index = index;
		}
		private addEvent() {
			EventManage.onWithEffect(this.btn_wanfa, Laya.UIEvent.CLICK, this, () => {
				switch (this.index) {
					case 0:
						let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.getIntroductionInfo, [1], 0, this,
							(data) => {
								console.log("从服务器获取的数据：",data)
								serverData = data;
								PanelManage.openZhiNanWanFaPanel();
							});
						lcp.send(pkt);
						
						break;
					case 1:
						// TipsManage.showTips('敬请期待');
						PanelManage.openZhiNanMenPaiPanel();
						break;
					case 2:
						// TipsManage.showTips('敬请期待');
						PanelManage.openZhiNanWuXuePanel();
						break;
					case 3:
						// TipsManage.showTips('敬请期待');
						PanelManage.openZhiNanDiYuPanel();
						break;
					case 4:
						// TipsManage.showTips('敬请期待');
						PanelManage.openZhiNanShuXingPanel();
						break;
					case 5:
						TipsManage.showTips('敬请期待');
						break;
					case 6:
						TipsManage.showTips('敬请期待');
						break;
					case 7:
						TipsManage.showTips('敬请期待');
						break;
					case 8:
						TipsManage.showTips('敬请期待');
						break;

				}
			})


		}
	}
}