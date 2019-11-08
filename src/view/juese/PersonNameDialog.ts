/**Created by the LayaAirIDE*/
module view.juese {
	export class PersonNameDialog extends ui.juese.PersonNameDialogUI {
		private playerNameMessage = null;
		private fontColor = { 1: "#dadc3a", 2: "#18b403", 3: "#05cbe8", 4: "#ea515f", 5: "#925615" };
		private wuXing = { 1: "金", 2: "木", 3: "水", 4: "火", 5: "土" }
		private mingGong = { 1: "命宫", 2: "财帛宫", 3: "兄弟宫", 4: "田宅宫", 5: "男女宫", 6: "奴仆宫", 7: "妻妾宫", 8: "恶疾宫", 9: "迁移宫", 10: "官禄宫", 11: "福德宫", 12: "相貌宫" }
		constructor() {
			super();
			this.setData();
			this.addEvent()
		}
		public setData(): void {
			this.playerNameMessage = GameApp.GameEngine.mainPlayer.playerBirthData.compellation[1];
			this.upDateView();
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_nameClose, Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
		public upDateView() {
			// this.playerNameMessage
			this.lab_tiange.text = this.mingGong[this.playerNameMessage[1].id];
			this.lab_dige.text = this.mingGong[this.playerNameMessage[2].id];
			this.lab_renge.text = this.mingGong[this.playerNameMessage[3].id];
			this.lab_zongge.text = this.mingGong[this.playerNameMessage[4].id];
			this.lab_tian_wuxing.text = this.wuXing[this.playerNameMessage[1].pro];
			this.lab_di_wuxing.text = this.wuXing[this.playerNameMessage[2].pro];
			this.lab_ren_wuxing.text = this.wuXing[this.playerNameMessage[3].pro];
			this.lab_zong_wuxing.text = this.wuXing[this.playerNameMessage[4].pro];
			this.lab_name.text = GameApp.MainPlayer.objName;
			this.lbl_tiange.text = "[天格] " + SheetConfig.Palace.getInstance(null).TYPE(this.playerNameMessage[1].id, this.playerNameMessage[1].pro) + "的一种人"
			this.lbl_dige.text = "[地格] " + SheetConfig.Palace.getInstance(null).TYPE(this.playerNameMessage[2].id, this.playerNameMessage[2].pro);
			this.lbl_renge.text = "[人格] 生活中" + SheetConfig.Palace.getInstance(null).TYPE(this.playerNameMessage[3].id, this.playerNameMessage[3].pro);
			this.lbl_zongge.text = "[总格] " + SheetConfig.Palace.getInstance(null).TYPE(this.playerNameMessage[4].id, this.playerNameMessage[4].pro
			);
		}
	}
}