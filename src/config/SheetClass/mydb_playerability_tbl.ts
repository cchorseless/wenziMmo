module SheetConfig{ export class  mydb_playerability_tbl { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mydb_playerability_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  deleted
 */
 public DELETED(configID:string):number { return this.data[configID][0]}
/**
 *  升级所需经验
 */
 public NEED_EXPERIENCE(configID:string):number { return this.data[configID][1]}
/**
 *  战士HP
 */
 public WARRIORHP(configID:string):number { return this.data[configID][2]}
/**
 *  战士MP
 */
 public WARRIORMP(configID:string):number { return this.data[configID][3]}
/**
 *  法师HP
 */
 public MASTERHP(configID:string):number { return this.data[configID][4]}
/**
 *  法师MP
 */
 public MASTERMP(configID:string):number { return this.data[configID][5]}
/**
 *  道士HP
 */
 public TAOISTHP(configID:string):number { return this.data[configID][6]}
/**
 *  道士MP
 */
 public TAOISTMP(configID:string):number { return this.data[configID][7]}
/**
 *  战士minAC
 */
 public WARRIOR_MINAC(configID:string):number { return this.data[configID][8]}
/**
 *  战士maxAc
 */
 public WARRIOR_MAXAC(configID:string):number { return this.data[configID][9]}
/**
 *  法师minAC
 */
 public MASTER_MINAC(configID:string):number { return this.data[configID][10]}
/**
 *  法师maxAc
 */
 public MASTER_MAXAC(configID:string):number { return this.data[configID][11]}
/**
 *  道士minAC
 */
 public TAOIST_MINAC(configID:string):number { return this.data[configID][12]}
/**
 *  道士maxAc
 */
 public TAOIST_MAXAC(configID:string):number { return this.data[configID][13]}
/**
 *  战士minMac
 */
 public WARRIOR_MINMAC(configID:string):number { return this.data[configID][14]}
/**
 *  战士maxMac
 */
 public WARRIOR_MAXMAC(configID:string):number { return this.data[configID][15]}
/**
 *  法师minMac
 */
 public MASTER_MINMAC(configID:string):number { return this.data[configID][16]}
/**
 *  法师maxMac
 */
 public MASTER_MAXMAC(configID:string):number { return this.data[configID][17]}
/**
 *  道士minMac
 */
 public TAOIST_MINMAC(configID:string):number { return this.data[configID][18]}
/**
 *  道士maxMac
 */
 public TAOIST_MAXMAC(configID:string):number { return this.data[configID][19]}
/**
 *  战士minDc
 */
 public WARRIOR_MINDC(configID:string):number { return this.data[configID][20]}
/**
 *  战士maxDc
 */
 public WARRIOR_MAXDC(configID:string):number { return this.data[configID][21]}
/**
 *  法师minDc
 */
 public MASTER_MINDC(configID:string):number { return this.data[configID][22]}
/**
 *  法师maxDc
 */
 public MASTER_MAXDC(configID:string):number { return this.data[configID][23]}
/**
 *  道士minDc
 */
 public TAOIST_MINDC(configID:string):number { return this.data[configID][24]}
/**
 *  道士maxDc
 */
 public TAOIST_MAXDC(configID:string):number { return this.data[configID][25]}
/**
 *  战士minSC
 */
 public WARRIOR_MINSC(configID:string):number { return this.data[configID][26]}
/**
 *  战士maxSC
 */
 public WARRIOR_MAXSC(configID:string):number { return this.data[configID][27]}
/**
 *  法师minSC
 */
 public MASTER_MINSC(configID:string):number { return this.data[configID][28]}
/**
 *  法师maxSC
 */
 public MASTER_MAXSC(configID:string):number { return this.data[configID][29]}
/**
 *  道士minSC
 */
 public TAOIST_MINSC(configID:string):number { return this.data[configID][30]}
/**
 *  道士maxSC
 */
 public TAOIST_MAXSC(configID:string):number { return this.data[configID][31]}
/**
 *  战士minMc
 */
 public WARRIOR_MINMC(configID:string):number { return this.data[configID][32]}
/**
 *  战士maxMc
 */
 public WARRIOR_MAXMC(configID:string):number { return this.data[configID][33]}
/**
 *  法师minMc
 */
 public MASTER_MINMC(configID:string):number { return this.data[configID][34]}
/**
 *  法师maxMc
 */
 public MASTER_MAXMC(configID:string):number { return this.data[configID][35]}
/**
 *  道士minMc
 */
 public TAOIST_MINMC(configID:string):number { return this.data[configID][36]}
/**
 *  道士maxMc
 */
 public TAOIST_MAXMC(configID:string):number { return this.data[configID][37]}
/**
 *  战士hit
 */
 public WARRIORHIT(configID:string):number { return this.data[configID][38]}
/**
 *  法师hit
 */
 public MASTERHIT(configID:string):number { return this.data[configID][39]}
/**
 *  道士hit
 */
 public TAOISTHIT(configID:string):number { return this.data[configID][40]}
/**
 *  战士juck
 */
 public WARRIORJUCK(configID:string):number { return this.data[configID][41]}
/**
 *  法师juck
 */
 public MASTERJUCK(configID:string):number { return this.data[configID][42]}
/**
 *  道士juck
 */
 public TAOISTJUCK(configID:string):number { return this.data[configID][43]}
/**
 *  战士Crit
 */
 public WARRIORCRIT(configID:string):number { return this.data[configID][44]}
/**
 *  法师Crit
 */
 public MASTERCRIT(configID:string):number { return this.data[configID][45]}
/**
 *  道士Crit
 */
 public TAOISTCRIT(configID:string):number { return this.data[configID][46]}
/**
 *  战士AtkCrit
 */
 public WARRIORATKCRIT(configID:string):number { return this.data[configID][47]}
/**
 *  法师AtkCrit
 */
 public MASTERATKCRIT(configID:string):number { return this.data[configID][48]}
/**
 *  道士AtkCrit
 */
 public TAOISTATKCRIT(configID:string):number { return this.data[configID][49]}
}}