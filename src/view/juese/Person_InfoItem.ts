/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_InfoItem extends ui.juese.Person_InfoItemUI {
		public static self: Person_InfoItem;
		constructor() {
			super();
			this.setData();
			Person_InfoItem.self = this;
		}
		public hasInit = false;
		public setData(): void {
			if (this.hasInit) { return }
			this.hasInit = true;
			this.tab_juese.selectHandler = Laya.Handler.create(this, (index) => {
				this.view_juese.selectedIndex = index;
			}, null, false);

			this.addEvent();
			this.init_personInfo();
			this.init_personBase();
			this.init_personMoney();
		}
		public addEvent(): void {
			// //装扮
			// this.btn_zhuangBan.on(Laya.UIEvent.CLICK, this, () => {
			// 	PanelManage.openClothePanel();
			// })
			//生辰八字
			this.btn_birthEnter.on(Laya.UIEvent.CLICK, this, () => {
				new view.juese.PersonBirthDialog().popup(true);
			})
			//姓名九宫
			this.btn_nameEnter.on(Laya.UIEvent.CLICK, this, () => {
				new view.juese.PersonNameDialog().popup(true);
			})
			//成就
			this.btn_nameEnter.on(Laya.UIEvent.CLICK, this, () => {
				// new view.juese.Task_ChengJiuDialog().popup(true);
			})
			//生平履历
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
		}
		/**
		 * 介绍
		 */
		public init_personInfo(): void {
			let player = GameApp.MainPlayer;
			// 年龄
			this.lbl_age.text = player.age_number + '-' + (player.age_number + 1) + '岁';
			let month = parseInt(player.age_str.match(/\d+/g)[1]);
			this.img_agepro.width = 302 * month / 12;
			// 颜值
			this.lbl_yanZhi.text = '' + player.nYanZhi + '/100';
			this.img_yanzhipro.width = 302 * player.nYanZhi / 100;
			// 健康
			this.lbl_jianKang.text = '' + player.nHealth + '/100';
			this.img_healthpro.width = 302 * player.nHealth / 100;
			// 精神
			this.lbl_jingShen.text = '' + player.nSpirte + '/100';
			this.img_spiritpro.width = 302 * player.nSpirte / 100;
			// 体力
			this.lbl_tiLi.text = '' + player.nTili + '/100';
			this.img_poweipro.width = 302 * player.nTili / 100;
			// 心情
			this.lbl_xinQing.text = '' + player.nXinQing + '/100';
			this.img_moodpro.width = 302 * player.nXinQing / 100;
			//个人标签
			this.list_label.array = [];
			let keys = Object.keys(GameApp.MainPlayer.xingGeInfo);
			for (let key of keys) {
				let id = GameApp.MainPlayer.xingGeInfo[key].id
				this.list_label.array.push(id);
			}
			this.list_label.itemRender = view.juese.Person_SpeLabelItem;
			this.list_label.renderHandler = Laya.Handler.create(this, (cell: view.juese.Person_SpeLabelItem, index) => {
				cell.setData(cell.dataSource);
			}, null, false)
		}
		/**
		 * 基础
		 */
		public init_personBase(): void {
			let ability = GameApp.MainPlayer.ability;
			// 血量
			this.lbl_hp.text = '' +LangConfig.getBigNumberDes(ability.nowHP)+ '/' + LangConfig.getBigNumberDes(ability.nMaxHP);
			this.img_hppro.width = 302 * ability.nowHP / ability.nMaxHP;
			// 气量
			this.lbl_gas.text = '' + LangConfig.getBigNumberDes(ability.nowMP) + '/' + LangConfig.getBigNumberDes(ability.nMaxMP);
			this.img_gaspro.width = 302 * ability.nowMP / ability.nMaxMP;
			// 内力
			this.lbl_neili.text = '' + LangConfig.getBigNumberDes(ability.nowInnerValue) + '/' + LangConfig.getBigNumberDes(ability.nInnerValue);
			this.img_neilipro.width = 302 * ability.nowInnerValue / ability.nInnerValue;
			// 外功攻击
			this.lbl_waikill.text = LangConfig.getBigNumberDes(ability.nMinDC) + '-' + LangConfig.getBigNumberDes(ability.nMaxDC);
			// 外功防御
			this.lbl_waiprotect.text = LangConfig.getBigNumberDes(ability.nMinAC) + '-' + LangConfig.getBigNumberDes(ability.nMaxAC);
			// 内功防御
			this.lbl_neiprotect.text = LangConfig.getBigNumberDes(ability.nMinMAC) + '-' + LangConfig.getBigNumberDes(ability.nMaxMAC);
			// 闪避
			this.lbl_shan.text = '' + ability.nJuck;
			// 准确
			this.lbl_zhun.text = '' + ability.nHit;
			// 重击（爆伤）
			this.lbl_zhongji.text = '' + ability.nAtkCrit;
			// 会心（暴击）
			this.lbl_huixin.text = '' + ability.nCrit;
			// 韧性
			this.lbl_renxing.text = '' + ability.nCritResi;
			// 幸运
			this.lbl_luck.text = '' + ability.nLucky;
			// 剑客增伤
			this.lbl_job1add.text = '' + ability.nAtkAdd1;
			// 剑客抵抗
			this.lbl_job1dikang.text = '' + ability.nAtkReduce1;
			// 怪盗增伤
			this.lbl_job2add.text = '' + ability.nAtkAdd2;
			// 怪盗抵抗
			this.lbl_job2dikang.text = '' + ability.nAtkReduce2;
			// 隐门增伤
			this.lbl_job3add.text = '' + ability.nAtkAdd3;
			// 隐门抵抗
			this.lbl_job3dikang.text = '' + ability.nAtkReduce3;
			// boss增伤
			this.lbl_bossadd.text = '' + ability.nAtkAddBoss;
			// boss抵抗
			this.lbl_bossdikang.text = '' + ability.nAtkReduceBoss;
		}
		public init_personMoney(): void {
			let wealth = GameApp.MainPlayer.wealth;
			//元宝
			this.lbl_coin1.text = '' + wealth.yuanBao;
			//礼券
			this.lbl_coin2.text = '' + wealth.yuanBao_lock;
			//金币
			this.lbl_coin3.text = '' + wealth.gold;
			//荣誉
			this.lbl_coin4.text = '' + wealth.honorNum;
			//帮贡
			this.lbl_coin5.text = '' + wealth.guildDedication;
		}
	}
}