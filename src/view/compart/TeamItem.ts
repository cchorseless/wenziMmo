/**Created by the LayaAirIDE*/
module view.team {
	export class TeamItem extends ui.team.TeamItemUI {
		constructor() {
			super();

		}
		//创建队伍，自己是队长
		public item;
		public setData(item: any): TeamItem {
			//隐藏管理按钮
			this.btn_manage.visible = false;
			//队长名称
			this.lbl_name.text = '' + item.objName;
			//队长等级
			this.lbl_lvl.text = '' + item.level;
			//队伍人数
			this.lbl_count.text = '1/6';
			this.img_duizhang.visible = true
			return this;
		}
		//显示成员列表
		public memberInfo(info: any, count: number, masterId:any): TeamItem {
			this.item = info;
			let onlyid = new ProtoCmd.Int64(info.onlyid);
			let masterId64 =  new ProtoCmd.Int64(masterId);
			if (onlyid.id == masterId64.id) {
				this.img_duizhang.visible = true;
			}
			//成员名称
			this.lbl_name.text = '' + info.szName;
			//成员等级
			this.lbl_lvl.text = '' + info.lvl;
			this.lbl_count.text = '' + count;
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_manage.on(Laya.UIEvent.CLICK, this, () => {
				new view.team.TeamMemberDialog().setData(this.item).popup(true);
			});
		}
	}
}