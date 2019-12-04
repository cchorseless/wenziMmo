/**Created by the LayaAirIDE*/
module view.main {
	export class Main_taskInfo extends ui.main.Main_taskInfoUI {
		constructor() {
			super();
		}
		public setData(data, type: number) {
			this.html_show.style.fontFamily = 'STKaiti'
			this.html_show.style.fontSize = 18;
			this.html_show.style.lineHeight = 10;
			let str: string;
			if (type == 0) {
				let typeStr = '[' + data.questname.substring(0, data.questname.indexOf(':')) + ']';
				let nameStr = data.questname.substring(data.questname.indexOf(':') + 1, data.questname.length);
				let status;
				switch (data.queststatus) {
					case -1:
						status = "(未接受)"
						break;
					case 0: case 1:
						status = "(进行中)"
						break;
					case 2:
						status = "(可交)"
						break;
				}
				str = "<font color='#f3d61a'>" + typeStr + nameStr + "</font>"
					+ "<font color='#ffed8f'>" + status + "</font>" + "<br/>" + data.targetdes;
			} else {
				let type = '[活跃' + data.id + ']'
				let name = data.name;
				let desc = data.desc;
				let status;
				if (data.cur < data.max) {
					status = "(进行中)"
				} else {
					status = "(可交)"
				}
				str = "<font color='#f3d61a'>" + type + name + "</font>"
					+ "<font color='#ffed8f'>" + status + "</font>" +
					"<br/>" + "<font color='#97d853'>" + desc + "(" + data.cur + "/" + data.max + ")" + "</font>"
			}
			this.html_show.innerHTML = str

			// this.html_show.innerHTML="<br/><span>我的第一行要换行</span>";

			this.reSize()
			this.html_show.on(Laya.Event.LINK, this, (data) => {
				GameUtil.parseTaskInfo(data);
			})

		}
		public reSize() {
			this.height = this.html_show.contextHeight + 10
		}
	}
}