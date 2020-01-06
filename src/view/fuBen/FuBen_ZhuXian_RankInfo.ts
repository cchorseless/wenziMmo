/**Created by the LayaAirIDE*/
module view.fuBen{
	export class FuBen_ZhuXian_RankInfo extends ui.fuBen.FuBen_ZhuXian_RankInfoUI{
		public data:ProtoCmd.stRankInfo;
		constructor(){
			super();
		}
		public setData(data:ProtoCmd.stRankInfo){
			this.lab_star.text = ''
			this.data = data;
			this.lab_name.text = data.name+ '';
			let menpai = data.getValue("szGuildName") + '';
			if(menpai == ''){
				menpai = '无门无派'
			}
			this.lab_menpai.text = menpai;
			this.lab_rank.text = data.getValue("nNowRankNum") + '';
			this.lab_star.text = data.getValue("dwChuMoEndJiFen") + '';
			

		}
	}
}