/**Created by the LayaAirIDE*/
module view.compart {
	export class TeamItem extends ui.compart.TeamItemUI {
		constructor() {
			super();

		}
		//创建队伍，自己是队长
		public setData(item: any): TeamItem {
			//隐藏管理按钮
			this.btn_manage.visible = false;
			//队长名称
			this.lbl_name.text = '' + item.objName;
			//队长等级
			this.lbl_lvl.text = '' + item.level;
			//队伍人数
			this.lbl_count.text = '1/6';
			return this;
		}
		//显示成员列表
		public memberInfo(info: any,count:number): TeamItem {
			//成员名称
			this.lbl_name.text = '' + info.szName;
			//成员等级
			this.lbl_lvl.text = '' + info.lvl;
			this.lbl_count.text = ''+count;
			return this;
		}
	}
}