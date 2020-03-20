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
			this.resData = resFubenInfo.infotab[index];
			this.img_bg1.skin = PathUtil.ResFubenDifficultyBg[i];
			this.img_bg2.skin = PathUtil.ResFubenDifficultyNameBg[i];
			//副本难度
			this.lbl_difficult.text = PathUtil.ResFubenDifficultyName[i];
			this.lbl_difficult.color = PathUtil.ResFubenDifficultyNameColor[i];
			//判断是否能进入副本
			if (GameApp.MainPlayer.ability.nFight >= resFubenInfo.zhanlitab[i].Combat && data.leftcnt > 0) {
				this.box_open.visible = true;
				this.lbl_condition.visible = false;
			} else {
				this.box_open.visible = false;
				this.lbl_condition.visible = true;
				if (GameApp.MainPlayer.ability.nFight < resFubenInfo.zhanlitab[i].Combat) {
					this.lbl_condition.text = '战力' + resFubenInfo.zhanlitab[i].Combat + '开启'
				} else if (data.leftcnt <= 0) {
					this.lbl_condition.text = '剩余次数不足';
				}
			}
			this.openFuBen(resFubenInfo, index);
			this.addEvent();
			return this;
		}
		public openFuBen(resFubenInfo, i): void {
			let keys = Object.keys(this.resData.jiangli);
			//副本奖励
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
				pkt.setString(ProtoCmd.FB_Into_CLFuben, [this.item.index, this.difficult]);
				lcp.send(pkt);
			})
			//扫荡
			this.btn_saodang.on(Laya.UIEvent.CLICK, this, () => {
				let o = new FuBen_SaoDang_Dialog();
				o.setData(this.resData, this.difficult, this.item.index);
				o.popup();
			})

		}
	}
}