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
			this.addEvent();
			let boo = PanelManage.getAspectRatio()
			if (boo) {
				this.maxInfoNum = 8
			} else {
				this.maxInfoNum = 7
			}
			// this.panel_info.vScrollBarSkin = ''
		}
		public item: ProtoCmd.itf_JUQING_PIANZHANG;
		public setData(item: ProtoCmd.itf_JUQING_PIANZHANG, key: number) {
			if (item.id == this.maxPZID) {
				this.cnt = item.cnt;
			}
			this.volumeIndex = key;
			this.lab_volumeIndex.text = '第' +GameUtil.SectionToChinese(key,0) + '卷';
			this.item = item;
			this.lab_volumeName.text = '' + item.name;
			let nowChapter = GameApp.MainPlayer.pianZhangID;
			if (item.id > nowChapter) {
				this.img_bg.skin = 'image/juQingMode/box_ml_01down.png'
				this.lab_total_VolumeNum.visible = false;
				this.img_lock.visible = true;
				this.isLock = true;
				// this.img_mask.visible = true;
			}
			else if (item.id == nowChapter) {
				this.lab_total_VolumeNum.visible = true;
				this.img_bg.skin = 'image/juQingMode/box_ml_01.png'
				this.lab_total_VolumeNum.text = '合计' + GameUtil.SectionToChinese(item.cnt, 0) + '章'
				this.img_lock.visible = false;
				this.isLock = false;
				// this.img_mask.visible = false;
			}
			else if (item.id < nowChapter) {
				this.lab_total_VolumeNum.visible = true;
				this.img_bg.skin = 'image/juQingMode/box_ml_01.png'
				this.lab_total_VolumeNum.text = '合计' + GameUtil.SectionToChinese(item.cnt, 0) + '章'
				this.img_lock.visible = true;
				this.isLock = false;
				// this.img_mask.visible = false;
			}
			this.getPanelMsg(this.item.id, this.isLock)

		}
		public getPanelMsg(pzid, isLock) {
			let pkt1 = new ProtoCmd.QuestClientData();
			pkt1.setString(ProtoCmd.JQ_GET_JQ_ZHANGJIE, [pzid])
			lcp.send(pkt1);
		}
		public setPanelView() {
			if (this.item.id <= this.maxPZID) {
				this.vbox_show.removeChildren();
				for (let i = 0; i < this.charpterArr.length; i++) {
					let o = new JuQing_MuLuInfo_item()
					let base = this.charpterArr[i]
					let span = base.enddbid - base.startdbid + 1;
					let totalPages = Math.ceil(span / this.maxInfoNum);
					let pid: number = this.item.id;
					let index: number = base.index;
					GameApp.MainPlayer.pagesNum[pid * 100 + index] = totalPages;
					o.setData(base.index, base.name, this.isLock, pid, base.zjid)
					o.y = i * o.height;
					this.vbox_show.addChild(o)
				}
			}
			this.reSize()
		}
		public reSize() {
			if (this.vbox_show.numChildren > 0) {
				this.img_panel_Bg.visible =true
				this.panel_info.height = this.vbox_show.numChildren * 60 + (this.vbox_show.numChildren - 1) * 5
				this.img_panel_Bg.height = this.panel_info.height + 25
				this.height = this.img_panel_Bg.y + this.img_panel_Bg.height;
				
			} else {
				this.panel_info.height = 0;
				this.img_panel_Bg.visible =false ;
				this.height =55;

			}


		}
		public addEvent() {
			let self = this;
			GameApp.LListener.on(ProtoCmd.JQ_GET_JQ_ZHANGJIE, this,
				function (jsonData: { pzid: number, pzname: string, charpterInfo: number }) {
					let keys = Object.keys(jsonData.charpterInfo);
					for (let key of keys) {
						let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = jsonData.charpterInfo[key];
						let charpterID = GameApp.MainPlayer.charpterID;
						// 处理索引
						charpterInfo.index = key;
						// 处理挂机效率掉落
						GameApp.MainPlayer.allCharpterInfo[charpterInfo.zjid] = charpterInfo;
					}
					let indexArr = Object.keys(GameApp.MainPlayer.allCharpterInfo)
					this.charpterArr = [];
					for (let i = 0; i < indexArr.length; i++) {
						let num = Math.floor(parseInt(indexArr[i]) / 1000);
						if (num == self.indexNumArr[self.volumeIndex]) {
							self.charpterArr.push(GameApp.MainPlayer.allCharpterInfo[indexArr[i]])
						}
					}
					let hash = [];
					let arr = self.charpterArr
					for (var i = 0; i < arr.length; i++) {
						if (hash.indexOf(arr[i]) == -1) {
							hash.push(arr[i]);
						}
					}
					self.charpterArr = hash;
					if (self.charpterArr.length >= self.cntArr[self.volumeIndex] - 1) {
						self.setPanelView();
					}
				})
		}
	}
}