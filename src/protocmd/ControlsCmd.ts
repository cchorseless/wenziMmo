module ProtoCmd {
//     	export class stUserSettingsEndecoder extends Packet
// 	{
// 	public	static   msgID:number = 0x02AA;
// 	public	static   settinginfo:stUserSettingsEndecoder = new stUserSettingsEndecoder(null);
// 		public  pickitemchange:Boolean = true;
// 		public  selectChange:Boolean = true;
// 	public	static   boReceived:Boolean = false;
// 		public static  MpDrugs:HashMap = new HashMap;
// 		public static  HpDrugs:HashMap = new HashMap;
// 		public static  scrolls:HashMap = new HashMap;
// 		private  _isAutoCiSha:Boolean = false;
// 		private  _isAutoBanYue:Boolean = false;
// 		private  _isAutoLieHuo:Boolean = false;
// 		private  _isAutoKaiTian:Boolean = false;
// 		private  _isAutoMoFaDun:Boolean = false;
// 		private  _isAutoHuoQiang:Boolean = false;
// 		private  _isAutoBpx:Boolean = false;
// 		private  _isAutoLxhy:Boolean = false;
// 		private  _isAutoShiDu:Boolean = false;
// 		private  _isAutoShenShou:Boolean = false;
// 		private  _isAutoYueLing:Boolean = false;
// 		private  _isBlockDress:Boolean = false;
		
// 		public constructor(data: Laya.Byte) {
// 			super();
// 			this.addProperty('boNewHuman',TYPE_BOOL);
// 			this.addProperty('nSize',TYPE_INT);
// 			this.addProperty('boBGMusic',TYPE_BOOL);
// 			this.addProperty('boEfMusic',TYPE_BOOL);
			
// 			this.addProperty('boKeepReturnHp',TYPE_BOOL);
// 			this.addProperty('nHpReturnValue',TYPE_BYTE);
// 			this.addProperty('nHpReturnID',TYPE_INT);
			
// 			this.addProperty('boKeepHp',TYPE_BOOL);
// 			this.addProperty('nHpValue',TYPE_BYTE);
// 			this.addProperty('nHPDrugid',TYPE_INT);
			
// 			this.addProperty('boKeepMp',TYPE_BOOL);
// 			this.addProperty('nMpValue',TYPE_BYTE);
// 			this.addProperty('nMPDrugid',TYPE_INT);
// 			//技能-战士
// 			this.addProperty("auto"+SkillUtils.SKILL_CISHA,TYPE_BOOL);
// 			this.addProperty("auto" + SkillUtils.SKILL_BANYUE,TYPE_BOOL);
// 			this.addProperty("auto"+SkillUtils.SKILL_LIEHUO,TYPE_BOOL);
// 			this.addProperty("auto" + SkillUtils.SKILL_KAITIAN,TYPE_BOOL);
			
// 			//技能-法师
// 			this.addProperty("auto"+SkillUtils.SKILL_MOFADUN,TYPE_BOOL);
// 			this.addProperty("auto" + SkillUtils.SKILL_HUOQIANG,TYPE_BOOL);
// 			this.addProperty("auto" + SkillUtils.SKILL_BPX,TYPE_BOOL);
// 			this.addProperty("auto" + SkillUtils.SKILL_LXHY,TYPE_BOOL);
			
// 			//技能-道士
// 			this.addProperty("auto" + SkillUtils.SKILL_SHIDU,TYPE_BOOL);
// 			this.addProperty("auto" + SkillUtils.SKILL_SHENSHOU,TYPE_BOOL);
// 			this.addProperty("auto" + SkillUtils.SKILL_YUELING,TYPE_BOOL);
		
// 			//自动合击技能
// 			this.addProperty("autoCoSkill",TYPE_BOOL);
			
// 			this.addProperty('boPickItemLv',TYPE_BOOL);//拾取装备等级开关
// 			this.addProperty('nPickItemLv',TYPE_INT);//拾取装备等级
			
			
// 			this.addProperty('boPickItemDrug',TYPE_BOOL);//拾取药品
// 			this.addProperty('boPickItemOther',TYPE_BOOL);//拾取其他物品
// 			this.addProperty('boPickItemGold',TYPE_BOOL);//拾取金币
			
// 			this.addProperty('boBlock1',TYPE_BOOL);//屏蔽其他玩家
// 			this.addProperty('boBlock2',TYPE_BOOL);//屏蔽公会玩家
// 			this.addProperty('boBlock3',TYPE_BOOL);//屏蔽i玩家称号
// 			this.addProperty('boBlock4',TYPE_BOOL);//屏蔽召唤物
// 			this.addProperty('boBlock5',TYPE_BOOL);//屏蔽普通怪物
// 			this.addProperty('boBlock6',TYPE_BOOL);//屏蔽组队邀请
// 			this.addProperty('boBlock7',TYPE_BOOL);//屏蔽好友邀请
// 			this.addProperty('boFps',TYPE_BOOL);//性能设置
// 			this.addProperty('boBlock8',TYPE_BOOL);//屏蔽翅膀
// 			this.addProperty('blockDress',TYPE_BOOL);//屏蔽衣服
			
// 			this.addProperty('boAutoWroldspeak',TYPE_BOOL);//自动播放世界语音
// 			this.addProperty('boAutoGuildspeak',TYPE_BOOL);//自动播放行会语音
// 			this.addProperty('boAutoTeamspeak',TYPE_BOOL);//自动播放组队语音
// 			this.addProperty('boAutoNearspeak',TYPE_BOOL);//自动播放附近语音
// 			this.addProperty("boAutoBuyHMp",TYPE_BOOL);//自动购买蓝药
// 			this.addProperty("boAutoBuyScroll",TYPE_BOOL);//自动购买魔药
// 			this.addProperty("boBlockCoAttk",TYPE_BOOL);//屏蔽合击震屏
			
// 			this.addProperty("boStrongMainTask",TYPE_BOOL);//变强主线
// 			this.addProperty("boStrongFMG",TYPE_BOOL);//变强封魔谷
// 			this.addProperty("boStrongGX",TYPE_BOOL);//变强功勋
// 			this.addProperty("boStrongWW",TYPE_BOOL);//变强威望
// 			this.addProperty("boStrongGJ",TYPE_BOOL);//变强挂机
// 			this.addProperty("boStrongBoss",TYPE_BOOL);//变强BOSS
// 			this.addProperty("boStrongMYSD",TYPE_BOOL);//变强玛雅神殿
// 			this.addProperty("boStrongBossHome",TYPE_BOOL);//变强BOSS之家
// 			this.addProperty("boStrongLZBZ",TYPE_BOOL);//变强龙族宝藏
// 			this.addProperty("boStrongBW",TYPE_BOOL);//变强宝物
// 			this.addProperty("boStrongDZ",TYPE_BOOL);//变强锻造
// 			this.addProperty("boStrongXZ",TYPE_BOOL);//变强勋章
// 			this.addProperty("boStrongZS",TYPE_BOOL);//变强转生
// 			this.addProperty("boStrongQF",TYPE_BOOL);//变强祈福
// 			this.addProperty("boStrongJZ",TYPE_BOOL);//变强金砖
// 			this.addProperty("boStrongJBFB",TYPE_BOOL);//变强金币副本 
// 			this.addProperty("boBlockOtherHarm",TYPE_BOOL);//屏蔽他人伤害显示
// 			this.addProperty("exploitLeadTime",TYPE_BYTE);//功勋任务引导次数
// 			this.addProperty("boStrongMBCZ",TYPE_BOOL);
// 			this.addProperty("showIncomeMsg",TYPE_BOOL);//
// 			this.addProperty("hasSend2Svr",TYPE_BOOL);//确保向后端发送成功
// 			read(data);
// 			cmd = value;
// 		}
		
// 		private  _isHideIncome:Boolean=true;
// 		public  get isHideIncomeMsg():Boolean{
// 			return _isHideIncome;
// 		}
		
// 		public  set isHideIncomeMsg(value:Boolean):void{
// 			SetValue("showIncomeMsg",value);
// 			_isHideIncome = value;
// 		}
		
// 		public  set exploitLeadTime(value:int):void{
// 			SetValue("exploitLeadTime",value);
// 		}
		
// 		public  get exploitLeadTime():int{
// 			return GetValue("exploitLeadTime");
// 		}
		
		
// 		public  get blockOtherHarm():Boolean{
// 			return GetValue("boBlockOtherHarm");
// 		}
		
// 		public  set blockOtherHarm(value:Boolean):void{
// 			SetValue("boBlockOtherHarm",value);
// 		}
		
// 		public  get blockEarthQuake():Boolean{
// 			return GetValue("boBlockCoAttk");
// 		}
		
// 		public  set blockEarthQuake(value:Boolean):void{
// 			SetValue("boBlockCoAttk",value);
// 		}
		
// 		public  set autoCoAttack(value:Boolean):void{
// 			SetValue("autoCoSkill",value);
// 		}
		
// 		public  get autoCoAttack():Boolean{
// 			return GetValue("autoCoSkill");
// 		}
		
// 		public  set autoBuyHMpDrug(value:Boolean):void
// 		{
// 			SetValue("boAutoBuyHMp",value);
// 		}
		
// 		public  get autoBuyHMpDrug():Boolean{
// 			return GetValue("boAutoBuyHMp");
// 		}
		
// 		public  get autoBuyScroll():Boolean{
// 			return GetValue("boAutoBuyScroll");
// 		}
		
// 		public  set autoBuyScroll(value:Boolean):void{
// 			SetValue("boAutoBuyScroll",value);
// 		}
		
// 		 public  read(data:Laya.Byte):number{
// 			var nNow_Size:number = this.getValue('_size');
// 			super.read(data);
// 			//技能-战士
// 			_isAutoCiSha = GetValue("auto" + SkillUtils.SKILL_CISHA);
// 			_isAutoBanYue = GetValue("auto" + SkillUtils.SKILL_BANYUE);
// 			_isAutoLieHuo = GetValue("auto" + SkillUtils.SKILL_LIEHUO);
// 			_isAutoKaiTian = GetValue("auto" + SkillUtils.SKILL_KAITIAN);
			
// 			//技能-法师
// 			_isAutoMoFaDun = GetValue("auto" + SkillUtils.SKILL_MOFADUN);
// 			_isAutoHuoQiang = GetValue("auto" + SkillUtils.SKILL_HUOQIANG);
// 			_isAutoBpx = GetValue("auto" + SkillUtils.SKILL_BPX);
// 			_isAutoLxhy = GetValue("auto" + SkillUtils.SKILL_LXHY);
// 			//技能-道士
// 			_isAutoShiDu = GetValue("auto" + SkillUtils.SKILL_SHIDU);
// 			_isAutoShenShou = GetValue("auto" + SkillUtils.SKILL_SHENSHOU);
// 			_isAutoYueLing = GetValue("auto" + SkillUtils.SKILL_YUELING);
// 			_isHideIncome = GetValue("showIncomeMsg");
// 			_isBlockDress = GetValue("blockDress");
// 			SetValue('_size',nNow_Size);
// 			var nOldSize:int =  GetValue('nSize');
// 			SetValue('nSize', GetValue('_size') - 7);
// 			var nNewSize:int = GetValue('nSize');
// 			if(data){
// 				if(nOldSize < nNewSize)
// 				{
// 					m_bytes.position = nOldSize+13;
// 					for(var n:int=0;n<nNewSize-nOldSize;n++)
// 					{
// 						m_bytes.writeByte(0);
// 					}
// 				}
// 				return m_bytes.position;
// 			}
// 			return 0;
// 		}
		
// 		public  get boBGMusic():Boolean{
// 			return GetValue('boBGMusic');
// 		}
// 		public  set boBGMusic(value:Boolean):void{
			
// 			var boOldBG:Boolean = GetValue('boBGMusic');
// 			SetValue('boBGMusic',value);	
// 		}
// 		public  get boEfMusic():Boolean{
// 			return GetValue('boEfMusic');
// 		}
// 		public  set boEfMusic(value:Boolean):void{
// 			SetValue('boEfMusic',value);
// 		}
		
// 		public  get boKeepHp():Boolean{
// 			return GetValue('boKeepHp');
// 		}
// 		public  set boKeepHp(value:Boolean):void{
// 			SetValue('boKeepHp',value);
// 		}
		
// 		public  get boKeepMp():Boolean{
// 			return GetValue('boKeepMp');
// 		}
// 		public  set boKeepMp(value:Boolean):void{
// 			SetValue('boKeepMp',value);
// 		}
		
// 		public  get nHpValue():int{
// 			return GetValue('nHpValue');
// 		}
// 		public  set nHpValue(value:int):void{
// 			SetValue('nHpValue',value);
// 		}
		
// 		public  get HPDrugid():int{
// 			return GetValue('nHPDrugid');
// 		}
// 		public  set HPDrugid(value:int):void{
// 			SetValue('nHPDrugid',value);
// 		}
		
// 		public  get nMpValue():int{
// 			return GetValue('nMpValue');
// 		}
		
// 		public  set nMpValue(value:int):void{
// 			SetValue('nMpValue',value);
// 		}
		
// 		public  get MPDrugid():int{
// 			return GetValue('nMPDrugid');
// 		}
// 		public  set MPDrugid(value:int):void{
// 			SetValue('nMPDrugid',value);
// 		}
		
// 		public  get boKeepReturnHp():Boolean{
// 			return GetValue('boKeepReturnHp');
// 		}
// 		public  set boKeepReturnHp(value:Boolean):void{
// 			SetValue('boKeepReturnHp',value);
// 		}
		
// 		public  get HpReturnValue():int{
// 			return GetValue('nHpReturnValue');
// 		}
// 		public  set HpReturnValue(value:int):void{
// 			SetValue('nHpReturnValue',value);
// 		}
		
// 		public  get nHpReturnID():int{
// 			return GetValue('nHpReturnID');
// 		}
// 		public  set nHpReturnID(value:int):void{
// 			SetValue('nHpReturnID',value);
// 		}
		
// 		public  get nPickItemLvl():int{
// 			return GetValue('nPickItemLv');
// 		}
// 		public  set nPickItemLvl(value:int):void{
// 			if(!pickitemchange) pickitemchange = (value!=nPickItemLvl);
// 			SetValue('nPickItemLv',value);
// 		}
		
// 		public  get boPickItemLv():Boolean{
// 			return GetValue('boPickItemLv');
// 		}
// 		public  set boPickItemLv(value:Boolean):void{
// 			if(!pickitemchange) pickitemchange = (value!=boPickItemLv);
// 			SetValue('boPickItemLv',value);
// 		}
		
// 		public  get boPickItemDrug():Boolean{
// 			return GetValue('boPickItemDrug');
// 		}
// 		public  set boPickItemDrug(value:Boolean):void{
// 			SetValue('boPickItemDrug',value);
// 		}
		
// 		public  get boPickItemOther():Boolean{
// 			return GetValue('boPickItemOther');
// 		}
// 		public  set boPickItemOther(value:Boolean):void{
// 			SetValue('boPickItemOther',value);
// 		}
		
// 		public  get boPickItemGold():Boolean{
// 			return GetValue('boPickItemGold');
// 		}
// 		public  set boPickItemGold(value:Boolean):void{
// 			SetValue('boPickItemGold',value);
// 		}
		
// 		public  get boBlockOtherplayer():Boolean{
// 			return GetValue('boBlock1');
// 		}
// 		public  set boBlockOtherplayer(value:Boolean):void{
// 			SetValue('boBlock1',value);
// 		}
		
// 		public  get boBlockguildplayer():Boolean{
// 			return GetValue('boBlock2');
// 		}
// 		public  set boBlockguildplayer(value:Boolean):void{
// 			SetValue('boBlock2',value);
// 		}
		
// 		public  get boBlockplayerTitle():Boolean{
// 			return GetValue('boBlock3');
// 		}
// 		public  set boBlockplayerTitle(value:Boolean):void{
// 			SetValue('boBlock3',value);
// 		}
		
// 		public  get boBlockHero():Boolean{
// 			return GetValue('boBlock4');
// 		}
// 		public  set boBlockHero(value:Boolean):void{
// 			SetValue('boBlock4',value);
// 		}
		
// 		public  get boBlockMonster():Boolean{
// 			return GetValue('boBlock5');
// 		}
// 		public  set boBlockMonster(value:Boolean):void{
// 			SetValue('boBlock5',value);
// 		}
		
// 		public  get boBlockTeaminvited():Boolean{
// 			return GetValue('boBlock6');
// 		}
// 		public  set boBlockTeaminvited(value:Boolean):void{
// 			SetValue('boBlock6',value);
// 		}
		
// 		public  get boBlockFriendinvitation():Boolean{
// 			return GetValue('boBlock7');
// 		}
// 		public  set boBlockFriendinvitation(value:Boolean):void{
// 			SetValue('boBlock7',value);
// 		}
		
// 		public  get boFps():Boolean{
// 			return GetValue('boFps');
// 		}
// 		public  set boFps(value:Boolean):void{
// 			SetValue('boFps',value);
// 		}
		
// 		public  get boCloseWing():Boolean{
// 			return GetValue('boBlock8');
// 		}
// 		public  set boCloseWing(value:Boolean):void{
// 			SetValue('boBlock8',value);
// 		}
		
// 		public  get boCloseDress():Boolean{
// 			return _isBlockDress;
// 		}
// 		public  set boCloseDress(value:Boolean):void{
// 			_isBlockDress = value;
// 			SetValue('blockDress',value);
// 		}
		
// 		public  get boAutoWroldspeak():Boolean{
// 			return GetValue('boAutoWroldspeak');
// 		}
// 		public  set boAutoWroldspeak(value:Boolean):void{
// 			SetValue('boAutoWroldspeak',value);
// 		}
		
// 		public  get boAutoGuildspeak():Boolean{
// 			return GetValue('boAutoGuildspeak');
// 		}
// 		public  set boAutoGuildspeak(value:Boolean):void{
// 			SetValue('boAutoGuildspeak',value);
// 		}
		
// 		public  get boAutoTeamspeak():Boolean{
// 			return GetValue('boAutoTeamspeak');
// 		}
// 		public  set boAutoTeamspeak(value:Boolean):void{
// 			SetValue('boAutoTeamspeak',value);
// 		}
		
// 		public  get boAutoNearspeak():Boolean{
// 			return GetValue('boAutoNearspeak');
// 		}
// 		public  set boAutoNearspeak(value:Boolean):void{
// 			SetValue('boAutoNearspeak',value);
// 		}
// 		public  get boStrongMBCZ():Boolean{
// 			return GetValue('boStrongMBCZ');
// 		}
// 		public  set boStrongMBCZ(value:Boolean):void{
// 			SetValue('boStrongMBCZ',value);
// 		}
		
// 		/**是否自动释放X技能*/
// 		public  isAutoSkill(id:int):Boolean{
// 			if(id == SkillUtils.SKILL_HUOQIANG){//兼顾测试服玩家
// 				return false;
// 			}
// 			switch(id)
// 			{
// 				case SkillUtils.SKILL_CISHA:
// 				{
// 					return _isAutoCiSha;
// 				}
// 				case SkillUtils.SKILL_BANYUE:
// 				{
// 					return _isAutoBanYue;
// 				}
// 				case SkillUtils.SKILL_LIEHUO:
// 				{
// 					return _isAutoLieHuo;
// 				}
// 				case SkillUtils.SKILL_KAITIAN:
// 				{
// 					return _isAutoKaiTian;
// 				}
// 				case SkillUtils.SKILL_MOFADUN:
// 				{
// 					return _isAutoMoFaDun;
// 				}
// 				case SkillUtils.SKILL_HUOQIANG:
// 				{
// 					return _isAutoHuoQiang;
// 				}
// 				case SkillUtils.SKILL_BPX:
// 				{
// 					return _isAutoBpx;
// 				}
// 				case SkillUtils.SKILL_LXHY:
// 				{
// 					return _isAutoLxhy;
// 				}
// 				case SkillUtils.SKILL_SHIDU:
// 				{
// 					return _isAutoShiDu;
// 				}
// 				case SkillUtils.SKILL_SHENSHOU:
// 				{
// 					return _isAutoShenShou;
// 				}
// 				case SkillUtils.SKILL_YUELING:
// 				{
// 					return _isAutoYueLing;
// 				}
// 				default:
// 				{
// 					return false;
// 				}
// 			}
// 		}
		
// 		/**设置技能是否自动释放*/
// 		public  setAuoSkill(id:int,value:Boolean):void{
// 			switch(id)
// 			{
// 				case SkillUtils.SKILL_CISHA:
// 				{
// 					_isAutoCiSha = value;
// 					break;
// 				}
// 				case SkillUtils.SKILL_BANYUE:
// 				{
// 					_isAutoBanYue = value;
// 					break;
// 				}
// 				case SkillUtils.SKILL_LIEHUO:
// 				{
// 					_isAutoLieHuo = value;
// 					break;
// 				}
// 				case SkillUtils.SKILL_KAITIAN:
// 				{
// 					_isAutoKaiTian = value;
// 					break;
// 				}
// 				case SkillUtils.SKILL_MOFADUN:
// 				{
// 					_isAutoMoFaDun = value;
// 					break;
// 				}
// 				case SkillUtils.SKILL_HUOQIANG:
// 				{
// 					_isAutoHuoQiang = value;
// 					break;
// 				}
// 				case SkillUtils.SKILL_BPX:
// 				{
// 					_isAutoBpx = value;
// 					break;
// 				}
// 				case SkillUtils.SKILL_LXHY:
// 				{
// 					_isAutoLxhy = value;
// 					break;
// 				}
// 				case SkillUtils.SKILL_SHIDU:
// 				{
// 					_isAutoShiDu = value;
// 					break;
// 				}
// 				case SkillUtils.SKILL_SHENSHOU:
// 				{
// 					_isAutoShenShou = value;
// 					break;
// 				}
// 				case SkillUtils.SKILL_YUELING:
// 				{
// 					_isAutoYueLing = value;
// 					break;
// 				}
// 				default:
// 				{
// 					return;
// 				}
// 			}
// 			SetValue("auto"+id,value);
// 		}
		
// 		public  get boStrongMainTask():Boolean{
// 			return GetValue('boStrongMainTask');
// 		}
// 		public  set boStrongMainTask(value:Boolean):void{
// 			SetValue('boStrongMainTask',value);
// 		}
		
		
// 		public  get boStrongFMG():Boolean{
// 			return GetValue('boStrongFMG');
// 		}
// 		public  set boStrongFMG(value:Boolean):void{
// 			SetValue('boStrongFMG',value);
// 		}
		
		
// 		public  get boStrongGX():Boolean{
// 			return GetValue('boStrongGX');
// 		}
// 		public  set boStrongGX(value:Boolean):void{
// 			SetValue('boStrongGX',value);
// 		}
		
// 		public  get boStrongWW():Boolean{
// 			return GetValue('boStrongWW');
// 		}
// 		public  set boStrongWW(value:Boolean):void{
// 			SetValue('boStrongWW',value);
// 		}
		
		
// 		public  get boStrongGJ():Boolean{
// 			return GetValue('boStrongGJ');
// 		}
// 		public  set boStrongGJ(value:Boolean):void{
// 			SetValue('boStrongGJ',value);
// 		}
		
// 		public  get boStrongBoss():Boolean{
// 			return GetValue('boStrongBoss');
// 		}
// 		public  set boStrongBoss(value:Boolean):void{
// 			SetValue('boStrongBoss',value);
// 		}
		
// 		public  get boStrongMYSD():Boolean{
// 			return GetValue('boStrongMYSD');
// 		}
// 		public  set boStrongMYSD(value:Boolean):void{
// 			SetValue('boStrongMYSD',value);
// 		}
		
// 		public  get boStrongBossHome():Boolean{
// 			return GetValue('boStrongBossHome');
// 		}
// 		public  set boStrongBossHome(value:Boolean):void{
// 			SetValue('boStrongBossHome',value);
// 		}
		
// 		public  get boStrongLZBZ():Boolean{
// 			return GetValue('boStrongLZBZ');
// 		}
// 		public  set boStrongLZBZ(value:Boolean):void{
// 			SetValue('boStrongLZBZ',value);
// 		}
		
// 		public  get boStrongBW():Boolean{
// 			return GetValue('boStrongBW');
// 		}
// 		public  set boStrongBW(value:Boolean):void{
// 			SetValue('boStrongBW',value);
// 		}
		
		
// 		public  get boStrongDZ():Boolean{
// 			return GetValue('boStrongDZ');
// 		}
// 		public  set boStrongDZ(value:Boolean):void{
// 			SetValue('boStrongDZ',value);
// 		}
		
// 		public  get boStrongXZ():Boolean{
// 			return GetValue('boStrongXZ');
// 		}
// 		public  set boStrongXZ(value:Boolean):void{
// 			SetValue('boStrongXZ',value);
// 		}
		
// 		public  get boStrongZS():Boolean{
// 			return GetValue('boStrongZS');
// 		}
// 		public  set boStrongZS(value:Boolean):void{
// 			SetValue('boStrongZS',value);
// 		}
		
// 		public  get boStrongQF():Boolean{
// 			return GetValue('boStrongQF');
// 		}
// 		public  set boStrongQF(value:Boolean):void{
// 			SetValue('boStrongQF',value);
// 		}
		
// 		public  get boStrongJZ():Boolean{
// 			return GetValue('boStrongJZ');
// 		}
// 		public  set boStrongJZ(value:Boolean):void{
// 			SetValue('boStrongJZ',value);
// 		}
		
// 		public  get boStrongJBFB():Boolean{
// 			return GetValue('boStrongJBFB');
// 		}
// 		public  set boStrongJBFB(value:Boolean):void{
// 			SetValue('boStrongJBFB',value);
// 		}
// 		 public  send():void{
// 			if(boReceived){
// 				super.send();
// 				MpDrugs.clear();
// 				HpDrugs.clear();
// 				scrolls.clear();
// 				if(settinginfo.autoBuyHMpDrug){
// 					var arr:Array = bag.getItemsByBaseId(settinginfo.HPDrugid-1);
// 					for each(var st:stItem in  arr){
// 						HpDrugs.put(st.getItemId(),st);
// 					}
// 					arr = bag.getItemsByBaseId(settinginfo.HPDrugid);
// 					for each(st in arr){
// 						HpDrugs.put(st.getItemId(),st);
// 					}
// 					arr.length = 0;
// 					arr = bag.getItemsByBaseId(settinginfo.MPDrugid-1);
// 					for each(st in arr){
// 						MpDrugs.put(st.getItemId(),st);
// 					}
// 					arr = bag.getItemsByBaseId(settinginfo.MPDrugid);
// 					for each(st in arr){
// 						MpDrugs.put(st.getItemId(),st);
// 					}
// 					arr.length = 0;
// 				}
// 				if(settinginfo.autoBuyScroll){
// 					arr = bag.getItemsByBaseId(settinginfo.nHpReturnID+1);
// 					for each(st in arr){
// 						scrolls.put(st.getItemId(),st);
// 					}
// 					arr.length = 0;
// 					arr = bag.getItemsByBaseId(settinginfo.nHpReturnID);
// 					for each(st in arr){
// 						scrolls.put(st.getItemId(),st);
// 					}
// 					arr.length = 0;
// 				}
// 			}else{
// //				trace("收到包之前,不保存当前状态")
// 			}
// 		}
		
// 		public static  removeItem(st:stItem):number{
// 			MpDrugs.remove(st.getItemId());
// 			HpDrugs.remove(st.getItemId());
// 			scrolls.remove(st.getItemId());
// 		}
// 	}
}