/**Created by the LayaAirIDE*/
module view.juese{
	export class PersonShengPingItem extends ui.juese.PersonShengPingItemUI{
		public type;
		constructor(){
			super();
		}
		public setData(time,id,desc,type){
			this.type = type
			let timeStr = TimeUtils.timestampToTime(time,0)
			this.lab_time.text = timeStr;
			let str = SheetConfig.resume.getInstance(null).INTRODUCE(id + "")
			let myName = GameApp.GameEngine.mainPlayer.objName;

			str = str.replace("player",myName);
			str = str.replace("xxx",desc);
			
			this.lab_content.text = str;
		}
	}
}