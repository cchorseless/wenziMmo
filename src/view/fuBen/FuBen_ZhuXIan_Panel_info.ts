/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_ZhuXIan_Panel_info extends ui.fuBen.FuBen_ZhuXIan_Panel_infoUI {

		public jsonData;
		constructor() {
			super();
			this.addEvent();
		}
		public addEvent() {
			for (let i = 0; i < 3; i++) {
				this['img_bg' + i].on(Laya.UIEvent.CLICK, this, () => {
					let fubenInfo = this.jsonData[i + 1];
					// 已解锁
					if (GameApp.MainPlayer.curFuBenMainID >= fubenInfo.ceng) {
						this.showDialog(fubenInfo.ceng);
					}
					// 未解锁
					else {
						TipsManage.showTips('通关前一关卡可以解锁')
					}
				})
			}

		}
		public showDialog(ceng) {
			let pkt = new ProtoCmd.QuestClientData();
			// type(1强化等级，2神盾，3龙魂，4光翼，5武器等级,6穿戴多少件多少等级的装备，8勋章ID)
			pkt.setString(ProtoCmd.FB_ChuMoCengOpen, [ceng], null, this, (jsonData: { type?: number, need?: number, lv?: number, item: any, times: number }) => {
				console.log(jsonData)
				let o = new FuBen_ZhuXianContent_Dialog();
				// 层数转化成索引
				let index = ceng % 3 || 3;
				o.setData(this.jsonData[index], jsonData);
				o.popup();
			});
			lcp.send(pkt);
		}

		public setData(jsonData) {
			// jsonData要排序
			let tmp = {}
			for (let i = 1; jsonData[i]; i++) {
				let tmpdata = jsonData[i];
				tmp[tmpdata.ceng % 3 || 3] = tmpdata;
			}
			console.log(tmp)
			this.jsonData = tmp;
			for (let i = 1; i < 4; i++) {
				this.setItemData(i - 1, this.jsonData[i]);
			}

		}

		/**
		 * 设置子对象数据
		 * @param index 
		 * @param data 
		 */
		public setItemData(index, jsonData) {
			let html_StageID = this['html_StageID' + index];
			let img_icon = this['img_icon' + index];
			let lab_BossName = this['lab_BossName' + index];
			let lab_StageName = this['lab_StageName' + index];
			let img_Star3_ = this['img_Star3_' + index];
			let img_Star2_ = this['img_Star2_' + index];
			let img_Star1_ = this['img_Star1_' + index];
			let img_bg = this['img_bg' + index];
			// 副本层数 1-1
			html_StageID.style.fontFamily = 'STXingkai';
			html_StageID.style.fontSize = 30;
			html_StageID.style.align = 'center';
			html_StageID.style.color = '#ffffff';
			let curStageID = SheetConfig.Thread_sweep_tbl.getInstance(null).NUMBER_CHECKPOINTS(jsonData.ceng);
			html_StageID.innerHTML = "<span>" + curStageID + '</span>';
			let iconID = SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE(jsonData.monsterid)
			let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME(jsonData.monsterid)
			// BOSS形象
			img_icon.skin = this.img_icon1.skin = PathUtil.getNpcHalfPath(iconID);
			// BOSS名称
			lab_BossName.text = name;
			// 关卡名称
			lab_StageName.text = jsonData.title;
			// 关卡星级
			switch (jsonData.star) {
				case 0:
					img_Star3_.skin = img_Star2_.skin = img_Star1_.skin = 'image/fuben/star_small_02.png';
					break;
				case 1:
					img_Star1_.skin = 'image/fuben/star_small_01.png';
					img_Star3_.skin = img_Star2_.skin = 'image/fuben/star_small_02.png';
					break;
				case 2:
					img_Star2_.skin = img_Star1_.skin = 'image/fuben/star_small_01.png';
					img_Star3_.skin = 'image/fuben/star_small_02.png';
					break;
				case 3:
					img_Star3_.skin = img_Star2_.skin = img_Star1_.skin = 'image/fuben/star_small_01.png';
					break;
			}
			if (GameApp.MainPlayer.curFuBenMainID >= jsonData.ceng) {
				// 背景图
				img_bg.skin = 'image/fuben/img_guanka_selected.png';
				img_bg.height = 639
			}
			else {
				img_bg.skin = 'image/fuben/img_guanka_normal.png';
				img_bg.height = 611
			}

		}
	}
}