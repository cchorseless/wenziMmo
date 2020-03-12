/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQing_MuLuInfo extends ui.juQingMode.JuQing_MuLuInfoUI {
		public isLock = false;
		public volumeIndex;
		public indexNumArr = [0, 10, 11, 12, 13, 14]
		public cntArr = [0, 13, 12, 2, 0, 0]
		public charpterArr = [];
		public maxInfoNum;
		public maxPZID = GameApp.MainPlayer.pianZhangID + 1;
		public cnt;
		constructor() {
			super();
			let boo = PanelManage.getAspectRatio()
			if (boo) {
				this.maxInfoNum = 8
			} else {
				this.maxInfoNum = 7
			}
			this.vbox_show['sortItem'] = (items) => { };
		}
		public item: ProtoCmd.itf_JUQING_PIANZHANG;
		public setData(item: ProtoCmd.itf_JUQING_PIANZHANG, key: number) {
			this.lab_noLock.style.fontFamily = 'STXingkai';
			this.lab_noLock.style.fontSize = 24;
			this.lab_noLock.style.align = 'center';
			this.lab_noLock.style.color = '#a00000';
			this.lab_noLock.innerHTML = "<span>未解锁</span>";

			this.lab_volumeIndex.style.fontFamily = 'STXingkai';
			this.lab_volumeIndex.style.fontSize = 30;
			this.lab_volumeIndex.style.align = 'center';
			this.lab_volumeIndex.style.color = '#fefefe';

			this.lab_total_VolumeNum.style.fontFamily = 'STXingkai';
			this.lab_total_VolumeNum.style.fontSize = 24;
			this.lab_total_VolumeNum.style.align = 'center';
			this.lab_total_VolumeNum.style.color = '#5e438d';

			this.lab_volumeName.style.fontFamily = 'STXingkai';
			this.lab_volumeName.style.fontSize = 28;
			this.lab_volumeName.style.align = 'center';
			this.lab_volumeName.style.color = '#1a0938';
			if (item.pzid == this.maxPZID) {
				this.cnt = item.cnt;
			}
			this.volumeIndex = key;
			this.item = item;
			this.lab_volumeIndex.innerHTML = "<span>" + '第' + GameUtil.SectionToChinese(key, 0) + '卷' + "</span>";
			this.lab_volumeName.innerHTML = "<span>" + item.pzname + "</span>";

			let nowPzid = GameApp.MainPlayer.pianZhangID;
			if (item.pzid > nowPzid) {
				this.img_bg.skin = 'image/juQingMode/box_ml_01down.png'
				this.lab_total_VolumeNum.visible = false;
				this.img_lock.visible = true;
				this.isLock = true;
			}
			else if (item.pzid == nowPzid) {
				this.lab_total_VolumeNum.visible = true;
				this.img_bg.skin = 'image/juQingMode/box_ml_01.png'
				this.lab_total_VolumeNum.innerHTML = "<span>" + '合计' + GameUtil.SectionToChinese(item.cnt, 0) + '章' + "</span>"
				this.img_lock.visible = false;
				this.isLock = false;
			}
			else if (item.pzid < nowPzid) {
				this.lab_total_VolumeNum.visible = true;
				this.img_bg.skin = 'image/juQingMode/box_ml_01.png'
				this.lab_total_VolumeNum.innerHTML = "<span>" + '合计' + GameUtil.SectionToChinese(item.cnt, 0) + '章' + "</span>"
				this.img_lock.visible = true;
				this.isLock = false;

			}
			this.dealCharpterInfo()

		}

		public dealCharpterInfo() {
			// 已解锁
			if (!this.isLock) {
				let allCharpterInfo = this.item.charpterInfo;
				for (let i = 1; allCharpterInfo[i]; i++) {
					let o = new JuQing_MuLuInfo_item();
					let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = allCharpterInfo[i];
					o.setData(charpterInfo.index, charpterInfo.name, this.isLock, charpterInfo.pzid, charpterInfo.zjid)
					this.vbox_show.addChild(o)
				}
				// 调整高度
				Laya.timer.frameOnce(1, this, () => {
					this.img_panel_Bg.visible = true
					this.img_panel_Bg.height = this.vbox_show.height + 25
					this.height = this.img_panel_Bg.y + this.img_panel_Bg.height;
				})
			}
			// 未解锁
			else {
				this.vbox_show.height = 0;
				this.img_panel_Bg.visible = false;
				this.height = 55;
			}

		}


	}
}