/**Created by the LayaAirIDE*/
module view.friend{
	export class FriendPanel extends ui.friend.FriendPanelUI{
		constructor(){
			super();
		}
		public setData(): void {
			this.panel_friend00.vScrollBarSkin = '';
			this.panel_friend01.vScrollBarSkin = '';
			this.panel_friend02.vScrollBarSkin = '';
			this.vbox_friend00['sortItem'] = (items) => { };
			this.vbox_friend01['sortItem'] = (items) => { };
			this.vbox_friend02['sortItem'] = (items) => { };
			this.tab_friend.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_friend.selectedIndex = index;
			}, null, false);
			for (let i = 0; i < 10; i++) {
				this.vbox_friend00.addChild(new view.compart.TeamItem());
				this.vbox_friend01.addChild(new view.compart.TeamItem());
				this.vbox_friend02.addChild(new view.compart.TeamItem());
			
			}
			
			
		}
	}
}