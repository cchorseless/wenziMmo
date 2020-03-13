/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_jingmai_item_shuxingInfo extends ui.juese.Person_jingmai_item_shuxingInfoUI {
		constructor() {
			super();
		}
		public effectIDStruct0;//当前属性
		public effectIDStruct1;//下级属性
		public setData(effectIDStruct0, effectIDStruct1) {
			this.effectIDStruct0 = effectIDStruct0;
			this.effectIDStruct1 = effectIDStruct1;
			// this.lab_shuxing.text = des;
			// this.lab_up.text = up;
			this.init_talent();
			return this;
		}
		public init_talent(): void {
			//属性标题
			this.lab_shuxing.text = this.effectIDStruct0.label;
			//属性是只有一个值还是有最大值和最小值通过onlyValue判断
			if (this.effectIDStruct0.onlyValue) {
				this.lab_shuxing.text += this.effectIDStruct0.value;
				//若下级属性为空则不显示下级属性的变化值
				if (this.effectIDStruct1 != null) {
					this.lab_up.visible = true;
					//下阶属性值
					this.lab_up.text = '' + this.effectIDStruct1.value;
					// this.lab_shuxing.x = 0;
				} else {
					this.lab_up.visible = false;
					// this.lab_shuxing.x = 112;
				}
			}
			else {
				this.lab_shuxing.text +=  this.effectIDStruct0.min + '-' + this.effectIDStruct0.max;
				if (this.effectIDStruct1 != null) {
					this.lab_up.visible = true;
					//下阶属性值
					this.lab_up.text = '' + this.effectIDStruct1.min + '-' + this.effectIDStruct1.max;
					// this.lab_shuxing.x = 0;
				} else {
					this.lab_up.visible = false;
					// this.lab_shuxing.x = 112;
				}
			}
		}

	}
}