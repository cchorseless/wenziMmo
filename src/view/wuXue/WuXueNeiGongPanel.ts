/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXueNeiGongPanel extends ui.wuXue.WuXueNeiGongPanelUI {
		constructor() {
			super();
		}
		private value;
		public setData(): void {
			this.btn_neiGong.selected=true;
			this.initUI();
			this.addEvent();
			this.init_jingluo();
		}
		public addEvent(): void {
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
			this.ui_item7.lbl_buWei.text = '内功武学';
			this.ui_item8.lbl_buWei.text = '内功武学';
			this.ui_item9.lbl_buWei.text = '内功武学';
			this.ui_item10.lbl_buWei.text = '内功武学';
			// 动画
			this.changeWidthTw()
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
				this.lbl_neigong.text = '' + data[1];
				//内功抵抗
				this.lbl_dikang.text = data[0] + "%";
				let value = jsonData.dangqianneigong - jsonData.xiaohaoitem;
				this.value = value;
				if (value < 0) {
					//当前内功值进度
					this.lbl_value.text = jsonData.dangqianneigong + '/' + jsonData.xiaohaoitem;
					//当前内功值进度条
					this.img_progress.width = 149 * jsonData.dangqianneigong / jsonData.xiaohaoitem;
				} else {
					//当前内功值进度
					this.lbl_value.text = jsonData.xiaohaoitem + '/' + jsonData.xiaohaoitem;
					//当前内功值进度条
					this.img_progress.width = 149;
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
			GameApp.LListener.offCaller(ProtoCmd.WX_shuxingxitong_minabandakai, this);
			PopUpManager.Dispose(this);
		}
		//经络拉取发包
		public init_jingluo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.WX_shuxingxitong_minabandakai)
			lcp.send(pkt);
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
		public changeWidthTw(): void {
			Laya.Tween.to(this.img_exp, { width: this.img_expBg.width }, 3000, null,
				Laya.Handler.create(this, () => {
					this.img_exp.width = 0;
					this.changeWidthTw();
				}));
		}
	}
}