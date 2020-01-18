/**Created by the LayaAirIDE*/
module view.createPlayer {
	export class CreateAvatarFinallyDialog extends ui.createPlayer.CreateAvatarFinallyDialogUI {
		constructor() {
			super();
		}

		public setData() {
			this.img_finallyavatar.skin = LangConfig.getPlayerAvatarHalfSkinV3();
			// 更新天赋
			for (let i = 1; i < 6; i++) {
				let count = GameApp.MainPlayer.talentInfo[i];
				// 阶数
				this['lbl_talent' + i].text = '' + count;
			}
			// 更新性格
			this.list_xingGe.repeatX = 4;
			this.list_xingGe.array = [];
			let keys = Object.keys(GameApp.MainPlayer.xingGeInfo);
			for (let key of keys) {
				let id = GameApp.MainPlayer.xingGeInfo[key].id
				this.list_xingGe.array.push(id);
			}
			this.list_xingGe.itemRender = view.juese.Person_SpeLabelItem;
			this.list_xingGe.renderHandler = Laya.Handler.create(this, (cell: view.juese.Person_SpeLabelItem, index) => {
				cell.scaleX = cell.scaleY = 0.8;
				cell.setData(cell.dataSource);
			}, null, false);
			// 名字
			this.lbl_finaName.text = GameApp.MainPlayer.objName;
			// 职业
			this.lbl_job.text = LangConfig.JOB_TYPEDES[EnumData.JOB_TYPE[GameApp.MainPlayer.sex]];

			this.addEvent();
			return this
		}
		public addEvent(): void {
			/**
			 * 最终结束
			 */
			EventManage.onWithEffect(this.btn_finallySure, Laya.UIEvent.CLICK, this, () => {
				// 销毁界面
				this.close();
				// 睁眼动画
				let cg = new SkeletonUtil.SkeletonGroup();
				cg.loadRes(['sk/new/Zhenyan.sk'], () => {
					cg.pos(Laya.stage.width / 2, Laya.stage.height / 2);
					Laya.stage.addChild(cg);
					PanelManage.openJuQingModePanel();
					cg.play(0, false, false, Laya.Handler.create(this, () => {
						Laya.Tween.to(cg, { alpha: 1 }, 1000, null, Laya.Handler.create(this, () => {
							cg.destroy(true);
						}))
					}), 0.5);
				})

			});
		}
	}
}