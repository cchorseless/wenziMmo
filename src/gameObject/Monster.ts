
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
         * 尝试攻击，检查释放能攻击
         */
        public tryAttack(target: Creature, skillID: number = 1000): void {
            let pkt = new ProtoCmd.CretAttack();
            pkt.dwTempId = this.tempId;
            // switch (this.job) {
            //     // 战士
            //     case EnumData.JOB_TYPE.JOB_WARRIOR:
            //         break;
            //     // 法师
            //     case EnumData.JOB_TYPE.JOB_MAGE:
            //         skillID = 2002;
            //         break;
            //     // 道士
            //     case EnumData.JOB_TYPE.JOB_MONK:
            //         skillID = 3002;
            //         break;
            // }
            pkt.nMagicId = skillID;
            pkt.dwTargetId = target.tempId;
            pkt.nX = target.location.ncurx;
            pkt.nY = target.location.ncury;
            lcp.send(pkt);
        }


        /**
         * 播放攻击动作
         */
        public startAttack(): void {
            console.log(this.objName + '正在攻击');
            this.ui_item.playAni();
        }


        /**
         * 受击
         */
        public onAttack(): void {
            this.ui_item.playAni(2);
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