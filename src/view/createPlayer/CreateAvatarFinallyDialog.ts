/**Created by the LayaAirIDE*/
module view.createPlayer {
	export class CreateAvatarFinallyDialog extends ui.createPlayer.CreateAvatarFinallyDialogUI {
		constructor() {
			super();
		}

		public setData() {
			this.img_finallyavatar.skin = LangConfig.getPlayerAvatarHalfSkinV3();
			this.box_talent.addChild(this.box_talent);
			this.box_talent.pos(0, 0);
			// this.box_xingGe.addChild(this.list_xingGe);
			// this.list_xingGe.pos(0, 0)
			// this.lbl_finaName.text = this.playerName;
			// this.lbl_job.text = LangConfig.JOB_TYPEDES[EnumData.JOB_TYPE[this.job]]

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