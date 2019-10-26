/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_BlessingDialog extends ui.menu.Menu_BlessingDialogUI {
		constructor() {
			super();
			this.setData();
		}
		//金币祈福当前次数
		private goldNum;
		//礼券祈福当前次数
		private liquanNum;
		//金币祈福最大次数
		private maxgoldNum;
		//礼券祈福最大次数
		private maxliquanNum;
		public setData(): void {
			this.addEvent();
			this.init_blessPanel();
			this.addLcpEvent();
		}
		public addEvent(): void {
			//关闭弹窗
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			//金币祈福
			this.btn_gold.on(Laya.UIEvent.CLICK, this, () => {
				if (this.goldNum < this.maxgoldNum) {
					let id = 1;
					this.init_blessGet(id);
				}
				else {
					TipsManage.showTips('今日金币祈福次数已满')
				}

			})
			//礼券祈福
			this.btn_liquan.on(Laya.UIEvent.CLICK, this, () => {
				if (this.liquanNum < this.maxliquanNum) {
					let id = 2;
					this.init_blessGet(id);
				}
				else {
					TipsManage.showTips('今日礼券祈福次数已满')
				}
			})
		}

		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.Menu_QiFuClientOpen, this, (jsonData: ProtoCmd.itf_Menu_blessInfo) => {
				console.log('====》菜单祈福', jsonData)
				//今日获得金币总数
				this.lbl_get1.text = '' + jsonData.GoldNum;
				//今日金币祈福暴击倍数
				this.lbl_crit1.text = jsonData.GoldCritLeftNum + '倍暴击';
				//金币祈福所需元宝
				if (jsonData.GoldNeedYuanBao == 0) {
					this.lbl_yuanbao1.text = '免费祈福';
				} else {
					this.lbl_yuanbao1.text = '' + jsonData.GoldNeedYuanBao;
				}
				//祈福后可获得金币
				this.lbl_jinbi.text = '' + jsonData.GetGoldNum;
				//当前金币祈福次数
				this.lbl_currentGoldnum.text = '' + jsonData.GoldCnt;
				this.goldNum = jsonData.GoldCnt;
				//金币祈福最大次数
				this.lbl_maxGoldnum.text = '/ ' + jsonData.GoldMaxCnt;
				this.maxgoldNum = jsonData.GoldMaxCnt;
				if (this.goldNum == this.maxgoldNum) {
					this.img_goldiBless.skin='image/common/icon_bigbaoxiang_4open.png'
				}
				//今日获得礼券总数
				this.lbl_get2.text = '' + jsonData.LiJuanNum;
				//今日礼券祈福暴击倍数
				this.lbl_crit2.text = jsonData.LiJuanCritLeftNum + '倍暴击';
				//礼券祈福所需元宝
				if (jsonData.LiJuanNeedYuanBao == 0) {
					this.lbl_yuanbao2.text = '免费祈福';
				}
				else {
					this.lbl_yuanbao2.text = '' + jsonData.LiJuanNeedYuanBao;
				}
				//祈福后可获得礼券
				this.lbl_liquan.text = '' + jsonData.GetLiJuanNum;
				//当前礼券祈福次数
				this.lbl_currentLiQuannum.text = '' + jsonData.LiJuanCnt;
				this.liquanNum = jsonData.LiJuanCnt;
				//礼券祈福最大次数
				this.lbl_maxLiQuannum.text = '/ ' + jsonData.LiJuanMaxCnt;
				this.maxliquanNum = jsonData.LiJuanMaxCnt;
				if (this.liquanNum == this.maxliquanNum) {
					this.img_liquanBless.skin='image/common/icon_bigbaoxiang_4open.png'
				}
			})
		}
		/**
		 * 祈福面板发协议
		 */
		public init_blessPanel(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Menu_QiFuClientOpen)
			lcp.send(pkt);
		}
		/**
		 * 祈福功能发协议
		 * @param id id是祈福类型
		 */
		public init_blessGet(id): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Menu_QiFu, [id])
			lcp.send(pkt);
		}
	}
}
