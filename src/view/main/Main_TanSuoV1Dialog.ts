/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_TanSuoV1Dialog extends ui.npc.Main_TanSuoV1DialogUI {
		public static self: Main_TanSuoV1Dialog;
		public static UPDATE_DETAIL = 'upDate_detail';
		public medicine = null;
		constructor() {
			super();
			Main_TanSuoV1Dialog.self = this;
		}
		//npc信息
		public item: GameObject.Npc;
		//好感度级别
		public lvl;
		public curExp;//好感度值

		//技能是否第一次学
		public skillFirst;
		public jiaohuType = [

		]
		public NpcState = 1;
		public NpcAttitude = 1;
		public setData(obj: GameObject.Npc): Main_TanSuoV1Dialog {
			this.btn_jiaoyi.visible = false;
			let jiaoyiData = SheetConfig.mydb_npcsell_tbl.getInstance(null).data;
			for (let i in jiaoyiData) {
				if (parseInt(i) == obj.feature.dwCretTypeId) {
					this.btn_jiaoyi.visible = true;
				}
			}
			this.panel_jiaohu.vScrollBarSkin = '';
			this.vbox_jiaohu['sortItem'] = (items) => { };
			this.item = obj;
			this.NpcAttitude = [1, 2, 3][SheetConfig.mydb_npcgen_tbl.getInstance(null).ATTITUDE('' + obj.feature.dwCretTypeId)]
			//NPC姓名
			this.lbl_name.text = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME('' + obj.feature.dwCretTypeId).split("_")[0];
			//造型图
			let icon = SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_NUMBER('' + obj.feature.dwCretTypeId);
			this.img_npc.skin = PathUtil.getNpcHalfPath(icon);
			this.init_haoganEvent();

			this.addEvent();
			// this.init_npcTalk();
			return this;
		}
		public postNpcTalk(type,state) {
			this.NpcState = state;
			let conID = type * 100 + this.NpcState * 10 + this.NpcAttitude;
			let name = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(this.item.feature.dwCretTypeId).split('_')[0];
			let str = name + SheetConfig.NPC_specialtalkInfoSheet.getInstance(null).TALKINFO(conID)
			GameApp.LListener.event(Main_TanSuoV1Dialog.UPDATE_DETAIL, str);
		}

		public addEvent(): void {
			//好感度弹窗
			this.btn_haogan.on(Laya.UIEvent.CLICK, this, function () {
				let o = new Main_Npc_HaoGanDialog();
				o.show();
			})
			//npc详情
			this.btn_info.on(Laya.UIEvent.CLICK, this, function () {
				let o = new Main_Npc_Detail_Dialog();
				o.setData(this.item, this.curExp, this.lvl);
				o.popup(true);
			})
			//显示NPC交互文字
			GameApp.LListener.on(Main_TanSuoV1Dialog.UPDATE_DETAIL, this, function (string) {
				let lab = new Laya.Label();
				lab.width = 305;
				lab.fontSize = 22;
				lab.font = 'fzxk';
				lab.color = '#000000';
				lab.wordWrap = true;
				lab.text = string;
				this.vbox_jiaohu.addChild(lab);
			})
			//关闭弹窗
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			//请教武学
			this.btn_wuxue.on(Laya.UIEvent.CLICK, this, () => {
				this.view_npc.selectedIndex = 1;
			})
			//辩论  101
			this.btb_Argue.on(Laya.UIEvent.CLICK, this, function () {
				
				this.ui_argue.setData(this.item.feature.dwCretTypeId, Main_TanSuoV1Dialog.self)
				this.view_npc.selectedIndex = 4;
			})
			//偷窃
			this.btn_Steal.on(Laya.UIEvent.CLICK, this, function () {
				// this.postNpcTalk(105,1);
				this.stealFromNpc();
			})
			//送礼
			this.btn_sendGift.on(Laya.UIEvent.CLICK, this, function () {
				
				this.sendGiftToNpc();
			})
			//下毒
			this.btn_Poison.on(Laya.UIEvent.CLICK, this, function () {
				// this.postNpcTalk(107,1);
				this.ui_poison.setData(this.item.feature.dwCretTypeId, Main_TanSuoV1Dialog.self, 0)
				this.view_npc.selectedIndex = 5;
			})
			//化解仇恨
			this.btn_huajie.on(Laya.UIEvent.CLICK, this, function () {
				
				let o = new Main_Npc_Huajie_Dialog();
				o.setData(this.item.feature.dwCretTypeId, Main_TanSuoV1Dialog.self, 0);
				o.show();
			})
			//治疗
			this.btn_treat.on(Laya.UIEvent.CLICK, this, function () {
				this.ui_poison.setData(this.item.feature.dwCretTypeId, Main_TanSuoV1Dialog.self, 1)
				this.view_npc.selectedIndex = 5;
			})
			//任务
			this.btn_task.on(Laya.UIEvent.CLICK, this, function () {
				this.ui_task.setData(this.item.feature.dwCretTypeId, Main_TanSuoV1Dialog.self)
				this.view_npc.selectedIndex = 6;
			})
			//结拜
			this.btn_jiebai.on(Laya.UIEvent.CLICK, this, function () {
				this.postNpcTalk(109,2);
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.swearNpc, [this.item.feature.dwCretTypeId], 0, this
					, function (res) {
						console.log('结拜回调', res)
						this.btn_State()
						let o = new Main_Npc_JieBai();
						o.setData(this.item.feature.dwCretTypeId)
						o.popup(true);
					})
				lcp.send(pkt);
			})

			//表白
			this.btn_marry.on(Laya.UIEvent.CLICK, this, function () {
				this.postNpcTalk(110,2);
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.declareNpc, [this.item.feature.dwCretTypeId], 0, this
					, function (res) {
						console.log('表白回调', res)
						this.btn_State()
						let o = new Main_Npc_Marry();
						o.setData(this.item.feature.dwCretTypeId)
						o.popup(true);
					})
				lcp.send(pkt);
			})
			//暗杀
			this.btn_Kill.on(Laya.UIEvent.CLICK, this, function () {
				
				// this.stealFromNpc();
				let progerUI = new view.npc.NpcProgressItem();
				progerUI.setData('交互中~', 1500);
				progerUI.closeHandler = Laya.Handler.create(this, () => {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.killNpc, [this.item.feature.dwCretTypeId], 0, this
						, function (res) {
							console.log('暗杀回调', res)
							this.curExp = res.likeValue;
							this.lvl = res.lvl;
							this.updataHaoGan();
							let str = '';
							if (res.ret == 0) {
								this.postNpcTalk(108,2);
								str = '暗杀成功！'
							} else {
								this.postNpcTalk(108,3);
								str = '暗杀失败!'
							}
							GameApp.LListener.event(Main_TanSuoV1Dialog.UPDATE_DETAIL, str);
							this.close();
							// this.parentUI.view_npc.selectedIndex = 0;
						})
					lcp.send(pkt);
				})
				progerUI.centerX = progerUI.centerY = 0;
				this.addChild(progerUI);

			})
		}
		public sendGiftToNpc() {
			this.ui_send.setData(this.item.feature.dwCretTypeId, Main_TanSuoV1Dialog.self)
			this.view_npc.selectedIndex = 3;
		}
		public stealFromNpc() {
			this.ui_steal.setData(this.item.feature.dwCretTypeId, Main_TanSuoV1Dialog.self)
			this.view_npc.selectedIndex = 2;

		}
		public updataHaoGan() {
			// this.lbl_now.text = this.curExp + '';
			let haogan = LangConfig.RELATIONSHIP_TYPEDES(this.lvl);
			this.lbl_haogan.text = haogan[0] + '' + this.curExp;
			if (this.lvl <= 2) {
				this.btn_huajie.disabled = false;
			} else {
				this.btn_huajie.disabled = true;
			}
			this.btn_State()
		}
		public init_haoganEvent(): void {
			let pkID = this.item.feature.dwCretTypeId
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.clickNpc, [pkID, 200], 0, this,
				function (data: ProtoCmd.itf_NPC_HaoGanInfo) {
					this.lvl = data.lvl;
					this.curExp = data.curexp;
					let haogan = LangConfig.RELATIONSHIP_TYPEDES(data.lvl);
					this.lbl_haogan.text = haogan[0] + '' + this.curExp;
					this.lbl_haogan.color = haogan[1];
					this.skillFirst = data.skillFirst;
					this.lbl_now.text = '' + data.curexp;
					this.medicine = data.poisontab;

					// let num = data.curexp / data.maxexp * 120;
					// if (data.curexp == 0 && data.maxexp == 0) {
					// 	this.img_haogan.width = 0;
					// } else {
					// 	this.img_haogan.width = num;
					// }
					//好感度冷淡以下得界面显示状态
					// if (this.lvl > 3) {
					// 	this.img_relation1.disabled = false;
					// 	this.img_relation3.disabled = false;
					// 	this.img_relation4.disabled = false;
					// } else {
					// 	//好感度冷淡以上
					// 	this.img_relation1.disabled = true;
					// 	this.img_relation3.disabled = true;
					// 	this.img_relation4.disabled = true;
					// }
					if (this.lvl <= 2) {
						this.btn_huajie.disabled = false;
					} else {
						this.btn_huajie.disabled = true;
					}
					this.btn_State()
					this.ui_wuxue.setData(this.item, this);
					// new view.npc.NpcInfoV1Dialog().setData(this.item).popup(true);
				})
			lcp.send(pkt);
		}
		public btn_State() {
			let jiebaiNum;  //当前玩家已经结拜的数量
			let marryNum;   //当前玩家已经表白的数量

			let canJieBai = true;
			let canMarry = true;
			let npcID = this.item.feature.dwCretTypeId

			let keys = Object.keys(GameApp.MainPlayer.npcRelation);

			let curNpcRelation = GameApp.MainPlayer.npcRelation['' + npcID]
			if (curNpcRelation == 0 || curNpcRelation == 1) {
				canJieBai = false;
				canMarry = false;
			}
			if (this.lvl < 9) {
				canJieBai = false;
			}
			if (this.lvl < 8) {
				canMarry = false;
			}


			if (keys.length > 0) {
				for (let i in GameApp.MainPlayer.npcRelation) {
					// GameApp.MainPlayer.npcRelation[i];
					if (GameApp.MainPlayer.npcRelation[i] == 0) {
						jiebaiNum++;
					} else {
						marryNum++;
					}
				}
				if (jiebaiNum > 8) {
					canJieBai = false;
				}
				if (marryNum > 8) {
					canMarry = false;
				}
			}
			this.btn_jiebai.disabled = !canJieBai;
			this.btn_marry.disabled = !canMarry;
		}
		/**
		 * npc对白
		 */
		public init_npcTalk(): void {
			//随机对白
			let talkArray = SheetConfig.mydb_npcgen_tbl.getInstance(null).TALKINFO_RANDOM('' + this.item.feature.dwCretTypeId).split('~');
			let index = Math.floor((Math.random() * talkArray.length));
			let lbl = new Laya.Label();
			lbl.fontSize = 20;
			lbl.font = 'FZXK';
			lbl.color = '#000000'
			lbl.x = 0;
			lbl.text = SheetConfig.NPC_specialtalkInfoSheet.getInstance(null).TALKINFO('' + talkArray[index]);
			lbl.width = this.panel_jiaohu.width;
			lbl.wordWrap = true;
			this.vbox_jiaohu.addChild(lbl);
		}
	}
}