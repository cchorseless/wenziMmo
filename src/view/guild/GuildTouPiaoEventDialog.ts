/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildTouPiaoEventDialog extends ui.guild.GuildTouPiaoEventDialogUI {
		constructor() {
			super();
		}
		public setData(): GuildTouPiaoEventDialog {
			this.initUI()
			this.addEvent()
			return this
		}
		public addEvent(): void {
			this.btn_agree.on(Laya.UIEvent.CLICK, this, this.goTouPiao, [1]);
			this.btn_refuse.on(Laya.UIEvent.CLICK, this, this.goTouPiao, [0]);
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => { this.close() });
			this.btn_info.on(Laya.UIEvent.CLICK, this, this.showInfo);

		}
		public detailInfo: Array<ProtoCmd.stVoterBase> = [];
		public initUI(): void {
			let pkt = new ProtoCmd.stGlobalGuildVoteBanMasterView();
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stGlobalGuildVoteBanMasterNotice(data);
				let btErrorCode = cbpkt.getValue('btErrorCode');
				// 有投票
				if (btErrorCode == 0) {
					this.viw_1.selectedIndex = 0;
					// 理由描述
					this.lbl_liYou.text = '' + cbpkt.getValue('szDesc');
					// 同意数量
					this.lbl_agreeCount.text = '' + cbpkt.getValue('nAgree');
					// 不同意数量
					this.lbl_refuseCount.text = '' + cbpkt.getValue('nDisagree');
					// 没有投票
					this.lbl_leftCount.text = '' + cbpkt.getValue('nNotVoted');
					// 发起人
					this.lbl_faQiRenName.text = '' + cbpkt.getValue('szName');
					// 剩余时间
					this.lbl_leftTime.text = '' + cbpkt.getValue('dwBeginTime');
					// 自己投票的情况
					let btVoted = cbpkt.getValue('btVoted');
					switch (btVoted) {
						// 未投票
						case 0:
							this.viw_1.selectedIndex = 0;
							break;
						// 同意
						case 1:
						// 不同意
						case 2:
							this.viw_1.selectedIndex = 1;
							this.btn_result.label = ['', '已同意', '已反对'][btVoted]
							break;
					}
					// 投票详情
					for (let item of cbpkt.stZeroArray) {
						let stVoterBase = new ProtoCmd.stVoterBase();
						stVoterBase.clone(item.data);
						this.detailInfo.push(stVoterBase);
					}
				}
				else {
					this.viw_1.selectedIndex = 1;
				}
				cbpkt.clear();
				cbpkt = null;
			})

		}


		public goTouPiao(data): void {
			// 1同意 0 反对
			let pkt = new ProtoCmd.stGlobalGuildVoteBanMaster();
			pkt.setValue('btVote', data);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stGlobalGuildVoteBanMasterRet(data);
				let btError = cbpkt.getValue('btError');
				if (btError == 0) {
					TipsManage.showTips('投票成功');
					this.viw_0.selectedIndex = 1;
				}
				else {
					TipsManage.showTips('投票失败')
				}
				cbpkt.clear();
				cbpkt = null;
			})

		}

		public showInfo(): void {
			new view.guild.GuildTouPiaoDetailDialog().setData(this.detailInfo).show(false);
		}
	}
}