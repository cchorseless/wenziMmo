
module GameObject {
    export class Monster extends Creature {
        public id: number;
        public feature: ProtoCmd.AnimalFeature
        constructor() {
            super();
            this.feature = new ProtoCmd.AnimalFeature();
        }
        
    }
}