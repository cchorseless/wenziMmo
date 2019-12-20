/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuanPanel extends ui.zhaiYuan.ZhaiYuanPanelUI {
		public static self:ZhaiYuanPanel;
		constructor() {
			super();
			ZhaiYuanPanel.self = this;
			this.addEvent();
		}
		public setData(): void {
			this.panel_shiWai.hScrollBarSkin = '';
			this.panel_yiLou.hScrollBarSkin = '';
			this.initUI();
			// 延时两帧滚动
			Laya.timer.frameOnce(2, this, () => { this.panel_shiWai.scrollTo(640, 0) });
			this.initSkeBone();
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.zhaiYuanInfo, null);
			lcp.send(pkt);

		}


		public initUI(): void {
			let getScaleY = PanelManage.getScaleY();
			this.box_heHuaChi.scaleY = getScaleY;
			this.box_back.scaleY = getScaleY;
			this.box_back.y = this.box_back.y * getScaleY;
		}
		public initSkeBone(): void {
			let birdSke = new SkeletonUtil.SkeletonGroup();
			birdSke.loadRes(['sk/zhaiyuan_niao/CJ_NIAO_1.sk'], () => {
				this.panel_shiWai.addChild(birdSke);
				birdSke.pos(this.width / 2, this.height * 0.3);
				// this._skeGroup.scale(0.5, 0.5)
				birdSke.play(0, true);
			});

			// let guanJia = new SkeletonUtil.SkeletonGroup();
			// guanJia.loadRes(['sk/zhaiyuan_laoguanjia/NPC_LGJ_1.sk'], () => {
			// 	this.spr_guanJia.removeChildren();
			// 	this.spr_guanJia.addChild(guanJia);
			// 	// this._skeGroup.scale(0.5, 0.5)
			// 	guanJia.play(0, true);
			// });
		}
		public showZhaiYuanMsg(data) {

			let span = data.servants - data.leisureServants
			this.lab_servant.text = span + '/' + data.servants;
			this.timeCutDown(data.leftTime)
			GameApp.GameEngine.zhaiYuanLevels = data.levels;
		}
		public timeCutDown(second) {

			this.html_cost.style.fontFamily = "STKaiti";
			this.html_cost.style.fontSize = 24;
			this.html_cost.style.align = 'center';

			let self = this;
			if (second > 0) {
				second = second * 60
				let aa = TimeUtils.getFormatBySecond(second, 6);
				this.html_cost.innerHTML = "<span style='color:#ffffff'>粮食消耗时间：</span>"
					+ "<span style='color:#f06205'>" + aa + "</span>";

			} else if (second == 0) {
				this.html_cost.innerHTML = "<span style='color:#ffffff'>粮食消耗时间：</span>"
					+ "<span style='color:#f06205'>已耗尽</span>";
			} else if (second == -1) {
				this.html_cost.innerHTML = "<span style='color:#ffffff'>粮食消耗时间：</span>"
					+ "<span style='color:#f06205'>无限</span>";
				return;
			}
			Laya.timer.loop(60000, ui, round);
			function round() {
				second--;
				if (second >= 0) {
					let time = TimeUtils.getFormatBySecond(second, 6)
					self.html_cost.innerHTML = "<span style='color:#ffffff'>粮食消耗时间：</span>"
						+ "<span style='color:#f06205'>" + time + "</span>";
				}
				else {
					self.html_cost.innerHTML = "<span style='color:#ffffff'>粮食消耗时间：</span>"
						+ "<span style='color:#f06205'>已耗尽</span>";
					Laya.timer.clear(ui, round)
				}
			}

		}
		public Dispose(isbool = true) {
			GameApp.LListener.offCaller(ProtoCmd.zhaiYuanInfo, this);
			PopUpManager.Dispose(this);
		}
		public addEvent(): void {
			let self = this;
			//宅院面板信息监听
			GameApp.LListener.on(ProtoCmd.zhaiYuanInfo, self, function (data) {
				GameApp.GameEngine.zhaiYuaninfo = data;
				this.showZhaiYuanMsg(data);
			})

			EventManage.onWithEffect(this.box_shiNei, Laya.UIEvent.CLICK, this, () => {
				this.viw_0.selectedIndex = 1;
			});
			EventManage.onWithEffect(this.box_geLou, Laya.UIEvent.CLICK, this, () => {
				this.viw_0.selectedIndex = 2;
			});
			EventManage.onWithEffect(this.box_yuanZi, Laya.UIEvent.CLICK, this, () => {
				this.viw_0.selectedIndex = 0;
			});
			EventManage.onWithEffect(this.box_yiLou, Laya.UIEvent.CLICK, this, () => {
				this.viw_0.selectedIndex = 1;
			});

			EventManage.onWithEffect(this.box_back, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			});

			// 荷花池
			EventManage.onWithEffect(this.box_heHuaChi, Laya.UIEvent.CLICK, this, () => {
				// new view.zhaiYuan.ZhaiYuan_yangYuDialog().setData().popup(true);
				let o = new ZhaiYuan_HeHuaChiDialog()
				o.setData(1);
				o.popup();
			});

			// 炼器
			EventManage.onWithEffect(this.box_lianQi, Laya.UIEvent.CLICK, this, () => {
				new view.zhaiYuan.ZhaiYuan_lianQiDialog().popup(true);
			});
			// 磨石  合成装备
			EventManage.onWithEffect(this.box_moshi, Laya.UIEvent.CLICK, this, () => {
				let o = new view.dialog.EquipMixUp();
				o.setData(2)
				o.popup(true);
			});

			//出门按钮
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				GameApp.LListener.offCaller(ProtoCmd.zhaiYuanInfo, self)
				PopUpManager.checkPanel(self);
			});
			//建筑
			this.btn_build.on(Laya.UIEvent.CLICK, this, () => {
				let o = new ZhaiYuan_Build_Dialog();
				o.popup();
			});
			//仆役
			this.btn_servant.on(Laya.UIEvent.CLICK, this, () => {
				let o = new ZhaiYuan_Servant_Dialog();
				o.popup();
			});
			//粮食
			this.btn_jitui.on(Laya.UIEvent.CLICK, this, () => {
				let o = new ZhaiYuan_Food_Dialog();
				o.popup();
			});

		}
	}
}