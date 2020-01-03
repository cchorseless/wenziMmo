/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_SaoDang_Info extends ui.fuBen.FuBen_SaoDang_InfoUI {
		constructor() {
			super();
			this.panel_info.vScrollBarSkin = '';
		}
		public setData(data, StarArr) {
			let zjID = data[0][2];
			let charpter = GameApp.MainPlayer.allCharpterInfo[zjID];
			this.html_charpterName.style.fontFamily = 'STXingkai';
			this.html_charpterName.style.fontSize = 26;
			this.html_charpterName.style.align = 'center';
			this.html_charpterName.style.color = '#000000';
			this.html_charpterName.innerHTML = "<span>第" +  GameUtil.SectionToChinese(parseInt(charpter.index),0) +"章</span>" 
			+"<span>" + charpter.name  +"</span>";
			let starNum =0;
			let starReward;
			for(let i = 0;i<data.length;i++){
				starNum +=StarArr[data[i][0]];
				if(data[i][8]){
					starReward = data[i][8]
				}
				let o = new FuBen_SaoDang_info_Item();
				o.setData(data[i],StarArr[data[i][0]])
				this.vbox_info.addChild(o);
			}
			this.lab_curStar.text = '达成' + starNum + '星';
			this.reSize()
		}
		public reSize (){
			let o = new FuBen_SaoDang_info_Item();
			this.panel_info.height = this.vbox_info.numChildren * o.height;
			this.height = this.panel_info.height+ this.panel_info.y
		}
	}
}