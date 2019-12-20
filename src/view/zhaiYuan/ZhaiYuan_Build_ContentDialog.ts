/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_Build_ContentDialog extends ui.zhaiYuan.ZhaiYuan_Build_ContentDialogUI {
		public type;
		constructor() {
			super();
			this.addEvent()
		}
		public setData(configID: number, isBuid) {
			if (isBuid) {
				this.btn_lv_up.label = "建造";
				this.btn_lv_up.skin = 'image/common/button_qianwang_yellow.png'
			} else {
				this.btn_lv_up.label = "升级";
				this.btn_lv_up.skin = 'image/common/button_qianwang_red.png'
			}
			let name = SheetConfig.zhaiyuan_upgrade.getInstance(null).NAME(configID + '');
			this.lab_name.text = name;
			let lv = configID % 1000
			this.type = Math.floor(configID / 1000)
			if (lv < 10) {
				this.box_lv.visible = true;
				this.lab_fullLV.visible = false;
				this.box_des.visible = true;
				this.lab_curLv.text = 'LV.' + (configID % 1000);
				this.lab_nextLv.text = '' + ((configID % 1000) + 1)
				this.lab_nextDes.text = SheetConfig.zhaiyuan_upgrade.getInstance(null).EFFICIENCY(configID + 1) + '%'
			} else {
				this.box_lv.visible = false;
				this.lab_fullLV.visible = true;
				this.box_des.visible = false;
			}
			this.lab_curDes.text = '生产消耗时间加速:' + SheetConfig.zhaiyuan_upgrade.getInstance(null).EFFICIENCY(configID) + '%';
			this.showCreate(configID);
			this.showCost(configID)
		}
		public addEvent() {
			this.btn_lv_up.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.archLevelUp, [this.type], 0, this, function (data) {
					GameApp.GameEngine.zhaiYuanLevels[this.type] +=1; 
					ZhaiYuan_Build_Dialog.self.setData();
					GameApp.LListener.offCaller(ProtoCmd.archLevelUp, this)
					this.close();
				});
				lcp.send(pkt);
			})
		}
		public showCreate(configID: number) {
			let lv = configID % 1000
			let baseID = configID + 1;
			if (lv < 10) {
				let newCreate = SheetConfig.zhaiyuan_upgrade.getInstance(null).ITEMTAB(baseID)
				newCreate = newCreate.split('`')
				let o = new compart.DaoJuWithNameItem();
				let item = new ProtoCmd.ItemBase();
				item.dwBaseID = newCreate[0];
				item.dwCount = newCreate[1];
				o.setData(item);
				this.box_get1.addChild(o);
			}
		}
		public showCost(configID: number) {
			let lv = configID % 1000
			let baseID = configID;
			if (lv < 10) {
				let costItem = SheetConfig.zhaiyuan_upgrade.getInstance(null).LVL_MATERIAL(baseID)
				costItem = costItem.split('|')
				for (let i = 0; i < costItem.length; i++) {
					costItem[i] = costItem[i].split('`');
					let o = new compart.DaoJuWithNameItem();
					let item = new ProtoCmd.ItemBase();
					item.dwBaseID = costItem[i][0];
					item.dwCount = costItem[i][1];
					o.setData(item);
					this['box_cost' + i].addChild(o);
				}

			}
		}
	}
}