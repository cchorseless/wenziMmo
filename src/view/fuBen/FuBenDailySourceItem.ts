/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBenDailySourceItem extends ui.fuBen.FuBenDailySourceItemUI {
		constructor() {
			super();
		}
		/**
		 * 
		 * @param data 资源副本信息
		 * @param resFubenInfo 资源副本单行信息
		 * @param index 资源类型
		 * @param i 难度
		 */
		//资源副本信息
		public item: ProtoCmd.itf_FB_ZiYuanInfo;
		//资源副本单行信息
		public resData: ProtoCmd.itf_FB_ZiYuanOneInfo;
		//副本难度
		public difficult: number;
		public setData(data: ProtoCmd.itf_FB_ZiYuanInfo, resFubenInfo, index, i): FuBenDailySourceItem {
			this.difficult = i;
			this.item = data;
			this.resData=resFubenInfo.infotab[index];
			this.img_bg1.skin = 'image/fuben/img_ziyuan' + i + '.png';
			this.img_bg2.skin = 'image/fuben/img_ziyuanbg' + i + '.png'
			switch (i) {
				case 1:
					this.lbl_difficult.text = '普通';
					this.lbl_difficult.color = '#757575'
					break;
				case 2:
					this.lbl_difficult.text = '困难';
					this.lbl_difficult.color = '#547554'
					break;
				case 3:
					this.lbl_difficult.text = '精英';
					this.lbl_difficult.color = '#547275'
					break;
				case 4:
					this.lbl_difficult.text = '史诗';
					this.lbl_difficult.color = '#655475'
					break;
				case 5:
					this.lbl_difficult.text = '噩梦';
					this.lbl_difficult.color = '#b2462d'
					break;
			}
			if (GameApp.MainPlayer.ability.nFight >= resFubenInfo.zhanlitab[i].Combat) {
				this.box_open.visible = true;
				this.lbl_condition.visible = false;
			} else {
				this.box_open.visible = false;
				this.lbl_condition.visible = true;
				this.lbl_condition.text = '战力' + resFubenInfo.zhanlitab[i].Combat + '开启'
			}
			this.openFuBen(resFubenInfo, index);
			this.addEvent();
			return this;
		}
		public openFuBen(resFubenInfo, i): void {
			let keys = Object.keys(this.resData.jiangli);
			this.hbox_ziyuan.removeChildren();
			for (let key of keys) {
				let _itemData = new ProtoCmd.ItemBase();
				_itemData.dwBaseID = this.resData.jiangli[key].index;
				_itemData.dwCount = Math.ceil(this.resData.jiangli[key].num * ((i - 1) * 0.2 + 1));
				let _itemUI = new view.compart.DaoJuItem();
				_itemUI.setData(_itemData, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.hbox_ziyuan.addChild(_itemUI);
			};
		}

		public addEvent(): void {
			let self = this;
			// 进入副本
			this.btn_into.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.FB_Into_CLFuben, [this.item.index,this.difficult]);
				lcp.send(pkt);
			})
			this.btn_saodang.on(Laya.UIEvent.CLICK, this, () => {
				let o = new FuBen_SaoDang_Dialog();
				o.setData(this.resData,this.difficult,this.item.index);
				o.popup();
			})

		}
		public destroy(e = true) {
			super.destroy(e);
		}
	}
}