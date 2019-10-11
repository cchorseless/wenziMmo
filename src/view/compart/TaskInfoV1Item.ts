/**Created by the LayaAirIDE*/
module view.compart {
	export class TaskInfoV1Item extends ui.compart.TaskInfoV1ItemUI {
		constructor() {
			super();
		}

		public setData(jsonData, key, i): TaskInfoV1Item {

			// console.log('========>状态',jsonData)
			switch (jsonData[key]) {
				case 0:
					this.img_baoxiang.skin = 'image/common/icon_baoxiang3_close.png';
					break;
				case 1:
					this.img_baoxiang.skin = 'image/common/icon_baoxiang3_light.png';
					break;
				case 2:
					this.img_baoxiang.skin = 'image/common/icon_baoxiang3_open.png';
					break;
			}
			this.init_cheng(i, key);
			return this;
		}
		public init_cheng(i, key): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.TASK_achievementDesc, null, null, this, (jsonData) => {
				let arr = jsonData[i];
				for (let j = 1; arr[j]; j++) {
					if (arr[j].id == key) {
						let detail=arr[j].desc.split('^')
						this.lbl_detail.text = '' + detail[0];
						//detail[1],detail[2]成就奖励
					}
					
				}

			})
			lcp.send(pkt);
		}
	}
}