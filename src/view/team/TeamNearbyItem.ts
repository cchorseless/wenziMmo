/**Created by the LayaAirIDE*/
module view.team {
	export class TeamNearbyItem extends ui.team.TeamNearbyItemUI {
		constructor() {
			super();

		}
		public item;
		public count;
		//附近队伍
		public setData(item: any, count: number): TeamNearbyItem {
			this.item = item;
			this.count = count;
			//队伍队长名
			this.lbl_monsterName.text = '' + item.szName;
			//队伍队长等级
			this.lbl_monsterlvl.text = '' + item.lvl;
			//队伍人数
			// this.lbl_number.text = '' + count;
			this.addEvent();
			return this;

		}
		//打开附近队伍管理弹窗
		public addEvent(): void {
			this.btn_manage.on(Laya.UIEvent.CLICK, this, () => {
				// new view.dialog.TeamApplyDialog().setData(this.item, this.count).popup();
			});
		}
	}
}