/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQing_ReadInfo extends ui.juQingMode.JuQing_ReadInfoUI {
		public volumeNameArr = {
			1001: '华山卷',
			1002: '闯王宝藏卷',
			1003: '对决嵩山卷'
		}
		public volumeID;
		public chapterID;
		public pageID = 0;
		public baseData;
		constructor() {
			super();
		}
		/**
		 * 
		 * @param isFirst   是否是首页
		 * @param volumeID  篇ID
		 * @param chapterID 章节ID
		 * @param jsonData  章节详情数据
		 */
		public setData(isFirst: boolean, curPage: number, totalPage: number, volumeID: number, chapterID: number, jsonData: any = null, width, height) {
			this.baseData = jsonData;
			this.volumeID = volumeID;
			this.chapterID = chapterID;
			this.resize(width, height)
			if (isFirst) {
				this.box_firstPage.visible = true;
				this.box_normal.visible = false;
				this.initFirstPage(volumeID, chapterID);
			} else {
				this.box_firstPage.visible = false;
				this.box_normal.visible = true;
				this.initNormalPage(curPage, totalPage, volumeID, chapterID, jsonData);
			}

		}
		public resize(width, height) {
			this.width = this.box_normal.width = this.img_bg.width = width;
			this.height = this.box_normal.height = this.img_bg.height = height;

		}
		public initFirstPage(volumeID: number, chapterID: number) {
			this.lab_volume.text = this.volumeNameArr[volumeID];
			let index = GameApp.MainPlayer.allCharpterInfo[chapterID].index
			this.lab_chapter.text = '第' + index + '章' + GameApp.MainPlayer.allCharpterInfo[chapterID].name;
		}
		public initNormalPage(curPage, totalPage, volumeID: number, chapterID: number, jsonData: any) {
			for (let i = 0; i < jsonData.length; i++) {
				if (jsonData[i]) {
					let o = jsonData[i];
					this.addChapterInfoItem(o);
				}

			}
			let keys = Object.keys(GameApp.MainPlayer.allCharpterInfo)
			let index = GameApp.MainPlayer.allCharpterInfo[chapterID].index
			// this.lab_chapterName.text = GameApp.MainPlayer.allCharpterInfo[chapterID].name;
			// this.lab_chapterName.text = '';
			// this.lab_chapterIndex.text = '第' + index + '章';
			this.lab_volumeName.text = '【' + this.volumeNameArr[volumeID] + '】';
			this.pageID = curPage;
			// this.lab_pages.text = curPage + '/ ' + totalPage;
			this.html_Name.style.fontFamily = 'STXingkai';
			this.html_Name.style.fontSize = 26;
			this.html_Name.style.align = 'center';
			// this.html_Name.style.color = '#793b36';
			this.html_Name.innerHTML = "<span style='color:#000000'>" + '第' + GameUtil.SectionToChinese(index, 0) + '章' + "</span>"
				+ "<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>"
				+ "<span style='color:#793b36'>" + GameApp.MainPlayer.allCharpterInfo[chapterID].name + "</span>";
			this.html_page.style.fontFamily = 'STKaiti';
			this.html_page.style.align = 'center';
			this.html_page.style.fontSize = 26;
			this.html_page.innerHTML = "<span style='color:#a00000'>" + curPage + "</span>"
				+ "<span style='color:#000000'>" + '/ ' + totalPage + '页'+"</span>";


		}
		public SELECT_MODE = true;
		public addChapterInfoItem(_talkInfo) {
			// if (_talkInfo.msg.eventBn.length == 0) {
			// 	this.SELECT_MODE = true;
			// }
			let context = _talkInfo.content;
			let ui_item = null;
			let npc = _talkInfo.npcid;
			switch (npc) {
				case 0:
					ui_item = new view.juQingMode.JuQingContentV0Item();
					ui_item.setData(context);
					break;
				case 1:
					ui_item = new view.juQingMode.JuQingContentV1Item();
					ui_item.setData(context);
					break
				default:
					ui_item = new view.juQingMode.JuQingContentV2Item();
					ui_item.setData(npc, context);
					break;
			}
			this.vbox_content.addChild(ui_item);
		}
	}
}