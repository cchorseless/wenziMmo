/**Created by the LayaAirIDE*/
module view.friend {
	export class FriendCheckDialog extends ui.friend.FriendCheckDialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public data;
		public setData(data: ProtoCmd.friendApply): FriendCheckDialog {
			this.data = data;
			this.lbl_name.text = '' + data.playerName;
			this.lbl_level.text = data.zslevel + '转' + data.level + '级';
			this.img_head.skin = LangConfig.getPlayerIconSkin(data.sex, data.job);
			if (data.guildId == 0) {
				this.img_SectsIcon.visible = false;
				this.lbl_Sects.text = '无门无派';
			} else {
				this.img_SectsIcon.visible = true;
				let icon = SheetConfig.BaseMenPaiSheet.getInstance(null).ICON('' + data.guildId);
				this.img_SectsIcon.skin = 'image/main/icon_' + icon + '.png'
				this.lbl_Sects.text = SheetConfig.BaseMenPaiSheet.getInstance(null).NAME('' + data.guildId);
			}
			return this;
		}
		public addEvent(): void {
			this.btn_agree.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.stRelationAddAnswerQuery(null);
				pkt.setValue('szName', this.data.playerName);
				pkt.setValue('boAgree', true);
				lcp.send(pkt, this)
				this.close();
			})
			this.btn_fefuse.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.stRelationAddAnswerQuery(null);
				pkt.setValue('szName', this.data.playerName);
				pkt.setValue('boAgree', false);
				lcp.send(pkt, this);
				this.init_updata(this.data.playerName)
				this.close();
			})
		}
		/**
		 * 
		 * @param name 拒绝添加后本地好友申请更新
		 */
		public init_updata(name): void {
			let friendApplyInfo = GameApp.MainPlayer.friendApplyInfo;
			let keys = Object.keys(friendApplyInfo);
			//本地好友申请里刪除處理過的好友申请
			for (let key of keys) {
				if (friendApplyInfo[key].playerName == name) {
					//删除
					friendApplyInfo.splice(parseInt(key), 1);
				}
			}
			//刷新好友申请列表
			GameApp.LListener.event(ProtoCmd.FD_APPLY_UPDATA);
		}
	}
}