module SheetConfig{ export class  BaseMenPaiSheet { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): BaseMenPaiSheet { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  id门派ID
 */
 public ID(configID):string { return this.data[configID][0]}
/**
 *  门派名称
 */
 public NAME(configID):string { return this.data[configID][1]}
/**
 *  门派的ICON
 */
 public ICON(configID):string { return this.data[configID][2]}
/**
 *  门派简介
 */
 public INTRODUCTION(configID):string { return this.data[configID][3]}
/**
 *  0：不限1战士2法师3道士
 */
 public CAREER_NEEDS(configID):number { return this.data[configID][4]}
/**
 *  0：不限1男2女
 */
 public GENDER_NEEDS(configID):number { return this.data[configID][5]}
/**
 *  资质需求类型
 */
 public QUALIFICATION_TYPE(configID):number { return this.data[configID][6]}
/**
 *  门派资质需求
勋章-根骨2
龙魂-悟性1
血玉-身法4
神盾-臂力3
官印-善缘5
 */
 public QUALIFICATION_REQUIREMENT(configID):number { return this.data[configID][7]}
/**
 *  转生等级*1000+等级
 */
 public LEVEL_NEED(configID):number { return this.data[configID][8]}
/**
 *  入门条件描述
 */
 public CONDITIONAL_DESCRIPTION(configID):string { return this.data[configID][9]}
/**
 *  怪物表ID
 */
 public LITTLE_BROTHER(configID):number { return this.data[configID][10]}
/**
 *  怪物表ID
 */
 public OUR_LEADER(configID):number { return this.data[configID][11]}
/**
 *  怪物表ID
 */
 public MASTER(configID):number { return this.data[configID][12]}
/**
 *  技能表ID
 */
 public ELEMENTARY_MARTIAL(configID):number { return this.data[configID][13]}
/**
 *  技能表ID
 */
 public INTERMEDIATE_MARTIAL(configID):number { return this.data[configID][14]}
/**
 *  技能表ID
 */
 public ADVANCED_MARTIAL(configID):number { return this.data[configID][15]}
/**
 *  技能表ID
 */
 public GOD_CLASS_MARTIAL(configID):number { return this.data[configID][16]}
/**
 *  技能表ID
 */
 public INTERNAL_STRENGTH(configID):number { return this.data[configID][17]}
/**
 *  开放的轮次
 */
 public OPEN_ROUND(configID):number { return this.data[configID][18]}
}}