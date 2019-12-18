/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_ShengWangItem extends ui.juese.Person_ShengWangItemUI {
		constructor() {
			super();
			this.addEvent();
			this.setData();
		}
		public hasInit = false;// 初始化自己
		private client_func_index = 18;// 功能ID编号
		//角色职业
		private job = GameApp.MainPlayer.job;
		public setData(): void {
			if (this.hasInit) { return };
			this.hasInit = true;
			// this.panel_shengWang.hScrollBarSkin = '';
			// this.hbox_shengWang['sortItem'] = (items) => { };
			this.vbox_left['sortItem'] = (items) => { };
			this.vbox_right['sortItem'] = (items) => { };
			// this.addEvent();
			this.activation();
		}
		public addEvent(): void {
			this.btn_preview.on(Laya.UIEvent.CLICK, this, function () {
				let o = new Person_ShengWangPreviewDialog();
				o.setData(this.data.titletab)
				o.show();
			})

			//开启
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				let activationLvl = SheetConfig.Introduction_play.getInstance(null).LEVEL('' + (this.client_func_index + 1000));
				if (GameApp.MainPlayer.lvlCount >= activationLvl) {
					GameUtil.setServerData(this.client_func_index);
					this.activation();
				}
				else {
					TipsManage.showTips('您当前等级不足，暂时不能开启');
				}
			});
			this.btn_achieve.on(Laya.UIEvent.CLICK, this, () => {
				new view.juese.Task_ChengJiuDialog().setData().popup(true);
			})
			this.btn_weiwang.on(Laya.UIEvent.CLICK, this, () => {
				new view.juese.Person_shengwangDialog().show()
			})
		}
		public activation(): void {
			//判断是否激活
			if (GameUtil.getServerData(this.client_func_index)) {
				this.viw_shengwang.selectedIndex = 1;
				this.getShengWangInfo();
				this.init_myData();
			}
			else {
				this.viw_shengwang.selectedIndex = 0;
				this.notActivation();
			}
		}
		/**
	  * 未激活时
	  */
		public notActivation(): void {
			let id = this.client_func_index + 1000;
			let activationLvl = SheetConfig.Introduction_play.getInstance(null).LEVEL('' + id);
			let zsLvl = Math.floor(activationLvl / 1000);
			let lvl = activationLvl % 1000;
			this.lbl_detail.text = SheetConfig.Introduction_play.getInstance(null).CONTENT('' + id);
			this.lbl_condition.text = '' + SheetConfig.Introduction_play.getInstance(null).TEXT1('' + id)
		}
		/**
		 * 获取江湖声望信息
		 */
		public getShengWangInfo(): void {
			let jsonData = GameApp.MainPlayer.fameInfo;
			this.lbl_use.text = '每日消耗' + jsonData.daydelexp + '点声望值';
			this.lab_effectName.text = "威慑";
			this.lbl_xiaoguo.text = '攻击威望值低于自己的玩家' + jsonData.damage;
			//我的声望头衔
			for (let i = 0; jsonData.titletab[i]; i++) {
				if (jsonData.prestigeid == i) {
					this.lbl_title.text = '' + jsonData.titletab[i].name;
				}
			}
			//我的声望icon
			this.img_self.skin = 'image/juese/icon_shengwang' + jsonData.prestigeid + '.png';

			//声望经验值进度条
			this.img_progress.width = 170 * jsonData.minexp / jsonData.maxexp;
			//声望经验值
			this.lbl_value.text = jsonData.minexp + '/' + jsonData.maxexp;
			//声望排名
			let ranks = Object.keys(jsonData.rank);
			let numArray = ['零', '一', '二', '三']
			for (let i = 1; i < 4; i++) {
				if (jsonData.rank[i]) {
					this['lbl_shengwang' + i].text = jsonData.rank[i];
				} else {
					this['lbl_shengwang' + i].text = '虚位以待';
				}
			}
			// //当前属性
			let shuxing1 = GameUtil.parseEffectidToObj(['' + jsonData.effid])
			let attribute1 = shuxing1.des;
			let battle1 = shuxing1.battle[this.job];
			// this.clip_power1.value = '' + battle1;
			let keys1 = Object.keys(attribute1)
			this.vbox_left.removeChildren();
			for (let key of keys1) {
				this.vbox_left.addChild(new view.compart.SinglePropsItem().setData(attribute1[key]))
			}
			//下级属性
			let id = parseInt(SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + jsonData.effid));
			if (id != undefined) {
				let shuxing2 = GameUtil.parseEffectidToObj(['' + id])
				let attribute2 = shuxing2.des;
				let battle = shuxing2.battle[this.job];
				// this.clip_power2.value = '' + battle;
				let battle2 = shuxing2.battle[this.job];
				let keys2 = Object.keys(attribute1)
				this.vbox_right.removeChildren();
				for (let key of keys2) {
					this.vbox_right.addChild(new view.compart.SinglePropsItem().setData(attribute1[key]))
				}
			}
			//威望预览
			// this.hbox_shengWang.removeChildren();
			// for (let i = 0; jsonData.titletab[i]; i++) {
			// 	this.hbox_shengWang.addChild(new view.juese.Person_ShengWangQiZiItem().setData(jsonData.titletab[i], i))
			// }
		}
		/**
		 * 我的排名
		 */
		public init_myData(): void {
			let pkt = new ProtoCmd.stMyRankRequest();
			pkt.setValue('rankType', EnumData.emRankType.Cret_Fame_Rank)
			lcp.send(pkt, this, (data) => {
				let bpkt = new ProtoCmd.stMyRankReturn(data);
				if (bpkt.rank == undefined || bpkt.rank == -1) {
					this.lbl_myRank.text = '未上榜';
				} else {
					this.lbl_myRank.text = '第' + bpkt.rank + '名';
				}
			})
		}
	}
}