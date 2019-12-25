/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_HeHuaChi_Info_Vboxinfo extends ui.zhaiYuan.ZhaiYuan_HeHuaChi_Info_VboxinfoUI {
		public makeStatus;
		public costItem = [];
		public costTime;
		public getItem;
		public id;
		public configID;
		public speed;
		public canMake = true;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(costItem, costTime, getItem, makeStatus, id, configID, speed) {
			this.id = id;
			this.speed = speed;
			this.configID = configID;
			this.makeStatus = makeStatus;
			costItem = costItem.split('|')
			for (let i = 0; i < costItem.length; i++) {
				costItem[i] = costItem[i].split('`')
				this.costItem.push(costItem[i])
			}
			this.getItem = getItem.split('`');
			this.costTime = costTime;
			this.showView();
		}
		public showView() {
			for (let i = 0; i < this.costItem.length; i++) {
				let o = new compart.DaoJuWithNameItem();
				let itemBase = new ProtoCmd.ItemBase();
				itemBase.dwBaseID = this.costItem[i][0];
				itemBase.dwCount = this.costItem[i][1];
				let curCount = GameUtil.findItemInBag(parseInt(this.costItem[i][0]), GameApp.GameEngine.bagItemDB);
				if (curCount < this.costItem[i][1]) {
					this.canMake = false;
				}
				o.setData(itemBase);
				this["box_item" + i].addChild(o);
			}
			// if(this.curCount0 <this.needCount0 ||this.curCount1 <this.needCount1){
			// 	this.canMake = false;
			// }

			let o = new compart.DaoJuWithNameItem();
			let itemBase = new ProtoCmd.ItemBase();
			itemBase.dwBaseID = this.getItem[0];
			itemBase.dwCount = this.getItem[1];
			o.setData(itemBase);
			this.box_result.addChild(o);

			switch (this.makeStatus.s) {
				case 0:  //未生产
					this.btn_make.label = '生产';
					this.btn_make.disabled = false;
					let curTime = this.costTime * (100 / this.speed);
					this.lab_costTime.text = '耗时：' + TimeUtils.getFormatBySecond(curTime * 60, 7);
					break;
				case 1:  //正在生产
					this.btn_make.label = '生产中';
					this.btn_make.disabled = true;
					this.lab_costTime.text = '耗时：' + TimeUtils.getFormatBySecond(this.makeStatus.f * 60, 7)
					this.showTimeDown(this.makeStatus.f * 60);
					break;
				case 2:  //暂停生产
					this.btn_make.label = '暂停中';
					this.btn_make.disabled = true;
					this.lab_costTime.text = '耗时：' + TimeUtils.getFormatBySecond(this.makeStatus.f * 60, 7)

					break;
				case 3:  //可领取
					this.btn_make.label = '领取';
					this.btn_make.disabled = false;
					this.lab_costTime.text = '耗时：0分'
					break;
			}
		}
		public showTimeDown(second) {
			let self = this;
			Laya.timer.loop(60000, ui, round);
			function round() {
				second -= 60;
				if (second >= 0) {
					let time = TimeUtils.getFormatBySecond(second, 7)
					self.lab_costTime.text = '耗时：' + time;
				}
				else {
					self.lab_costTime.text = '耗时：00:00:00'
					Laya.timer.clear(ui, round)
				}
			}
		}
		public addEvent() {
			this.btn_make.on(Laya.UIEvent.CLICK, this, function () {
				let type = Math.floor(this.configID / 1000)
				let lv = this.configID % 1000
				if (this.makeStatus.s == 0) {
					if (!this.canMake) {
						TipsManage.showTips('材料不足');
						return;
					}
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.startGenerate,
						[type, lv, this.id], 0, this, function (data) {
							let base = data
							GameApp.GameEngine.zhaiYuaninfo.leisureServants = data.leisureServants;
							ZhaiYuanPanel.self.showZhaiYuanMsg(GameApp.GameEngine.zhaiYuaninfo)
							ZhaiYuan_HeHuaChiDialog.self.makeStatus[data.level][data.idx].s = data.statetab.s;
							ZhaiYuan_HeHuaChiDialog.self.makeStatus[data.level][data.idx].f = data.statetab.f;
							ZhaiYuan_HeHuaChiDialog.self.showPanel();
							ZhaiYuan_HeHuaChiDialog.self.upDateServantNum()

						})
					pkt.send();
				} else if (this.makeStatus.s == 3) {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.getGenerateReward,
						[type, lv, this.id], 0, this, function (data) {
							let base = data
							GameApp.GameEngine.zhaiYuaninfo.leisureServants = data.leisureServants;
							ZhaiYuanPanel.self.showZhaiYuanMsg(GameApp.GameEngine.zhaiYuaninfo)
							ZhaiYuan_HeHuaChiDialog.self.makeStatus[data.level][data.idx].s = 0;
							ZhaiYuan_HeHuaChiDialog.self.makeStatus[data.level][data.idx].f = 120;
							ZhaiYuan_HeHuaChiDialog.self.showPanel();
							ZhaiYuan_HeHuaChiDialog.self.upDateServantNum()
						})
					pkt.send();
				}
			})
		}
	}
}