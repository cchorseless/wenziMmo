/**Created by the LayaAirIDE*/
module view.main {
	export class Main_pianZhangItem extends ui.main.Main_pianZhangItemUI {
		constructor() {
			super();
			this.vbox_item['sortItem'] = (items) => { };
			this.addEvent();
		}
		public pzid;
		public selected = true;
		public setData(onePianZhangInfo) {
			this.lbl_name.text = onePianZhangInfo.pzname;
			this.pzid = onePianZhangInfo.pzid;
			if (GameApp.MainPlayer.pianZhangID >= onePianZhangInfo.pzid) {
				this.selectSelf(true);
				// 章節Item
				for (let i = 1; onePianZhangInfo.charpterInfo[i]; i++) {
					let ongCharpterInfo = onePianZhangInfo.charpterInfo[i];
					let btn_juqingDown = new Laya.Button();
					btn_juqingDown.stateNum = 2;
					btn_juqingDown.width = 110;
					btn_juqingDown.height = 35;
					btn_juqingDown.labelFont = 'FZXK';
					btn_juqingDown.labelSize = 20;
					btn_juqingDown.label = ongCharpterInfo.name;
					btn_juqingDown.skin = 'image/main/main_zonglan/btn_zhangjie.png';
					btn_juqingDown.labelColors = '#8c6240,#18466b';
					// 已解锁
					if (GameApp.MainPlayer.charpterID > ongCharpterInfo.zjid) {
						btn_juqingDown.selected = false;
					}
					// 当前
					else if (GameApp.MainPlayer.charpterID == ongCharpterInfo.zjid) {
						btn_juqingDown.selected = true;
					}
					// 未解锁
					else {
						btn_juqingDown.skin = 'image/main/main_zonglan/btn_suoding.png';
						btn_juqingDown.labelColors = '#8a7e74,#5a7285';
					}
					this.vbox_item.addChild(btn_juqingDown);
					// 切换章节
					btn_juqingDown.on(Laya.UIEvent.CLICK, this, () => {
						for (let btn of this.vbox_item._childs) {
							btn.selected = (btn == btn_juqingDown);
						}
						Main_JuQingItem.self.updateJuQingInfo(ongCharpterInfo.zjid);
					})
				}
				Laya.timer.frameOnce(1, this, () => {
					this.height = this.btn_bg.height + this.vbox_item.height;
				})

			}
			else {
				this.selectSelf(false);
			}

		}

		/**
		 * 切换自己显示
		 * @param isSelected 
		 */
		public selectSelf(isSelected) {
			this.selected = isSelected;
			if (isSelected) {
				this.lbl_name.color = '#0f0225';
				this.btn_bg.skin = 'image/main/main_zonglan/img_juanzhou.png';
				this.vbox_item.scaleY = 1;
			}
			else {
				this.lbl_name.color = '#ffffff';
				this.btn_bg.skin = 'image/main/main_zonglan/img_juanzhou_lock.png';
				this.vbox_item.scaleY = 0;
			}
		}
		public addEvent() {

			EventManage.onWithEffect(this.btn_bg, Laya.UIEvent.CLICK, this, () => {
				// 未解锁
				if (!this.selected) {
					if (GameApp.MainPlayer.pianZhangID < this.pzid) {
						TipsManage.showTips('篇章未解锁')
					}
					else {
						Main_JuQingItem.self.dealNovelPian(this);
					}
				}
			}
			)

		}

		/**
		 * 舒展伸缩
		 * @param istrue 
		 */
		public goBig(istrue) {

			if (istrue) {
				this.vbox_item.scaleY = 1;
				this.height = this.btn_bg.height + this.vbox_item.height;
			}
			else {
				this.vbox_item.scaleY = 0;
				this.height = this.btn_bg.height
			}
		}
	}
}