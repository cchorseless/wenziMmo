
/**
 * 场景管理器
 */
class SceneManager extends SingletonClass {
    constructor() {
        super();
    }
    /**
     * 获取当前主界面
     */
    public get ui_scene(): any {
        if (PanelManage.Main.box_uiScene1.numChildren > 0) {
            return (this.box_uiScene1.getChildAt(0) as any);
        }
        else {
            return this.box_uiScene0.getChildAt(0) as any;
        }
    }
    /**
     * 野外场景容器
     */
    public get box_uiScene0() {
        return PanelManage.Main.box_uiScene0;
    }

    /**
     * 副本场景容器
     */
    public get box_uiScene1() {
        return PanelManage.Main.box_uiScene1;
    }

    /**
     * 小地图场景容器
     */
    public get box_smallScene() {
        return PanelManage.Main.box_smallMap;
    }
    public get box_smallMapScene() {
        return PanelManage.Main.box_smallMap;
    }

    /**
     * 大地图场景容器
     */
    public get panelBigMap(): Laya.Panel {
        return PanelManage.Main.panel_bigMap;
    }

    /**
     * Npc列表控件
     */
    public get vbox_npc() {
        return PanelManage.Main.vbox_npc;
    }

    /**
     * 玩家切换地图后刷新界面
     */
    public loadScene(): void {
        // ui_scene 布局
        let bigMapType = SheetConfig.mydb_mapinfo_tbl.getInstance(null).MAPTYPE('' + GameApp.MainPlayer.location.mapid);
        // 大于0是副本地图.根据大地图类型布局。100 个人副本 101除魔副本 200 公共副本
        // 0是野外地图切换小房间
        // 副本地图
        if (bigMapType > 0&&bigMapType != 200) {
            this.updateUiScene(bigMapType);
            // this.loadBigMap();
            this.loadSceneFinish();
        }
        else {
            // 野外地图，先加载小地图，再切换地图
            let pkt = new ProtoCmd.QuestClientData();
            pkt.setString(ProtoCmd.MAP_Get_ALLROOM_INFO, null, null, this, (jsonData: ProtoCmd.itf_MAP_ROOM_INFO) => {
                // 当前小房间信息
                GameApp.MainPlayer.roomId = jsonData.curminmapid;
                // 上下左右房间的信息
                GameApp.GameEngine.smallMapData = jsonData.dstmap;
                // 更新主场景和小地图
                let mapType = SheetConfig.mapRoomSheet.getInstance(null).ROOMTYPE('' + jsonData.curminmapid);
                this.updateUiScene(mapType);
                this.loadSceneFinish();
            });
            lcp.send(pkt);
        }
        this.loadBigMap();
    }
    /**
     * 切换完大地图后发送
     */
    public loadSceneFinish(): void {
        // 切完大地图发送,地图ID改变
        let ready = new ProtoCmd.StateReady();
        lcp.send(ready, this, () => {
            // 首次ready拉取一次数据
            if (!GameApp.GameEngine.isReady) {
                PanelManage.Main.initData();
            }
            console.log('客户端准备完成');
            GameApp.GameEngine.isReady = true;
        });
    }

    /**
     * 更新主场景ui_scene
     */
    public updateUiScene(mapType: EnumData.emRoomType): void {
        console.log('===updateUiScene===>', mapType);
        let uiscene;
        switch (mapType) {
            // 心魔副本
            case EnumData.emRoomType.singleFuBen:
                this.box_uiScene0.visible = false;
                this.box_uiScene1.removeChildren();
                uiscene = new view.scene.SceneV1Item();
                uiscene.setData();
                this.box_uiScene1.visible = true;
                this.box_uiScene1.addChild(uiscene);
                break;
            // 除魔副本
            case EnumData.emRoomType.chuMoFuBen:
                this.box_uiScene0.visible = false;
                this.box_uiScene1.removeChildren();
                uiscene = new view.scene.SceneV2Item();
                uiscene.setData();
                this.box_uiScene1.visible = true;
                this.box_uiScene1.addChild(uiscene);
                break;
            // 资源副本
            case EnumData.emRoomType.resourceFuBen:
                this.box_uiScene0.visible = false;
                this.box_uiScene1.removeChildren();
                uiscene = new view.scene.SceneV3Item();
                uiscene.setData();
                this.box_uiScene1.visible = true;
                this.box_uiScene1.addChild(uiscene);
                break;
            // 多人副本    只有boss的野外地图
            case EnumData.emRoomType.publicFuBen:
                this.box_uiScene1.removeChildren();
                this.box_uiScene1.visible = false;
                // if (uiscene == null) {
                this.box_uiScene0.removeChildren();
                uiscene = new view.scene.SceneV5Item();
                uiscene.setData();
                this.box_uiScene0.addChild(uiscene);
                if (this.box_uiScene0.left == 0) {
                    uiscene.changeSelfSize(true);
                }
                // }
                this.box_uiScene0.visible = true;
                // 清空场景信息
                let smallMap1 = this.box_smallScene.getChildByName('SmallMapItem') as view.map.SmallMapItem;
                if (smallMap1 == null) {
                    smallMap1 = new view.map.SmallMapItem();
                    this.box_smallMapScene.addChild(smallMap1);
                }
                // 更新小地图
                smallMap1.updateUI();
                let index1 = this.box_smallScene.getChildIndex(smallMap1);
                for (let i = 0; i < this.box_smallScene.numChildren; i++) {
                    (this.box_smallScene.getChildAt(i) as Laya.View).visible = index1 == i;
                }
                break;

            // 有怪物的野外地图  小怪
            case EnumData.emRoomType.publicYeWai:
                this.box_uiScene1.removeChildren();
                this.box_uiScene1.visible = false;
                uiscene = this.box_uiScene0.getChildByName('SceneCityItem');
                // if (uiscene == null) {
                this.box_uiScene0.removeChildren();
                uiscene = new view.scene.SceneCityItem();
                uiscene.setData();
                this.box_uiScene0.addChild(uiscene);
                if (this.box_uiScene0.left == 0) {
                    uiscene.changeSelfSize(true);
                }
                // }
                this.box_uiScene0.visible = true;
                // 清空场景信息
                let smallMap = this.box_smallScene.getChildByName('SmallMapItem') as view.map.SmallMapItem;
                if (smallMap == null) {
                    smallMap = new view.map.SmallMapItem();
                    this.box_smallMapScene.addChild(smallMap);
                }
                // 更新小地图
                smallMap.updateUI();
                let index = this.box_smallScene.getChildIndex(smallMap);
                for (let i = 0; i < this.box_smallScene.numChildren; i++) {
                    (this.box_smallScene.getChildAt(i) as Laya.View).visible = index == i;
                }
                break;

            // 主城
            case EnumData.emRoomType.publicZhuCheng:
                this.box_uiScene1.removeChildren();
                this.box_uiScene1.visible = false;
                if (this.box_uiScene0.numChildren == 0 || this.box_uiScene0.getChildAt(0).name != 'SceneV4Item') {
                    this.box_uiScene0.removeChildren();
                    uiscene = new view.scene.SceneV4Item();
                    uiscene.setData();
                    this.box_uiScene0.addChild(uiscene);
                    if (this.box_uiScene0.left == 0) {
                        uiscene.changeSelfSize();
                    }
                }
                break;
        }
        // 刷新界面
        this.ui_scene.updateUI();

    }

	/**
	 * 初始化角色
	 */
    public updateSelfPlayer(scene): void {
        let selfPlayerUI: view.scene.PlayerInSceneItem = GameApp.MainPlayer.ui_item;
        if (selfPlayerUI == null) {
            let _uiItem = new view.scene.PlayerInSceneItem();
            _uiItem.setData(GameApp.MainPlayer);
            _uiItem.centerX = _uiItem.centerY = 0;
            scene.box_self.addChild(_uiItem);
        }
        else {
            selfPlayerUI.updateUI();
            selfPlayerUI.centerX = selfPlayerUI.centerY = 0;
            scene.box_self.addChild(selfPlayerUI);
        }
    }

	/**
  	 * 初始化弟子
  	 */
    public updateDiziPlayer(scene): void {
        let selfHero = GameApp.MainPlayer.curHero;
        // 判断自己有没有英雄
        if (selfHero) {
            let selfHeroUI: view.scene.HeroInSceneItem = selfHero.ui_item;
            if (selfHeroUI == null) {
                selfHeroUI = new view.scene.HeroInSceneItem();
                selfHeroUI.setData(selfHero);
            }
            else {
                selfHeroUI.updateUI();
            }
            selfHeroUI.centerX = selfHeroUI.centerY = 0;
            scene.box_diZi.addChild(selfHeroUI);
        }

    }

    /**
     * 更新视野内对象UI
     * @param handleType 
     * @param obj 
     */
    public addViewObjUI(obj, type: EnumData.CRET_TYPE): void {
        switch (type) {
            // 玩家
            case EnumData.CRET_TYPE.CRET_PLAYER:
                this.ui_scene.addPlayer(obj);
                break;
            // 英雄
            case EnumData.CRET_TYPE.CRET_HERO:
                this.addHero(obj);
                break;
            // 怪物
            case EnumData.CRET_TYPE.CRET_MONSTER:
                this.ui_scene.addMonster(obj);
                break;
            // NPC
            case EnumData.CRET_TYPE.CRET_NPC:
                let npcIcon: view.npc.NpcIconItem = new view.npc.NpcIconItem();
                npcIcon.setData(obj);
                this.vbox_npc.addChild(npcIcon);
                break;
            // 道具
            case EnumData.CRET_TYPE.CRET_ITEM:
                this.ui_scene.addDaoJu(obj);
                break;
            default:
                break;
        }
    }



    /**
     * 添加英雄
     */
    public addHero(obj: GameObject.Hero): void {
        let masterTempID = obj.feature.dwMasterTmpID;
        // 判断是否是自己
        if (masterTempID == GameApp.MainPlayer.tempId) {
            this.updateDiziPlayer(this.ui_scene);
        }
        else {
            // 找到主人
            let masterObj = GameApp.MainPlayer.findViewObj(masterTempID, EnumData.CRET_TYPE.CRET_PLAYER);
            if (masterObj && masterObj.ui_item) {
                (masterObj.ui_item as view.scene.PlayerAndHeroInSceneV0Item).setHero(obj);
            }
        }
    }


    /**
     * 清空视野
     */
    public clearViewUI(): void {
        this.vbox_npc.removeChildren();
        this.ui_scene && this.ui_scene.clearPlayer();
        this.ui_scene && this.ui_scene.clearMonster();
    }



    /**
     * 加载大地图
     */
    public loadBigMap(): void {
        let ui_map;
        switch (GameApp.MainPlayer.location.mapid) {
            // 酆都
            case EnumData.MAP_BIG_MAP_ID.MAP_FENG_DU:
                ui_map = new view.map.SmallMap_fengduItem();
                ui_map.setData();
                break;
            // 福州城
            case EnumData.MAP_BIG_MAP_ID.MAP_FU_ZHOU_CHENG:
                ui_map = new view.map.SmallMap_fuzhouItem();
                ui_map.setData();
                break;
            // 华山派
            case EnumData.MAP_BIG_MAP_ID.MAP_HUA_SHAN_PAI:
                ui_map = new view.map.SmallMap_HuaShanItem();
                ui_map.y = 118;
                ui_map.setData();
                break;
            // 玉壶
            case EnumData.MAP_BIG_MAP_ID.MAP_HENG_YU_HU:
                ui_map = new view.map.SmallMap_YuHuItem();
                ui_map.y = 118;
                ui_map.setData();
                break;
            // 药王庄
            case EnumData.MAP_BIG_MAP_ID.MAP_HENG_YAO_WANG:
                ui_map = new view.map.SmallMap_YaoWangItem();
                ui_map.y = 118;
                ui_map.setData();
                break;
            // 洛阳
            case EnumData.MAP_BIG_MAP_ID.MAP_HENG_LUO_YANG:
                ui_map = new view.map.SmallMap_LuoYangItem();
                ui_map.setData();
                break;
            // 良人鎮
            case EnumData.MAP_BIG_MAP_ID.MAP_HENG_LIANG_REN:
                ui_map = new view.map.SmallMap_LiangRenItem();
                ui_map.y = 118;
                ui_map.setData();
                break;
            // 塔楼
            case EnumData.MAP_BIG_MAP_ID.MAP_HENG_TA_LOU:
                ui_map = new view.map.SmallMap_TaLouItem();
                ui_map.y = 118;
                ui_map.setData();
                break;
            // 玉笔峰
            case EnumData.MAP_BIG_MAP_ID.MAP_HENG_YU_BI:
                ui_map = new view.map.SmallMap_YuBiItem();
                ui_map.y = 118;
                ui_map.setData();
                break;
            // 嵩山
            case EnumData.MAP_BIG_MAP_ID.MAP_HENG_SONG_SHAN:
                ui_map = new view.map.SmallMap_SongShanItem();
                ui_map.y = 118;
                ui_map.setData();
                break;
            // 全真
            case EnumData.MAP_BIG_MAP_ID.MAP_HENG_QUAN_ZHEN:
                ui_map = new view.map.SmallMap_QuanZhenItem();
                ui_map.y = 118;
                ui_map.setData();
                break;
            //衡山派
            case EnumData.MAP_BIG_MAP_ID.MAP_HENG_SHAN_PAI:
                ui_map = new view.map.SmallMap_HengShanItem();
                ui_map.y = 118;
                ui_map.setData();
                break;
            //泰山
            case EnumData.MAP_BIG_MAP_ID.MAP_HENG_TAI_SHAN:
                ui_map = new view.map.SmallMap_TaiShanItem();
                ui_map.y = 118;
                ui_map.setData();
                break;
        }
        PanelManage.Main.panel_bigMap.removeChildren();
        if (ui_map) {
            this.panelBigMap.addChild(ui_map);
        }

    }


    /**
     * 显示
     * @param isShow 
     */
    public showBigMap(isShow) {
        // 更新小地图中自己的位置
        if (isShow) {
            this.panelBigMap.visible = true;
            Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, 300);
            this.updateUI();
        }
        else {
            Laya.Tween.to(this, { scaleX: 0, scaleY: 0 }, 300, null, Laya.Handler.create(this, () => {
                this.panelBigMap.visible = false;
            }))
        }
    }

    /**
     * 小地图寻找房间Button
     */
    public smallMapFindButton(btnName): Laya.Button {
        return (this.box_smallScene.getChildByName('SmallMapItem') as view.map.SmallMapItem)[btnName]
    }

    /**
     * 大地图寻找房间button
     * @param roomID 
     */
    public bigMapfindButton(roomID): Laya.Button {
        return this.panelBigMap.getChildAt(0)['btn_' + roomID]
    }



    public updateUI() {
        // let map: any = this.panel_0.getChildAt(0);
        // let img_selfOn: Laya.Image = map.img_selfOn;
        // let targgetBtn: Laya.Button = map['btn_' + GameApp.MainPlayer.roomId];
        // if (img_selfOn && targgetBtn) {
        //     img_selfOn.anchorX = img_selfOn.anchorY = 0.5;
        //     img_selfOn.width = targgetBtn.width;
        //     img_selfOn.height = targgetBtn.height;
        //     img_selfOn.pos(targgetBtn.x, targgetBtn.y)
        // }
    }

}