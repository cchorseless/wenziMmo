/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_SaoDang_Info extends ui.fuBen.FuBen_SaoDang_InfoUI {
		public reward;
		public curStarNum;
		public box1bj;
		public box2bj;
		public pzid;
		public zjid;
		constructor() {
			super();
			this.panel_info.vScrollBarSkin = '';
			this.addEvent();
		}
		public setData(data, StarArr, starBox1, starBox2) {
			this.pzid = data[0][1];
			this.zjid = data[0][2];
			let zjID = data[0][2];
			let charpter = GameApp.MainPlayer.allCharpterInfo[zjID];
			this.html_charpterName.style.fontFamily = 'STXingkai';
			this.html_charpterName.style.fontSize = 26;
			this.html_charpterName.style.align = 'center';
			this.html_charpterName.style.color = '#000000';
			this.html_charpterName.innerHTML = "<span>第" + GameUtil.SectionToChinese(parseInt(charpter.index), 0) + "章</span>"
				+ "<span>" + charpter.name + "</span>";
			let starNum = 0;
			let starReward;
			for (let i = 0; i < data.length; i++) {
				starNum += StarArr.startab[data[i][0]];
				if (data[i][8]) {
					starReward = data[i][8]
				}
				let o = new FuBen_SaoDang_info_Item();
				o.setData(data[i], StarArr.startab[data[i][0]])
				this.vbox_info.addChild(o);
			}
			this.lab_curStar.text = '达成' + starNum + '星';
			this.curStarNum = starNum;
			this.reward = starReward.split('^');
			console.log( '章节', GameUtil.SectionToChinese(parseInt(charpter.index), 0))
			console.log( '章节名', charpter.name)
			this.box1bj = starBox1.bj;
			this.box2bj = starBox2.bj;
			console.log('标记1', starBox1.bj, '章节', GameUtil.SectionToChinese(parseInt(charpter.index), 0))
			console.log('标记bj2', starBox2.bj, '章节名', charpter.name)
			this.reSize()
			this.setBoxShow();
		}
		public setBoxShow() {
			if (this.box1bj == 0) {
				this.img_Box1.skin = 'image/common/icon_baoxiang1_close.png'
			} else if (this.box1bj == 1) {
				this.img_Box1.skin = 'image/common/icon_baoxiang1_light.png'
			} else if (this.box1bj == 2) {
				this.img_Box1.skin = 'image/common/icon_baoxiang1_open.png'
			}
			if (this.box2bj == 0) {
				this.img_Box2.skin = 'image/common/icon_baoxiang1_close.png'
			} else if (this.box2bj == 1) {
				this.img_Box2.skin = 'image/common/icon_baoxiang1_light.png'
			} else if (this.box2bj == 2) {
				this.img_Box2.skin = 'image/common/icon_baoxiang1_open.png'
			}
		}
		public reSize() {
			let o = new FuBen_SaoDang_info_Item();
			this.panel_info.height = this.vbox_info.numChildren * o.height;
			this.height = this.panel_info.height + this.panel_info.y
		}
		public addEvent() {
			let self = this;
			this.img_Box1.on(Laya.UIEvent.CLICK, this, function () {
				if (this.box1bj == 1) {
					let pkt = new ProtoCmd.QuestClientData();
					pkt.setString(ProtoCmd.ChuMoGetStarBox, [this.pzid, this.zjid, 1], null, this,
						function (data) {
							this.box1bj = 2;
							this.img_Box1.skin = 'image/common/icon_baoxiang1_open.png'
						})
					pkt.send();
				}
				let reward = this.reward[0];
				reward = reward.split('|');
				let jsonData: { [index: number]: any } = {};
				for (let i = 0; i < reward.length; i++) {
					let base = reward[i];
					base = base.split('`');
					jsonData[i + 1] = { index: base[0], num: base[1] }
				}
				let o = new view.compart.BaoxiangPrizeItem().setData(jsonData)
				o.anchorX = o.anchorY = 0.5;
				o.x = self.stage.width / 2;
				o.y = self.stage.height / 2
				FuBen_ZhuXian_SaoDang_Dialog.self.addChild(o);
			})
			this.img_Box2.on(Laya.UIEvent.CLICK, this, function () {
				if (this.box2bj == 1) {
					let pkt = new ProtoCmd.QuestClientData();
					pkt.setString(ProtoCmd.ChuMoGetStarBox, [this.pzid, this.zjid, 2], null, this,
						function (data) {
							this.box2bj = 2;
							this.img_Box2.skin = 'image/common/icon_baoxiang1_open.png'
						})
					pkt.send();
				}
				let reward = this.reward[1];
				reward = reward.split('|');
				let jsonData: { [index: number]: any } = {};
				for (let i = 0; i < reward.length; i++) {
					let base = reward[i];
					base = base.split('`');
					jsonData[i + 1] = { index: base[0], num: base[1] }
				}
				let o = new view.compart.BaoxiangPrizeItem().setData(jsonData)
				o.anchorX = o.anchorY = 0.5;
				o.x = self.stage.width / 2;
				o.y = self.stage.height / 2
				FuBen_ZhuXian_SaoDang_Dialog.self.addChild(o);
			})
		}
	}
}