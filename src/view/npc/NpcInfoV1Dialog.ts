/**Created by the LayaAirIDE*/
module view.npc {
	export class NpcInfoV1Dialog extends ui.npc.NpcInfoV1DialogUI {
		constructor() {
			super();
		}
		public item: GameObject.Npc;
		public setData(item: GameObject.Npc): NpcInfoV1Dialog {
			this.item = item;
			this.initUI();
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => { this.close() });
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_bottom.selectedIndex = 0;
				this.btn_return.visible = false;
			});
			// 送礼
			this.btn_songLi.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_bottom.selectedIndex = 2;
				this.btn_return.visible = true;
			});
			// 详细信息
			this.btn_info.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_bottom.selectedIndex = 1;
				this.btn_return.visible = true;
			});
			// 任务
			this.btn_task.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_bottom.selectedIndex = 3;
				this.btn_return.visible = true;


			});
			// 切磋
			this.btn_battle.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_bottom.selectedIndex = 4;
				this.btn_return.visible = true;
			});
			// 偷袭
			this.btn_touXi.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_bottom.selectedIndex = 5;
				this.btn_return.visible = true;
			});
			// 偷窃
			this.btn_touQie.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.Main.addNpcPregressItem(this.item);
				this.close();
			});
			// 对话
			this.btn_talk.on(Laya.UIEvent.CLICK, this, () => {
				// new view.npc.NpcInfoTalkDialog().popup();
				this.btn_return.visible = true;
			});

		}
		// 战力描述
		public battleDes = [
			'此人脚步虚浮，下盘不稳，眉眼间精气涣散，显是功力太浅，无法将丹田之气凝成一股，战斗力十分有限。',

			'此人根底不错，行走间虎虎生威，不见惧色，从体态举止中可以大致看出，应该拥有不错的实力。',

			'此人气质不俗，眼中偶有精光闪过，显然功力已臻至收放自如的地步，武功不容小觑。',

			'此人气息内敛，浑身意境流转，自成一体，难以寻觅破绽，武功恐怕已跻身一流高手行列。',

			'此人威势超凡，呼吸吐纳犹如腹鼓雷鸣，浑身精气充盈，浓郁得几近实质，必是江湖中首屈一指的绝顶高手。'

		]
		// 气血描述
		public hpDes = [
			'肤色健康，面色红润，看起来容光焕发，一呼一吸之间能看出其气血充盈，身体站的笔直，走起路来虎虎生风，声音洪亮有力。',
			'面色微白，站在那里看起来与常人无异，但是呼吸间略显急促，偶尔紧皱的眉头，能看出身体有恙。',
			'面色苍白，眉头紧皱，走路缓慢，呼吸十分急促，额头上有细小的汗珠顺着脸颊缓缓滑落。',
			'面色苍白，走起路来踉踉跄跄，好似随时都有可能跌倒一般，走了几步，就需要大口喘着粗气。',
			'已经没有站起来的力气，脸色憔悴，苍白的面庞因痛苦而扭曲，大滴的汗珠从额头上缓缓滴落。'
		]

		public initUI(): void {
			this.viw_bottom.selectedIndex = 0;
			this.btn_return.visible = (this.viw_bottom.selectedIndex > 0);
			this.tab_info.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_info.selectedIndex = index;
			}, null, false);
			// 配置表ID
			let configId = '' + this.item.feature.dwCretTypeId;
			let iconID = SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_NUMBER(configId)
			this.img_npcPic.skin = 'image/common/npc/npc_half_' + iconID + '.png';
			this.lbl_npcDes0.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_DES1(configId);
			this.lbl_npcDes1.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_DES2(configId);
			let nickName = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_NICKNAME(configId);
			let commonName = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(configId);
			this.lbl_npcName.text = commonName.split('_')[0];
			if (nickName != '0') { this.lbl_nickname.text = '(' + nickName + ')'; }
			// 喜好
			let xiHaoItem = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_LOVE(configId);
			for (let _itemId of xiHaoItem) {
				if (_itemId) {
					let _itembase = new ProtoCmd.ItemBase();
					_itembase.dwBaseID = _itemId;
					let itemUI = new view.compart.DaoJuWithNameItem();
					itemUI.setData(_itembase);
					this.hbox_xiHao.addChild(itemUI);
				}

			}
			// 装备
			let equipItem = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_EQUIP(configId);
			for (let _itemId of equipItem) {
						if (_itemId) {
				let itemUI = new view.compart.DaoJuWithNameItem();
				let _itembase = new ProtoCmd.ItemBase();
				_itembase.dwBaseID = _itemId;
				itemUI.setData(_itembase);
				this.hbox_equip.addChild(itemUI);
			}}
			// 宝物
			let BAOWUItem = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_BAOWU(configId);
			for (let _itemId of BAOWUItem) {
						if (_itemId) {
				let itemUI = new view.compart.DaoJuWithNameItem();
				let _itembase = new ProtoCmd.ItemBase();
				_itembase.dwBaseID = _itemId;
				itemUI.setData(_itembase);
				this.hbox_baoWu.addChild(itemUI);
			}}
			// 战斗能力
			this.lbl_npcDes2.text = this.battleDes[0]
			// 气血状态
			let ability = this.item.ability;
			this.img_hp.width = this.img_hpBg.width * ability.nowHP / ability.nMaxHP;
			this.lbl_hpCount.text = '' + ability.nowHP + '/' + ability.nMaxHP;
			this.lbl_npcDes3.text = this.hpDes[0];
			// 任务信息
			let Keys = Object.keys(GameApp.GameEngine.taskInfo);
			for (let key of Keys) {
				let taskGroup = GameApp.GameEngine.taskInfo[key];
				let keys2 = Object.keys(taskGroup);
				for (let key2 of keys2) {
					let taskInfo: ProtoCmd.stQuestInfoBase = taskGroup[key2];
					if (taskInfo.endnpcid == this.item.feature.dwCretTypeId) {
						let taskTitle_ui = new view.task.Task_TitleItem();
						taskTitle_ui.setData(taskInfo, this.item);
						this.vbox_task.addChild(taskTitle_ui);
					}

				}
			}
			this.btn_task.visible = (this.vbox_task.numChildren > 0);
			if (this.btn_task.visible) {
				GameUtil.addEffectButton(this.btn_task);
			}
		}
	}
}