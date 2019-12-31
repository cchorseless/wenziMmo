/**Created by the LayaAirIDE*/
module view.menu {
	export class MenuMoBaiDialog extends ui.menu.MenuMoBaiDialogUI {
		constructor() {
			super();
			this.setData();
		}
		private mobaiORbishi;
		public setData(): void {
			this.addEvent();
			this.init_mobaiData()
		}
		public addEvent(): void {
			//关闭弹窗
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			//城主特权
			this.btn_tequan.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_tequan.selected = !this.btn_tequan.selected
				this.init_dialogEvent(this.btn_tequan.selected);
			})
			//膜拜
			this.btn_mobai.on(Laya.UIEvent.CLICK, this, () => {
				this.mobaiORbishi = 0;
				this.init_MoBaiEvent();
			})
			//鄙视
			this.btn_bishi.on(Laya.UIEvent.CLICK, this, () => {
				this.mobaiORbishi = 1;
				this.init_MoBaiEvent();
			})
			//刷新
			this.btn_get.on(Laya.UIEvent.CLICK, this, () => {
				this.init_Update();
			})

			this.addLcpEvent();
		}
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.Menu_WorShipOpen, this, (jsonData: ProtoCmd.itf_Menu_MoBaiInfo) => {
				//城主名称
				this.lbl_name.text = jsonData.name;
				//城主半身造型
				if (jsonData.name != '虚位以待') {
					let pkt = new ProtoCmd.GetOtherPlayerInfoEncoder();
					pkt.setValue('szName', jsonData.name)
					lcp.send(pkt, this, (data) => {
						let bpkt = new ProtoCmd.GetOtherPlayerInfoDecoder(data)
						let job = bpkt.getValue('btJob');
						let sex = bpkt.getValue('btSex');
						let part;
						if (sex == 1) {
							part = 'nan'
						}
						if (sex == 2) {
							part = 'nv'
						}
						this.img_person.skin = 'image/common/' + sex + '0' + job + '_half.png'
					})
				}
				else {
					this.img_person.skin = '';
				}
				//倍数介绍
				let keys = Object.keys(jsonData.multab)
				let array = []
				for (let key of keys) {
					let data = jsonData.multab[key]
					array.push(data.beishu + '倍:获得经验' + data.exp);
					//当前可获得经验
					if (jsonData.multiple == parseInt(data.beishu)) {
						this.lbl_exp.text = '经验：  ' + data.exp;
					}
				}
				this.lbl_introduce.text = '' + array;
				//当前倍数
				this.btn_beishu.label = GameUtil.SectionToChinese(jsonData.multiple,0) + '倍';
				//今日膜拜次数
				this.lbl_cout.text = '' + jsonData.worshipcnt;
				//今日最大膜拜次数
				this.lbl_maxCount.text = '/' + jsonData.maxcnt;
				//膜拜率	
				this.lbl_mobailv.text = '' + jsonData.support*100 + '%';
				//鄙视率
				this.lbl_bishilv.text = '' + jsonData.scorn*100 + '%';
				if (jsonData.worshipcnt == jsonData.maxcnt) {
					this.btn_get.mouseEnabled = false;
					this.btn_get.gray = true;
				}
			})
		}
		/**
		 * 
		 * @param type 城主特权按钮是否被选中
		 */
		public init_dialogEvent(type: boolean): void {
			if (type) {
				Laya.Tween.to(this.img_dialog, { scaleX: 1, scaleY: 1 }, 200);
			}
			else {
				Laya.Tween.to(this.img_dialog, { scaleX: 0, scaleY: 0 }, 200);
			}
		}
		/**
		 * 拉取膜拜面板信息
		 */
		public init_mobaiData(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Menu_WorShipOpen)
			lcp.send(pkt);
		}
		/**
		 * 膜拜or鄙视
		 */
		public init_MoBaiEvent(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Menu_WorshipGetWard, [this.mobaiORbishi])
			lcp.send(pkt);
		}
		/**
		 * 刷新奖励
		 */
		public init_Update(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Menu_RefreshWard, [2])
			lcp.send(pkt);
		}
	}
}