/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildMemberPanel extends ui.guild.GuildMemberPanelUI {
		constructor() {
			super();
		}
		public setData(): void {

			this.panel_all.vScrollBarSkin = '';
			this.vbox_all['sortItem'] = (items) => { };
			for (let i = 0; i < 6; i++) {
				this['vbox_' + i]['sortItem'] = (items) => { };
			}
			this.initUI()
			this.addEvent();
		}

		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			});
			// 伸缩展开
			for (let i = 0; i < 6; i++) {
				this['btn_' + i].on(Laya.UIEvent.CLICK, this, () => {
					this['btn_' + i].selected = !this['btn_' + i].selected;
					for (let _child of this['vbox_' + i]._childs) {
						_child.scaleY = this['btn_' + i].selected ? 1 : 0;
					}
				})
			}
		}

		public initUI(): void {
			// let pkt=new ProtoCmd.
		}
	}
}