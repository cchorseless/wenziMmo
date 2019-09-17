/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_MainPanel extends ui.fuBen.FuBen_MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.initUI();
			this.addEvent();
		}

		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.showPanel(PanelManage.JuQingMode);
			});
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			EventManage.onWithEffect(this.btn_daily, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenDailyPanel();
			});
			EventManage.onWithEffect(this.btn_juQing, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenMainPanel();
			});
			EventManage.onWithEffect(this.btn_liLian, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenLiLianPanel();
			});
			EventManage.onWithEffect(this.btn_xianShi, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenXianShiPanel();
			});
			EventManage.onWithEffect(this.btn_pianZhang, Laya.UIEvent.CLICK, this, () => {
				new view.dialog.ChapterListDialog().setData().popup(true);
			});
		}


		public initUI(): void {
			this.panel_0.vScrollBarSkin = '';
			this.panel_1.hScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.hbox_1['sortItem'] = (items) => { };
			this.updatePianZhangInfo(GameApp.MainPlayer.pianZhangID);
		}

		/**
		 * 更新篇章目录条
		 * @param index 
		 */
		public updatePianZhangInfo(pzID: number): void {
			// 拉取章节信息
			let pkt1 = new ProtoCmd.QuestClientData();
			pkt1.setString(ProtoCmd.JQ_GET_JQ_ZHANGJIE, [pzID], null, this,
				(jsonData: { pzid: number, pzname: string, charpterInfo: any }) => {
					if (jsonData.pzid == pzID) {
						// 篇章名字
						this.lbl_pianZhangName.text = jsonData.pzname;
						let keys = Object.keys(jsonData.charpterInfo);
						this.vbox_0.removeChildren();
						for (let key of keys) {
							let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = jsonData.charpterInfo[key];
							charpterInfo.index = key;
							let charpterTitle_ui = new view.compart.JuQingTitleItem();
							charpterTitle_ui.anchorX = 0;
							charpterTitle_ui.setData(charpterInfo);
							this.vbox_0.addChild(charpterTitle_ui);
							// 更新章节信息
							GameApp.GameEngine.allCharpterInfo[charpterInfo.zjid] = charpterInfo;
						}
						// 更新单个章节的信息
						this.updateMainFuBenInfo(GameApp.MainPlayer.charpterID);
					}
				});
			lcp.send(pkt1);
		}

		/**
		 * 拉取单个章节信息
		 * @param charpterID 
		 */
		public updateMainFuBenInfo(charpterID: number): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_ChuMoClientOpen, [charpterID], null, this, (jsonData: ProtoCmd.itf_FB_MainFbInfo) => {
				console.log(jsonData);
				// 关卡名称
				let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = GameApp.GameEngine.allCharpterInfo[charpterID];
				if (charpterInfo) {
					// 章节标题信息
					this.lbl_charpterName.text = '第' + charpterInfo.index + '章 ' + charpterInfo.name;
				}
				// 挑战次数
				this.lbl_tiaoZhanTimes.text = '挑战次数:' + jsonData.curcnt + '/' + jsonData.totalcnt;
				// 关卡信息
				let keys = Object.keys(jsonData.state);
				for (let key of keys) {
					// 设置怪物头像数据
					(this['ui_item' + (parseInt(key) % 5)] as view.compart.MonsterIconV0Item).setData(charpterID, key, jsonData.state[key]);
				}
				// 设置宝箱状态
				// 9星宝箱
				let img9skin = '';
				switch (jsonData.star['1'].bj) {
					// 不能打开
					case 0:
						img9skin = 'image/common/icon_baoxiang02.png';
						break;
					// 可以打开
					case 1:
						img9skin = 'image/common/icon_baoxiang02down.png';
						break;
					// 已被打开
					case 2:
						img9skin = 'image/common/icon_baoxiang02.png';
						break;
				}
				this.img_9prize.skin = img9skin;
				// 15星宝箱
				let img15skin = '';
				switch (jsonData.star['2'].bj) {
					// 不能打开
					case 0:
						img15skin = 'image/common/icon_baoxiang03.png';
						break;
					// 可以打开
					case 1:
						img15skin = 'image/common/icon_baoxiang03down.png';
						break;
					// 已被打开
					case 2:
						img15skin = 'image/common/icon_baoxiang03.png';
						break;
				}
				this.img_15prize.skin = img15skin;
				// 显示单个BOSS信息
				this.updateMainFuBenBossInfo(jsonData.ceng)
			})
			lcp.send(pkt);
		}


		/**
		 * 选择单个BOSS信息
		 */
		public updateMainFuBenBossInfo(ceng: number): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_ChuMoCengOpen, [ceng], null, this, (jsonData) => {
				// this.lbl_cureventName.text =



			})
			lcp.send(pkt);
		}
	}
}