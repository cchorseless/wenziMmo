/*
* 资源路径帮助类;
*/
module PathUtil{

    /**资源副本icon路径 */
    export const ResFubenIcon = [null,'image/fuben/img_fb_01.png','image/fuben/img_fb_02.png','image/fuben/img_fb_03.png','image/fuben/img_fb_04.png'];
    /**资源副本品质背景 */
    export const ResFubenDifficultyBg = [null,'image/fuben/img_ziyuan1.png','image/fuben/img_ziyuan2.png','image/fuben/img_ziyuan3.png','image/fuben/img_ziyuan4.png','image/fuben/img_ziyuan5.png'];
    /**资源副本品质名字背景 */
    export const ResFubenDifficultyNameBg = [null,'image/fuben/img_ziyuanbg1.png','image/fuben/img_ziyuanbg2.png','image/fuben/img_ziyuanbg3.png','image/fuben/img_ziyuanbg4.png','image/fuben/img_ziyuanbg5.png'];
    /**资源副本难度名字颜色 */
    export const ResFubenDifficultyNameColor = ['#ffffff','#757575','#547554','#547275','#655475','#b2462d'];
    /**资源副本难度名字 */
    export const ResFubenDifficultyName = [null,'普通','困难','精英','史诗','噩梦'];

    /**
     * 获取技能Icon路径
     * @param skillId 技能编号 如:400500
     */
    export function getSkillIconPath(skillId:number|string):string{
        let path = 'image/common/skill/skill_icon_' + skillId + '.png';
        return path;
    }
    /**
     * 获取技能Icon的框路径
     */
    export function getSkillIconFramePath(quality:number):string{
        let path = 'image/common/fight/frame_jineng_' + quality + '.png';
        return path;
    }
    /**
     * 获取五行icon路径
     */
    export function getWuXingIconPath(wuxing:EnumData.emSkillWuXingProp):string{
        let path = 'image/common/skill/icon_wx_' + wuxing + '.png';
        return path;
    }
    /**
     * 获取iconbuff路径
     */
    export function getIconBuffPath(id:number):string {
        let path = 'image/common/iconbuff/buff_'+ id +'.png';
        return path;
    }
    /**
     * 获取道具icon路径
     */
    export function getItemIconPath(id:number):string{
        let path = 'image/common/daoju/itemicon_' + id + '.png';
        return path;
    }
    /**
     * 获取道具icon背景路径
     */
    export function getItemIconBgPath(id:number):string{
        let path = 'image/common/daoju/itemicon_bg_' + id + '.png';
        return path;
    }
    /**
     * 获取道具品质框路径
     */
     export function getItemQualityFramePath(id:number):string{
        let path = 'image/common/daoju/quality_' + id + '.png';
        return path;
     }

     /**获取NPC Icon路径 */
     export function getNpcIconPath(id:number):string{
        let path = 'image/common/npc/npc_icon_' + id + '.png';
        return path;
     }
}