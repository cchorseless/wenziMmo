/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_JiNaBossItem extends ui.fuBen.FuBen_JiNaBossItemUI {
		constructor() {
			super();
		}
		public index;
		public data;
		public setData(item: { data: ProtoCmd.itf_FB_JiDaoInfo, battle: number }, index): void {
			this.index = index;
			this.data = item;
			//boss名称
			let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + item.data.monid).split("_");
			this.lbl_name.text = '' + name[0];
			//boss状态
			if (item.data.time != 0) {
				this.lbl_state.color = '#c43939';
				this.lbl_state.text = '' + item.data.time;
				GameUtil.timeCountDownByS(item.data.time, this.lbl_state)
			} else {
				this.lbl_state.color = '#39ad32';
				this.lbl_state.text = '可击杀';
			}
			//boss头像
			let icon = SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE('' + item.data.monid)
			this.img_boss.skin = 'image/common/npc/npc_icon_' + icon + '.png';
			//初始化发光
			if (index == 0) {
				this.btn_boss.selected = this.img_light.visible = true;
			} else {
				this.btn_boss.selected = this.img_light.visible = false;
			}
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_boss.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_boss.selected = true;
				PanelManage.FuBenJiNa.update_yeWai(this.index);
			})
		}
	}
}