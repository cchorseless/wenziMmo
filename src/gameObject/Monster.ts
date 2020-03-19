
module GameObject {
    export class Monster extends Creature {

        public feature: ProtoCmd.AnimalFeature;
        public ui_item;
        constructor() {
            super();
            this.feature = new ProtoCmd.AnimalFeature();
        }




        /***************************************战斗******************************************* */
        /**
         * 尝试攻击，检查释放能攻击
         */
        public tryAttack(target: Creature, skillID: number = 999): void {
            let pkt = new ProtoCmd.CretAttack();
            pkt.dwTempId = this.tempId;
            pkt.nMagicId = skillID;
            pkt.dwTargetId = target.tempId;
            pkt.nX = target.location.ncurx;
            pkt.nY = target.location.ncury;
            pkt.distance = 5;
            lcp.send(pkt);
        }


        /**
         * 播放攻击动作
         */
        public playAttackAni(): void {
            console.log(this.objName + '正在攻击');
            // this.ui_item.playAni();
        }


        /**
         * 受击
         */
        public onAttack(): void {
            this.ui_item.playAni(1);
        }

        /**
         * 死亡
         */
        public goDie(): void {
            console.log(this.objName + '死亡');
            // this.ui_item.playAni(3)
            this.ui_item.disabled = true;
            this.ui_item.removeSelf();
            // this.ui_item.parent.removeChild(this.ui_item)
        }
    }
}