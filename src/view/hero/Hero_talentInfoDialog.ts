/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_TalentInfoDialog extends ui.hero.Hero_talentInfoDialogUI {
		constructor() {
			super();
		}
		public item1;
		public item2;
		public sum;
		public setData(index, i, data: ProtoCmd.itf_Hero_TalentInfo, key): Hero_TalentInfoDialog {
			this.vbox_talent['sortItem'] = (items) => { }; 
			let sum = data.lvltab[0] + data.lvltab[1] + data.lvltab[2] + data.lvltab[3];
			this.sum = sum;
			this.judgeEvent(data, index, i, key);
			this.judgeType(data, index, i);
			this.addEvent(data, index, i);
			this.init_view(data.effidtab,i,index);
			return this;
		}
		public addEvent(data: ProtoCmd.itf_Hero_TalentInfo, index, i): void {
			if (data.gssecore >= data.consumetab[index][i]) {
				this.btn_save.on(Laya.UIEvent.CLICK, this, () => {
					this.saveData();
					this.close();
				})
			} else {
				TipsManage.showTips('当前天赋魔力不足')
			}
			this.btn_cancel.on(Laya.UIEvent.CLICK, this, () => {
				this.cancelData();
				this.close();
			})
		}
		/**
		 * 属性显示
		 * @param i 效果id
		 */
		public init_view(idArray,i,index): void {
			let num=i*(index+1);
			let shuxing = GameUtil.parseEffectidToString('' + idArray[num])
			let attribute = shuxing.des;
			let keys = Object.keys(attribute)
			this.vbox_talent.removeChildren();
			for (let key of keys) {
				this.vbox_talent.addChild(new view.juese.Person_LableItem().setData(attribute[key]))
			}
		}

		/**
		 * 判断view_talent.selectedIndex状态
		 */
		public judgeType(data: ProtoCmd.itf_Hero_TalentInfo, index, i): void {
			let light = data.lvltab[index]
			let canlight = light + 1;
			if (index == 0 && i == 1) {
				this.view_talent.selectedIndex = 1;
			}


			if (index !== 0 && i == 1) {
				if (data.lvltab[0] == 5 && data.lvltab[index] == 0) {
					this.view_talent.selectedIndex = 1;
				}

				if (data.lvltab[0] == 5 && data.lvltab[index] == 1) {
					this.view_talent.selectedIndex = 0;
				}

				if (data.lvltab[0] == 5 && data.lvltab[index] > 1) {
					this.view_talent.visible = false;
				}
				if (data.lvltab[0] < 5) {
					this.view_talent.visible = false;
				}

			}
			if (i > 1) {
				if (i == canlight) {
					this.view_talent.selectedIndex = 1;
				}

				if (i <= light) {
					this.view_talent.selectedIndex = 0;
				}
				if (i > canlight) {
					this.view_talent.visible = false;
				}
			}
		}
		/**
		 * 
		 * 发协议时的所发数据
		 *
		 */
		public judgeEvent(data: ProtoCmd.itf_Hero_TalentInfo, index, i, key): void {
			let data0 = data.lvltab[0];
			let data1 = data.lvltab[1];
			let data2 = data.lvltab[2];
			let data3 = data.lvltab[3];
			switch (index) {
				case 0:
					this.item1 = [key, i, data1, data2, data3];
					this.item2 = [key, 0, i];
					break;
				case 1:
					this.item1 = [key, data0, i, data2, data3];
					this.item2 = [key, 1, i];
					break;
				case 2:
					this.item1 = [key, data0, data1, i, data3];
					this.item2 = [key, 2, i];
					break;
				case 3:
					this.item1 = [key, data0, data1, data2, i];
					this.item2 = [key, 3, i];
					break;
			}
		}
		//保存天赋点发协议
		public saveData(): void {
			if (this.sum < 10) {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.Hero_saveGenius, this.item1)
				lcp.send(pkt);
			}

			else {
				TipsManage.showTips('当前重数天赋魔力已满！')
			}
		}
		//取消天赋点发包协议
		public cancelData(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_cancelGenius, this.item2)
			lcp.send(pkt);
		}


	}
}