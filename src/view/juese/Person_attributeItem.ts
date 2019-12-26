/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_attributeItem extends ui.juese.Person_attributeItemUI {
		constructor() {
			super();
		}
		public effectIDStruct0;//当前属性
		public effectIDStruct1;//下级属性
		public setData(effectIDStruct0: ProtoCmd.EffectIDStruct, effectIDStruct1: ProtoCmd.EffectIDStruct = null, type: number): Person_attributeItem {
			this.effectIDStruct0 = effectIDStruct0;
			this.effectIDStruct1 = effectIDStruct1;
			this.view_juese.selectedIndex = type;
			switch (type) {
				case 0:
					this.init_personGangqi();
					break;
				case 1:
					this.init_talent();
					break;
			}
			return this;
		}
		/**
		 * 角色罡气
		 */
		public init_personGangqi(): void {
			//属性标题
			this.lbl_label.text = this.effectIDStruct0.label;
			if (this.effectIDStruct0.onlyValue) {
				this.lbl_dataDes.text = '' + this.effectIDStruct0.value;
				if (this.effectIDStruct1 != null) {
					//升到下阶属性值增加数量
					this.lbl_up.text = '' + Math.abs(this.effectIDStruct1.value - this.effectIDStruct0.value);
				}
			}
			else {
				this.lbl_dataDes.text = '' + this.effectIDStruct0.min + '-' + this.effectIDStruct0.max;
				if (this.effectIDStruct1 != null) {
					//升到下阶属性值增加数量
					let min = Math.abs(this.effectIDStruct1.min - this.effectIDStruct0.min);
					let max = Math.abs(this.effectIDStruct1.max - this.effectIDStruct0.max);
					this.lbl_up.text = min + '-' + max;
				}
			}
			if (this.effectIDStruct1 != null) {
				//判断增加||减少
				let value = this.effectIDStruct1.value - this.effectIDStruct0.value;
				if (value < 0) {
					this.img_up.scaleY = -1;
					this.img_up.x = 397;
					this.img_up.y = 23;
				} else {
					this.img_up.scaleY = 1;
					this.img_up.x = 395;
					this.img_up.y = 1;
				}
			}
		}
		/**
		 * 角色资质天赋
		 */
		public init_talent(): void {
			//属性标题
			this.lbl_name.text = this.effectIDStruct0.label;
			//属性是只有一个值还是有最大值和最小值通过onlyValue判断
			if (this.effectIDStruct0.onlyValue) {
				this.lbl_talentdes.text = '' + this.effectIDStruct0.value;
				//若下级属性为空则不显示下级属性的变化值
				if (this.effectIDStruct1 != null) {
					this.lbl_nextdes.visible = true;
					//下阶属性值
					this.lbl_nextdes.text = '' + this.effectIDStruct1.value;
					this.box_now.x=0;
				} else {
					this.lbl_nextdes.visible = false;
					this.box_now.x=112;
				}
			}
			else {
				this.lbl_talentdes.text = '' + this.effectIDStruct0.min + '-' + this.effectIDStruct0.max;
				if (this.effectIDStruct1 != null) {
					this.lbl_nextdes.visible = true;
					//下阶属性值
					this.lbl_nextdes.text = '' + this.effectIDStruct1.min + '-' + this.effectIDStruct1.max;
					this.box_now.x=0;
				} else {
					this.lbl_nextdes.visible = false;
					this.box_now.x=112;
				}
			}
		}
	}
}