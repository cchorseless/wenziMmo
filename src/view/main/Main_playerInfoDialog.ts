/**Created by the LayaAirIDE*/
module view.main {
	export class Main_playerInfoDialog extends ui.main.Main_playerInfoDialogUI {
		constructor() {
			super();
		}
		public skin;
		public setData(): Main_playerInfoDialog {
			this.addEvent();
			this.init_info();
			return this;
		}
		public addEvent(): void {
			//修改头像
			this.img_changeHeadFrame.on(Laya.UIEvent.CLICK, this, () => {
				new view.main.Main_selectHeadDialog().popup(true);
			})
			//关闭弹窗
			this.btn_headMainClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			//选择pk模式
			for (let i = 0; i < 5; i++) {
				this['btn_type' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.init_type(i);
				})
			}
			//保存pk模式
			this.btn_ok.on(Laya.UIEvent.CLICK, this, () => {
				this.init_keepModel();
			})
		}
		public init_info(): void {
			let _play = GameApp.MainPlayer
			let ability = _play.ability;
			//生命
			this.lbl_life.text = ability.nowHP + '/' + ability.nMaxHP;
			this.img_life.width = 402 * ability.nowHP / ability.nMaxHP;
			//内力
			this.lbl_neili.text = ability.nowMP + '/' + ability.nMaxMP;
			this.img_neili.width = 402 * ability.nowMP / ability.nMaxMP;
			//耐力
			this.lbl_naili.text = ability.nowInnerValue + '/' + ability.nInnerValue;
			this.img_naili.width = 402 * ability.nowInnerValue / ability.nInnerValue;
			//经验
			this.lbl_exp.text = ability.nowexp + '/' + ability.maxexp;
			this.img_exp.width = 402 * ability.nowexp / ability.maxexp;
			// 头像
			this.img_avatarIcon.skin = '' + LangConfig.getPlayerIconSkin();
			//vip等级
			this.lbl_vip.text = 'VIP ' + _play.viplvl;
			// 名字
			this.lbl_playerName.text = '' + _play.objName;
			// 唯一id
			this.lbl_id.text = '' + _play.onlyId;
			//等级
			this.lbl_level.text = _play.zslevel + '转' + _play.level + '级';
			//初始化模式
			for (let i = 0; i < 5; i++) {
				this['btn_type' + i].selected = false;
			}
			let type = GameApp.MainPlayer.pkModel;
			if (type < 3) {
				this['btn_type' + type].selected = true;
			}
			if (type > 4) {
				this['btn_type' + (type - 2)].selected = true;
			}
		}
		public init_type(i): void {
			//模式选中状态
			for (let j = 0; j < 5; j++) {
				this['btn_type' + j].selected = false;
			}
			this['btn_type' + i].selected = true;
		}
		public init_keepModel(): void {
			for (let i = 0; i < 5; i++) {
				if (this['btn_type' + i].selected == true) {
					let type = EnumData.PkModel.PKMODEL_ALLTHEMODE;
					switch (i) {
						//和平模式
						case 0:
							type = EnumData.PkModel.PKMODEL_PEACEMODE;
							break;
						//队伍模式
						case 1:
							type = EnumData.PkModel.PKMODEL_TEAMMODE;
							break;
						//行会模式
						case 2:
							type = EnumData.PkModel.PKMODEL_GUILDMODE;
							break;
						//善恶模式
						case 3:
							type = EnumData.PkModel.PKMODEL_GOODANDEVILMODE;
							break;
						//全体模式
						case 4:
							type = EnumData.PkModel.PKMODEL_ALLTHEMODE;
							break;
					}
					let pkt = new ProtoCmd.CretPkModel();
					pkt.setValue('pkModel', type);
					lcp.send(pkt);
					this.close();
				}
			}
		}
	}
}