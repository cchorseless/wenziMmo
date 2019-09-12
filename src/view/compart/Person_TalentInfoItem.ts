/**Created by the LayaAirIDE*/
module view.compart {
	export class Person_TalentInfoItem extends ui.compart.Person_TalentInfoItemUI {
		constructor() {
			super();
		}
		public hasInit = false;// 初始化自己
		public setData(): void {
			if (this.hasInit) { return };
			this.hasInit = true;
			this.updateTalentPanel(this.curIndex);
			this.addEvent();
		}

		public downX;
		// 根骨
		public curIndex = EnumData.emEquipPosition.EQUIP_MEDAL;
		public addEvent(): void {
			this.box_0.on(Laya.UIEvent.MOUSE_DOWN, this, (e: Laya.Event) => {
				this.downX = e.stageX;
			});


		}

		/**
		 * 激活天赋
		 * @param index 
		 */
		public activeTalent(index): void {

		}

		/**
		 * 刷新天赋界面
		 * @param index 
		 */
		public updateTalentPanel(index): void {
			let curTalentInfo = GameApp.GameEngine.equipDBIndex[index];
			// 未解锁
			if (curTalentInfo == null) {
				this.viw_0.selectedIndex = 1;
			}
			// 已解锁
			else {
				this.viw_0.selectedIndex = 0;
				let pkt = new ProtoCmd.QuestClientData();
				switch (index) {
					// 根骨
					case EnumData.emEquipPosition.EQUIP_MEDAL:

						break;
					// 悟性
					case EnumData.emEquipPosition.EQUIP_DRAGONSOUL:

						break;
					// 身法
					case EnumData.emEquipPosition.EQUIP_BLOODJADE:

						break;
					// 臂力
					case EnumData.emEquipPosition.EQUIP_SHIELD:

						break;
					// 善缘
					case EnumData.emEquipPosition.EQUIP_OFFICIALSEAL:
					
						break;

				}


			}


		}

		/**
		 * 升级天赋
		 * @param index 
		 */
		public lvUpTalent(index): void {

		}
	}
}