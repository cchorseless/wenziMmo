/**Created by the LayaAirIDE*/
module view.compart {
	export class GuildApplyItem extends ui.compart.GuildApplyItemUI {
		constructor() {
			super();
		}
		public hasApply: boolean = false;//是否已申请
		public item: ProtoCmd.stSingleGuildinfoBase;
		public setData(item: ProtoCmd.stSingleGuildinfoBase): void {
			this.item = item;
			this.lbl_lv.text = 'lv.' + item.dwLevel;
			this.lbl_guildName.text = '' + item.szName;
			this.lbl_lvNeed.text = '' + item.dwJoinNeedLvl;
			this.lbl_playerCount.text = '' + item.curPlayerCount + '/' + item.dwMaxPlayerCount;
			this.addEvent();
		}
		/**
		 * 更新是否申请UI
		 * @param d 
		 */
		public updateHasApply(d: boolean): void {
			this.hasApply = d;
			// 是否申请
			this.btn_applyJoin.label = '' + (this.hasApply ? '取消申请' : '申请加入');
		}
		
		public addEvent(): void {
			this.btn_applyJoin.on(Laya.UIEvent.CLICK, this, () => {
				// 取消申请
				if (this.hasApply) {
					this.cancelApplyGuild();
				}
				// 申请帮会 
				else {
					this.applyJoinGuild();
				}

			});
			// 查看详细信息
			this.btn_getInfo.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.GuildDetailDialog().popup(true);
			})
		}

		/**
		 * 申请加入行会
		 */
		public applyJoinGuild(): void {
			if (GameApp.MainPlayer.level < this.item.dwJoinNeedLvl) {
				TipsManage.showTips('不满足等级要求');
				return
			}
			let pkt = new ProtoCmd.stGlobalGuildAskJoinGuild();
			pkt.setValue("szGuildName", this.item.szName);
			pkt.setValue('szName', GameApp.MainPlayer.objName);
			pkt.setValue('btSex', GameApp.MainPlayer.feature.simpleFeature.sex);
			pkt.setValue('btJob', GameApp.MainPlayer.feature.simpleFeature.job);
			pkt.setValue('dwLevel', GameApp.MainPlayer.level);
			pkt.setValue('boOnline', 1);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stGlobalGuildAskJoinGuildRet(data);
				let errorcode = cbpkt.getValue('btErrorCode');
				if (errorcode == 0) {
					TipsManage.showTips('申请公会成功');
					this.updateHasApply(true);
				}
				else {
					TipsManage.showTips('申请公会失败');
				}
			})
		}

		/**
		 * 取消加入公会
		 */
		public cancelApplyGuild(): void {
			let pkt = new ProtoCmd.stGlobalGuildCancelAskJoin();
			pkt.setValue("szGuildName", this.item.szName);
			pkt.setValue('szName', GameApp.MainPlayer.objName);
			lcp.send(pkt, this, (data) => {
				this.updateHasApply(false);
				TipsManage.showTips('已取消该公会')
			})

		}

		/**
		 * 检查自己是否隐藏
		 */
		public checkIsShow(): void {
			if (this.item.dwJoinNeedLvl > GameApp.MainPlayer.level) {
				this.scaleY = 0;
				this.visible = false;
			}
			else {
				this.scaleY = 1;
				this.visible = true;
			}
		}


		/**
		 * 查看行会信息
		 */
		public getGuildInfo(): void {




		}
	}
}