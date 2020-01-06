/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_ZhuXian_Rank_Dialog extends ui.fuBen.FuBen_ZhuXian_Rank_DialogUI {
		public curPage = 1;  //显示用
		public sendToServerPages = 1// 发给服务器的页数ID
		public maxpage = 0;
		public showRankIndex = 0;
		public items;
		public reward;
		constructor() {
			super();
			this.addEvent();
			this.setData();
		}
		public setData() {
			this.html_Name.style.fontFamily = 'STXingkai';
			this.html_Name.style.fontSize = 28;
			this.html_Name.style.align = 'center';
			this.html_Name.style.color = '#000000';
			this.html_Name.innerHTML = "<span>星级排行</span>";

			this.vbox_rank['sortItem'] = (items) => { };
			this.getRankListBycurPage()
		}
		public getRankListBycurPage() {
			let self = this;
			let pkt = new ProtoCmd.stRankMsg(null);
			pkt.setValue('btErrorCode', 0);
			//排行榜类型
			pkt.setValue('btType', EnumData.emRankType.Cret_ChuMoEndJiFen_Rank);
			//排行榜页数
			pkt.setValue('nPage', this.sendToServerPages);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stRankMsg(data);
				cbpkt.getValue("nCount")
				if (cbpkt.maxPage == 0) {
					self.maxpage = 1;
				} else {
					let pages = Math.ceil(cbpkt.maxPage / 10);
					if (pages > 10) {
						self.maxpage = 10;
					} else {
						self.maxpage = pages;
					}

				}
				this.items = cbpkt.TopInfos;
				this.showRank()
			})

			let mypkt = new ProtoCmd.stMyRankRequest();
			mypkt.setValue('btType', EnumData.emRankType.Cret_ChuMoEndJiFen_Rank);
			lcp.send(mypkt, this, (data) => {
				let mycbpkt = new ProtoCmd.stMyRankReturn(data);
				mycbpkt.getValue('rankType')
				if (mycbpkt.rank >= 0) {
					this.lab_Rank.text = (mycbpkt.rank + 1) + '';
					this.lab_Star.text = mycbpkt.myInfo.getValue("dwChuMoEndJiFen") + '';
				} else {
					this.lab_Rank.text = '未上榜';
					this.lab_Star.text = mycbpkt.myInfo.getValue("dwChuMoEndJiFen") + '';
				}
			})
			let pktr = new ProtoCmd.QuestClientData();
			pktr.setString(ProtoCmd.Rank_rankShowRewardByRankType, [EnumData.emRankType.Cret_ChuMoEndJiFen_Rank], null, this, (jsonData) => {
				console.log('====>排名奖励', jsonData)
				this.reward = jsonData.rewardtab;
				if (jsonData.status == 0) {
					this.img_reward.skin = 'image/common/icon_baoxiang1_light.png'
					this.btn_get.disabled = false;
				}
				if (jsonData.status == 1) {
					this.img_reward.skin = 'image/common/icon_baoxiang1_open.png'
					this.btn_get.disabled = true;
				}
			})
			lcp.send(pktr);
		}
		public isGetRankDataFromServer() {
			let temp = this.sendToServerPages
			let temp1 = this.showRankIndex;
			switch (this.curPage) {
				case 1:
					temp = 1;
					temp1 = 0;
					break;
				case 2:
					temp = 1;
					temp1 = 10;
					break;
				case 3:
					temp = 2;
					temp1 = 0;
					break;
				case 4:
					temp = 2;
					temp1 = 10;
					break;
				case 5:
					temp = 3;
					temp1 = 0;
					break;
				case 6:
					temp = 3;
					temp1 = 10;
					break;
				case 7:
					temp = 4;
					temp1 = 0;
					break;
				case 8:
					temp = 4;
					temp1 = 10;
					break;
				case 9:
					temp = 5;
					temp1 = 0;
					break;
				case 10:
					temp = 5;
					temp1 = 10;
					break;
			}
			if (this.sendToServerPages == temp) {
				if (this.showRankIndex == temp1) {
					return;
				} else {
					this.showRank();
				}
			} else {
				this.sendToServerPages = temp
				this.getRankListBycurPage();
			}
		}
		public showRank() {
			this.vbox_rank.removeChildren();
			let keys = Object.keys(this.items)
			for (let i = this.showRankIndex; i < keys.length; i++) {
				let o = new FuBen_ZhuXian_RankInfo();
				let TopInfos = new ProtoCmd.stRankInfo(this.items[keys[i]]);
				TopInfos.clone(this.items[keys[i]].data)
				o.setData(TopInfos)
				this.vbox_rank.addChild(o);
			}

			this.html_page.style.fontFamily = 'STKaiti';
			this.html_page.style.fontSize = 30;
			this.html_page.style.align = 'center';

			this.html_page.innerHTML = "<span style='color:#ff8b8b'>" + this.curPage + "</span>"
				+ "<span style='color:#000000'>/" + this.maxpage + "</span>"
		}
		public addEvent() {
			let self = this;
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			});
			this.btn_get.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.Rank_getRankRewardByRankType, [EnumData.emRankType.Cret_ChuMoEndJiFen_Rank], null, this, (jsonData) => {
					console.log('====>领取领取', jsonData)
					if (jsonData.status == 1) {
						self.img_reward.skin = 'image/common/icon_baoxiang1_open.png'
						self.btn_get.disabled = true;
					}
				})
				lcp.send(pkt);
			});
			this.btn_last.on(Laya.UIEvent.CLICK, this, function () {
				if (self.curPage > 1) {
					self.curPage--;
					self.isGetRankDataFromServer();
				}
				else {
					TipsManage.showTips('已经是第一页了!')
				}
			});
			this.btn_next.on(Laya.UIEvent.CLICK, this, function () {
				if (self.curPage >= self.maxpage) {
					TipsManage.showTips('已经是最后一页了!')
				}
				else {
					self.curPage++;
					self.isGetRankDataFromServer()
				}
			});
			this.img_reward.on(Laya.UIEvent.CLICK, this, function () {
				let o = new view.compart.BaoxiangPrizeItem().setData( this.reward)
				o.anchorX = o.anchorY = 0.5;
				o.x = self.stage.width/2;
				o.y = self.stage.height / 2
				self.addChild(o);
			});
		}
	}
}