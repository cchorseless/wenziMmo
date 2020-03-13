/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_zhuansheng_Talent_Dialog extends ui.juese.Person_zhuansheng_Talent_DialogUI {
		constructor() {
			super();
			this.panel_left.vScrollBarSkin = '';
			this.addEvent();
		}
		public curJmlvl;
		public data: ProtoCmd.itf_Hero_ZhuanShengInfo;
		public canLVUP = true;
		public setData(data: ProtoCmd.itf_Hero_ZhuanShengInfo, curJmlvl) {
			this.curJmlvl = curJmlvl;
			this.data = data;
			this.vbox_left['sortItem'] = (items) => { };
			let zsLV = GameApp.MainPlayer.zslevel;
			this.img_cur.skin = 'image/juese/jingmai/fong_jingmai_' + zsLV + '.png';
			this.img_next.skin = 'image/juese/jingmai/fong_jingmai_' + (zsLV + 1) + '.png';
			//根据当前职业偏移当前效果id
			let job = GameApp.MainPlayer.job;
			let jobid = data.effid + (job - 1) * 1000;
			//当前属性
			let shuxing1 = GameUtil.parseEffectidToObj(['' + jobid])
			let attribute1 = shuxing1.des;
			let battle1 = shuxing1.battle[job];
			// this.lbl_battle.text = '' + battle1

			this.lab_power.text = LangConfig.getBigNumberDes(GameApp.MainPlayer.ability.nFight);
			//效果
			if (GameApp.MainPlayer.zslevel < 15) {
				//当前转生等级不是最大转生等级
				//下级属性
				let id = SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + jobid)
				let shuxing2 = GameUtil.parseEffectidToObj(['' + id])
				let attribute2 = shuxing2.des;
				let battle2 = shuxing2.battle[job];
				this.lab_add.text = '+' + (battle2 - battle1);
				this.box_add.x = this.lab_power.x + this.lab_power.width +5;
				this.vbox_left.removeChildren();
				for (let key in attribute1) {
					this.vbox_left.addChild(new view.juese.Person_jingmai_item_shuxingInfo().setData(attribute1[key], attribute2[key]))
				}
			} else {
				//当前转生等级是最大转生等级
				this.img_next.visible = false;
				this.lab_add.text = '';
				this.vbox_left.removeChildren();
				for (let key in attribute1) {
					this.vbox_left.addChild(new view.juese.Person_attributeItem().setData(attribute1[key], null, 1))
				}
			}
			this.needJMLV(curJmlvl, data.jmlvl);
			this.needLV(data.beforelvl, data.afterlvl);
			this.needXW(data.xw, data.maxxw);
			if (this.canLVUP) {
				this.btn_confirm.disabled = false;
			} else {
				this.btn_confirm.disabled = true;
			}
		}
		public needJMLV(cur: number, max: number) {
			this.html_jmlvl.style.fontFamily = 'STKaiti';
			this.html_jmlvl.style.fontSize = 22;
			this.html_jmlvl.style.align = 'center';
			if (cur < max) {
				this.html_jmlvl.innerHTML = "<span style='color:#a53232'>" + cur
					+ '</span>' + "<span style='color:#000000'>/" + max + '</span>';
				this.canLVUP = false;
			} else {
				this.html_jmlvl.innerHTML = "<span style='color:#38ad32'>" + cur
					+ '</span>' + "<span style='color:#000000'>/" + max + '</span>';
			}
		}
		public needLV(cur, max) {
			this.html_needLV.style.fontFamily = 'STKaiti';
			this.html_needLV.style.fontSize = 22;
			this.html_needLV.style.align = 'center';
			if (cur < max) {
				this.html_needLV.innerHTML = "<span style='color:#a53232'>" + cur
					+ '</span>' + "<span style='color:#000000'>/" + max + '</span>';
				this.canLVUP = false;
			} else {
				this.html_needLV.innerHTML = "<span style='color:#38ad32'>" + cur
					+ '</span>' + "<span style='color:#000000'>/" + max + '</span>';
			}
		}
		public needXW(cur, max) {
			this.html_item.style.fontFamily = 'STKaiti';
			this.html_item.style.fontSize = 22;
			this.html_item.style.align = 'center';
			if (cur < max) {
				this.html_item.innerHTML = "<span style='color:#a53232'>" + LangConfig.getBigNumberDes(cur)
					+ '</span>' + "<span style='color:#000000'>/" + LangConfig.getBigNumberDes(max) + '</span>';
				this.canLVUP = false;
			} else {
				this.html_item.innerHTML = "<span style='color:#38ad32'>" + LangConfig.getBigNumberDes(cur)
					+ '</span>' + "<span style='color:#000000'>/" + LangConfig.getBigNumberDes(max) + '</span>';
			}
		}
		public addEvent() {
			// this.btn_buy.on(Laya.UIEvent.CLICK, this, () => {
			// 	if (this.iteminfo.length > 0) {
			// 		new view.juese.Person_BuyAndUseDialog().setData(this.data., 1).show();
			// 	}
			// })
			this.btn_confirm.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.Hero_zhuanSheng, [0])
				lcp.send(pkt);
				

			})
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();

			})


		}
	}
}