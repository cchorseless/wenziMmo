/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_InfoItem extends ui.hero.Hero_InfoItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public job;
		public addEvent(): void {
			//激活弟子
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				if (this.job == EnumData.JOB_TYPE.JOB_WARRIOR) {
					//激活弟子1
					this.init_JiHuo(ProtoCmd.Hero_firstGenHero);
				}
				else {
					//激活弟子2|3
					this.init_JiHuo(ProtoCmd.Hero_HeroJiHuo2and3);
				}
			})
			//符文套装
			this.btn_rune.on(Laya.UIEvent.CLICK, this, () => {
				new view.hero.Hero_RuneDialog().setData(this.job).popup(true);
			});
			//切换出战状态
			this.btn_battle.on(Laya.UIEvent.CLICK, this, () => {
				//当前弟子已解锁且不为出战弟子时切换出战状态
				if (GameApp.MainPlayer.heroObj(this.job).isOnBattle == false && GameApp.MainPlayer.heroObj(this.job).lockState == 2) {
					this.init_ChangeHero();
				}
			})
			this.addLcpEvent();
			this.init_rune();
		}

		public addLcpEvent() {
			GameApp.LListener.on(ProtoCmd.Hero_HeroBaseInfo, this, (jsonData: { [v: string]: ProtoCmd.itf_Hero_BaseInfo }) => {
				// 更新弟子状态
				for (let i = 1; i < 4; i++) {
					switch (jsonData[i].JOB) {
						case EnumData.JOB_TYPE.JOB_WARRIOR:
							GameApp.MainPlayer.hero1.lockState = jsonData[i].STATE;
							break;
						case EnumData.JOB_TYPE.JOB_MAGE:
							GameApp.MainPlayer.hero2.lockState = jsonData[i].STATE;
							break;
						case EnumData.JOB_TYPE.JOB_MONK:
							GameApp.MainPlayer.hero3.lockState = jsonData[i].STATE;
							break;
					}
				}
				// 激活弟子回包
				this.setData(this.job);
			})
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.Hero_HeroBaseInfo, this);
			super.destroy(isbool);
		}
		/**
		 * 弟子基本信息
		 */
		public setData(job: EnumData.JOB_TYPE = EnumData.JOB_TYPE.JOB_WARRIOR): void {
			this.job = job;
			//弟子全身像
			this.img_hero.skin = LangConfig.getPlayerAvatarSkin(GameApp.MainPlayer.heroSex, this.job);
			// 弟子对象
			let hero = GameApp.MainPlayer.heroObj(this.job);
			switch (hero.lockState) {
				case 0:
					this.btn_jihuo.disabled = true;
					this.viw_dizi.selectedIndex = 0;
					break;
				case 1:
					this.btn_jihuo.disabled = false;
					this.btn_jihuo.label = '可激活';
					this.viw_dizi.selectedIndex = 0;
					break;
				case 2:
					this.viw_dizi.selectedIndex = 1;
					break;
			}
			this.init_heroState();
		}
		//激活弟子
		public init_JiHuo(proto): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(proto, [this.job])
			lcp.send(pkt);
		}
		//内功碎片
		public init_rune(): void {
			this.list_down.array = [];
			let minNum = EnumData.emEquipPosition.EQUIP_RUNE_UP;
			let maxNum = EnumData.emEquipPosition.EQUIP_RUNE_UPLEFT + 1;
			let index = -1;
			let runeArray = [];
			for (let i = minNum; i < maxNum; i++) {
				index = index + 1;
				let rune = GameUtil.findEquipInPlayer(i);
				if (rune) {
					this['img_rune' + index].visible = true;
					this['img_rune' + index].skin = 'image/common/daoju/itemicon_' + rune.dwBaseID + '.png'
					let array = rune.stNpPropertyString;
					for (let j = 0; rune.stNpPropertyString[j]; j++) {
						runeArray.push(rune.stNpPropertyString[j]);
					}
				} else {
					this['img_rune' + index].visible = false;
				}
			}
			//内功碎片极品属性
			if (runeArray.length != 0) {
				let singleArray = [];
				for (let runeObj of runeArray) {
					let find = false;
					for (let singleObj of singleArray) {
						if (runeObj.index == singleObj.index) {
							singleObj.value = runeObj.value + singleObj.value;
							singleObj.max = runeObj.max + singleObj.max;
							singleObj.min = runeObj.min + singleObj.min;
							find = true;
						}
					}
					if (!find) {
						singleArray.push(JSON.parse(JSON.stringify(runeObj)));
					}
				}
				this.list_down.vScrollBarSkin = '';
				for (let single of singleArray) {
					this.list_down.array.push(single)
				}
				this.list_down.itemRender = view.compart.SinglePropsItem;
				this.list_down.renderHandler = Laya.Handler.create(this, (cell: view.compart.SinglePropsItem, index) => {
					cell.setData(cell.dataSource);
				}, null, false)
			}
		}
		/**
		 * 切换英雄出战状态
		 */
		public init_ChangeHero(): void {
			let pkt = new ProtoCmd.QuestClientData();
			let num = this.job - 1;
			pkt.setString(ProtoCmd.Hero_ChangeHero, [num]);
			lcp.send(pkt);
		}
		public init_heroState(): void {
			//弟子出战状态
			if (GameApp.MainPlayer.curHero == null) {
				this.btn_battle.gray = true;
			}
			else {
				if (GameApp.MainPlayer.heroObj(this.job).isOnBattle) {
					this.btn_battle.gray = false;
				} else {
					this.btn_battle.gray = true;
				}
			}
		}
	}
}