/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_InfoItem extends ui.juese.Person_InfoItemUI {
		constructor() {
			super();
			this.setData();
		}
		public hasInit = false;
		public setData(): void {
			if (this.hasInit) { return }
			this.hasInit = true;
			let player = GameApp.MainPlayer;
			// 年龄
			this.lbl_age.text = '' + player.createTime;
			// 姓名
			this.lbl_name.text = '' + player.objName;
			// 出身
			this.lbl_job.text = '' + player.job;
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
		}

		/**
		 * 获取江湖声望信息
		 */
		public getShengWangInfo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_PrestigePanel, null, null, this, (jsonData: ProtoCmd.itf_JS_ShengWangInfo) => {

			})
			lcp.send(pkt);
		}
	}
}