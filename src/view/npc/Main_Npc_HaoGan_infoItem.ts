/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_Npc_HaoGan_infoItem extends ui.npc.Main_Npc_HaoGan_infoItemUI {
		constructor() {
			super();
		}
		public colorArr = [
			'#5064d1',
			'#437ec5',
			'#4aa6c1',
			'#7affe8',
			'#ffea00',
			'#f07318',
			'#e65b2f',
			'#ff4646',
			'#ff4eb2',
			'#ff41ef',
		];
		public textArr = [
			'死敌',
			'仇恨',
			'敌意',
			'冷淡',
			'初见',
			'融洽',
			'喜爱',
			'亲密',
			'灵犀',
			'不渝',
		];
		public numArr = [
			'-4500',
			'-3150',
			'-2250',
			'-1350',
			'-450',
			'450',
			'1350',
			'2250',
			'3150',
			'4050',
			'4950',
		];
		public setData(lv) {
			this.lab_name.text = this.textArr[lv];
			this.lab_name.color = this.colorArr[lv];
			this.lab_num1.text = this.numArr[lv];
			this.lab_num2.text = this.numArr[lv + 1];
			if (lv < 4) {
				this.img_icon.skin = 'image/npc_jiaohu/img_kulian.png';
				this.img_kuang.skin = 'image/npc_jiaohu/frame_zhuangtai_haogandu.png'
			}else{
				this.img_icon.skin = 'image/npc_jiaohu/img_kulian1.png'
				this.img_kuang.skin = 'image/npc_jiaohu/frame_zhuangtai_haogandu1.png'
			}
		}

	}
}