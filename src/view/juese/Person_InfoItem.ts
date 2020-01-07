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
		public dialog;
		public setData(): void {
			if (this.hasInit) { return }
			this.panel_shuxing.vScrollBarSkin = '';
			this.hasInit = true;
			this.tab_juese.selectHandler = Laya.Handler.create(this, (index) => {
				this.view_juese.selectedIndex = index;
			}, null, false);
			Laya.timer.frameLoop(10, this, function () {
				if (this.panel_shuxing.vScrollBar.max == this.panel_shuxing.vScrollBar.value) {
					this.img_xia.visible = false;
				} else {
					this.img_xia.visible = true;
				}
			});
			this.addEvent();
			this.init_personInfo();
			this.init_personBase();
			this.init_personMoney();
		}
		public addEvent(): void {
			for (let i = 6001; i <= 6032; i++) {
				this.panel_shuxing.on(Laya.UIEvent.CLICK, this, () => {
					this.init_touchView(false, i);
				})
				this['lbl_' + i].on(Laya.UIEvent.MOUSE_DOWN, this, () => {
					if (!this.dialog) {
						this.init_touchView(true, i);
					}
				})
				this['lbl_' + i].on(Laya.UIEvent.MOUSE_UP, this, () => {
					this.init_touchView(false, i);
				})
			}

			//任务成就
			this.btn_taskAchieve.on(Laya.UIEvent.CLICK, this, () => {
				new view.juese.Task_ChengJiuDialog().setData().popup(true);
			})
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
		public init_touchView(v: boolean, i): void {
			if (v) {
				this.dialog = new view.dialog.InfoV1Dialog();
				this.addChild(this.dialog.setData(this['lbl_' + i], i))
			} else {
				PopUpManager.checkPanel(this.dialog);
				this.dialog = undefined
			}
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
			if (GameApp.MainPlayer.xingGeInfo) {
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
		}
		/**
		 * 基础
		 */
		public init_personBase(): void {
			let ability = GameApp.MainPlayer.ability;
			// 气血
			this.lbl_hp.text = '' + LangConfig.getBigNumberDes(ability.nowHP) + '/' + LangConfig.getBigNumberDes(ability.nMaxHP);
			this.img_hppro.width = 302 * ability.nowHP / ability.nMaxHP;
			// 精力
			this.lbl_gas.text = '' + LangConfig.getBigNumberDes(ability.nowMP) + '/' + LangConfig.getBigNumberDes(ability.nMaxMP);
			this.img_gaspro.width = 302 * ability.nowMP / ability.nMaxMP;
			// 体力
			this.lbl_neili.text = '' + GameApp.MainPlayer.nTili + '/100';
			this.img_neilipro.width = 302 * GameApp.MainPlayer.nTili / 100;
			// 基础攻击
			this.lbl_baseKill.text = LangConfig.getBigNumberDes(ability.nMinAttack) + '-' + LangConfig.getBigNumberDes(ability.nMaxAttack);
			// 外功防御
			this.lbl_waiprotect.text = LangConfig.getBigNumberDes(ability.nMinAC) + '-' + LangConfig.getBigNumberDes(ability.nMaxAC);
			// 内功防御
			this.lbl_neiprotect.text = LangConfig.getBigNumberDes(ability.nMinMAC) + '-' + LangConfig.getBigNumberDes(ability.nMaxMAC);
			// 气血回复
			this.lbl_qxhf.text = '' + ability.nRestoreHp;
			// 精力回复
			this.lbl_jlhf.text = '' + ability.nRestoreMp;
			// 命中
			this.lbl_mz.text = '' + ability.nHit;
			// 闪避
			this.lbl_sb.text = '' + ability.nJuck;
			// 命中率
			this.lbl_mzl.text = ability.nHitRatio / 10000 + '%';
			// 闪避率
			this.lbl_sbl.text = ability.nJuckRatio / 10000 + '%';
			// 暴击
			this.lbl_bj.text = '' + ability.nCrit;
			// 抗暴
			this.lbl_kb.text = '' + ability.nCritResi;
			// 暴击率
			this.lbl_bjl.text = ability.nCritRatio / 10000 + '%';
			// 抗暴率
			this.lbl_kbl.text = ability.nCritResiRatio / 10000 + '%';
			// 爆伤
			this.lbl_bs.text = '' + ability.nAtkCrit;
			// 幸运
			this.lbl_xy.text = '' + ability.nLucky;
			// 控敌
			this.lbl_kdl.text = ability.nPalsyRatio / 10000 + '%';
			// 抗控
			this.lbl_kkl.text = ability.nPalsyResiRatio / 10000 + '%';
			// 剑客增伤
			this.lbl_job1add.text = ability.nAtkAdd1 / 10000 + '%';
			// 剑客抵抗
			this.lbl_job1dikang.text = ability.nAtkReduce1 / 10000 + '%';
			// 怪盗增伤
			this.lbl_job2add.text = ability.nAtkAdd2 / 10000 + '%';
			// 怪盗抵抗
			this.lbl_job2dikang.text = ability.nAtkReduce2 / 10000 + '%';
			// 隐门增伤
			this.lbl_job3add.text = ability.nAtkAdd3 / 10000 + '%';
			// 隐门抵抗
			this.lbl_job3dikang.text = ability.nAtkReduce3 / 10000 + '%';
			// 怪物增伤
			this.lbl_gwzs.text = ability.nAtkAddMon / 10000 + '%';
			// 怪物抵抗
			this.lbl_gwdk.text = ability.nAtkReduceMon / 10000 + '%';
			// boss增伤
			this.lbl_bossadd.text = ability.nAtkAddBoss / 10000 + '%';
			// boss抵抗
			this.lbl_bossdikang.text = ability.nAtkReduceBoss / 10000 + '%';
			// 战斗增伤
			this.lbl_zdzs.text = ability.nFinalDamageAdd / 10000 + '%';
			// 战斗减伤
			this.lbl_zddk.text = ability.nFinalDamageReduce / 10000 + '%';
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
			//boss积分
			this.lbl_boss.text = '' + GameApp.MainPlayer.bossCoin;
		}
	}
}