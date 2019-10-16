/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_InfoItem extends ui.juese.Person_InfoItemUI {
		public static self: Person_InfoItem;
		constructor() {
			super();
			Person_InfoItem.self = this;
			this.setData();
		}
		public hasInit = false;
		public setData(): void {
			if (this.hasInit) { return }
			this.hasInit = true;
			let player = GameApp.MainPlayer;
			// 年龄
			this.lbl_age.text = '' + player.age + '岁';
			// 姓名
			this.lbl_name.text = '' + player.objName;
			// 出身
			this.lbl_job.text = '' + LangConfig.jobDes[player.job];
			// 公会名称
			this.lbl_guild.text = '' + (player.guildInfo.szName || '暂无帮派');
			// 健康
			this.lbl_jianKang.text = '' + player.nHealth + '/100';
			// 精神
			this.lbl_jingShen.text = '' + player.nSpirte + '/100';
			// 体力
			this.lbl_tiLi.text = '' + player.nTili + '/100';
			// 颜值
			this.lbl_yanZhi.text = '' + player.nYanZhi + '/100';
			// 心情
			this.lbl_xinQing.text = '' + player.nXinQing + '/100';
			// 角色形象
			this.img_avatar.skin = '' + player.allAvatarPic;
			//个人标签
			for (let i = 1; i < 9; i++) {
				let o = GameApp.MainPlayer.xingGeInfo[i].id
				this["lab_tag" + i].text = SheetConfig.Label.getInstance(null).NAME(o);
			}
			// 拉取声望
			this.getShengWangInfo();
			this.addEvent();

		}
		public addEvent(): void {
			this.btn_zhuangBan.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openClothePanel();
			})
			this.btn_birthEnter.on(Laya.UIEvent.CLICK, this, () => {
				new view.juese.PersonBirthDialog().popup(true);
			})
			this.btn_nameEnter.on(Laya.UIEvent.CLICK, this, () => {
				new view.juese.PersonNameDialog().popup(true);

			})
			this.btn_shengpingEnter.on(Laya.UIEvent.CLICK, this, () => {
				new view.juese.PersonShengPingDialog().popup(true);
			})
			this.img_tag1.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.PlayerTagDialog().popup(true);
			})
			for (let i = 1; i < 9; i++) {
				this["img_tag" + i].on(Laya.UIEvent.CLICK, this, () => {
					let tt = new view.dialog.PlayerTagDialog();
					tt.popup(true);
					tt.setData(i)
				})
			}

		}

		/**
		 * 获取江湖声望信息
		 */
		public getShengWangInfo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_PrestigePanel, null, null, this, (jsonData: ProtoCmd.itf_JS_ShengWangInfo) => {
				//我的声望头衔
				for (let i = 0; jsonData.titletab[i]; i++) {
					if (jsonData.prestigeid == i) {
						this.lbl_shengWang.text = '' + jsonData.titletab[i].name;
						break;
					}
				}
			})
			lcp.send(pkt);
		}
	}
}