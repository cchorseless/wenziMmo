/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXueNeiGongPanel extends ui.wuXue.WuXueNeiGongPanelUI {
		public static self:WuXueNeiGongPanel;
		public totalEXP = 0;
		public curEXP = 0;
		constructor() {
			super();
			WuXueNeiGongPanel.self = this;
		}
		private value;
		public setData(): void {
			this.btn_neiGong.selected = true;
			this.initUI();
			this.addEvent();
			this.init_jingluo();
			this.getMyData();
		}
		public getMyData() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.neigong_nowTick, null, 0, this, function (data) {
				let aa = data;
				// console.log("当前时间:" + data.tick);
				this.lbl_des.text = "每分钟" + data.rate + "点内功"
				this.img_exp.width = (data.tick / 60) * this.img_expBg.width;
				let second = (60 - data.tick) * 1000;
				this.changeWidthTw(second)
			})
			lcp.send(pkt);
		}
		public addEvent(): void {
			//刷新面板
			GameApp.LListener.on(ProtoCmd.WX_upData_panel_neigong, this, function () {
				this.initUI();
				for (let key in GameApp.MainPlayer.skillInfo) {
					//ProtoCmd.stSkillLvlBase
					let configid = GameApp.MainPlayer.skillInfo[key].configID
					if (SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID(configid) == GameApp.GameEngine.wuxueDataID) {
						GameApp.LListener.event(ProtoCmd.WX_upData_Dialog, GameApp.MainPlayer.skillInfo[key]);
					}
				}
			})
			GameApp.LListener.on(ProtoCmd.WX_upData_Hotkeys_neigong, this, function () {
				this.initUI()
				this.getMyData()
			})
			// 模式切换
			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});
			// 返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			// 外功
			this.btn_waiGong.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueWaiGongPanel()
			});
			// 闭关
			this.btn_closeDoor.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueCloseDoorPanel();
			});
			// 合道
			this.btn_heDao.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueHeDaoPanel();
			});
			this.btn_lvUp.on(Laya.UIEvent.CLICK, this, () => {
				this.init_ShengJiInfo();
			});
			this.addLcpEvent();
		}

		public initUI(): void {
			for (let i = 7; i < 11; i++) {
				this["ui_item" + i].removeItem();
				// this["ui_item" + i].lbl_buWei.text = "";
				this["lbl_des" + i].text = "0点/min";
			}
			this.ui_item7.lbl_buWei.text = '内功武学';
			this.ui_item8.lbl_buWei.text = '内功武学';
			this.ui_item9.lbl_buWei.text = '内功武学';
			this.ui_item10.lbl_buWei.text = '内功武学';
			// 动画
			// this.changeWidthTw()
			//list
			this.list_0.vScrollBarSkin = '';
			this.list_0.itemRender = view.wuXue.WuXue_InfoItem
			this.list_0.array = [];
			this.list_0.repeatX = 2;
			for (let key in GameApp.MainPlayer.skillInfo) {
				let _skillBase = GameApp.MainPlayer.skillInfo[key];
				let configID = _skillBase.configID;
				let skillType = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLTYPE(configID);
				switch (skillType) {
					case EnumData.enSkillType.NeiGong:
						this.list_0.array.push(_skillBase);
						break;
				}
			}
			(this.list_0 as Laya.List).renderHandler = Laya.Handler.create(this, (cell: view.wuXue.WuXue_InfoItem, index) => {
				cell.setData(cell.dataSource)
			}, null, false)


			let keys = Object.keys(GameApp.MainPlayer.skillShotButton);
			if (keys.length > 0) {
				for (let key in GameApp.MainPlayer.skillShotButton) {
					let skill_key = (GameApp.MainPlayer.skillShotButton[key]).i64Id.int64ToNumber();
					this.updateSkilButton(parseInt(key), skill_key.toString());
				}
			}
			else {
				// this.showDefaultSkillInfo();
			}
		}
		public updateSkilButton(btRow: number, skill_key: string): void {
			let _skillBase = GameApp.MainPlayer.skillInfo[skill_key];
			let nameStr = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(_skillBase.configID).split('_')[0];
			if (_skillBase) {
				let skill_ui = new view.wuXue.WuXue_logoItem();
				skill_ui.setData(_skillBase.configID);
				switch (btRow) {
					case EnumData.emSkillShotButtonType.NeiGong_1:
						this.ui_item7.addItem(skill_ui);
						this.ui_item7.lbl_buWei.text = nameStr;
						this.lbl_des7.text = SheetConfig.mydb_magic_tbl.getInstance(null).INTERNALCOUNT(_skillBase.configID) + "点/min";
						break;
					case EnumData.emSkillShotButtonType.NeiGong_2:
						this.ui_item8.addItem(skill_ui);
						this.ui_item8.lbl_buWei.text = nameStr;
						this.lbl_des8.text = SheetConfig.mydb_magic_tbl.getInstance(null).INTERNALCOUNT(_skillBase.configID) + "点/min";
						break;
					case EnumData.emSkillShotButtonType.NeiGong_3:
						this.ui_item9.addItem(skill_ui);
						this.ui_item9.lbl_buWei.text = nameStr;
						this.lbl_des9.text = SheetConfig.mydb_magic_tbl.getInstance(null).INTERNALCOUNT(_skillBase.configID) + "点/min";
						break;
					case EnumData.emSkillShotButtonType.NeiGong_4:
						this.ui_item10.addItem(skill_ui);
						this.ui_item10.lbl_buWei.text = nameStr;
						this.lbl_des10.text = SheetConfig.mydb_magic_tbl.getInstance(null).INTERNALCOUNT(_skillBase.configID) + "点/min"
						break;
				}
			}
		}


		/**
		 * 经络信息拉取
		 */
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.WX_shuxingxitong_minabandakai, this, (jsonData: ProtoCmd.itf_WX_NeiGongInfo) => {
				//经络重数
				this.clip_chongshu.value = '' + Math.ceil(jsonData.dangqiandengji / 10);
				//内功恢复
				this.lbl_huifu.text = '' + jsonData.nghf;
				let data = jsonData.dangqianshuxing.split('=')
				//内功值
				this.lbl_neigong.text = jsonData.dangqianneigong.toString();
				//内功抵抗
				this.lbl_dikang.text = (parseInt(data[1]) / 100) + "%";
				this.curEXP = jsonData.zongnum;
				this.totalEXP = jsonData.xiaohaoitem;
				let value = jsonData.zongnum - jsonData.xiaohaoitem;
				this.value = value;
				let k = 100 / 132;
				if (value < 0) {
					//当前内功值进度
					this.panel_showExp.visible = true;
					this.btn_lvUp.visible = false;
					this.lbl_value.text = jsonData.zongnum + '/' + jsonData.xiaohaoitem;
					this.panel_mask.y = 100 - (jsonData.zongnum / jsonData.xiaohaoitem * 100 * k)
					this.img_mask.y = (-1) * (100 - (jsonData.zongnum / jsonData.xiaohaoitem * 100 *k))
				} else {
					//当前内功值进度
					this.panel_showExp.visible = false;
					this.btn_lvUp.visible = true;
					this.lbl_value.text = jsonData.xiaohaoitem + '/' + jsonData.xiaohaoitem;
				}

				let neigong = jsonData.dangqiandengji % 10;
				let line = neigong - 1;
				//穴位点亮
				for (let i = 0; i < neigong; i++) {
					let g = i + 1
					this['btn_xuewei' + g].selected = true;
				}
				//穴位连接线点亮
				for (let i = 0; i < line; i++) {
					let g = i + 1;
					if (neigong >= 2) {
						this['btn_xueweiLine' + g].selected = true;
					}
				}
			})
		}

		public Dispose(): void {
			GameApp.LListener.offCaller(ProtoCmd.WX_upData_Hotkeys_neigong, this);
			GameApp.LListener.offCaller(ProtoCmd.WX_upData_panel_neigong, this);
			GameApp.LListener.offCaller(ProtoCmd.WX_shuxingxitong_minabandakai, this);
			PopUpManager.Dispose(this);
		}
		//经络拉取发包
		public init_jingluo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.WX_shuxingxitong_minabandakai)
			lcp.send(pkt);
		}
		//服务器广播    内功经验增加
		public neigongIncrease(num:number) {
			this.curEXP += num;
			let value = this.curEXP - this.totalEXP;
			this.value = value;
			let k = 100 / 132;
			if (value < 0) {
				//当前内功值进度
				this.panel_showExp.visible = true;
				this.btn_lvUp.visible = false;
				this.lbl_value.text = this.curEXP  + '/' + this.totalEXP;
				this.panel_mask.y = 100 - (this.curEXP  / this.totalEXP * 100)
				this.img_mask.y = (-1) * (100 - (this.curEXP  / this.totalEXP * 100))
			} else {
				//当前内功值进度
				this.panel_showExp.visible = false;
				this.btn_lvUp.visible = true;
				this.lbl_value.text = this.totalEXP + '/' + this.totalEXP;
			}
			TipsManage.showTips("内功值增加" + num + "点！！");
		}

		/**
		 * 经络升级发包
		 */
		public init_ShengJiInfo(): void {
			if (this.value >= 0) {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.WX_shuxingxitong_shengji)
				lcp.send(pkt);
			}
			else {
				TipsManage.showTips('当前经验不足，无法升级')
			}
		}
		/**
		 * 动画
		 */
		public changeWidthTw(second: number): void {
			Laya.Tween.to(this.img_exp, { width: this.img_expBg.width }, second, null,
				Laya.Handler.create(this, () => {
					this.img_exp.width = 0;
					this.changeWidthTw(60000);
				}));
		}

	}
}