/**
 * 资源数据管理，注册各个界面的资源组
 */
module ResData {
    /**
     * 游戏界面图片资源
     */
    export class PanelRes {
        //****************************************通用素材******************************** */
        // 开始游戏界面
        public static StartLoading = [{ url: "image/mc/loading.atlas", type: Laya.Loader.ATLAS },];
        // GM界面
        public static GM = null;
        // 登陆界面
        public static Login = [{ url: "res/atlas/image/common/login.atlas", type: Laya.Loader.ATLAS },];
        // 服务器列表界面
        public static ServerList = [{ url: "res/atlas/image/common/serverList.atlas", type: Laya.Loader.ATLAS },];
        // 服务器公告界面
        public static ServerNotice = null;
        // 通用素材
        public static Common = [{ url: "res/atlas/image/common/default.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/common.atlas", type: Laya.Loader.ATLAS },];
        // 主界面
        public static Main = [{ url: "res/atlas/image/main.atlas", type: Laya.Loader.ATLAS }, { url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }];
    };
    /**
     * 游戏音效资源
     */
    export class SoundRes {
        // 背景音效
        public static bg = 'sound/bg.mp3';
        // 爆炸音效
        public static boom = 'sound/boom.mp3';

    }
    /**
     * 游戏配置表资源
     */
    export class JsonRes {
        // 策划配置表
        public static AllClientData = 'json/AllClientData.json';
    }
}
