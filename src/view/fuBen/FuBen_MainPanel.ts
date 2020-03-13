/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_MainPanel extends ui.fuBen.FuBen_MainPanelUI {
		public static self: FuBen_MainPanel;
		public static fromStr: string;
		public curTimes;
		public maxTimes;
		//是否是初始化
		public isFirst = true;
		public showPZID;//当前篇章的ID；
		public showZJID;//当前章节的ID；

		public isTouch = false;
		public touchBeginX;
		public touchEndX;
		constructor() {
			super();
			FuBen_MainPanel.self = this;
		}
		//篇章id
		public setData(fromStr: string): void {
			FuBen_MainPanel.fromStr = fromStr;
			this.btn_juqing.selected = true;
			this.initUI();
			this.addEvent();
		}
		public static backPanel() {
			if (FuBen_MainPanel.fromStr == 'main') {
				PanelManage.openMainPanel()
			} else if (FuBen_MainPanel.fromStr == 'juqing') {
				PanelManage.openJuQingModePanel()
			}
		}

		public addEvent(): void {
			this.btn_addFubenTimes.on(Laya.UIEvent.CLICK, this, function () {
				// TODO
			})
			this.btn_last.on(Laya.UIEvent.CLICK, this, () => {
				this.changePZ(false);
			})
			this.btn_next.on(Laya.UIEvent.CLICK, this, () => {
				this.changePZ(true);
			})

			this.btn_rank.on(Laya.Event.MOUSE_DOWN, this, (ex) => {
				let o = new FuBen_ZhuXian_Rank_Dialog();
				o.setData(3);
				o.popup();

			})
			this.box_info.on(Laya.Event.MOUSE_DOWN, this, (ex) => {
				this.isTouch = true;
				this.touchBeginX = this.getPosX(ex);

			})
			this.box_info.on(Laya.Event.MOUSE_UP, this, (ex) => {
				if (this.isTouch) {
					this.isTouch = false;
					this.touchEndX = this.getPosX(ex);
					this.dealWithPosX()
				}
			})
			this.box_info.on(Laya.Event.MOUSE_OUT, this, (ex) => {
				if (this.isTouch) {
					this.isTouch = false;
					this.touchEndX = this.getPosX(ex);
					this.dealWithPosX()
				}
			})
			//返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, function () {
				PopUpManager.checkPanel(this);
			})
			//剧情
			this.btn_juqing.on(Laya.UIEvent.CLICK, this, function () {
				return;
			})
			//资源副本
			this.btn_res.on(Laya.UIEvent.CLICK, this, function () {
				PanelManage.openFuBenResPanel();
			})
			//心魔
			this.btn_xinmo.on(Laya.UIEvent.CLICK, this, function () {
				PanelManage.openFuBenXinMoPanel();
			})
			//缉拿
			this.btn_jina.on(Laya.UIEvent.CLICK, this, function () {
				PanelManage.openFuBenJiNaPanel();
			})
			this.btn_saodang.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.oneKeyChuMoPanel, [this.showPZID], null, this, function (data) {
					let o = new FuBen_ZhuXian_SaoDang_Dialog();
					o.setData(this.showPZID, data)
					o.popup();
				})
				pkt.send();
			})
		}

		/**
		 * 
		 * @param boo true 下一篇章
		 */
		public changePZ(boo: boolean) {
			if (boo) {
				if (this.showPZID + 1 > GameApp.MainPlayer.pianZhangID) {
					TipsManage.showTips('已经是最后一篇');
				}
				else {
					// 篇章的第一个章节
					let firstzjid = this.getPianZhangFirstID(this.showPZID + 1);
					this.updatePianZhangInfo(this.showPZID + 1, firstzjid, 0);
				}

			} else {
				if (this.showPZID == 1001) {
					TipsManage.showTips('已经是第一篇');
				} else {
					// 篇章的第一个章节
					let firstzjid = this.getPianZhangFirstID(this.showPZID - 1);
					this.updatePianZhangInfo(this.showPZID - 1, firstzjid, 0);
				}
			}
		}

		/**
		 * 篇章首个章节ID
		 * @param pzid 
		 */
		public getPianZhangFirstID(pzid) {
			for (let i = 1; GameApp.MainPlayer.allPianZhangInfo[i]; i++) {
				let pzinfo = GameApp.MainPlayer.allPianZhangInfo[i];
				if (pzid == pzinfo.pzid) {
					let firstzjid = pzinfo.charpterInfo[1].zjid;
					return firstzjid
				}
			}
		}


		//获取下一个章节ID
		public getNextCharpterID(curCharpterID) {
			let curpzid = GameApp.MainPlayer.allCharpterInfo[curCharpterID].pzid;
			let volumeArr = GameApp.MainPlayer.allPianZhangInfo;
			for (let i = 1; volumeArr[i]; i++) {
				if (volumeArr[i].pzid == curpzid) {
					let charpterInfo = volumeArr[i].charpterInfo;
					for (let j = 1; charpterInfo[j]; j++) {
						let curcharpterInfo = charpterInfo[j];
						// 找到自己篇章
						if (curcharpterInfo.zjid == curCharpterID) {
							let nextcharpterInfo = charpterInfo[j + 1];
							// 本篇
							if (nextcharpterInfo) {
								return nextcharpterInfo.zjid
							}
							// 下一篇第一章
							else {
								if (volumeArr[i + 1]) {
									return volumeArr[i + 1].charpterInfo[1].zjid
								}
							}
						}
					}
					break
				}
			}
		}


		//获取上一个章节ID
		public getLastCharpterID(curCharpterID) {
			let curpzid = GameApp.MainPlayer.allCharpterInfo[curCharpterID].pzid;
			let volumeArr = GameApp.MainPlayer.allPianZhangInfo;
			for (let i = 1; volumeArr[i]; i++) {
				if (volumeArr[i].pzid == curpzid) {
					let charpterInfo = volumeArr[i].charpterInfo;
					for (let j = 1; charpterInfo[j]; j++) {
						let curcharpterInfo = charpterInfo[j];
						// 找到自己篇章
						if (curcharpterInfo.zjid == curCharpterID) {
							let lastcharpterInfo = charpterInfo[j - 1];
							// 本篇
							if (lastcharpterInfo) {
								return lastcharpterInfo.zjid
							}
							// 上一篇最后章
							else {
								if (volumeArr[i - 1]) {
									lastcharpterInfo = volumeArr[i - 1].charpterInfo
									let key = Object.keys(lastcharpterInfo).length;
									return volumeArr[i - 1].charpterInfo[key - 1].zjid
								}
							}
						}
					}
					break
				}
			}
		}

		/**
		 * 判断是否是第一章节
		 */
		public isFirstCharpter() {
			return this.showZJID == 10001
		}

		public dealWithPosX() {
			let span = this.touchEndX - this.touchBeginX;
			if (Math.abs(span) < 200) {
				return;
			}
			// 向左 上一篇
			if (span > 200) {
				if (this.isFirstCharpter()) {
					TipsManage.showTips('已经是第一章');
					return;
				}
				else {
					let lastcharpterID = this.getLastCharpterID(this.showZJID);
					let pzid = GameApp.MainPlayer.allCharpterInfo[lastcharpterID].pzid;
					this.updatePianZhangInfo(pzid, lastcharpterID, -1);
				}
			} else if (span < -200) {
				if (this.showZJID >= GameApp.MainPlayer.charpterID) {
					TipsManage.showTips('继续阅读小说解锁新的关卡');
					return;
				} else {
					let nextcharpterID = this.getNextCharpterID(this.showZJID);
					let pzid = GameApp.MainPlayer.allCharpterInfo[nextcharpterID].pzid;
					this.updatePianZhangInfo(pzid, nextcharpterID, 1);
				}
			}
		}

		public getPosX(ev) {
			let x = ev.stageX;
			return x;
		}

		public initUI(): void {
			this.updatePianZhangInfo(GameApp.MainPlayer.pianZhangID, GameApp.MainPlayer.charpterID, 0);
		}

		/**
		 * 更新篇章目录条
		 * @param index 前 中 后 -1 0 1
		 */
		public updatePianZhangInfo(pzID: number, zjid: number, index): void {
			this.showPZID = pzID;
			// 拉取章节信息
			this.img_volume.skin = 'image/fuben/fuben_' + pzID + '.png'
			let allPianZhangInfo = GameApp.MainPlayer.allPianZhangInfo;
			let OnePianZhangInfo;
			for (let i = 1; allPianZhangInfo[i]; i++) {
				if (allPianZhangInfo[i].pzid == pzID) {
					OnePianZhangInfo = allPianZhangInfo[i];
					this.lab_volumeID.text = '第' + GameUtil.SectionToChinese(i, 0) + '篇';
					break
				}
			}
			// 更新单个章节的信息
			this.updateMainFuBenInfo(zjid, index);
		}


		/**
		 * 拉取单个章节信息
		 * @param charpterID 
		 */
		public updateMainFuBenInfo(charpterID: number, index): void {
			this.showZJID = charpterID;
			// this.hbox_1.removeChildren();
			// 关卡名称
			let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = GameApp.MainPlayer.allCharpterInfo[charpterID];
			if (charpterInfo) {
				this.html_charpterName.style.fontFamily = 'STXingkai';
				this.html_charpterName.style.fontSize = 30;
				this.html_charpterName.style.align = 'center';
				let id = GameUtil.SectionToChinese(parseInt(charpterInfo.index), 0);
				this.html_charpterName.innerHTML = "<span style='color:#2c2d27'>" + "第" + id + "章" + '</span>'
					+ "<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>"
					+ "<span style='color:#79393a'>" + charpterInfo.name + '</span>';
				this.lab_unLockTips.text = '通关本章节解锁阅读下一章小说';
			}
			// 副本配置
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_ChuMoClientOpen, [charpterID], null, this, (jsonData: ProtoCmd.itf_FB_MainFbInfo) => {
				console.log(jsonData, 'updateMainFuBenInfo');
				// this.charpterArray.push(charpterID);
				this.html_FubenTimes.style.fontFamily = 'STKaiti';
				this.html_FubenTimes.style.fontSize = 30;
				this.html_FubenTimes.style.align = 'center';
				// 当前次数
				this.curTimes = jsonData.totalcnt - jsonData.curcnt;
				// 最大次数
				this.maxTimes = jsonData.totalcnt;
				this.html_FubenTimes.innerHTML = "<span style='color:#a00000'>" + (jsonData.totalcnt - jsonData.curcnt)
					+ '</span>' + "<span style='color:#000000'>/" + jsonData.totalcnt + '</span>';

				// 最高通关层数
				GameApp.MainPlayer.curFuBenMainID = jsonData.ceng;
				this.ui_curItem.setData(jsonData.state)
				// 关卡信息
				// switch (index) {

				// 	case -1:
				// 		this.ui_lastItem.setData(jsonData.state);
				// 		break;
				// 	case 0:
				// 		this.ui_curItem.setData(jsonData.state)
				// 		break
				// 	case 1:
				// 		this.ui_nextItem.setData(jsonData.state)
				// 		break;
				// }
			})
			lcp.send(pkt);

		}



	}
}