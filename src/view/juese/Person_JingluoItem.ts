/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_JingluoItem extends ui.juese.Person_JingluoItemUI {
		constructor() {
			super();
		}
		public hasInit = false;// 初始化自己
		private client_func_index = 15;// 功能ID编号
		private value;
		//开启所需等级总数
		private sum;
		//玩家等级总数
		private mySum;
		public setData(): void {
			if (this.hasInit) { return };
			this.hasInit = true;
			this.addEvent();
			this.activation();

		}
		public addEvent(): void {
			this.btn_lvUp.on(Laya.UIEvent.CLICK, this, () => {
				this.init_ShengJiInfo();
			});
			// if (this.mySum >= this.sum) {
				this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
					GameUtil.setServerData(this.client_func_index);
					this.activation();
				});
			// }
			// else {
			// 	this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
			// 		TipsManage.showTips('您当前等级不足，暂时不能开启')
			// 	});
			// }
		}
		public activation(): void {
			//判断是否激活
			if (GameUtil.getServerData(this.client_func_index)) {
				this.viw_jingluo.selectedIndex = 1;
				this.addLcpEvent();
				this.init_jingluo();
			}
			else {
				this.viw_jingluo.selectedIndex = 0;
				this.notActivation();
			}
		}
		/**
		 * 未激活时
		 */
		public notActivation(): void {
			let id = this.client_func_index + 1000;
			let activationLvl = SheetConfig.Introduction_play.getInstance(null).LEVEL('' + id);
			let zsLvl = Math.floor(activationLvl / 1000);
			let lvl = activationLvl % 1000;
			this.lbl_detail.text = SheetConfig.Introduction_play.getInstance(null).CONTENT('' + id);
			this.lbl_condition.text = '' + SheetConfig.Introduction_play.getInstance(null).TEXT1('' + id)
			this.sum = zsLvl * 1000 + lvl;
			this.mySum = GameApp.MainPlayer.zslevel * 1000 + GameApp.MainPlayer.level;
		}
		/**
		 * 经络信息拉取
		 */
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.JS_shuxingxitong_minabandakai, this, (jsonData: ProtoCmd.itf_JS_NeiGongInfo) => {
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
					this.img_progress.width = 390 * jsonData.dangqianneigong / jsonData.xiaohaoitem;
				} else {
					//当前内功值进度
					this.lbl_value.text = jsonData.xiaohaoitem + '/' + jsonData.xiaohaoitem;
					//当前内功值进度条
					this.img_progress.width = 390;
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

		public destroy(bool): void {
			GameApp.LListener.offCaller(ProtoCmd.JS_shuxingxitong_minabandakai, this);
			super.destroy(bool);
		}

		//经络拉取发包
		public init_jingluo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_shuxingxitong_minabandakai)
			lcp.send(pkt);
		}

		/**
		 * 经络升级发包
		 */
		public init_ShengJiInfo(): void {
			if (this.value >= 0) {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.JS_shuxingxitong_shengji)
				lcp.send(pkt);
			}
			else {
				TipsManage.showTips('当前经验不足，无法升级')
			}
		}
	}
}