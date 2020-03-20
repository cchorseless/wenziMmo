/**
* name 
*/
module GameConfigFunc {
	/**
	 * 获取该技能所有数据
	 * @param skillID 
	 */
	export function getAllData(skillID: number): any {
		let data = SheetConfig.mydb_magic_tbl.getInstance(null).data;
		let base;
		for (let i in data) {
			if (data[i][1] == skillID) {
				base = data[i]
				break;
			}
		}
		return base;
	}
	/**
	 * 同品级中阶数数
	 * @param skillID 技能编号
	 */
	export function getNumOfSkillID(skillID) {
		let data = SheetConfig.mydb_magic_tbl.getInstance(null).data;
		let num = 0;
		for (let i in data) {
			if (data[i][1] == skillID) {
				num++
			}
		}
		return num;
	}
	/**
	  *  根据门派名字获取门派ID
	  */
	export function GetIDByName(configName: string): number {
		let data = SheetConfig.BaseMenPaiSheet.getInstance(null).data;
		let id = -1;
		for (let i in data) {
			if (data[i][1] == configName) {
				id = parseInt(i);
			}
		}
		return id;
	}
	/**
	 * 全部数据  Introduction_play
	 */
	export function GETDATALIST(typeKey): any {
		let data = SheetConfig.Introduction_play.getInstance(null).data;
		let tempDate = [];
		for (let i in data) {
			if (data[i][1] == typeKey) {
				let base = data[i]
				tempDate.push(base)
			}
		}
		return tempDate;
	}
	/**
      *  通过地图id得到该地图的开始房间id
      */
	export function GETBEGINROOMIDBYMAPID(mapid = GameApp.MainPlayer.location.mapid): number {
		let data = SheetConfig.mapRoomSheet.getInstance(null).data;
		let roomid;
		for (let room in data) {
			if (data[room][2] == mapid) {
				if (!roomid) {
					roomid = room;
				} else if (room < roomid) {
					roomid = room;
				}
			}
		}
		return roomid;
	}
	/**
      *  显示文字
      */
	export function TYPE(configID, pro): string {
		let data = SheetConfig.Palace.getInstance(null).data;
		for (let i in data) {
			if (data[i][0] == configID) {
				if (data[i][1] == pro) {
					return data[i][2];
				}
			}
		}
	}
	/**
      * 全部数据
      */
	export function GETALLDATA(type: number): any {
		let data = SheetConfig.Ranking_List.getInstance(null).data;
		let allData = [];
		for (let single in data) {
			let baseData = data[single];
			if (type == baseData[0]) {
				allData.push(baseData);
			}
		}
		return allData;
	}
	/**
      * 根据名誉值获取对应名字
      */
	export function getNameByNum(num: number): string {
		let data = SheetConfig.reputation.getInstance(null).data;
		let str = '';
		for (let i in data) {
			let min = data[i][3];
			let max = data[i][4];
			if (num >= min && num < max) {
				str = data[i][2];
				return str;
			}
		}
	}
	/**
      * 根据分类和等级找到对应材料数据
      */
	export function GETDATABYTYPEANDLVL(type: number, lvl: number) {
		let data = SheetConfig.sifa_consume.getInstance(null).data;
		let final;
		let lvlArray = [];
		for (let index in data) {
			if (data[index][1] == lvl) {
				lvlArray.push(data[index]);
			}
		}
		for (let part of lvlArray) {
			if (part[2] == type) {
				final = part;
			}
		}
		return final;
	}
	export function SolartermsGETDATALIST(type: number): any {
		let data = SheetConfig.Solarterms.getInstance(null).data;
		let time = [];
		for (let i in data) {
			if (data[i][1] == type) {
				let info = data[i]
				time.push(info)
			}
		}
		return time;
	}
	/**
      * 全部玩法数据
      */
	export function StrategyGETDATALIST(type): any {

		let data = SheetConfig.Strategy.getInstance(null).data;
		let dataList = [];
		for (let single in data) {
			if (type == [single][1]) {
				dataList.push([single])
			}
		}
		return dataList;
	}
	/**
      * 获取等级装备合成数据    等级（1，1/2）   神装（2，）  热血
      */
	export function BLvEquipAlldata(configID: number, tab: number, lv: number) {
		let data = SheetConfig.Synthesis.getInstance(null).data;
		let baseData = [];
		for (let i in data) {
			if (lv) {
				if (data[i][0] == configID && data[i][1] == tab && data[i][2] == lv) {
					let base = data[i]
					baseData.push(base)
				}
			} else {
				if (data[i][0] == configID && data[i][1] == tab) {
					let base = data[i]
					baseData.push(base)
				}
			}

		}
		return baseData;
	}
	/**
      * 获取篇章扫荡信息
      */
	export function GetPZMsg(pzid) {
		let data = SheetConfig.Thread_sweep_tbl.getInstance(null).data;
		let baseData = [];
		for (let i in data) {
			if (data[i][1] == pzid) {
				baseData.push(data[i])
			}
		}
		return baseData;
	}
	/**
	  * 根据ID返回数据
	  */
	export function GETDATABYID(configID: string): any {
		let base = SheetConfig.zhuanban_Dress.getInstance(null).data[configID];
		return base;
	}
	
}