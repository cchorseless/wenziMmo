/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_JingluoItem extends ui.juese.Person_JingluoItemUI {
		constructor() {
			super();
		}
		public hasInit = false;// 初始化自己
		public setData(): void {
			if (this.hasInit) { return };
			this.hasInit = true;
			this.addEvent();
			this.init_jingluo();
		}
		public addEvent(): void {
			this.btn_lvUp.on(Laya.UIEvent.CLICK, this, () => {
				this.init_ShengJiInfo();
			})
			this.addLcpEvent();
		}
		/**
		 * 经络信息拉取
		 */
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.JS_shuxingxitong_minabandakai, this, (jsonData: ProtoCmd.itf_JS_NeiGongInfo) => {
				//经络重数
				this.clip_chongshu.value = '' + Math.ceil(jsonData.dangqiandengji);
				//内功恢复
				this.lbl_huifu.text = '' + jsonData.nghf;
				//内功值
				this.lbl_neigong.text = '' + jsonData.dangqianneigong;
				//当前内功值进度
				this.lbl_value.text = jsonData.dangqianneigong + '/' + jsonData.xiaohaoitem;
				//当前内功值进度条
				this.img_progress.width = 390 * jsonData.dangqianneigong / jsonData.xiaohaoitem;
				//内功抵抗
				this.lbl_dikang.text = jsonData.dangqianshuxing.split('=')[0] + "%";
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
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_shuxingxitong_shengji)
			lcp.send(pkt);
		}
	}
}