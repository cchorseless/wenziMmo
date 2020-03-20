/*
* 资源路径帮助类;
*/
module PathUtil{

    /**
     * 获取技能Icon路径
     * @param skillId 技能编号 如:400500
     */
    export function getSkillIconPath(skillId:string):string{
        let path = 'image/common/skill/skill_icon_' + skillId + '.png';
        return path;
    }
    /**
     * 获取技能Icon框路径
     */
    export function getSkillIconFramePath(id:string):string{
        let path = 'image/common/skill/skill_icon_' + id + '.png';
        return path;
    }
    /**
     * 获取五行icon路径
     */
    export function getWuXingIconPath(id:EnumData.emSkillWuXingProp):string{
        let path = 'image/common/skill/icon_wx_' + id + '.png';
        return path;
    }
}