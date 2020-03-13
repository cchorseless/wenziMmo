module SheetConfig{ export class  reputation { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): reputation { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  名誉值ID
 */
 public REPUTATION_ID(configID):string { return this.data[configID][0]}
/**
 *  程序判定用
 */
 public REPUTATION_LV(configID):number { return this.data[configID][1]}
/**
 *  显示的名誉等级
 */
 public REPUTATION_LVINFO(configID):string { return this.data[configID][2]}
/**
 *  当前名誉等级的下限值
 */
 public REPUTATION_LV_MIN(configID):number { return this.data[configID][3]}
/**
 *  当前名誉等级的上限值
 */
 public REPUTATION_LV_MAX(configID):number { return this.data[configID][4]}
/**
 *  当前可加入的门派
 */
 public ACCESSTOMENPAI(configID):any { return this.data[configID][5]}
 /**
  * 根据名誉值获取对应名字
  */
  public getNameByNum(num:number):string{
      let str = '';
      for(let i in this.data){
          let min = this.data[i][3];
          let max = this.data[i][4];
          if(num >= min &&num<max){
              str = this.data[i][2];
              return str;
          }
      }
    //   return str;
  }
}}