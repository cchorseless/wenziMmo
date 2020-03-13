/**Created by the LayaAirIDE*/
module view.main {
	export class Main_JuQingItem extends ui.main.Main_JuQingItemUI {
		public static self: Main_JuQingItem;
		constructor() {
			super();
			Main_JuQingItem.self = this;
		}
		//5002福州5003华山50041玉壶瀑布5005药王庄5006洛阳城5007良人镇5012嵩山派
		public mapArray = [5002, 5003, 5004, 5005, 5006, 5007, 5008, 5009, 5010, 5011, 5012, 5013, 5014, 5015, 5018, 5020]
		public setData(): void {
			this.panel_list.vScrollBarSkin = '';
			this.panel_map.hScrollBarSkin = '';
			this.vbox_list['sortItem'] = (items) => { };
			this.addEvent();
			this.initUI()
		}
		public addEvent(): void {
			for (let mapid of this.mapArray) {
				EventManage.onWithEffect(this['btn_' + mapid], Laya.UIEvent.CLICK, this, () => {
					new view.main.Main_PlaceDialog().setData(mapid).popup();
				})
			}
			EventManage.onWithEffect(this.btn_guaji, Laya.UIEvent.CLICK, this, () => {
				new view.juQingMode.JuQingPrizeDialog().setData().popup();
			});
			//任务
			EventManage.onWithEffect(this.btn_task, Laya.UIEvent.CLICK, this, function () {
				new view.dialog.TaskDialog().setData().popup();
			})

			// 宅院界面
			EventManage.onWithEffect(this.btn_zhaiYuan, Laya.UIEvent.CLICK, this, function () {
				PanelManage.openZhaiYuanPanel()
			})
			// 阅读小说
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			})
			// 探索
			EventManage.onWithEffect(this.btn_gotoTanSuo, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTanSuoPanel();
			})
			this.addLcpEvent();
		}
		public addLcpEvent(): void {
			// 监听位置改变刷新界面
			GameApp.LListener.on(LcpEvent.UPDATE_UI_PLACE_DES, this, () => {
				for (let mapid of this.mapArray) {
					this['btn_' + mapid].filters = null;
				}
				//当前所在地名称
				if (GameApp.SceneManager.chenkPlayerInFuBen()) {
					this.lbl_nowPlace.text = GameApp.MainPlayer.mapName;
				} else {
					let roomName = SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + GameApp.MainPlayer.roomId);
					this.lbl_nowPlace.text = GameApp.MainPlayer.mapName + roomName;
				}
				//当前所在地图位置
				let locationmapid = GameApp.MainPlayer.location.mapid;
				let mapBtn: Laya.Button = this['btn_' + locationmapid];
				if (mapBtn) {
					this.img_pos.x = mapBtn.x;
					this.img_pos.y = mapBtn.y;
					mapBtn.filters = [new Laya.GlowFilter('#ffc871', 50)];
				}
			})
		}
		/**
	  	 * 剧情目录信息
	  	 */
		public initNovelPian(): void {
			let allPianzhang = GameApp.MainPlayer.allPianZhangInfo;
			this.vbox_list.removeChildren();
			for (let i = 1; allPianzhang[i]; i++) {
				let onePianZhangInfo = allPianzhang[i];
				let btn_Pian = new Main_pianZhangItem();
				btn_Pian.setData(onePianZhangInfo);
				this.vbox_list.addChild(btn_Pian);
			}

		}

		/**
		 * 刷新地图信息
		 */
		public updateMapInfo() {
			//当前所在地名称
			if (GameApp.SceneManager.chenkPlayerInFuBen()) {
				this.lbl_nowPlace.text = GameApp.MainPlayer.mapName
			} else {
				let roomName = SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + GameApp.MainPlayer.roomId);
				this.lbl_nowPlace.text = GameApp.MainPlayer.mapName + '-' + roomName;
			}
			//当前所在地图位置
			let locationmapid = GameApp.MainPlayer.location.mapid;
			let mapBtn: Laya.Button = this['btn_' + locationmapid];
			if (mapBtn) {
				this.img_pos.x = mapBtn.x;
				this.img_pos.y = mapBtn.y;
				mapBtn.filters = [new Laya.GlowFilter('#ffc871', 50)];
			}
		}


		/**
		 * 刷新剧情信息
		 */
		public updateJuQingInfo(charpterID) {
			let charpterInfo = GameApp.MainPlayer.allCharpterInfo[charpterID];
			this.lbl_zhang.text = '第' + GameUtil.SectionToChinese(charpterInfo.index, 0) + '章';
			//章节名
			this.lbl_chapterName.x = this.lbl_zhang.x + this.lbl_zhang.width + 15;
			this.lbl_chapterName.text = charpterInfo.name;
			// 描述
			let str = charpterInfo.intro;
			let des = str.replace(/_/g, "");
			this.lbl_des.text = '' + des;
			this.img_juqing.visible = true;
			this.box_juqing.visible = false;
			// 页数
			if (charpterID > GameApp.MainPlayer.charpterID) {
				this.lbl_dangqian.visible = false;
				this.lbl_all.text = '未解锁';
				this.lbl_all.color = '#c43939'
				this.lbl_all.x = 496;
				this.lbl_juqing.text = '';
				this.img_juqing.skin = 'image/main/main_zonglan/font_shanyu.png';

			}
			else if (charpterID < GameApp.MainPlayer.charpterID) {
				this.lbl_dangqian.visible = false;
				this.lbl_all.text = '已完成';
				this.lbl_all.color = '#38ad32'
				this.lbl_all.x = 496;
				this.lbl_juqing.text = '';
				this.img_juqing.skin = 'image/main/main_zonglan/font_yiwancheng.png';

			}
			else if (charpterID == GameApp.MainPlayer.charpterID) {
				this.img_juqing.visible = false;
				this.box_juqing.visible = true;
				//页数
				let maxInfoNum;
				let boo = PanelManage.getAspectRatio()
				if (boo) {
					maxInfoNum = 8
				} else {
					maxInfoNum = 7
				}
				let total = Math.ceil((charpterInfo.enddbid - charpterInfo.startdbid + 1) / maxInfoNum);
				let now = Math.ceil((GameApp.MainPlayer.talkID - charpterInfo.startdbid + 1) / maxInfoNum);
				this.lbl_dangqian.visible = true;
				this.lbl_dangqian.text = '' + now;
				this.lbl_all.text = '/' + total + '页';
				this.lbl_all.color = '#2c2d27'
				this.lbl_all.x = this.lbl_dangqian.x + this.lbl_dangqian.width;
				//剧情事件
				this.div_target.style.fontSize = 22;
				this.div_target.style.fontFamily = 'STLiti'
				let juqing = GameApp.GameEngine.taskInfo[EnumData.TaskType.JUQINGEVENT]
				if (juqing) {
					for (let part in juqing) {
						this.box_juqing.visible = true;
						this.img_juqing.visible = false;
						this.div_target.innerHTML = '' + juqing[part].target;
						this.lbl_juqing.text = '欲知后事如何，请完成剧情目标';
					}
				} else {
					this.lbl_juqing.text = '';
					this.img_juqing.skin = 'image/main/main_zonglan/font_qingyudu.png'
				}
			}

		}
		/**
		 * 刷新挂机信息
		 */
		public updateGuaJiInfo() {
			let charpterID = GameApp.MainPlayer.charpterID;
			let items = GameApp.MainPlayer.allCharpterInfo[charpterID].items;
			//当前挂机效率
			for (let part in items) {
				switch (items[part].index) {
					// 金币
					case 20015:
						this.lbl_jinbi.text = items[part].num + '/时';
						break;
					// 玩家经验
					case EnumData.CoinType.COIN_TYPE_PLAYER_EXP:
						this.lbl_exp.text = items[part].num + '/时';
						break;
				}
			}
		}
		public initUI() {
			// 挂机信息
			this.updateGuaJiInfo();
			// 剧情信息
			this.updateJuQingInfo(GameApp.MainPlayer.charpterID);
			// 初始化mulu
			this.initNovelPian();
			// 任务
			this.updateTaskinfo()
			// 体力
			this.updateTili()
			// 地图
			this.updateMapInfo()
		}

		/**
		 * 切换篇章信息
		 * @param jsonData 
		 * @param id 篇章id
		 */
		public dealNovelPian(item): void {
			for (let child of this.vbox_list._childs) {
				child.goBig(child.pzid == item.pzid);
			}
		}

		/**
		 * 刷新体力信息
		 */
		public updateTili() {
			this.lbl_now.text = '' + GameApp.MainPlayer.nTili;
			this.lbl_max.text = '/100';
		}

		/**
		 * 刷新任務信息
		 */
		public updateTaskinfo(): void {
			//剧情任务
			let zhuxianTask = GameApp.GameEngine.taskInfo[EnumData.TaskType.SYSTEM];
			let zhixianTask = GameApp.GameEngine.taskInfo[EnumData.TaskType.LIFEEXP];
			this.div_zhuxiandes.style.color = this.div_zhixiandes.style.color = '#63491a';
			this.div_zhuxiandes.style.fontSize = this.div_zhixiandes.style.fontSize = 22;
			//主线任务
			if (zhuxianTask) {
				this.lbl_zhuxianState.visible = true;
				for (let i in zhuxianTask) {
					let taskInfo: ProtoCmd.stQuestInfoBase = zhuxianTask[i]
					this.lbl_zhuxianName.text = taskInfo.questname;
					this.div_zhuxiandes.innerHTML = taskInfo.des;
					if (taskInfo.queststatus >= 2) {
						this.lbl_zhuxianState.color = '#39ad32';
						this.lbl_zhuxianState.text = '已完成';
					} else {
						this.lbl_zhuxianState.color = '#ca3939';
						this.lbl_zhuxianState.text = '未完成';
					}
					this.lbl_zhuxianState.x = this.lbl_zhuxianName.x + this.lbl_zhuxianName.width + 10;
				}
			}
			else {
				this.lbl_zhuxianState.visible = false;
				this.lbl_zhuxianName.text = '暂无';
				this.div_zhuxiandes.innerHTML = '';
				this.lbl_zhuxianState.text = '';
			}
			//支线任务
			let zhixian = [];
			//根據位置排序
			let compare = (property) => {
				return function (a, b) {
					var value1 = a[property];
					var value2 = b[property];
					return value2 - value1;
				}
			}
			for (let i in zhixianTask) {
				zhixian.push(zhixianTask[i]);
			}
			zhixian = zhixian.sort(compare('queststatus'))
			if (zhixian[0]) {
				this.lbl_zhixianState.visible = true;
				this.lbl_zhixianName.text = zhixian[0].questname;
				this.lbl_zhixianState.x = this.lbl_zhixianName.x + this.lbl_zhixianName.width + 10;
				this.div_zhixiandes.innerHTML = zhixian[0].des;
				if (zhixian[0].queststatus >= 2) {
					this.lbl_zhixianState.color = '#39ad32';
					this.lbl_zhixianState.text = '已完成';
				} else {
					this.lbl_zhixianState.color = '#ca3939';
					this.lbl_zhixianState.text = '未完成';
				}
			} else {
				this.lbl_zhixianState.visible = false;
				this.lbl_zhixianState.visible = false;
				this.lbl_zhixianName.text = '暂无';
				this.div_zhixiandes.innerHTML = '';
				this.lbl_zhixianState.text = '';
			}
			this.div_zhuxiandes.style.font = this.div_zhixiandes.style.font = 'STLiti';
		}
	}
}