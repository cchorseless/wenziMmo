/*
* name;
*/
module EffectManage {

    /**
     * 
     * @param atker 攻击者
     * @param dwTargeter  受击者
     * @param nMagicId 技能ID
     * @param dwActionTick 特效时间
     */
    export function playBattleEffect(atker, dwTargeter, nMagicId, dwActionTick) {
        // 攻击者坐标
        let atkPoint = atker.localToGlobal(new Laya.Point(atker.spr_ani.x, atker.spr_ani.y));
        // 受击者坐标
        let tarPoint = dwTargeter.localToGlobal(new Laya.Point(dwTargeter.spr_ani.x, dwTargeter.spr_ani.y));
        let ani = new Laya.Animation();
        ani.pos(atkPoint.x, atkPoint.y)
        PanelManage.effectLayer.addChild(ani);
        let aniPath = 'aniModel/PT_ANI.ani';
        if (nMagicId == 999) {
            aniPath = 'aniModel/PT_ANI.ani';
        }
        else {
            let skillConfigID = nMagicId * 100 + 1;
            let skillType = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLTYPE(skillConfigID);
            switch (skillType) {
                // 拳脚
                case 0:
                    aniPath = 'aniModel/QJ_ANI.ani';
                    break
                // 刀剑
                case 1:
                    aniPath = 'aniModel/DJ_ANI.ani';
                    break
                // 长枪
                case 2:
                    aniPath = 'aniModel/CQ_ANI.ani';
                    break
                // 奇门
                case 3:
                    aniPath = 'aniModel/QM_ANI.ani';
                    break
            }
        }
        // 动画字特效
        let skillConfigID = nMagicId * 100 + 1;
        // 技能名称
        let SKILL_EFFECTSID = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_EFFECTSID(skillConfigID);
        let skillLabel = new Laya.Image('image/common/skillName/' + SKILL_EFFECTSID + '.png');
        skillLabel.width = 100;
        skillLabel.height = 40;
        skillLabel.pos(this.width / 2, this.height / 2);
        skillLabel.anchorX = skillLabel.anchorY = 0.5;
        skillLabel.scaleX = skillLabel.scaleY = 0;
        skillLabel.pos(atkPoint.x, atkPoint.y);
        PanelManage.effectLayer.addChild(skillLabel);
        Laya.Tween.to(skillLabel, { scaleX: 1, scaleY: 1, y: skillLabel.y - 80 }, 700, null, Laya.Handler.create(this, () => {
            skillLabel.removeSelf();
        }));
        // 弹道旋转角度
        let tmp = (atkPoint.x - tarPoint.x) / (atkPoint.y - tarPoint.y);
        ani.once(Laya.UIEvent.COMPLETE, this, () => {
            ani.rotation = -Laya.Utils.toAngle(Math.atan(tmp));
            if ((atkPoint.y - tarPoint.y) < 0) {
                ani.rotation -= 180;
            }
            ani.loadAnimation(aniPath).play(0, false, 'ani2');
            // 飞行动画
            // 计算飞行动画时间
            let juLi = Math.sqrt(Math.pow(atkPoint.x - tarPoint.x, 2) + Math.pow(atkPoint.y - tarPoint.y, 2));
            // todo 怪物伤害无法同步
            Laya.Tween.to(ani, { x: tarPoint.x, y: tarPoint.y }, Math.max(dwActionTick + juLi - 900, 200), null, Laya.Handler.create(this, () => {
                ani.once(Laya.UIEvent.COMPLETE, this, () => {
                    ani.removeSelf();
                })
                ani.rotation = 0;
                ani.loadAnimation(aniPath).play(0, false, 'ani3');
            }));
        })
        ani.loadAnimation(aniPath).play(0, false, 'ani1');
    }



}