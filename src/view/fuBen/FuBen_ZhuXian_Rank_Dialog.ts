/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_ZhuXian_Rank_Dialog extends ui.fuBen.FuBen_ZhuXian_Rank_DialogUI {
		public reward;
		public rankArr = [
			EnumData.emRankType.Cret_Level_Rank,            //等级
			EnumData.emRankType.Cret_EquipScore_Rank,       //总战斗力
			EnumData.emRankType.Cret_Fame_Rank,             //威望
			EnumData.emRankType.Cret_ChuMoEndJiFen_Rank     //主线副本星级
		]
		public rankTitleNameArr = ['等级', '角色战力', '威望等级', '关卡星级']
		public curShowRankType;  //当前排行榜类型
		constructor() {
			super();
			this.addEvent();
			// this.setData();
		}
		public setData(tab = 0) {
			for (let i = 0; i < 4; i++) {
				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.VS_show.addItem(box);
			}
			this.VS_show.selectedIndex = this.tab_rank.selectedIndex = tab;
			this.showRankList()
		}
		public showRankList() {
			let rankIndex = this.VS_show.selectedIndex;        //VS_Show下标
			this.curShowRankType = this.rankArr[rankIndex];
			this.lab_title_Content.text = this.rankTitleNameArr[rankIndex];
			let box = this.VS_show.getChildAt(rankIndex);
			if (box.numChildren <= 0) {
				let o = new FuBen_Rank_VS_Info()
				o.setData(rankIndex)
				box.addChild(o);
			}
		}
		public addEvent() {
			let self = this;
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			});
			this.tab_rank.on(Laya.UIEvent.CLICK, this, () => {
				this.VS_show.selectedIndex = this.tab_rank.selectedIndex;
				this.showRankList();

			})
		}
	}
}