/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_Npc_poisonORtreat_Item extends ui.npc.Main_Npc_poisonORtreat_ItemUI {
		public npcID;
		public parentUI;
		public type;
		public touchID;
		public ceng;
		constructor() {
			super();
			this.touchID = -1;
			this.addEvent();
		}
		public color = ['#c43939', '#38ad32'];
		public tite = ['选择毒药', '选择解药'];
		public btn_Label = ['下毒', '治疗'];
		public itemIDArr = [[1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509], [1601, 1602, 1603, 1604, 1605, 1606, 1607, 1608, 1609]]
		/**
		 * 
		 * @param npcid   npcID
		 * @param uiParent 父载体
		 * @param type   类型 ：0 下毒  1：治疗
		 */
		public setData(npcid, uiParent, type) {
			this.lab_haogan.text = GameApp.MainPlayer.nTili + '';
			this.npcID = npcid;
			this.parentUI = uiParent;
			this.type = type;

			this.parentUI.medicine;
			for (let i = 1; i < 4; i++) {
				this['lab_duceng' + i].text = this.parentUI.medicine[i] + '层';
			}
			this.lab_yangdu_add.visible = false;
			this.lab_yindu_add.visible = false;
			this.lab_huandu_add.visible = false;

			this.lab_yangdu_add.color = this.color[type];
			this.lab_yindu_add.color = this.color[type];
			this.lab_huandu_add.color = this.color[type];
			this.btn_poison.label = this.btn_Label[type];
			this.lab_title.text = this.tite[type];
			let skillArr = ['400003', '400001']
			for (let i = 0; i < 9; i++) {
				// this.ui_medicine0.setData()
				let id = this.itemIDArr[type][i]
				//10*玩家毒术/（10*玩家毒术+NPC根骨点数）+0.04*毒药品质系数+好感度/60000
				let skill = skillArr[type];
				let lv = GameApp.MainPlayer.skillInfo[skill].subLevel;//偷窃技能等级
				let quality = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(id);
				let gengu = SheetConfig.mydb_npcgen_tbl.getInstance(null).BONE(this.npcID)
				let prob = Math.floor((10 * lv / (10 * lv + gengu) + 0.04 * quality + this.parentUI.curExp / 60000) * 100);
				this['ui_medicine' + i].setData(id, prob, type)
			}

		}
		public showLight() {
			for (let i = 0; i < 9; i++) {
				this['ui_medicine' + i].setLight(false);
			}
			this['ui_medicine' + this.touchID].setLight(true);
			let span = Math.floor(this.touchID / 3);
			let str;
			if (this.type == 0) {
				str = '+1'
			} else {
				str = '-1'
			}
			this.ceng = span + 1;
			if (span == 0) {
				this.lab_yangdu_add.visible = true;
				this.lab_yindu_add.visible = false;
				this.lab_huandu_add.visible = false;
				this.lab_yangdu_add.text = str;

			} else if (span == 1) {
				this.lab_yangdu_add.visible = false;
				this.lab_yindu_add.visible = true;
				this.lab_huandu_add.visible = false;
				this.lab_yindu_add.text = str;

			} else if (span == 2) {
				this.lab_yangdu_add.visible = false;
				this.lab_yindu_add.visible = false;
				this.lab_huandu_add.visible = true;
				this.lab_huandu_add.text = str;
			}
			let showState = true;
			if (GameApp.MainPlayer.nTili < 3) {
				showState = false;
			}
			let itemID = this.itemIDArr[this.type][this.touchID];
			if (GameUtil.findItemInBag(itemID) <= 0) {
				showState = false;
			}
			let base = this.parentUI.medicine[this.ceng]
			if (this.type == 1){
				if(base == 0){
					showState = false;
				}
			}
			this.btn_poison.disabled = !showState;
		}

		public dealTouch() {
			let span = this.endTime - this.startTime;
			if (span < 1000) {
				this.showLight();
			} else {
				this['ui_medicine' + this.touchID].ui_daoju.ui_item.clickEvent();
				this.showLight();
			}
			this.isTouch = false;
		}
		public startTime;
		public isTouch = false;
		public endTime;
		public addEvent() {
			for (let i = 0; i < 9; i++) {
				this['ui_medicine' + i].on(Laya.UIEvent.MOUSE_DOWN, this, function () {
					this.touchID = i;
					this.isTouch = true;
					this.startTime = Date.now();
				})
				this['ui_medicine' + i].on(Laya.UIEvent.MOUSE_UP, this, function () {
					if (this.isTouch) {
						this.endTime = Date.now();
						this.dealTouch();
					}
				})
				this['ui_medicine' + i].on(Laya.UIEvent.MOUSE_OUT, this, function () {
					if (this.isTouch) {
						this.endTime = Date.now();
						this.dealTouch();
					}
				})
			}
			this.btn_leave.on(Laya.UIEvent.CLICK, this, function () {
				this.parentUI.view_npc.selectedIndex = 0;
			})
			this.btn_poison.on(Laya.UIEvent.CLICK, this, function () {
				if (this.touchID < 0) {
					TipsManage.showTips('未选择下毒道具')
					return;
				}
				let itemID = this.itemIDArr[this.type][this.touchID];
				let progerUI = new view.npc.NpcProgressItem();
				let jiaohuType = [107, 103]
				if (this.type == 1) {
					this.parentUI.postNpcTalk(jiaohuType[this.type], 1);
				}
				progerUI.setData('交互中~', 1500);
				progerUI.closeHandler = Laya.Handler.create(this, () => {
					let cmdArr = [ProtoCmd.poisonToNpc, ProtoCmd.treatNpc]
					let cmd = cmdArr[this.type]
					let pkt = new ProtoCmd.QuestClientData().setString(cmd, [this.npcID, itemID, this.ceng], 0, this
						, function (res) {
							console.log('下毒或者治疗回调' + res)
							//ret  0 成功 1 失败
							this.parentUI.view_npc.selectedIndex = 0;
							let typeString = ['下毒', '治疗'][this.type]
							let str = '';
							this.parentUI.curExp = res.likeValue;
							this.parentUI.lvl = res.lvl;
							this.parentUI.updataHaoGan();
							if (res.ret == 0) {
								str = typeString + '成功';
								this.parentUI.postNpcTalk(jiaohuType[this.type], 2);
								if (this.type == 0) {
									this.parentUI.medicine[this.ceng] += 1;
								} else {
									this.parentUI.medicine[this.ceng] -= 1;
								}

							} else {
								this.parentUI.postNpcTalk(jiaohuType[this.type], 3);
								str = typeString + '失败!'
							}
							// GameApp.LListener.event(Main_TanSuoV1Dialog.UPDATE_DETAIL, str)
						})
					lcp.send(pkt);


				})
				progerUI.centerX = progerUI.centerY = 0;
				this.parentUI.addChild(progerUI);
				// })



			})

		}
	}
}