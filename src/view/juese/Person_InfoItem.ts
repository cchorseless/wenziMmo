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
			this.lbl_age.text = '' + player.age_str;
			// 姓名
			this.lbl_name.text = '' + player.objName;
			// 出身
			this.lbl_job.text = '' + LangConfig.JOB_TYPEDES[EnumData.JOB_TYPE[player.job]];
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
			this.img_avatar.skin = '' + LangConfig.getPlayerAvatarSkin();
			//个人标签
			for (let i = 1; i < 9; i++) {
				let o = GameApp.MainPlayer.xingGeInfo[i].id
				this["lab_tag" + i].text = SheetConfig.Label.getInstance(null).NAME(o);
				let imgRes = SheetConfig.Label.getInstance(null).GRADE(o);
				this['img_tag' + i].skin = 'image/common/tab_rw_0' + imgRes + '.png'
			}
			// 声望信息
			this.lbl_shengWang.text = LangConfig.getFameDes(player.wealth.nowFame);
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
				let ui = new view.juese.PersonShengPingDialog();
				let pkt = new ProtoCmd.ExperienceLogCmd();
				lcp.send(pkt, this, (data) => {
					let cbpkt = new ProtoCmd.ExperienceLogCmdRet(data);
					let baseData = cbpkt.logs;
					ui.popup();
					ui.setData(baseData)
					cbpkt.clear();
					cbpkt = null;
				})

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


	}
}