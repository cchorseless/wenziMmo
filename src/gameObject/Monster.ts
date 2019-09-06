
module GameObject {
    export class Monster extends Creature {

        public feature: ProtoCmd.AnimalFeature;
        public ui_item: view.compart.MonsterInSceneItem;
        constructor() {
            super();
            this.feature = new ProtoCmd.AnimalFeature();
        }




        /***************************************战斗******************************************* */
        /**
         * 播放攻击动作
         */
        public startAttack(): void {
            console.log(this.objName + '正在攻击');
            this.ui_item.playAni();
        }

        /**
         * 死亡
         */
        public goDie(): void {
            console.log(this.objName + '死亡');
            this.ui_item.playAni(3)
        }
    }
}