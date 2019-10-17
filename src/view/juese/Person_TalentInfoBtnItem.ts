/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_TalentInfoBtnItem extends ui.juese.Person_TalentInfoBtnItemUI {
		constructor() {
			super();
		}
		public setData(index, dangqianNum): Person_TalentInfoBtnItem {
			// this.lbl_name.text = ''+SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + id);
			this.addEvent();
			this.init_Info(index, dangqianNum);
			return this;
		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {

			})
		}
		public init_Info(index, dangqianNum): void {
			//dangqianNum(1勋章-根骨||2龙魂-悟性||3血玉-身法||4神盾-臂力||5官印-善缘) 
			switch (dangqianNum) {
				case 1:
					this.init_boneInfo(index);
					break;
				case 2:
					this.init_wuxingInfo(index);
					break;
				case 3:
					this.init_shenFaInfo(index);
					break;
				case 4:
					this.init_biliInfo(index);
					break;
				case 5:
					this.init_shanyuanInfo(index);
					break;
			}
		}
		//根骨
		public init_boneInfo(index): void {
			switch (index) {
				case 1:
					this.lbl_name.text = '略有资质';
					this.btn_talent.skin = 'image/common/daoju/itemicon_160001.png';
					break;
				case 2:
					this.lbl_name.text = '慧心初开';
					this.btn_talent.skin = 'image/common/daoju/itemicon_160002.png';
					break;
				case 3:
					this.lbl_name.text = '经脉渐通';
					this.btn_talent.skin = 'image/common/daoju/itemicon_160003.png';
					break;
				case 4:
					this.lbl_name.text = '真元显化';
					this.btn_talent.skin = 'image/common/daoju/itemicon_160004.png';
					break;
				case 5:
					this.lbl_name.text = '玄黄炼体';
					this.btn_talent.skin = 'image/common/daoju/itemicon_160005.png';
					break;
				case 6:
					this.lbl_name.text = '八脉齐开';
					this.btn_talent.skin = 'image/common/daoju/itemicon_160006.png';
					break;
				case 7:
					this.lbl_name.text = '百骸汇流';
					this.btn_talent.skin = 'image/common/daoju/itemicon_160007.png';
					break;
				case 8:
					this.lbl_name.text = '任督通天';
					this.btn_talent.skin = 'image/common/daoju/itemicon_160008.png';
					break;
				case 9:
					this.lbl_name.text = '七星霸体';
					this.btn_talent.skin = 'image/common/daoju/itemicon_160009.png';
					break;
				case 10:
					this.lbl_name.text = '麒麟筋骨';
					this.btn_talent.skin = 'image/common/daoju/itemicon_160010.png';
					break;
				case 11:
					this.lbl_name.text = '龙象周天';
					this.btn_talent.skin = 'image/common/daoju/itemicon_160011.png';
					break;
				case 12:
					this.lbl_name.text = '真武下凡';
					this.btn_talent.skin = 'image/common/daoju/itemicon_160012.png';
					break;
			}

		}
		//悟性
		public init_wuxingInfo(index): void {
			switch (index) {
				case 1:
					this.lbl_name.text = '白丁';
					this.btn_talent.skin = 'image/common/daoju/itemicon_123001.png';
					break;
				case 2:
					this.lbl_name.text = '识物';
					this.btn_talent.skin = 'image/common/daoju/itemicon_123002.png';
					break;
				case 3:
					this.lbl_name.text = '辨性';
					this.btn_talent.skin = 'image/common/daoju/itemicon_123003.png';
					break;
				case 4:
					this.lbl_name.text = '小雅';
					this.btn_talent.skin = 'image/common/daoju/itemicon_123004.png';
					break;
				case 5:
					this.lbl_name.text = '大雅';
					this.btn_talent.skin = 'image/common/daoju/itemicon_123005.png';
					break;
				case 6:
					this.lbl_name.text = '不凡';
					this.btn_talent.skin = 'image/common/daoju/itemicon_123006.png';
					break;
				case 7:
					this.lbl_name.text = '怪才';
					this.btn_talent.skin = 'image/common/daoju/itemicon_123007.png';
					break;
				case 8:
					this.lbl_name.text = '奇才';
					this.btn_talent.skin = 'image/common/daoju/itemicon_123008.png';
					break;
				case 9:
					this.lbl_name.text = '天才';
					this.btn_talent.skin = 'image/common/daoju/itemicon_123009.png';
					break;
				case 10:
					this.lbl_name.text = '圣人';
					this.btn_talent.skin = 'image/common/daoju/itemicon_123010.png';
					break;
				case 11:
					this.lbl_name.text = '神人';
					this.btn_talent.skin = 'image/common/daoju/itemicon_123011.png';
					break;
				case 12:
					this.lbl_name.text = '天命';
					this.btn_talent.skin = 'image/common/daoju/itemicon_123012.png';
					break;
			}
		}
		//身法
		public init_shenFaInfo(index): void {
			switch (index) {
				case 1:
					this.lbl_name.text = '初出茅庐';
					this.btn_talent.skin = 'image/common/daoju/itemicon_121001.png';
					break;
				case 2:
					this.lbl_name.text = '动作敏捷';
					this.btn_talent.skin = 'image/common/daoju/itemicon_121002.png';
					break;
				case 3:
					this.lbl_name.text = '壁虎攀墙';
					this.btn_talent.skin = 'image/common/daoju/itemicon_121003.png';
					break;
				case 4:
					this.lbl_name.text = '飞檐走壁';
					this.btn_talent.skin = 'image/common/daoju/itemicon_121004.png';
					break;
				case 5:
					this.lbl_name.text = '身轻如燕';
					this.btn_talent.skin = 'image/common/daoju/itemicon_121005.png';
					break;
				case 6:
					this.lbl_name.text = '片叶不沾';
					this.btn_talent.skin = 'image/common/daoju/itemicon_121006.png';
					break;
				case 7:
					this.lbl_name.text = '疾风劲草';
					this.btn_talent.skin = 'image/common/daoju/itemicon_121007.png';
					break;
				case 8:
					this.lbl_name.text = '踏雪无恒';
					this.btn_talent.skin = 'image/common/daoju/itemicon_121008.png';
					break;
				case 9:
					this.lbl_name.text = '风雷随身';
					this.btn_talent.skin = 'image/common/daoju/itemicon_121009.png';
					break;
				case 10:
					this.lbl_name.text = '翩若惊鸿';
					this.btn_talent.skin = 'image/common/daoju/itemicon_121010.png';
					break;
				case 11:
					this.lbl_name.text = '转瞬千里';
					this.btn_talent.skin = 'image/common/daoju/itemicon_121011.png';
					break;
				case 12:
					this.lbl_name.text = '化身亿万';
					this.btn_talent.skin = 'image/common/daoju/itemicon_121012.png';
					break;
			}

		}//臂力
		public init_biliInfo(index): void {
			switch (index) {
				case 1:
					this.lbl_name.text = '尚未开化';
					this.btn_talent.skin = 'image/common/daoju/itemicon_122001.png';
					break;
				case 2:
					this.lbl_name.text = '力量初显';
					this.btn_talent.skin = 'image/common/daoju/itemicon_122002.png';
					break;
				case 3:
					this.lbl_name.text = '淬炼有道';
					this.btn_talent.skin = 'image/common/daoju/itemicon_122003.png';
					break;
				case 4:
					this.lbl_name.text = '体魄成型';
					this.btn_talent.skin = 'image/common/daoju/itemicon_122004.png';
					break;
				case 5:
					this.lbl_name.text = '气势不凡';
					this.btn_talent.skin = 'image/common/daoju/itemicon_122005.png';
					break;
				case 6:
					this.lbl_name.text = '劲如虬枝';
					this.btn_talent.skin = 'image/common/daoju/itemicon_122006.png';
					break;
				case 7:
					this.lbl_name.text = '力能扛鼎';
					this.btn_talent.skin = 'image/common/daoju/itemicon_122007.png';
					break;
				case 8:
					this.lbl_name.text = '劈石断玉';
					this.btn_talent.skin = 'image/common/daoju/itemicon_122008.png';
					break;
				case 9:
					this.lbl_name.text = '制霸一方';
					this.btn_talent.skin = 'image/common/daoju/itemicon_122009.png';
					break;
				case 10:
					this.lbl_name.text = '狂风岿然';
					this.btn_talent.skin = 'image/common/daoju/itemicon_122010.png';
					break;
				case 11:
					this.lbl_name.text = '力拔山岳';
					this.btn_talent.skin = 'image/common/daoju/itemicon_122011.png';
					break;
				case 12:
					this.lbl_name.text = '摧城开天';
					this.btn_talent.skin = 'image/common/daoju/itemicon_122012.png';
					break;
			}

		}//善缘
		public init_shanyuanInfo(index): void {
			switch (index) {
				case 1:
					this.lbl_name.text = '独行游侠';
					this.btn_talent.skin = 'image/common/daoju/itemicon_124001.png';
					break;
				case 2:
					this.lbl_name.text = '与人为善';
					this.btn_talent.skin = 'image/common/daoju/itemicon_124002.png';
					break;
				case 3:
					this.lbl_name.text = '助人为乐';
					this.btn_talent.skin = 'image/common/daoju/itemicon_124003.png';
					break;
				case 4:
					this.lbl_name.text = '众缘奉行';
					this.btn_talent.skin = 'image/common/daoju/itemicon_124004.png';
					break;
				case 5:
					this.lbl_name.text = '润物无声';
					this.btn_talent.skin = 'image/common/daoju/itemicon_124005.png';
					break;
				case 6:
					this.lbl_name.text = '上善若水';
					this.btn_talent.skin = 'image/common/daoju/itemicon_124006.png';
					break;
				case 7:
					this.lbl_name.text = '美名渐传';
					this.btn_talent.skin = 'image/common/daoju/itemicon_124007.png';
					break;
				case 8:
					this.lbl_name.text = '仁扬百里';
					this.btn_talent.skin = 'image/common/daoju/itemicon_124008.png';
					break;
				case 9:
					this.lbl_name.text = '德威日隆';
					this.btn_talent.skin = 'image/common/daoju/itemicon_124009.png';
					break;
				case 10:
					this.lbl_name.text = '大爱无疆';
					this.btn_talent.skin = 'image/common/daoju/itemicon_124010.png';
					break;
				case 11:
					this.lbl_name.text = '心系天下';
					this.btn_talent.skin = 'image/common/daoju/itemicon_124011.png';
					break;
				case 12:
					this.lbl_name.text = '普济苍生';
					this.btn_talent.skin = 'image/common/daoju/itemicon_124012.png';
					break;
			}
		}
	}
}