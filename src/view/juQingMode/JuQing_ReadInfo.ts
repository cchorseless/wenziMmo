/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQing_ReadInfo extends ui.juQingMode.JuQing_ReadInfoUI {

		public chapterID;
		public pageID;
		public baseData;
		constructor() {
			super();
		}
		/**
		 * @param jsonData  章节详情数据
		 * @param curPage   
		 * @param chapterID 章节ID

		 */
		public setData(jsonData, curPage: number, chapterID: number) {
			this.baseData = jsonData;
			this.chapterID = chapterID;
			this.pageID = curPage;
			let charpterInfo = GameApp.MainPlayer.allCharpterInfo[chapterID];
			// 篇章ID
			let volumeID = charpterInfo.pzid;
			// 总页数
			let totalPage = charpterInfo.maxPage;
			console.log(jsonData, curPage, chapterID);
			// this.resize(width, height)
			// 首页
			if (curPage == 0) {
				this.box_firstPage.visible = true;
				this.box_normal.visible = false;
				this.box_finishPage.visible = false;
				this.initFirstPage(volumeID, chapterID);
			}
			// 最后一页
			else if (curPage == -1) {
				this.box_firstPage.visible = false;
				this.box_normal.visible = false;
				this.box_finishPage.visible = true;
				this.initFinishPage(volumeID, chapterID);
			}
			// 其他
			else {
				this.box_firstPage.visible = false;
				this.box_normal.visible = true;
				this.box_finishPage.visible = false;
				this.initNormalPage(curPage, totalPage, volumeID, chapterID, jsonData);
			}
		}


		public initFirstPage(volumeID: number, chapterID: number) {
			for (let i = 0; i < 6; i++) {
				this['lab_content' + i].text = '';
			}
			// this.lab_volume.text = this.volumeNameArr[volumeID];
			this.img_volume.skin = 'image/juQingMode/juqing' + volumeID + '.png'
			let index = GameApp.MainPlayer.allCharpterInfo[chapterID].index
			this.lab_chapter.text = '第' + index + '章';
			this.lab_charpterName.text = GameApp.MainPlayer.allCharpterInfo[chapterID].name;
			let intro = GameApp.MainPlayer.allCharpterInfo[chapterID].intro;
			intro = intro.split('_');
			let length = intro.length;
			if (length > 4) {
				for (let i = 0; i < length; i++) {
					this['lab_content' + i].text = intro[i];
				}
			} else {
				for (let i = 0; i < length; i++) {
					this['lab_content' + (i + 1)].text = intro[i];
				}
			}

		}

		public initFinishPage(volumeID, chapterID) {
			this.img_volume1.skin = 'image/juQingMode/juqing' + volumeID + '.png';
			let index = GameApp.MainPlayer.allCharpterInfo[chapterID].index
			this.lab_chapter1.text = '第' + index + '章';
			this.lab_charpterName1.text = GameApp.MainPlayer.allCharpterInfo[chapterID].name;
		}

		public initNormalPage(curPage, totalPage, volumeID: number, chapterID: number, jsonData: any) {
			this.vbox_content.removeChildren();
			for (let i = 0; i < jsonData.length; i++) {
				if (jsonData[i]) {
					let o = jsonData[i];
					this.addChapterInfoItem(o);
				}
			}
			let keys = Object.keys(GameApp.MainPlayer.allCharpterInfo)
			let index = GameApp.MainPlayer.allCharpterInfo[chapterID].index;
			// 篇章名称
			let allPzData = GameApp.MainPlayer.allPianZhangInfo;
			for (let i = 1; allPzData[i]; i++) {
				if (allPzData[i].pzid == volumeID) {
					this.lab_volumeName.text = '[' + allPzData[i].pzname + ']';
					break
				}
			}
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
				+ "<span style='color:#000000'>" + '/ ' + totalPage + '页' + "</span>";
		}
		public addChapterInfoItem(_talkInfo) {
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