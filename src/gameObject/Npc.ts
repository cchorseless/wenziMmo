module GameObject {
    export class Npc extends Creature {
        public feature: ProtoCmd.AnimalFeature;
        public taskState: EnumData.NPCSTATUS = EnumData.NPCSTATUS.NOTASKALL;
        public constructor() {
            super();
            this.feature = new ProtoCmd.AnimalFeature();
        }
    }
}