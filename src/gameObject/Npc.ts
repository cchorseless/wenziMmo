module GameObject {
    export class Npc extends Creature {
        public feature: ProtoCmd.AnimalFeature
        public constructor() {
            super();
            this.feature = new ProtoCmd.AnimalFeature();
        }
    }
}