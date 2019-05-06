/**
 * 卡牌类定义
 */

module GameData
{
    /**
     * 卡牌的基类，卡牌按照职业进行区分
     * 
     */
    export class CardData
    {
        /**卡牌自身的职业*/
        protected selfcardJobType:EnumData.CardJobType;
        
        /** 外功（物理攻击）：影响外功伤害*/
        protected  physicalAttack:number|null;

        /**内力（魔法伤害） ：影响内功伤害*/
        protected magicAttack:number|null;
       
        /**拆招（外功防御）：1:1抵消外功伤害 */
        protected physicalDefense:number;

       /** 御劲（内力防御）：1:1抵消内功伤害*/
       protected magicDefense:number;

       /**气血：人物的生命值 */
       protected totalHP:number;

       /**身法（速度)：影响出手的先后顺序 */
       protected speed:number;

       /**会心：影响暴击率和暴击抵抗 */
       protected attention:number;

       /**克制卡牌的职业 */
       protected restrainCardJobType:EnumData.CardJobType;

       /**被克制卡牌的职业 */
       protected beRestrainCardJobType:EnumData.CardJobType;

       /**增伤：计算伤害时按照比率增加伤害（可与减伤抵消） */
        protected addDamage:number;
       /**免伤：计算伤害时按照比率减免伤害（可与增伤抵消） */
        protected avoidDamage:number;
       /**技能增伤：使用技能时按照比率提升伤害 */
        protected addSkillDamage:number;
       /**技能免伤：受到技能时按照比率减免伤害 */
        protected  avoidSkillDamage:number;
       /**普攻增伤：使用普攻时按照比率提升伤害 */
        protected addNormalDamage:number;
       /**普攻免伤：受到普攻时按照比率减免伤害 */
        protected avoidNormalDamage:number;

    }
    
    export class TIEWEI extends CardData{}
    export class HAOXIA extends CardData{}
    export class QIZONG extends CardData{}
    export class FANGSHI extends CardData{}
    
    

}
