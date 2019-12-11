/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_GangQiItem extends ui.juese.Person_GangQiItemUI {
		constructor() {
			super();
		}
		private client_func_index = 16;// 功能ID编号
		//角色职业
		private job = GameApp.MainPlayer.job;
		private hasInit = false;
		//当前经验
		private exp = null;
		//所需经验
		private needexp = null;
		public iteminfo;
		public dialog;
		public setData(): void {
			if (this.hasInit) { return };
			this.hasInit = true;
			this.panel_gangqi.hScrollBarSkin = '';
			this.hbox_gangqi['sortItem'] = (items) => { };
			this.vbox_left['sortItem'] = (items) => { };
			this.addEvent();
			this.wingInfo();
		}

		public wingInfo(): void {
			//判断翅膀是否存在（存在则已激活）
			if (this.getItemInfo()) {
				this.vstack_gangqi.selectedIndex = 1;
				this.init_Info(this.getItemInfo());
				this.init_gangqi();
			}
			else {
				this.vstack_gangqi.selectedIndex = 0;
				this.notActivation();
			}
		}

		/**
		  * 未激活时
		  */
		public notActivation(): void {
			let id = this.client_func_index + 1000;
			this.lbl_detail.text = SheetConfig.Introduction_play.getInstance(null).CONTENT('' + id);
			this.lbl_condition.text = '' + SheetConfig.Introduction_play.getInstance(null).TEXT1('' + id)

		}

		//查找自己身上的翅膀
		public getItemInfo(): ProtoCmd.ItemBase {
			return GameUtil.findEquipInPlayer(EnumData.emEquipPosition.EQUIP_WING);
		}

		public addEvent(): void {
			//激活
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				this.init_JiHuo();
			})
			//购买
			this.btn_buy.on(Laya.UIEvent.CLICK, this, () => {
				if (this.iteminfo) {
					this.dialog = view.juese.Person_BuyAndUseDialog;
					new this.dialog().setData(this.iteminfo, 0).popup();
				}
			})
			//角色罡气升级
			this.btn_upLevel.on(Laya.UIEvent.CLICK, this, () => {
				if (this.exp != null && this.needexp != null && this.exp >= this.needexp) {
					this.init_upLevel();
				}
				else {
					TipsManage.showTips('罡气经验不足')
				}
			})
			this.addLcpEvent();
			this.init_GangQIInfo(this.getItemInfo());
		}

		public addLcpEvent(): void {
			//拉取我的罡气物品信息
			GameApp.LListener.on(ProtoCmd.JS_playerWingPanel, this, (jsonData) => {
				this.iteminfo = jsonData;
				this.init_Info(this.getItemInfo());
				if (this.dialog) {
					GameApp.LListener.event(ProtoCmd.JS_updata_GangqiUse)
				}
			})
		}

		public destroy(isbool = true): void {
			GameApp.LListener.offCaller(ProtoCmd.JS_playerWingPanel, this);
			GameApp.LListener.offCaller(ProtoCmd.JS_updata_GangqiUse, this);
			super.destroy(isbool);
		}

		//激活
		public init_JiHuo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_activePlayerWing, null, null, this, (jsonData) => {
				this.wingInfo();
			})
			lcp.send(pkt);
		}

		//罡气界面信息
		public init_Info(data: ProtoCmd.ItemBase): void {
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
			//当前经验
			this.exp = data.nValue;
			this.lbl_have.text = '' + data.nValue;
			//升级所需经验
			this.needexp = data.nMaxValue;
			this.lbl_need.text = '' + data.nMaxValue;
			let result = data.nValue - data.nMaxValue;
			if (result < 0) {
				this.lbl_have.color = '#a53232';
			} else {
				this.lbl_have.color = '#000000';
			}
			//当前罡气名
			let id = data.dwEffId;
			let gangqiName = SheetConfig.mydb_effect_base_tbl.getInstance(null).NAME('' + id);
			this.lbl_dangqian.text = '' + gangqiName;
			//当前罡气属性
			let des0 = GameUtil.parseEffectidToObj(['' + data.dwEffId]);
			//当前罡气战力
			let battle0 = des0.battle[this.job];
			//下阶罡气属性
			let nextid = SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + data.dwEffId);
			let des1 = GameUtil.parseEffectidToObj(['' + nextid]);
			//下阶罡气战力
			let battle1 = des1.battle[this.job];
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
				let id = data.dwEffId - data.dwLevel + 1;
				this.hbox_gangqi.removeChildren();
				for (let i = 0; i < 10; i++) {
					let effid = id + i * 10;
					let gangqiInfo = new view.juese.Person_GangQiBtnItem();
					gangqiInfo.scaleX = 0.7;
					gangqiInfo.scaleY = 0.7;
					this.hbox_gangqi.addChild(gangqiInfo.setData(i, effid));
				}
			}
		}

		//罡气信息拉取发包
		public init_gangqi(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_playerWingPanel)
			lcp.send(pkt);
		}

		/**
		 * 罡气进阶
		 */
		public init_upLevel(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_upgradePlayerWing)
			lcp.send(pkt);
		}
		/**
		 * 更新选中状态
		 */
		public init_update(id = null): void {
			let data = this.getItemInfo();
			if (id == null) {
				//当前的下一星罡气效果id
				id = data.dwEffId + (Math.floor(data.dwLevel / 10) + 1) * 10 - data.dwLevel + 1;
			}
			//选中状态
			for (let child of this.hbox_gangqi._childs) {
				if (child.id == id) {
					child.btn_select.selected = true;
				} else {
					child.btn_select.selected = false;
				}
			}
			if (data.dwLevel < 90) {
				this.img_now.x = 86;
				this.img_next.visible = true;
				//罡气名
				this.lbl_xiaji.text = '' + SheetConfig.mydb_effect_base_tbl.getInstance(null).NAME('' + id);
				//罡气皮肤
				// this.img_next.skin = 'image/juese/img_gangQi_0' + j + '.png'
			} else {
				this.img_now.x = 230;
				this.img_next.visible = false;
			}
		}
	}
}