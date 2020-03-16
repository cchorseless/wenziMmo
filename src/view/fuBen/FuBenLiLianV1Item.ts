/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBenLiLianV1Item extends ui.fuBen.FuBenLiLianV1ItemUI {
		constructor() {
			super();
		}
		public data;
		public i;
		public key;
		public setData(key, data: ProtoCmd.itf_FB_XueYuInfo, i): FuBenLiLianV1Item {
			this.key = key;
			this.data = data;
			this.i = i;
			let lvl = GameApp.MainPlayer.lvlCount;
			if (lvl >= data.openlvl) {
				this.btn_selected.skin = 'image/fuben/frame_cengji_01.png';
			} else {
				this.btn_selected.skin = 'image/fuben/frame_cengji_03.png';
				this.btn_selected.mouseEnabled=false;
			}
			//地图名称
			this.lbl_map.text = '' + SheetConfig.mydb_mapinfo_tbl.getInstance(null).NAME('' + key);
			this.lbl_ceng.text = '第' + GameUtil.SectionToChinese(i,0) + '层';
			this.addEvent();
			// this.getBossInfo(key);
			return this;
		}
		public addEvent(): void {

		}
		// public getBossInfo(key): void {
		// 	let pkt = new ProtoCmd.QuestClientData();
		// 	pkt.setString(ProtoCmd.FB_GetWorldBossInfo, [key], null, this, (jsonData: { any }) => {

		// 	})
		// 	lcp.send(pkt);
		// }
	}
}