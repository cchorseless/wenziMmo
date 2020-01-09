/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_MainPanel extends ui.fuBen.FuBen_MainPanelUI {
		public static self: FuBen_MainPanel;
		public static fromStr: string;
		public curTimes;
		public maxTimes;
		public isOpen = false;

		public showPZID;//当前篇章的ID；
		public showZJID;//当前章节的ID；
		public minzjID; //当前篇章中最小章节ID
		public maxzjID; //当前篇章中最大章节ID
		// public 

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
			this.initUI();
			this.addEvent();
			this.html_juqing.style.fontFamily = 'STXingkai';
			this.html_juqing.style.fontSize = 35;
			this.html_juqing.style.align = 'center';
			this.html_juqing.style.color = '#000000';
			this.html_juqing.style.strokeColor = '#ffffff';
			this.html_juqing.style.stroke = 4;
			this.html_juqing.innerHTML = "<span>" + '剧情' + '</span>';

			this.html_richang.style.fontFamily = 'STXingkai';
			this.html_richang.style.fontSize = 35;
			this.html_richang.style.align = 'center';
			this.html_richang.style.color = '#000000';
			this.html_richang.style.strokeColor = '#ffffff';
			this.html_richang.style.stroke = 4;
			this.html_richang.innerHTML = "<span>" + '日常' + '</span>';
			this.changeButtonLabel(1)
		}
		public changeButtonLabel(id: number) {
			if (id == 1) {
				this.html_juqing.style.color = '#ffffff';
				this.html_juqing.style.strokeColor = '#783818';
				this.html_richang.style.color = '#000000';
				this.html_richang.style.strokeColor = '#ffffff';
				this.btn_juqing.selected = true;
				this.btn_daily.selected = false;
			} else {
				this.html_richang.style.color = '#ffffff';
				this.html_richang.style.strokeColor = '#783818';
				this.html_juqing.style.color = '#000000';
				this.html_juqing.style.strokeColor = '#ffffff';
				this.btn_juqing.selected = false;
				this.btn_daily.selected = true;
			}

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
			this.btn_last.on(Laya.UIEvent.CLICK, this, function () {
				this.changePZ(false);
			})
			this.btn_next.on(Laya.UIEvent.CLICK, this, function () {
				this.changePZ(true);
			})
			this.panel_fubenInfo.on(Laya.Event.MOUSE_DOWN, this, function (ex) {
				this.isTouch = true;
				this.touchBeginX = this.getPosX(ex);

			})
			this.btn_rank.on(Laya.Event.MOUSE_DOWN, this, function (ex) {
				let o = new FuBen_ZhuXian_Rank_Dialog();
				o.setData(3);
				o.popup();

			})

			this.panel_fubenInfo.on(Laya.Event.MOUSE_UP, this, function (ex) {
				if (this.isTouch) {
					this.isTouch = false;
					this.touchEndX = this.getPosX(ex);
					this.dealWithPosX()
				}
			})
			this.panel_fubenInfo.on(Laya.Event.MOUSE_OUT, this, function (ex) {
				if (this.isTouch) {
					this.isTouch = false;
					this.touchEndX = this.getPosX(ex);
					this.dealWithPosX()
				}
			})
			this.btn_back.on(Laya.UIEvent.CLICK, this, function () {
				PopUpManager.checkPanel(this);
			})
			this.btn_juqing.on(Laya.UIEvent.CLICK, this, function () {
				// PanelManage.openFuBenDailyPanel()
				this.changeButtonLabel(1)
				return;
			})
			this.btn_daily.on(Laya.UIEvent.CLICK, this, function () {
				this.changeButtonLabel(2)
				PanelManage.openFuBenDailyPanel()
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
		public changePZ(boo: boolean) {
			if (boo) {
				this.showPZID += 1;
				if (this.showPZID > 1005) {
					this.showPZID = 1005;
					TipsManage.showTips('已经是最后一篇');
				} else {
					this.updatePianZhangInfo(this.showPZID, this.isOpen);
				}
			} else {
				this.showPZID -= 1;
				if (this.showPZID < 1001) {
					this.showPZID = 1001;
					TipsManage.showTips('已经是第一篇');
				} else {
					this.updatePianZhangInfo(this.showPZID, this.isOpen);
				}
			}
		}
		public dealWithPosX() {
			let span = this.touchEndX - this.touchBeginX;
			if (Math.abs(span) < 200) {
				return;
			}
			if (span > 200) {
				this.showZJID -= 1;
				if (this.showZJID < this.minzjID) {
					this.showZJID = this.minzjID;
					TipsManage.showTips('已经是第一章');
					return;
				} else {
					this.updateMainFuBenInfo(this.showZJID);
				}
			} else if (span < -200) {
				this.showZJID += 1;
				if (this.showZJID > this.maxzjID) {
					this.showZJID = this.maxzjID;
					TipsManage.showTips('已经是最后一章');
					return;
				} else {
					this.updateMainFuBenInfo(this.showZJID);
				}
			}
		}
		public getPosX(ev) {
			let x = ev.stageX;
			return x;
		}
		public initUI(): void {
			this.html_title.style.fontFamily = 'STXingkai';
			this.html_title.style.fontSize = 35;
			this.html_title.style.align = 'center';
			this.html_title.style.stroke = 3;
			this.html_title.style.strokeColor = '#000000';
			this.html_title.style.color = '#ffffff';
			this.html_title.innerHTML = "<span>主线</span>";
			this.showPZID = GameApp.MainPlayer.pianZhangID;
			this.updatePianZhangInfo(this.showPZID, this.isOpen);
		}

		/**
		 * 更新篇章目录条
		 * @param index 
		 */
		public updatePianZhangInfo(pzID: number, isOpen: boolean): void {
			// 拉取章节信息
			let pkt1 = new ProtoCmd.QuestClientData();
			pkt1.setString(ProtoCmd.JQ_GET_JQ_ZHANGJIE, [pzID], null, this,
				(jsonData: { pzid: number, pzname: string, charpterInfo: any }) => {
					if (jsonData.pzid == pzID) {
						// this.lbl_pianZhangName.text = jsonData.pzname;
						this.img_volume.skin = 'image/fuben/fuben_' + jsonData.pzid + '.png'
						let nowLv = 1;
						let keys = Object.keys(jsonData.charpterInfo);
						this.minzjID = jsonData.charpterInfo[keys[0]].zjid
						this.maxzjID = jsonData.charpterInfo[keys[keys.length - 1]].zjid
						for (let key of keys) {
							if (jsonData.charpterInfo[key].startdbid <= jsonData.pzid && jsonData.charpterInfo[key].startdbid >= jsonData.pzid) {
								nowLv = jsonData.charpterInfo[key].lvl;
							}
							let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = jsonData.charpterInfo[key];
							charpterInfo.index = key;
							// 更新章节信息
							GameApp.MainPlayer.allCharpterInfo[charpterInfo.zjid] = charpterInfo;
						}
						this.lab_volumeID.text = '第' + GameUtil.SectionToChinese(nowLv, 0) + '章';
						// 更新单个章节的信息
						if (!this.isOpen) {
							this.showZJID = GameApp.MainPlayer.charpterID;
						} else {
							this.showZJID = this.minzjID;
						}
						this.isOpen = true;
						this.updateMainFuBenInfo(this.showZJID);
					}
				});
			lcp.send(pkt1);
		}

		/**
		 * 拉取单个章节信息
		 * @param charpterID 
		 */
		public updateMainFuBenInfo(charpterID: number): void {
			// this.hbox_1.removeChildren();
			// 关卡名称

			let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = GameApp.MainPlayer.allCharpterInfo[charpterID];
			if (charpterInfo) {
				this.html_charpterName.style.fontFamily = 'STXingkai';
				this.html_charpterName.style.fontSize = 30;
				this.html_charpterName.style.align = 'center';
				let id = GameUtil.SectionToChinese(parseInt(charpterInfo.index), 0)
				this.html_charpterName.innerHTML = "<span style='color:#2c2d27'>" + "第" + id + "章" + '</span>'
					+ "<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>"
					+ "<span style='color:#79393a'>" + charpterInfo.name + '</span>'
				let tempzjID = parseInt(charpterInfo.index) + 1
				if (tempzjID <= this.maxzjID) {
					this.lab_unLockTips.text = '通关本章节解锁小说第' + tempzjID + '章'
				} else {
					this.lab_unLockTips.text = '通关本章节解锁小说下一篇'
				}


			}
			// 除魔相关信息
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_ChuMoClientOpen, [charpterID], null, this, (jsonData: ProtoCmd.itf_FB_MainFbInfo) => {
				this.html_FubenTimes.style.fontFamily = 'STKaiti';
				this.html_FubenTimes.style.fontSize = 30;
				this.html_FubenTimes.style.align = 'center';
				this.curTimes = jsonData.totalcnt - jsonData.curcnt;
				this.maxTimes = jsonData.totalcnt;
				this.html_FubenTimes.innerHTML = "<span style='color:#a00000'>" + (jsonData.totalcnt - jsonData.curcnt)
					+ '</span>' + "<span style='color:#000000'>/" + jsonData.totalcnt + '</span>'
				// 关卡信息
				let keys = Object.keys(jsonData.state);
				keys = keys.sort(function (a, b) {
					return jsonData.state[a].ceng - jsonData.state[b].ceng
				});
				for (let i = 0; i < keys.length; i++) {
					// 设置怪物头像数据
					// (this['ui_item' + (parseInt(key) % 5)] as view.compart.MonsterIconV0Item).setData(charpterID, key, jsonData.state[key]);
					this['ui_info' + (i + 1)].removeChildren();
					let o = new FuBen_ZhuXIan_Panel_info();
					o.setData(jsonData.ceng, jsonData.state[keys[i]], GameApp.MainPlayer.allCharpterInfo[charpterID].index);
					this['ui_info' + (i + 1)].addChild(o);
				}
				// 显示单个BOSS信息
				// this.updateMainFuBenBossInfo(jsonData.ceng)
			})
			lcp.send(pkt);
		}

		public selectedCeng: number;
		/**
		 * 选择单个BOSS信息
		 */
		public updateMainFuBenBossInfo(ceng: number): void {
			if (ceng == null) { return };
			this.selectedCeng = ceng;
			let pkt = new ProtoCmd.QuestClientData();
			// type(1强化等级，2神盾，3龙魂，4光翼，5武器等级,6穿戴多少件多少等级的装备，8勋章ID)
			pkt.setString(ProtoCmd.FB_ChuMoCengOpen, [ceng], null, this, (jsonData: { type?: number, need?: number, lv?: number, item: any, times: number }) => {
				console.log(jsonData)
				// 随机掉落池
				let keys = Object.keys(jsonData.item);
				for (let key of keys) {
					let _itemData = jsonData.item[key];
					let _itemUI = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = _itemData.index;
					itemInfo.dwBinding = _itemData.binding;
					_itemUI.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
					// this.hbox_2.addChild(_itemUI);
				};
			});
			lcp.send(pkt);
		}

		/**
		 * 进入除魔副本
		 */
		public enterFuBen(): void {
			if (this.selectedCeng == null) { return };
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_ChuMoEnter, [this.selectedCeng]);
			lcp.send(pkt);
		}
	}
}