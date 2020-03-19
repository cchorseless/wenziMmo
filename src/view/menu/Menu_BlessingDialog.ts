/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_BlessingDialog extends ui.menu.Menu_BlessingDialogUI {
		constructor() {
			super();
			this.name = 'Menu_BlessingDialog';
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
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.onclose)
			//金币祈福
			this.btn_gold.on(Laya.UIEvent.CLICK, this, () => {
				if (this.goldNum < this.maxgoldNum) {
					this.ani_godbox.play(0,false,'ani_goldbox_open');
					this.btn_gold.disabled = true;
					this.ani_godbox.once(Laya.Event.COMPLETE,this,function(){
						let id = 1;
						this.init_blessGet(id);
					}.bind(this));
				}
				else {
					TipsManage.showTips('今日金币祈福次数已满')
				}
			})
			//礼券祈福
			this.btn_liquan.on(Laya.UIEvent.CLICK, this, () => {
				if (this.liquanNum < this.maxliquanNum) {
					this.ani_liquanbox.play(0,false,'ani_liquanbox_open');
					this.btn_liquan.disabled = true;
					this.ani_liquanbox.once(Laya.Event.COMPLETE,this,function(){
						let id = 2;
						this.init_blessGet(id);
					}.bind(this));					
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
				this.lbl_get1.text = jsonData.GoldNum.toString();
				//今日金币祈福暴击倍数
				this.lbl_crit1.text = jsonData.GoldCritLeftNum + '倍';
				//金币祈福所需元宝
				if (jsonData.GoldNeedYuanBao == 0) {
					this.lbl_yuanbao1.text = '免费祈福';
				} else {
					this.lbl_yuanbao1.text = jsonData.GoldNeedYuanBao.toString();
				}
				//祈福后可获得金币
				this.lbl_jinbi.text = jsonData.GetGoldNum.toString();
				//当前金币祈福次数
				this.lbl_currentGoldnum.text = jsonData.GoldCnt.toString();
				this.goldNum = jsonData.GoldCnt;
				//金币祈福最大次数
				this.lbl_maxGoldnum.text = jsonData.GoldMaxCnt.toString();
				this.maxgoldNum = jsonData.GoldMaxCnt;
				//金币宝箱显示状态和金币祈福按钮显示状态
				if(!this.ani_godbox.isPlaying){
					if(this.goldNum >= this.maxgoldNum){
						this.ani_godbox.gotoAndStop(this.ani_godbox.count - 1);
						this.btn_gold.disabled = true;
					} else {
						this.ani_godbox.gotoAndStop(0);
						this.btn_gold.disabled = false;
					}
				}
				//今日获得礼券总数
				this.lbl_get2.text = jsonData.LiJuanNum.toString();
				//今日礼券祈福暴击倍数
				this.lbl_crit2.text = jsonData.LiJuanCritLeftNum + '倍';
				//礼券祈福所需元宝
				if (jsonData.LiJuanNeedYuanBao == 0) {
					this.lbl_yuanbao2.text = '免费祈福';
				}
				else {
					this.lbl_yuanbao2.text = jsonData.LiJuanNeedYuanBao.toString();
				}
				//祈福后可获得礼券
				this.lbl_liquan.text = jsonData.GetLiJuanNum.toString();
				//当前礼券祈福次数
				this.lbl_currentLiQuannum.text = jsonData.LiJuanCnt.toString();
				this.liquanNum = jsonData.LiJuanCnt;
				//礼券祈福最大次数
				this.lbl_maxLiQuannum.text = jsonData.LiJuanMaxCnt.toString();
				this.maxliquanNum = jsonData.LiJuanMaxCnt;
				//礼券宝箱显示状态和礼券祈福按钮显示状态
				if(!this.ani_liquanbox.isPlaying){
					if(this.liquanNum >= this.maxliquanNum){
						this.ani_liquanbox.gotoAndStop(this.ani_liquanbox.count - 1);
						this.btn_liquan.disabled = true;
					} else {
						this.ani_liquanbox.gotoAndStop(0);
						this.btn_liquan.disabled = false;
					}
				}
			})
		}
		public onclose(): void {
			GameApp.LListener.offCaller(ProtoCmd.Menu_QiFuClientOpen, this);
			DialogManage.closeDialog(this);
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
