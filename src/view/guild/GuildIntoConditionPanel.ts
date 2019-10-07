/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildIntoConditionPanel extends ui.guild.GuildIntoConditionPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.initUI();
			this.addEvent();
		}

		public addEvent(): void {
			this.btn_guildIntoReturn.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			});
			// 修改招聘公告
			this.btn_changeWanted.on(Laya.UIEvent.CLICK, this, this.setNoticeConfig, [true]);
			// 修改公告
			this.btn_changeNotice.on(Laya.UIEvent.CLICK, this, this.setNoticeConfig, [false]);
			// 修改等級需求
			this.btn_changeLvl.on(Laya.UIEvent.CLICK, this, this.setLvlConfig);
			// 退出幫會
			this.btn_quitGuild.on(Laya.UIEvent.CLICK, this, this.quitGuild);
			// 改變等級
			this.btn_addLvl.on(Laya.UIEvent.CLICK, this, this.changeLvl, [true]);
			this.btn_reduceLvl.on(Laya.UIEvent.CLICK, this, this.changeLvl, [false]);
			// 改變轉生等級
			this.btn_addzsLvl.on(Laya.UIEvent.CLICK, this, this.changezsLvl, [true]);
			this.btn_reducezsLvl.on(Laya.UIEvent.CLICK, this, this.changezsLvl, [false]);
		}

		/**
		 * 初始化界面
		 */
		public initUI(): void {
			// 不是會長隱藏按鈕
			let canDo = GameApp.MainPlayer.checkSelfIsGuildMaster()
			this.btn_changeLvl.visible = canDo;
			this.btn_changeNotice.visible = canDo;
			this.btn_changeWanted.visible = canDo;
			// 隱藏修改等級的四個按鈕
			this.btn_addLvl.visible = false;
			this.btn_addzsLvl.visible = false;
			this.btn_reduceLvl.visible = false;
			this.btn_reducezsLvl.visible = false;
			// 公告
			this.txt_noticeText.text = '' + GameApp.MainPlayer.guildInfo.szNotice;
			// 招聘公告
			this.txt_wantedText.text = '' + GameApp.MainPlayer.guildInfo.szJoinNotice;
			// 加入等級
			this.lbl_needLv.text = '' + GameApp.MainPlayer.guildInfo.dwJoinNeedLvl;
			// 加入轉生等級
			this.lbl_needZsLvl.text = '' + GameApp.MainPlayer.guildInfo.zsLevel;
		}

		/**
		 * 发送协议修改公會設置
		 */
		public changeGuildInfo(data): void {
			if (!GameApp.MainPlayer.checkSelfIsGuildMaster()) {
				TipsManage.showTips('權限不足');
				return
			}
			let pkt = new ProtoCmd.stGlobalGuildChangeNotice();
			// 修改招聘公告和等級
			if (data) {
				pkt.setValue('btType', 1);
				pkt.setValue('szGuildNotice', this.txt_wantedText.text);
			}
			// 修改公會公告
			else {
				pkt.setValue('btType', 0);
				pkt.setValue('szGuildNotice', this.txt_noticeText.text);
			}
			pkt.setValue('dwLevel', parseInt(this.lbl_needLv.text));
			pkt.setValue('zsLevel', parseInt(this.lbl_needZsLvl.text));
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stGlobalGuildChangeNoticeRet(data);
				let errorcode = cbpkt.getValue('btErrorCode');
				if (errorcode == 0) {
					TipsManage.showTips('修改成功');
					// todo  跟新本地信息 更新界面

				}
				cbpkt.clear();
				cbpkt = null;
			})
		}

		/**
		 * 改變等級
		 * @param isAdd 
		 */
		public changeLvl(isAdd): void {
			if (!GameApp.MainPlayer.checkSelfIsGuildMaster()) {
				TipsManage.showTips('權限不足');
				return
			}
			let changeNum = isAdd ? 10 : -10;
			// 最低0級 最高140級
			this.lbl_needLv.text = '' + Math.min(140, Math.max(0, (parseInt(this.lbl_needLv.text) + changeNum)));
		}
		/**
		 * 改變轉生等級
		 * @param isAdd 
		 */
		public changezsLvl(isAdd): void {
			if (!GameApp.MainPlayer.checkSelfIsGuildMaster()) {
				TipsManage.showTips('權限不足');
				return
			}
			let changeNum = isAdd ? 1 : -1;
			// 最低0轉 最高12轉
			this.lbl_needZsLvl.text = '' + Math.min(12, Math.max(0, (parseInt(this.lbl_needZsLvl.text) + changeNum)));
		}

		/**
		 * 保存修改公告
		 */
		public setNoticeConfig(data: boolean): void {
			let btn: Laya.Button;
			let txtArea: Laya.TextArea;
			if (data) {
				btn = this.btn_changeWanted;
				txtArea = this.txt_wantedText;
			}
			else {
				btn = this.btn_changeNotice;
				txtArea = this.txt_noticeText;
			}

			btn.selected = !btn.selected;
			btn.label = btn.selected ? '保存' : '修改';
			txtArea.editable = !txtArea.editable;
			// 点击保存发送协议
			if (!btn.selected) {
				this.changeGuildInfo(data);
			}
		}

		/**
		 * 保存修改等級
		 */
		public setLvlConfig(): void {
			this.btn_changeLvl.selected = !this.btn_changeLvl.selected;
			this.btn_changeLvl.label = this.btn_changeLvl.selected ? '保存' : '修改';
			// 顯示隱藏按鈕
			this.btn_addLvl.visible = this.btn_changeLvl.selected;
			this.btn_addzsLvl.visible = this.btn_changeLvl.selected;
			this.btn_reduceLvl.visible = this.btn_changeLvl.selected;
			this.btn_reducezsLvl.visible = this.btn_changeLvl.selected;
			// 點擊保存發送協議
			if (!this.btn_changeLvl.selected) {
				this.changeGuildInfo(true);
			}
		}

		/**
		 * 退出幫會
		 */
		public quitGuild(): void {
			new view.guild.GuildOutDialog().setData(null).popup(true);
		}
	}
}