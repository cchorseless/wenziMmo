/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_ZhuXian_RankInfo extends ui.fuBen.FuBen_ZhuXian_RankInfoUI {
		public data: ProtoCmd.stRankInfo;
		constructor() {
			super();
		}
		/**
		 * 
		 * @param data          排行榜数据
		 * @param infoIndex     info的下标用于判断是否显示遮罩
		 * @param rankTypeIndex 排行榜的id   0、1、2、3
		 */
		public setData(data: ProtoCmd.stRankInfo, infoIndex: number, rankTypeIndex: number,curPage:number) {
			let id = infoIndex + 1;
			if ((id % 2) != 0) {
				this.img_mask.visible = true;
			}else{
				this.img_mask.visible = false;
			}
			this.lab_star.text = ''
			this.data = data;
			this.lab_name.text = data.name + '';
			let menpai = data.getValue("szGuildName") + '';
			let menpaiName;
			if (menpai == '') {
				menpaiName = '无门无派';
				this.img_menpai.visible = false;
			} else {
				this.img_menpai.visible = true;
				let menpaiID = SheetConfig.BaseMenPaiSheet.getInstance(null).GetIDByName(menpai);
				if(menpaiID>0){
					let icon = SheetConfig.BaseMenPaiSheet.getInstance(null).ICON(menpaiID);
					this.img_menpai.skin = 'image/fuben/icon_' + icon + '.png'
				}	
				menpaiName = menpai
				
			}
			this.lab_menpai.text = menpaiName;
			let job = data.job;
			if (job == 0) {
				this.img_job.skin = 'image/common/img_job01.png'
			} else {
				this.img_job.skin = 'image/common/img_job0' + job + '.png'
			}

			let rankIndex: number = id + (curPage -1) * 10;
			if (rankIndex < 4) {
				this.lab_rank.visible = false;
				this.img_rank.visible = true;
				this.img_rank.skin = 'image/fuben/img_' + rankIndex + '.png';
			} else {
				this.lab_rank.visible = true;
				this.img_rank.visible = false;
				this.lab_rank.text = rankIndex + '';
			}
			let starText = '';
			switch (rankTypeIndex) {
				case 0:
				
					starText = LangConfig.getBigNumberDes(data.level)
					break;
				case 1:
					starText =  LangConfig.getBigNumberDes(data.fightPower)
					break;
				case 2:
					starText =  LangConfig.getBigNumberDes(data.fameScore)
					break;
				case 3:
					starText = data.getValue("dwChuMoEndJiFen") + '';
					break;

			}
			this.lab_star.text = starText;


		}
	}
}