module SheetConfig{ export class  NPC_specialtalkInfoSheet { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): NPC_specialtalkInfoSheet { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  对白编号
 */
 public TALKID(configID):string { return this.data[configID][0]}
/**
 *  101辩论
102送礼
103治疗
104讲经
105偷窃
106索要
107下毒
108暗杀
109结拜
110表白
111求婚
112邀请入宅
113逐出宅院
114化解仇怨
 */
 public INTERACTIVE_TYPE(configID):string { return this.data[configID][1]}
/**
 *  1点击按钮
2交互成功的结果
3交互失败的结果
4接收不喜欢的礼物
 */
 public INTERACTIVE_STATE(configID):string { return this.data[configID][2]}
/**
 *  NPC的性格立场：
1守序
2中庸
3唯我
 */
 public ATTITUDE(configID):string { return this.data[configID][3]}
/**
 *  NPC动作和台词
 */
 public TALKINFO(configID):string { return this.data[configID][4]}
/**
 *  文案策划配表区分用
 */
 public HELPINFO(configID):string { return this.data[configID][5]}
}}