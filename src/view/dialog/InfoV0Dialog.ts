/**Created by the LayaAirIDE*/
module view.dialog {
	export class InfoV0Dialog extends ui.dialog.InfoV0DialogUI {
		constructor() {
			super();
		}
		public id: ProtoCmd.ItemBase;
		public setData(id): InfoV0Dialog {
			this.id = id;
			this.addEvent();
			this.init_talentInfo();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
		public init_talentInfo(): void {
			//天赋效果
			this.img_res.skin = 'image/common/daoju/itemicon_' + this.id + '.png';
			//天赋名称
			this.lbl_title.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + this.id);
			//资质描述
			let introduce = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES('' + this.id);
			if (introduce !== undefined && introduce !== '' && introduce !== '0') {
				this.lbl_introduce.text = '' + introduce;
			}
			//天赋属性
			let effid;
			switch (GameApp.MainPlayer.job) {
				case EnumData.JOB_TYPE.JOB_WARRIOR:
					effid = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB1_EFFICTID('' + this.id);
					break;
				case EnumData.JOB_TYPE.JOB_MAGE:
					effid = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB2_EFFICTID('' + this.id);
					break;
				case EnumData.JOB_TYPE.JOB_MONK:
					effid = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB3_EFFICTID('' + this.id);
					break;
			}
			let taletInfo = GameUtil.parseEffectidToObj(['' + effid])
			//评分
			this.lbl_score.text = '' + taletInfo.battle[GameApp.MainPlayer.job]
			let keys = Object.keys(taletInfo.des)
			this.list_info.array = [];
			for (let i = 0; i < keys.length; i++) {
				this.list_info.array.push(taletInfo.des[i])
			}
			this.list_info.itemRender = view.compart.SinglePropsItem;
			this.list_info.renderHandler = Laya.Handler.create(this, (cell: view.compart.SinglePropsItem, index) => {
				cell.setData(cell.dataSource);
			}, null, false)

		}
	}
}