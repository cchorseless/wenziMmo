/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_GangQiItem extends ui.hero.Hero_GangQiItemUI {
		constructor() {
			super();
			this.initUI();
			this.addEvent();
		}
		//当前英雄罡气效果id
		public jobeffid;
		private client_func_index = 55;// 功能ID编号
		public hasint = false;
		public initUI(): void {
			if (this.hasint) { return };
			this.hasint = true;
			this.panel_gangqi.hScrollBarSkin = '';
			this.hbox_gangqi['sortItem'] = (items) => { };
			this.vbox_left['sortItem'] = (items) => { };
		}
		//判断是第几个弟子
		private job;
		public setData(): void {
			this.wingInfo();
		}
		public wingInfo(): void {
			if (GameApp.MainPlayer.curHero.level < 60) {
				this.btn_jihuo.disabled = true;
			} else {
				this.btn_jihuo.disabled = false;
			}
			//判断翅膀是否存在（存在则已激活）
			let wing = this.getItemInfo();
			if (wing && GameApp.MainPlayer.curHero.level >= 60) {
				this.vstack_gangqi.selectedIndex = 1;
				this.init_baseInfo(wing);
				this.init_gangqi();
			}
			else {
				this.vstack_gangqi.selectedIndex = 0;
				this.notActivation();
			}
		}
		//查找自己身上的翅膀
		public getItemInfo(): ProtoCmd.ItemBase {
			return GameUtil.findEquipInPlayer(EnumData.emEquipPosition.EQUIP_HERO_WING)
		}
		public addEvent(): void {
			//激活
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				this.init_JiHuo();
			})
			//培养
			this.btn_upLevel.on(Laya.UIEvent.CLICK, this, () => {
				this.init_upLevel();
			})
			this.addLcpEvent();
			this.init_GangQIInfo(this.getItemInfo());
		}
		public addLcpEvent(): void {
			//拉取我的罡气物品信息
			GameApp.LListener.on(ProtoCmd.Hero_heroWingPanel, this, (jsonData) => {
				//升星所需消耗的金币数量
				this.lbl_need.text = '' + jsonData.gold;
				this.lbl_have.text = '' + GameApp.MainPlayer.wealth.gold;
				let result = GameApp.MainPlayer.wealth.gold - jsonData.gold;
				if (result < 0) {
					this.lbl_have.color = '#a53232';
				} else {
					this.lbl_have.color = '#000000';
				}
			})
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.Hero_heroWingPanel, this);
			super.destroy(isbool);
		}

		/**
	* 未激活时
	*/
		public notActivation(): void {
			let id = this.client_func_index + 1000;
			// this.lbl_detail.text = SheetConfig.Introduction_play.getInstance(null).CONTENT('' + id);
			this.lbl_condition.text = '弟子等级60级';

		}
		//激活
		public init_JiHuo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_activeHeroWing, null, null, this, (jsonData) => {
				this.wingInfo();
			})
			lcp.send(pkt);

		}
		public init_baseInfo(data: ProtoCmd.ItemBase): void {
			//初始化星星
			for (let i = 1; i < 11; i++) {
				this['btn_xingxing' + i].selected = false;
			}
			//罡气星级
			let xing = data.dwLevel % 10
			for (let i = 0; i < xing; i++) {
				let g = i + 1
				this['btn_xingxing' + g].selected = true;
			}
			let curJob = GameApp.MainPlayer.curHero.feature.simpleFeature.job;
			let sex;
			if (GameApp.MainPlayer.sex == EnumData.SEX_TYPE.SEX_MAN) {
				sex = EnumData.SEX_TYPE.SEX_WOMEN;
			} else {
				sex = EnumData.SEX_TYPE.SEX_MAN;
			}
			//弟子半身像
			this.img_self1.skin = this.img_self2.skin = LangConfig.getPlayerGangQiHalfSkin(sex,curJob);
			//当前罡气名
			let id = data.dwEffId + (curJob - 1) * 1000;
			this.jobeffid = id;
			let gangqiName = SheetConfig.mydb_effect_base_tbl.getInstance(null).NAME('' + id);
			this.lbl_dangqian.text = '' + gangqiName;
			//当前罡气属性
			let des0 = GameUtil.parseEffectidToObj(['' + id]);
			//当前罡气战力
			let battle0 = des0.battle[curJob];
			//下阶罡气属性
			let nextid = SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + id);
			let des1 = GameUtil.parseEffectidToObj(['' + nextid]);
			//下阶罡气战力
			let battle1 = des1.battle[curJob];
			this.lbl_power1.text = '' + battle0;
			//战力差
			this.lbl_addBattle.text = '+' + (battle1 - battle0);
			this.vbox_left.removeChildren();
			for (let i = 0; des0.des[i]; i++) {
				this.vbox_left.addChild(new view.juese.Person_attributeItem().setData(des0.des[i], des1.des[i], 0))
			}
			this.init_update();
		}
		/**
				 * 罡气下阶预览
				 */
		public init_GangQIInfo(data): void {
			if (data) {
				//罡气基础id
				let curJob = GameApp.MainPlayer.curHero.feature.simpleFeature.job;
				//当前罡气名
				let jobid = data.dwEffId + (curJob - 1) * 1000;
				let id = jobid - data.dwLevel + 1;
				this.hbox_gangqi.removeChildren();
				for (let i = 0; i < 10; i++) {
					let effid = id + i * 10;
					let gangqiInfo = new view.juese.Person_GangQiBtnItem();
					gangqiInfo.scaleX = 0.7;
					gangqiInfo.scaleY = 0.7;
					this.hbox_gangqi.addChild(gangqiInfo.setData(i, effid, 1));
				}
			}
		}
		//罡气信息拉取发包
		public init_gangqi(): void {
			let pkt = new ProtoCmd.QuestClientData;
			pkt.setString(ProtoCmd.Hero_heroWingPanel)
			lcp.send(pkt);
		}
		/**
		 * 罡气进阶
		 */
		public init_upLevel(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_advanceHeroWing)
			lcp.send(pkt);
			this.wingInfo();
		}
		/**
	  * 更新选中状态
	  */
		public init_update(id = null): void {
			let data = this.getItemInfo();
			if (id == null) {
				//当前的下一星罡气效果id
				id = this.jobeffid + (Math.floor(data.dwLevel / 10) + 1) * 10 - data.dwLevel + 1;
			}
			//选中状态
			let index;
			for (let child of this.hbox_gangqi._childs) {
				if (child.id == id) {
					index = child.index;
					child.btn_select.visible = true;
				} else {
					child.btn_select.visible = false;
				}
				//当前罡气皮肤
				if (child.id == data.dwEffId) {
					this.img_now.skin = 'image/common/img_gangQi_0' + child.index + '.png';
				}
			}
			if (data.dwLevel < 90) {
				this.img_now.x = 86;
				this.img_shengji.visible = this.img_next.visible = true;
				//罡气名
				this.lbl_xiaji.text = '' + SheetConfig.mydb_effect_base_tbl.getInstance(null).NAME('' + id);
				//罡气皮肤
				this.img_next.skin = 'image/common/img_gangQi_0' + index + '.png'
			} else {
				this.img_now.x = 230;
				this.img_shengji.visible = this.img_next.visible = false;
			}
		}
	}
}