
/**
 * 场景管理器
 */
class SceneManager extends SingletonClass {
    constructor() {
        super();
        this.addLcpEvent()
    }

    public addLcpEvent() {
        // 地图移动
        GameApp.LListener.on(ProtoCmd.MAP_MOVE, this, (jsonData: ProtoCmd.itf_MAP_MOVE) => {
            if (jsonData.errorcode == 0) {
                // 清空视野
                GameApp.MainPlayer.clearViewObj();
                // 更新房间数据
                GameApp.MainPlayer.roomId = jsonData.curmapid;
                // 上下左右房间的信息
                GameApp.GameEngine.smallMapData = jsonData.dstmap;
                console.log('进入了' + jsonData.curmapid);
                // 更新主场景
                let mapType = SheetConfig.mapRoomSheet.getInstance(null).ROOMTYPE('' + jsonData.curmapid);
                this.updateUiScene(mapType);
            }
        });
    }

    /**
     * 获取当前主界面
     */
    public get ui_scene(): view.main.Main_tanSuoItem {
        return view.main.Main_tanSuoItem.self
    }


    /**
     * 小地图场景容器
     */
    public get ui_smallMap() {
        return this.ui_scene.ui_smallMap
    }

    /**
     * 判断是否在副本内
     */
    public chenkPlayerInFuBen(): boolean {
        let bigMapType = SheetConfig.mydb_mapinfo_tbl.getInstance(null).MAPTYPE('' + GameApp.MainPlayer.location.mapid);
        return bigMapType > 0
    }


    /**
     * 玩家切换地图后刷新界面
     */
    public loadScene(): void {
        // ui_scene 布局
        let bigMapType = SheetConfig.mydb_mapinfo_tbl.getInstance(null).MAPTYPE('' + GameApp.MainPlayer.location.mapid);
        // 大于0是副本地图.根据大地图类型布局。100 个人副本 101除魔副本 200 公共副本
        // 0是野外地图切换小房间
        // 副本地图,默认打开副本地图
        if (bigMapType > 0) {
            this.updateUiScene(bigMapType);
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
                // 打开主界面
                PanelManage.Main.initData();
                this.updateSelfPlayer(this.ui_scene);
            }
            else {
                // 打开探索界面
                PanelManage.openTanSuoPanel();
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
        switch (mapType) {
            // ---------------副本------------------
            // 心魔副本
            case EnumData.emRoomType.singleFuBen:
                GameApp.MainPlayer.fubenMonsterPower = 0
                GameApp.MainPlayer.curFuBenID = 100
                this.ui_scene.changeMode(1);
                GameApp.LListener.event(view.scene.PlayerInSceneItem.ARGUE,'0');
                break;
            // 除魔副本
            case EnumData.emRoomType.chuMoFuBen:
                GameApp.MainPlayer.fubenMonsterPower = 0
                GameApp.MainPlayer.curFuBenID = 101
                this.ui_scene.changeMode(1);
                GameApp.LListener.event(view.scene.PlayerInSceneItem.ARGUE,'0');
                break;
            // 资源副本
            case EnumData.emRoomType.resourceFuBen:
                GameApp.MainPlayer.fubenMonsterPower = 0
                GameApp.MainPlayer.curFuBenID = 102
                this.ui_scene.changeMode(1);
                GameApp.LListener.event(view.scene.PlayerInSceneItem.ARGUE,'0');
                break;
            // 多人副本   只有boss的野外地图
            case EnumData.emRoomType.publicFuBen:
                GameApp.MainPlayer.fubenMonsterPower = 0
                GameApp.MainPlayer.curFuBenID = 200
                this.ui_scene.changeMode(1);
                GameApp.LListener.event(view.scene.PlayerInSceneItem.ARGUE,'0');
                break;
            // ---------------野外------------------
            // 有怪物的野外地图  小怪
            case EnumData.emRoomType.publicYeWai:
            // 主城
            case EnumData.emRoomType.publicZhuCheng:
                // 更新小地图
                this.ui_smallMap.updateUI();
                this.ui_scene.changeMode(0);
                GameApp.LListener.event(view.scene.PlayerInSceneItem.ARGUE,'0');
                break;
            // NPC辩论
            case EnumData.emRoomType.NpcArgue:
                GameApp.MainPlayer.fubenMonsterPower = 0
                GameApp.MainPlayer.curFuBenID = 400
                this.ui_scene.changeMode(2);
                GameApp.LListener.event(view.scene.PlayerInSceneItem.ARGUE,'1');
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
            _uiItem.centerX = 0;
            _uiItem.bottom = 0
            scene.box_self.addChild(_uiItem);
        }
        else {
            selfPlayerUI.updateUI();
            selfPlayerUI.centerX = 0;
            selfPlayerUI.bottom = 0
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
                // this.addHero(obj);
                break;
            // 怪物
            case EnumData.CRET_TYPE.CRET_MONSTER:
                this.ui_scene.addMonster(obj);
                break;
            // NPC
            case EnumData.CRET_TYPE.CRET_NPC:
                this.ui_scene.addNpc(obj);
                // this.vbox_npc.addChild(npcIcon);
                break;
            // 道具
            case EnumData.CRET_TYPE.CRET_ITEM:
                // this.ui_scene.addDaoJu(obj);
                break;
            default:
                break;
        }
    }

    /**
     * 更新NPC的任务状态
     * @param npcID 
     * @param state 
     */
    public updateNpcState(npcID, state: EnumData.NPCSTATUS): void {

    }




    /**
     * 清空视野
     */
    public clearViewUI(): void {
        this.ui_scene.clearView();
    }


    /**
     * 小地图寻找房间Button
     */
    public smallMapFindButton(btnName): Laya.Button {
        return (this.ui_smallMap as view.map.SmallMapItem)[btnName]
    }

}