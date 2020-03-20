/*
* 资源路径帮助类;
*/
module PathUtil{

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
        let path = 'image/common/daoju/itemicon_bg' + id + '.png';
        return path;
    }
    /**
     * 获取道具品质框路径
     */
     export function getItemQualityFramePath(id:number):string{
        let path = 'image/common/daoju/quality_' + id + '.png'
        return path;
     }
}