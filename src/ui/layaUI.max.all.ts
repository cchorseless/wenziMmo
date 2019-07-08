
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.beiBao {
    export class BeiBaoPanelUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":40,"x":40,"top":0,"skin":"image/common/bg_common_01.png","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"y":545,"x":126,"width":388,"text":"这是背包界面","height":80,"fontSize":40,"font":"Microsoft YaHei","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.beiBao.BeiBaoPanelUI.uiView);

        }

    }
}

module ui.common {
    export class ChooseAvatarPanelUI extends View {
		public btn_startGame:Laya.Button;
		public btn_notice:Laya.Button;
		public img_heroPic:Laya.Image;
		public lbl_level0:Laya.Label;
		public lbl_level1:Laya.Label;
		public lbl_playerName:Laya.Label;
		public vip_level:Laya.FontClip;
		public lbl_serverName:Laya.Label;
		public btn_changeServer:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":10,"top":0,"skin":"image/common/bg_common_01.png","right":0,"left":0,"bottom":0}},{"type":"Image","props":{"y":126,"x":10,"skin":"image/common/zi_logo01.png","centerX":0}},{"type":"Button","props":{"y":950,"x":245,"width":150,"var":"btn_startGame","stateNum":2,"skin":"image/common/btn_common_03up_finish.png","height":150},"child":[{"type":"Label","props":{"y":31,"x":25,"width":99,"text":"进入\\n江湖","mouseThrough":true,"height":88,"fontSize":40,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Button","props":{"y":22,"x":23,"width":73,"var":"btn_notice","stateNum":2,"skin":"image/common/login/icon_common_gonggao01up_finish.png","height":77},"child":[{"type":"Label","props":{"y":54,"x":-4,"text":"公告","strokeColor":"#000000","stroke":6,"fontSize":40,"font":"FZXK","color":"#ffffff"}}]},{"type":"Box","props":{"y":274,"x":99},"child":[{"type":"Image","props":{"y":151,"x":10,"skin":"image/common/fram_common_16.png"}},{"type":"Image","props":{"var":"img_heroPic","skin":"image/common/nv01.png"}},{"type":"Image","props":{"y":394,"x":283,"width":170,"skin":"image/common/fram_common_vipdi.png","height":150},"child":[{"type":"Label","props":{"y":12,"x":38,"width":103,"var":"lbl_level0","text":"6转","height":50,"fontSize":50,"font":"FZXK","color":"#ffffff"}},{"type":"Label","props":{"y":66,"x":45,"width":103,"var":"lbl_level1","text":"87级","height":36,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":466,"x":-10,"width":414,"height":162},"child":[{"type":"Image","props":{"y":96.52159862735118,"width":126,"skin":"image/common/fram_common_vipdi.png","rotation":-50,"height":121}},{"type":"Image","props":{"y":61.52159862735118,"x":47,"width":367,"skin":"image/common/fram_common_04.png","height":53},"child":[{"type":"Label","props":{"y":11,"x":72,"width":220,"var":"lbl_playerName","text":"玩家姓名拉拉","height":31,"fontSize":35,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":60.52159862735118,"x":51,"width":30,"skin":"image/common/zi_vip_01.png","height":40}},{"type":"FontClip","props":{"y":72.52159862735118,"x":69,"width":42,"var":"vip_level","value":"10","spaceX":-10,"skin":"image/common/number/zi_shuzi01.png","sheet":"0123456789","height":40}}]}]},{"type":"Image","props":{"y":873,"x":150,"width":340,"skin":"image/common/input_bg.png","height":64},"child":[{"type":"Label","props":{"y":22,"x":58,"width":166,"var":"lbl_serverName","text":"服务器1区","height":31,"fontSize":25,"font":"FZXK","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":21,"x":223,"width":84,"var":"btn_changeServer","text":"[换区]","height":31,"fontSize":25,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.ChooseAvatarPanelUI.uiView);

        }

    }
}

module ui.common {
    export class CreateAvatarPanelUI extends View {
		public img_hero:Laya.Image;
		public rad_menPai1:Laya.Radio;
		public rad_menPai2:Laya.Radio;
		public rad_menPai3:Laya.Radio;
		public rad_menPai4:Laya.Image;
		public rad_menPai5:Laya.Image;
		public input_random:Laya.TextInput;
		public btn_randomName:Laya.Button;
		public btn_startGame:Laya.Button;
		public img_heroSmall:Laya.Image;
		public lbl_heroName:Laya.Label;
		public lbl_heroInfo:Laya.Label;
		public img_nanBg:Laya.Image;
		public img_nvBg:Laya.Image;
		public lbl_nan:Laya.Label;
		public lbl_nv:Laya.Label;
		public lbl_menPai:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"top":0,"skin":"image/common/bg_common_01.png","right":0,"left":2,"bottom":0}},{"type":"Image","props":{"y":52,"x":36,"width":401,"var":"img_hero","skin":"image/common/nan01.png","height":511}},{"type":"Box","props":{"y":603,"x":185},"child":[{"type":"Image","props":{"y":2,"skin":"image/common/login/img_common_03.png"},"child":[{"type":"Radio","props":{"y":19,"x":13,"var":"rad_menPai1","stateNum":2,"skin":"image/common/login/icon_huashan01up_finish.png"}}]},{"type":"Image","props":{"y":82,"x":49,"skin":"image/common/login/img_common_03.png"},"child":[{"type":"Radio","props":{"y":19,"x":13,"var":"rad_menPai2","stateNum":2,"skin":"image/common/login/icon_wudang01up_finish.png"}}]},{"type":"Image","props":{"y":2,"x":96,"skin":"image/common/login/img_common_03.png"},"child":[{"type":"Radio","props":{"y":19,"x":13,"var":"rad_menPai3","stateNum":2,"skin":"image/common/login/icon_mojiao01up_finish.png"}}]},{"type":"Image","props":{"x":192,"skin":"image/common/login/img_common_03.png"},"child":[{"type":"Image","props":{"y":19,"x":13,"var":"rad_menPai4","skin":"image/common/login/icon_shuo.png"}}]},{"type":"Image","props":{"y":80,"x":147,"skin":"image/common/login/img_common_03.png"},"child":[{"type":"Image","props":{"y":19,"x":13,"var":"rad_menPai5","skin":"image/common/login/icon_shuo.png"}}]}]},{"type":"Box","props":{"y":927,"x":79},"child":[{"type":"Box","props":{"y":56,"x":3,"width":309,"height":81},"child":[{"type":"TextInput","props":{"y":-4,"x":14,"width":245,"var":"input_random","type":"text","skin":"image/common/fram_common_15.png","promptColor":"#000000","prompt":"点击随机名字","padding":"0,0,0,20","maxChars":6,"height":85,"fontSize":30,"font":"FZXK","color":"#000000","bold":true}},{"type":"Button","props":{"y":-13,"x":211,"width":100,"var":"btn_randomName","stateNum":2,"skin":"image/common/login/icon_shaizi01_finish.png","height":104}},{"type":"Image","props":{"y":0,"x":0,"width":37,"skin":"image/common/fram_common_07.png","height":79}}]},{"type":"Button","props":{"x":336,"width":190,"var":"btn_startGame","stateNum":2,"skin":"image/common/login/btn_chuangjian01_finish.png","labelSize":40,"labelPadding":"0,0,10,0","labelFont":"Microsoft YaHei","labelColors":"#ffffff","labelBold":true,"height":171}}]},{"type":"Image","props":{"y":593,"x":499,"var":"img_heroSmall","skin":"image/common/nan01_half.png"}},{"type":"Image","props":{"y":20,"x":391,"skin":"image/common/login/fram_common_11.png"},"child":[{"type":"Label","props":{"y":28,"x":29,"wordWrap":true,"width":156,"var":"lbl_heroName","text":"拎壶冲","height":51,"fontSize":48,"font":"FZXK","color":"#000000"}},{"type":"Label","props":{"y":105,"x":19,"wordWrap":true,"width":196,"var":"lbl_heroInfo","text":"令狐冲生性放荡不羁，爽朗豁达，豪迈潇洒，不拘小节，喜欢乱开玩笑，却有高度的忠义心，天生侠义心肠，并且深情不移。","height":227,"fontSize":25,"font":"SimHei","color":"#000000"}},{"type":"Image","props":{"y":319,"x":-8,"skin":"image/common/login/fram_common_12.png"},"child":[{"type":"Image","props":{"y":31,"x":72,"skin":"image/common/login/fram_common_13.png"}}]}]},{"type":"Box","props":{"y":828,"x":160},"child":[{"type":"Image","props":{"y":2,"var":"img_nanBg","skin":"image/common/login/fram_common_14.png"}},{"type":"Image","props":{"y":2,"x":192,"var":"img_nvBg","skin":"image/common/login/fram_common_14.png"}},{"type":"Label","props":{"y":-15,"x":9,"width":99,"var":"lbl_nan","valign":"middle","text":"男","strokeColor":"#000000","stroke":4,"height":100,"fontSize":60,"font":"FZXK","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":-14,"x":200,"width":99,"var":"lbl_nv","valign":"middle","text":"女","strokeColor":"#000000","stroke":4,"height":100,"fontSize":60,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":609,"x":134,"width":237,"skin":"image/common/fram_common_09.png","rotation":90,"height":78},"child":[{"type":"Label","props":{"y":72,"x":32,"wordWrap":true,"width":73,"var":"lbl_menPai","text":"华山派","rotation":-90,"height":188,"fontSize":60,"font":"FZXK","color":"#ffffff"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.CreateAvatarPanelUI.uiView);

        }

    }
}

module ui.common {
    export class GmPanelUI extends View {
		public btn_getItem:Laya.Button;
		public btn_close:Laya.Button;
		public input_ID:Laya.TextInput;
		public input_Count:Laya.TextInput;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":10,"x":10,"top":0,"skin":"image/common/default/img_blackBg.png","right":0,"left":0,"bottom":0,"alpha":0.5}},{"type":"Button","props":{"y":782,"x":175,"width":289,"var":"btn_getItem","stateNum":1,"skin":"image/main/btn_basic1.png","labelSize":40,"labelFont":"Microsoft YaHei","labelBold":true,"label":"获取道具","height":134}},{"type":"Button","props":{"y":160,"x":461,"width":130,"var":"btn_close","stateNum":1,"skin":"image/main/btn_basic1.png","labelSize":40,"labelFont":"Microsoft YaHei","labelBold":true,"label":"关闭","height":95}},{"type":"Box","props":{"y":342,"x":190},"child":[{"type":"Label","props":{"x":52,"width":159,"text":"道具ID","height":64,"fontSize":40,"font":"mini","color":"#f8f6f6","bold":true}},{"type":"TextInput","props":{"y":85,"x":5,"width":255,"var":"input_ID","type":"number","text":"道具ID","height":79,"fontSize":40,"font":"mini","bold":true,"bgColor":"#f1e4e4"}},{"type":"Label","props":{"y":198,"x":47,"width":159,"text":"道具数量","height":64,"fontSize":40,"font":"mini","color":"#f8f6f6","bold":true}},{"type":"TextInput","props":{"y":283,"width":255,"var":"input_Count","type":"number","text":"道具ID","height":79,"fontSize":40,"font":"mini","bold":true,"bgColor":"#f1e4e4"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.GmPanelUI.uiView);

        }

    }
}

module ui.common {
    export class LoginPanelUI extends View {
		public lbl_versionInfo:Laya.Label;
		public btn_notice:Laya.Button;
		public stack_login:Laya.ViewStack;
		public box_login:Laya.Box;
		public input_account:Laya.TextInput;
		public input_password:Laya.TextInput;
		public btn_Login:Laya.Button;
		public box_fail:Laya.Box;
		public btn_quit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":640,"name":"LoginPanel","height":1136},"child":[{"type":"Image","props":{"width":640,"top":0,"skin":"image/common/bg_common_01.png","right":0,"left":0,"height":1145,"bottom":0}},{"type":"Image","props":{"y":126,"skin":"image/common/zi_logo01.png","centerX":0}},{"type":"Image","props":{"y":258,"skin":"image/common/login/img_juese01.png","centerX":0}},{"type":"Label","props":{"y":30,"x":461,"width":168,"var":"lbl_versionInfo","text":"版本:1.0.0","strokeColor":"#000000","stroke":4,"height":40,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","bold":true}},{"type":"Button","props":{"y":12,"x":13,"width":73,"var":"btn_notice","stateNum":2,"skin":"image/common/login/icon_common_gonggao01up_finish.png","height":77},"child":[{"type":"Label","props":{"y":54,"x":-4,"text":"公告","strokeColor":"#000000","stroke":6,"fontSize":40,"font":"FZXK","color":"#ffffff"}}]},{"type":"ViewStack","props":{"var":"stack_login","selectedIndex":0,"right":0,"left":0,"height":366,"bottom":0},"child":[{"type":"Box","props":{"var":"box_login","name":"item0","centerX":0,"bottom":80},"child":[{"type":"TextInput","props":{"y":9,"x":75,"width":353,"var":"input_account","valign":"middle","type":"text","skin":"image/common/input_bg.png","promptColor":"#ffffff","prompt":"账号","height":79,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}},{"type":"TextInput","props":{"y":85,"x":79,"width":344,"var":"input_password","valign":"middle","type":"password","skin":"image/common/input_bg.png","promptColor":"#ffffff","prompt":"密码","height":79,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":243,"x":-24,"width":551,"skin":"image/common/login/img_common_02.png","height":17}},{"type":"Button","props":{"y":209,"x":82,"width":310,"var":"btn_Login","stateNum":2,"skin":"image/common/login/btn_tarujianghu01_finish.png","labelSize":40,"labelPadding":"0,0,10,0","labelFont":"Microsoft YaHei","labelColors":"#ffffff","height":70}},{"type":"Image","props":{"y":149,"x":414,"width":111,"skin":"image/common/login/img_common_01.png","height":113}}]},{"type":"Box","props":{"y":63,"x":157,"width":326,"var":"box_fail","name":"item1","height":213},"child":[{"type":"Image","props":{"y":0,"x":-87,"width":500,"skin":"image/common/input_bg.png","height":76},"child":[{"type":"Label","props":{"y":6,"x":5,"width":334,"valign":"middle","text":"拉取服务器列表失败","right":0,"left":10,"height":62,"fontSize":40,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":107,"x":71,"width":183,"var":"btn_quit","stateNum":2,"skin":"image/common/btn_caidan_01_finish.png","labelSize":40,"labelPadding":"0,0,0,0","labelFont":"FZXK","labelColors":"#ffffff","labelBold":true,"label":"退出","height":95}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.LoginPanelUI.uiView);

        }

    }
}

module ui.common {
    export class NetLoadingPanelUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":640,"top":0,"right":0,"name":"NetLoadingPanel","left":0,"height":1136,"bottom":0}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.NetLoadingPanelUI.uiView);

        }

    }
}

module ui.common {
    export class ResLoadingPanelUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":640,"top":0,"right":0,"name":"ResLoadingPanel","left":0,"height":1136,"bottom":0}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.ResLoadingPanelUI.uiView);

        }

    }
}

module ui.common {
    export class ServerErrorPanelUI extends View {
		public lbl_des:Laya.Label;
		public lbl_reLogin:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"name":"ServerErrorPanel","height":1136},"child":[{"type":"Image","props":{"top":0,"skin":"image/common/default/img_blackBg.png","right":0,"left":0,"bottom":0,"alpha":0.5}},{"type":"Label","props":{"y":495,"x":0,"var":"lbl_des","valign":"middle","text":"la","right":0,"left":0,"height":145,"fontSize":40,"font":"Microsoft YaHei","color":"#fffdfd","bold":true,"align":"center"}},{"type":"Label","props":{"y":710,"x":174,"width":292,"var":"lbl_reLogin","valign":"middle","underline":true,"text":"[点击重新登陆]","height":224,"fontSize":40,"font":"Microsoft YaHei","color":"#f90303","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.ServerErrorPanelUI.uiView);

        }

    }
}

module ui.common {
    export class ServerItemUI extends View {
		public lbl_serverName:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":230,"height":120},"child":[{"type":"Image","props":{"top":0,"skin":"image/common/stage_map_25.png","right":0,"left":0,"bottom":0},"child":[{"type":"Label","props":{"var":"lbl_serverName","valign":"middle","top":0,"text":"label","right":0,"left":0,"fontSize":30,"font":"mini","color":"#0a0909","bottom":0,"bold":true,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.ServerItemUI.uiView);

        }

    }
}

module ui.common {
    export class ServerListPanelUI extends View {
		public btn_100:Laya.Button;
		public btn_200:Laya.Button;
		public btn_300:Laya.Button;
		public btn_400:Laya.Button;
		public btn_500:Laya.Button;
		public btn_600:Laya.Button;
		public btn_close:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":0,"x":0,"top":0,"skin":"image/common/default/img_blackBg.png","right":0,"left":0,"bottom":0,"alpha":0.7}},{"type":"Box","props":{"y":196,"x":16,"width":156,"height":621},"child":[{"type":"Button","props":{"y":85.99999999999997,"width":86,"var":"btn_100","stateNum":2,"skin":"image/common/btn_common_02up_finish.png","sizeGrid":"31,42,19,39","selected":false,"rotation":-90,"height":148},"child":[{"type":"Label","props":{"y":20,"x":69,"width":117,"valign":"middle","text":"0-100","rotation":90,"mouseThrough":true,"height":50,"fontSize":26,"font":"FZXK","color":"#000000","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":162.99999999999997,"width":86,"var":"btn_200","stateNum":2,"skin":"image/common/btn_common_02up_finish.png","sizeGrid":"31,42,19,39","selected":false,"rotation":-90,"height":148},"child":[{"type":"Label","props":{"y":20,"x":69,"width":117,"valign":"middle","text":"101-200","rotation":90,"mouseThrough":true,"height":50,"fontSize":26,"font":"FZXK","bold":true}}]},{"type":"Button","props":{"y":240.99999999999997,"width":86,"var":"btn_300","stateNum":2,"skin":"image/common/btn_common_02up_finish.png","sizeGrid":"31,42,19,39","selected":false,"rotation":-90,"height":148},"child":[{"type":"Label","props":{"y":20,"x":69,"width":117,"valign":"middle","text":"201-300","rotation":90,"mouseThrough":true,"height":50,"fontSize":26,"font":"FZXK","bold":true}}]},{"type":"Button","props":{"y":318,"width":86,"var":"btn_400","stateNum":2,"skin":"image/common/btn_common_02up_finish.png","sizeGrid":"31,42,19,39","selected":false,"rotation":-90,"height":148},"child":[{"type":"Label","props":{"y":20,"x":69,"width":117,"valign":"middle","text":"301-400","rotation":90,"mouseThrough":true,"height":50,"fontSize":26,"font":"FZXK","bold":true}}]},{"type":"Button","props":{"y":396,"width":86,"var":"btn_500","stateNum":2,"skin":"image/common/btn_common_02up_finish.png","sizeGrid":"31,42,19,39","selected":false,"rotation":-90,"height":148},"child":[{"type":"Label","props":{"y":20,"x":69,"width":117,"valign":"middle","text":"401-500","rotation":90,"mouseThrough":true,"height":50,"fontSize":26,"font":"FZXK","bold":true}}]},{"type":"Button","props":{"y":473,"width":86,"var":"btn_600","stateNum":2,"skin":"image/common/btn_common_02up_finish.png","sizeGrid":"31,42,19,39","selected":false,"rotation":-90,"height":148},"child":[{"type":"Label","props":{"y":20,"x":69,"width":117,"valign":"middle","text":"501-600","rotation":90,"mouseThrough":true,"height":50,"fontSize":26,"font":"FZXK","bold":true}}]}]},{"type":"Image","props":{"y":150,"x":152,"width":470,"skin":"image/common/fram_common_bg_01.png","sizeGrid":"55,42,67,40","height":849},"child":[{"type":"Image","props":{"top":-10,"skin":"image/common/fram_common_17.png","sizeGrid":"52,60,56,62","right":-10,"left":-10,"bottom":-10}},{"type":"Image","props":{"y":-38,"x":86,"width":274,"skin":"image/common/title_common_01.png","height":81},"child":[{"type":"Label","props":{"y":20,"x":47,"width":180,"text":"服务器选择","height":40,"fontSize":36,"font":"FZXK","color":"#000000"}}]},{"type":"Button","props":{"y":-29,"x":405,"var":"btn_close","stateNum":2,"skin":"image/common/btn_common_guangbi01up_finish.png"}},{"type":"Image","props":{"y":814,"x":220,"width":30,"skin":"image/common/btn_common_05.png","height":20}},{"type":"Box","props":{"y":49,"x":38,"width":404,"height":57},"child":[{"type":"Image","props":{"y":8,"skin":"image/common/img_common_05.png"}},{"type":"Image","props":{"y":33,"x":393,"skin":"image/common/img_common_05.png","rotation":180}},{"type":"Label","props":{"x":104,"width":180,"text":"最近登陆","height":40,"fontSize":36,"font":"FZXK","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":178,"x":36,"width":404,"height":41},"child":[{"type":"Image","props":{"y":8,"skin":"image/common/img_common_05.png"}},{"type":"Image","props":{"y":33,"x":393,"skin":"image/common/img_common_05.png","rotation":180}},{"type":"Label","props":{"x":104,"width":180,"text":"服务器列表","height":40,"fontSize":30,"font":"FZXK","color":"#000000","align":"center"}}]},{"type":"Panel","props":{"y":220,"x":28,"width":413,"height":589}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.ServerListPanelUI.uiView);

        }

    }
}

module ui.common {
    export class ServerNoticePanelUI extends View {
		public img_bg:Laya.Image;
		public btn_close:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"var":"img_bg","top":0,"skin":"image/common/default/img_blackBg.png","right":0,"left":0,"bottom":0,"alpha":0.7}},{"type":"Image","props":{"y":272,"x":76,"width":487,"skin":"image/common/fram_common_bg_01.png","sizeGrid":"62,43,81,44","height":592},"child":[{"type":"Image","props":{"y":-9,"x":-6,"width":498,"skin":"image/common/fram_common_17.png","sizeGrid":"58,74,68,63","height":610},"child":[{"type":"TextArea","props":{"y":62,"x":23,"width":451,"type":"text","text":"这是游戏公告","multiline":true,"height":508,"fontSize":25,"font":"Microsoft YaHei","editable":false}}]},{"type":"Image","props":{"y":-33,"x":135,"width":217,"skin":"image/common/title_common_01.png","height":84},"child":[{"type":"Label","props":{"y":24,"x":71,"width":76,"text":"公告","height":41,"fontSize":40,"font":"FZXK"}}]}]},{"type":"Button","props":{"y":249,"x":505,"var":"btn_close","stateNum":2,"skin":"image/common/btn_common_guangbi01up_finish.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.ServerNoticePanelUI.uiView);

        }

    }
}

module ui.common {
    export class StartLoadingPanelUI extends View {
		public img_bg:Laya.Image;
		public lbl_progress:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"top":0,"right":0,"name":"StartLoadingPanel","left":0,"height":1136,"bottom":0},"child":[{"type":"Image","props":{"var":"img_bg","top":0,"skin":"image/common/startLoad/offline_fight_bg.jpg","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"var":"lbl_progress","text":"label","right":0,"left":-2,"height":60,"fontSize":40,"color":"#0b0606","centerY":-158,"bold":true,"align":"center"}},{"type":"Animation","props":{"y":385,"x":103,"source":"image/mc/loading.atlas","autoPlay":true}},{"type":"Animation","props":{"y":387,"x":522,"source":"image/mc/loading.atlas","scaleX":-1,"autoPlay":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.StartLoadingPanelUI.uiView);

        }

    }
}

module ui.common {
    export class TipsShowPanelUI extends View {
		public lbl_des:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":400,"name":"TipsShowPanel","height":50},"child":[{"type":"Box","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"image/common/default/img_tipsbg.png","sizeGrid":"18,67,17,78","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"var":"lbl_des","valign":"middle","top":0,"text":"label","right":0,"left":0,"fontSize":30,"font":"FZXK","color":"#ffffff","bottom":0,"bold":true,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.TipsShowPanelUI.uiView);

        }

    }
}

module ui.compart {
    export class ChatSmallItemUI extends View {
		public panel_small:Laya.Panel;
		public vbox_small:Laya.VBox;
		public btn_up:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"x":0,"width":550,"height":220},"child":[{"type":"Image","props":{"y":0,"x":0,"top":0,"skin":"image/main/fram_common_bg_02.png","sizeGrid":"16,16,13,10","right":0,"left":0,"bottom":0}},{"type":"Panel","props":{"y":0,"x":0,"var":"panel_small","top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"VBox","props":{"var":"vbox_small","top":20,"space":5,"right":10,"left":10,"align":"left"}}]},{"type":"Button","props":{"y":34,"x":532,"width":35,"var":"btn_up","stateNum":1,"skin":"image/main/btn_common_01.png","rotation":180,"height":30}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.ChatSmallItemUI.uiView);

        }

    }
}

module ui.compart {
    export class DaoJuItemUI extends View {
		public lbl_itemName:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":215,"height":75},"child":[{"type":"Image","props":{"y":15,"x":28,"skin":"image/main/player_hp_bg.png"}},{"type":"Image","props":{"y":15,"x":28,"skin":"image/main/player_hp_base.png"}},{"type":"Image","props":{"y":15,"x":28,"skin":"image/main/player_hp.png"}},{"type":"Image","props":{"y":1,"x":1,"skin":"image/main/suit_bg_0.png"}},{"type":"Label","props":{"y":15,"x":26,"width":162,"var":"lbl_itemName","text":"label","height":45,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.DaoJuItemUI.uiView);

        }

    }
}

module ui.compart {
    export class MonsterInSceneItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":130,"height":80},"child":[{"type":"Image","props":{"top":0,"skin":"image/main/dikuaibg.png","right":0,"left":0,"bottom":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.MonsterInSceneItemUI.uiView);

        }

    }
}

module ui.compart {
    export class NpcIconItemUI extends View {
		public img_warn:Laya.Image;
		public img_avatarPic:Laya.Image;
		public lbl_npcName:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":100,"height":110},"child":[{"type":"Image","props":{"y":1,"x":0,"width":100,"skin":"image/common/fram_common_npc.png","height":100}},{"type":"Image","props":{"y":-4,"x":67,"width":40,"var":"img_warn","skin":"image/common/icon_tishi.png","height":45}},{"type":"Image","props":{"y":12,"x":15,"width":70,"var":"img_avatarPic","skin":"image/common/icon_nv01.png","height":70}},{"type":"Image","props":{"skin":"image/common/fram_common_04.png","right":0,"left":0,"height":30,"bottom":0},"child":[{"type":"Label","props":{"var":"lbl_npcName","text":"王一切与","right":0,"left":0,"height":24,"fontSize":18,"font":"FZXK","color":"#ffffff","bottom":0,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.NpcIconItemUI.uiView);

        }

    }
}

module ui.compart {
    export class SceneItemUI extends View {
		public vbox_all:Laya.VBox;
		public panel_monster:Laya.Panel;
		public hbox_monster01:Laya.HBox;
		public hbox_monster02:Laya.HBox;
		public hbox_monster03:Laya.HBox;
		public panel_player:Laya.Panel;
		public hbox_player01:Laya.HBox;
		public hbox_player02:Laya.HBox;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":560,"height":560},"child":[{"type":"Image","props":{"top":0,"skin":"image/main/img_zhandouchangjing_01.png","sizeGrid":"0,50,0,50","right":0,"left":0,"bottom":0}},{"type":"VBox","props":{"var":"vbox_all","top":5,"space":0,"right":0,"left":0,"align":"left"},"child":[{"type":"Panel","props":{"y":0,"width":550,"var":"panel_monster","right":0,"left":10,"height":277},"child":[{"type":"HBox","props":{"y":11,"x":0,"var":"hbox_monster01","space":30,"align":"middle"}},{"type":"HBox","props":{"y":101,"x":0,"var":"hbox_monster02","space":30,"align":"middle"}},{"type":"HBox","props":{"y":195,"x":0,"var":"hbox_monster03","space":30,"align":"middle"}}]},{"type":"Panel","props":{"y":292,"width":550,"var":"panel_player","right":0,"left":10,"height":197},"child":[{"type":"HBox","props":{"y":11,"x":0,"var":"hbox_player01","space":30,"align":"middle"}},{"type":"HBox","props":{"y":109,"x":0,"var":"hbox_player02","space":30,"align":"middle"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.SceneItemUI.uiView);

        }

    }
}

module ui.dialog {
    export class ChatBigDialogUI extends View {
		public tab_big:Laya.Tab;
		public btn_down:Laya.Button;
		public viw_big:Laya.ViewStack;
		public panel_big0:Laya.Panel;
		public vbox_big0:Laya.VBox;
		public panel_big1:Laya.Panel;
		public vbox_big1:Laya.VBox;
		public panel_big2:Laya.Panel;
		public vbox_big2:Laya.VBox;
		public panel_big3:Laya.Panel;
		public vbox_big3:Laya.VBox;
		public panel_big4:Laya.Panel;
		public vbox_big4:Laya.VBox;
		public panel_big5:Laya.Panel;
		public vbox_big5:Laya.VBox;
		public box_send:Laya.Box;
		public txtInput_big:Laya.TextInput;
		public btn_send:Laya.Button;
		public btn_biaoQing:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":600},"child":[{"type":"Tab","props":{"y":50,"width":54,"var":"tab_big","stateNum":2,"space":-10,"skin":"image/common/btn_common_02up2_finish.png","selectedIndex":0,"scaleY":0.7,"scaleX":1,"left":0,"labels":"综\\n合,系\\n统,世\\n界,帮\\n派,队\\n伍,当\\n前","labelStrokeColor":"#000000","labelStroke":6,"labelSize":30,"labelPadding":"0,0,0,10","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","labelAlign":"left","height":742,"direction":"vertical","sizeGrid":"44,15,38,32"}},{"type":"Box","props":{"y":20,"x":20,"top":0,"right":5,"left":55,"bottom":0},"child":[{"type":"Image","props":{"y":397,"x":100,"top":0,"skin":"image/common/fram_common_bg_01.png","sizeGrid":"55,42,67,40","right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"y":-10,"x":-10,"top":-10,"skin":"image/common/fram_common_17.png","sizeGrid":"52,60,56,62","right":-10,"left":-10,"bottom":-10}},{"type":"Image","props":{"y":-28,"width":200,"skin":"image/common/title_common_01.png","height":81,"centerX":0},"child":[{"type":"Label","props":{"y":20,"x":10,"width":180,"text":"聊天","height":40,"fontSize":36,"font":"FZXK","color":"#000000","align":"center"}}]},{"type":"Button","props":{"y":-11,"x":527,"var":"btn_down","stateNum":2,"skin":"image/common/btn_common_guangbi01up_finish.png","right":-6}}]},{"type":"Image","props":{"y":167,"x":110,"top":50,"skin":"image/main/fram_common_bg_02.png","sizeGrid":"28,29,37,25","right":10,"left":10,"bottom":80},"child":[{"type":"ViewStack","props":{"var":"viw_big","top":0,"selectedIndex":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Panel","props":{"var":"panel_big0","top":10,"right":10,"name":"item0","left":10,"bottom":10},"child":[{"type":"VBox","props":{"var":"vbox_big0","top":10,"space":5,"right":10,"left":10,"align":"left"}}]},{"type":"Panel","props":{"var":"panel_big1","top":10,"right":10,"name":"item1","left":10,"bottom":10},"child":[{"type":"VBox","props":{"var":"vbox_big1","top":10,"space":5,"right":10,"left":10,"align":"left"}}]},{"type":"Panel","props":{"var":"panel_big2","top":10,"right":10,"name":"item2","left":10,"bottom":10},"child":[{"type":"VBox","props":{"var":"vbox_big2","top":10,"space":5,"right":10,"left":10,"align":"left"}}]},{"type":"Panel","props":{"var":"panel_big3","top":10,"right":10,"name":"item3","left":10,"bottom":10},"child":[{"type":"VBox","props":{"var":"vbox_big3","top":10,"space":5,"right":10,"left":10,"align":"left"}}]},{"type":"Panel","props":{"var":"panel_big4","top":10,"right":10,"name":"item4","left":10,"bottom":10},"child":[{"type":"VBox","props":{"var":"vbox_big4","top":10,"space":5,"right":10,"left":10,"align":"left"}}]},{"type":"Panel","props":{"y":10,"x":10,"var":"panel_big5","top":10,"right":10,"name":"item5","left":10,"bottom":10},"child":[{"type":"VBox","props":{"var":"vbox_big5","top":10,"space":5,"right":10,"left":10,"align":"left"}}]}]}]},{"type":"Box","props":{"y":117,"x":100,"visible":false,"var":"box_send","right":0,"left":0,"height":70,"bottom":10},"child":[{"type":"TextInput","props":{"y":-1,"width":447,"var":"txtInput_big","valign":"middle","type":"text","skin":"image/common/input_bg.png","prompt":"点击输入文本内容：","maxChars":50,"left":0,"height":74,"fontSize":30,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}},{"type":"Button","props":{"y":8,"width":100,"var":"btn_send","stateNum":2,"skin":"image/common/btn_caidan_01_finish.png","right":30,"labelStrokeColor":"#000000","labelStroke":4,"labelSize":30,"labelFont":"FZXK","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","labelBold":true,"label":"发送","height":57}},{"type":"Button","props":{"y":5,"x":369,"width":60,"var":"btn_biaoQing","stateNum":2,"skin":"image/main/icon_common_biaoqing01up_finish.png","height":60}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.dialog.ChatBigDialogUI.uiView);

        }

    }
}

module ui.dialog {
    export class ChatSendDialogUI extends View {
		public btn_close:Laya.Button;
		public txtInput_0:Laya.TextInput;
		public rad_type:Laya.RadioGroup;
		public btn_send:Laya.Button;
		public btn_biaoQing:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":520,"height":250},"child":[{"type":"Image","props":{"top":0,"skin":"image/common/fram_common_20.png","sizeGrid":"58,30,30,30","right":0,"left":0,"bottom":0}},{"type":"Button","props":{"y":0,"x":471,"width":50,"var":"btn_close","stateNum":2,"skin":"image/common/btn_common_guangbi01up_finish.png","height":50}},{"type":"TextInput","props":{"y":33,"x":12,"width":400,"var":"txtInput_0","type":"text","skin":"image/common/input_bg.png","promptColor":"#ffffff","prompt":"点击输入文本:","maxChars":50,"height":94,"fontSize":30,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}},{"type":"RadioGroup","props":{"y":158,"x":27,"width":434,"var":"rad_type","space":5,"skin":"image/common/comp/check_circle.png","selectedIndex":0,"labels":"当前,世界,组队,帮会","labelSize":25,"labelPadding":"15,0,0,0","labelFont":"Microsoft YaHei","labelBold":true,"height":65}},{"type":"Button","props":{"y":71,"x":401,"width":100,"var":"btn_send","stateNum":2,"skin":"image/common/btn_caidan_01_finish.png","right":19,"labelStrokeColor":"#000000","labelStroke":4,"labelSize":30,"labelFont":"FZXK","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","labelBold":true,"label":"发送","height":57}},{"type":"Button","props":{"y":55,"x":337,"width":60,"var":"btn_biaoQing","stateNum":2,"skin":"image/main/icon_common_biaoqing01up_finish.png","height":60}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.dialog.ChatSendDialogUI.uiView);

        }

    }
}

module ui.dialog {
    export class NpcInfoDialogUI extends View {
		public lbl_npcTitle:Laya.Label;
		public btn_close:Laya.Button;
		public img_npcBg:Laya.Image;
		public img_npcPic:Laya.Image;
		public lbl_npcName:Laya.Label;
		public lbl_npcDes:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":520,"height":500},"child":[{"type":"Image","props":{"y":407,"x":110,"top":0,"skin":"image/common/fram_common_bg_01.png","sizeGrid":"55,42,67,40","right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"y":-10,"x":-10,"top":-10,"skin":"image/common/fram_common_17.png","sizeGrid":"52,60,56,62","right":-10,"left":-10,"bottom":-10}},{"type":"Image","props":{"y":-28,"x":181,"width":238,"skin":"image/common/title_common_01.png","height":81,"centerX":0},"child":[{"type":"Label","props":{"y":20,"x":29,"width":180,"var":"lbl_npcTitle","text":"王摸摸摸","height":40,"fontSize":36,"font":"FZXK","color":"#000000","align":"center"}}]},{"type":"Button","props":{"y":8,"var":"btn_close","stateNum":2,"skin":"image/common/btn_common_guangbi01up_finish.png","right":12}}]},{"type":"Image","props":{"y":63,"x":41,"var":"img_npcBg","skin":"image/common/fram_common_19.png"},"child":[{"type":"Image","props":{"y":-3,"x":-8,"skin":"image/common/fram_common_18.png"},"child":[{"type":"Image","props":{"y":2,"x":7,"var":"img_npcPic","skin":"image/common/npc/img_banshenxiang_juese01.png"}}]}]},{"type":"Label","props":{"y":69,"x":235,"width":262,"var":"lbl_npcName","text":"王大麻子(小二)","height":25,"fontSize":25,"font":"FZXK","color":"#000000","bold":true,"align":"left"}},{"type":"Label","props":{"y":105,"x":239,"width":266,"var":"lbl_npcDes","text":"他看起来骨骼轻盈。\\n他是个店小二。\\n","height":132,"fontSize":20,"font":"SimHei","color":"#000000","align":"left"}},{"type":"Image","props":{"y":302,"skin":"image/main/fram_common_05.png","right":0,"left":0}},{"type":"Image","props":{"y":261,"x":44,"skin":"image/common/icon_haogandu.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.dialog.NpcInfoDialogUI.uiView);

        }

    }
}

module ui.dialog {
    export class SceneInfoDialogUI extends View {
		public tab_scene:Laya.Tab;
		public lbl_sceneName:Laya.Label;
		public btn_close:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":600},"child":[{"type":"Tab","props":{"y":63,"width":54,"var":"tab_scene","stateNum":2,"space":0,"skin":"image/common/btn_common_02up2_finish.png","selectedIndex":0,"scaleY":0.8,"scaleX":1,"left":0,"labels":"介\\n绍,事\\n件,景\\n观,N\\nP\\nC","labelStrokeColor":"#000000","labelStroke":6,"labelSize":30,"labelPadding":"0,0,0,10","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","labelAlign":"left","height":632,"direction":"vertical","sizeGrid":"44,15,38,32"}},{"type":"Box","props":{"y":-6,"right":0,"left":55,"height":594},"child":[{"type":"Image","props":{"top":30,"skin":"image/common/fram_common_bg_01.png","sizeGrid":"55,42,67,40","right":3,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":-10,"skin":"image/common/fram_common_17.png","sizeGrid":"52,60,56,62","right":-10,"left":-10,"bottom":-10}},{"type":"Image","props":{"width":30,"skin":"image/common/btn_common_05.png","height":20,"centerX":0,"bottom":10}}]},{"type":"Image","props":{"width":274,"top":0,"skin":"image/common/title_common_01.png","height":81,"centerX":0},"child":[{"type":"Label","props":{"y":20,"x":47,"width":180,"var":"lbl_sceneName","text":"洛阳城","height":40,"fontSize":36,"font":"FZXK","color":"#000000","align":"center"}}]},{"type":"Button","props":{"var":"btn_close","top":15,"stateNum":2,"skin":"image/common/btn_common_guangbi01up_finish.png","right":0}},{"type":"Box","props":{"y":91,"x":70,"width":404,"height":57},"child":[{"type":"Image","props":{"y":8,"skin":"image/common/img_common_05.png"}},{"type":"Image","props":{"y":33,"x":393,"skin":"image/common/img_common_05.png","rotation":180}},{"type":"Label","props":{"x":104,"width":180,"text":"最近登陆","height":40,"fontSize":36,"font":"FZXK","color":"#000000","align":"center"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.dialog.SceneInfoDialogUI.uiView);

        }

    }
}

module ui.fuBen {
    export class FuBenPanelUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":50,"x":50,"top":0,"skin":"image/common/bg_common_01.png","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"y":555,"x":126,"width":388,"text":"这是副本界面","height":80,"fontSize":40,"font":"Microsoft YaHei","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.fuBen.FuBenPanelUI.uiView);

        }

    }
}

module ui.juese {
    export class JueSePanelUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":10,"x":10,"top":0,"skin":"image/common/bg_common_01.png","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"y":515,"x":136,"width":388,"text":"这是角色界面","height":80,"fontSize":40,"font":"Microsoft YaHei","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.juese.JueSePanelUI.uiView);

        }

    }
}

module ui.main {
    export class MainPanelUI extends View {
		public ui_scene:view.compart.SceneItem;
		public box_npc:Laya.Box;
		public cek_showNpc:Laya.CheckBox;
		public img_npc:Laya.Image;
		public btn_npcHasUp:Laya.Button;
		public btn_npcHasDown:Laya.Button;
		public panel_npc:Laya.Panel;
		public vbox_npc:Laya.VBox;
		public img_01:Laya.Image;
		public img_chat:Laya.Image;
		public lbl_chat:Laya.Label;
		public img_03:Laya.Image;
		public vstack_task:Laya.ViewStack;
		public ui_chatSmallItem:view.compart.ChatSmallItem;
		public box_contextTitle:Laya.Box;
		public lbl_sceneInfo:Laya.Label;
		public btn_sceneMore:Laya.Button;
		public img_mapPic:Laya.Image;
		public lbl_mapName:Laya.Label;
		public btn_worldMap:Laya.Button;
		public box_mainTop:Laya.Box;
		public lbl_gold:Laya.Label;
		public lbl_yuanBao:Laya.Label;
		public lbl_goldlock:Laya.Label;
		public lbl_yuanBaolock:Laya.Label;
		public lbl_level:Laya.Label;
		public clip_power:Laya.FontClip;
		public img_avatarIcon:Laya.Image;
		public lbl_playerName:Laya.Label;
		public font_vipLevel:Laya.FontClip;
		public btn_menu:Laya.Button;
		public box_mainBottom:Laya.Box;
		public box_jueSe:Laya.Box;
		public box_yangCheng:Laya.Box;
		public box_jiangHu:Laya.Box;
		public box_beiBao:Laya.Box;
		public box_juQing:Laya.Box;
		public ui_chatSendDialog:view.dialog.ChatSendDialog;
		public ui_npcInfoDialog:view.dialog.NpcInfoDialog;
		public ui_chatBigDialog:view.dialog.ChatBigDialog;
		public ui_sceneInfoDialog:view.dialog.SceneInfoDialog;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":0,"x":0,"top":0,"skin":"image/common/bg_common_01.png","right":0,"left":0,"bottom":0}},{"type":"SceneItem","props":{"y":253,"var":"ui_scene","runtime":"view.compart.SceneItem","right":0,"left":111,"height":560}},{"type":"Box","props":{"y":256,"x":6,"var":"box_npc"},"child":[{"type":"CheckBox","props":{"y":230,"x":111,"width":47,"var":"cek_showNpc","stateNum":1,"skin":"image/main/btn_common_02.png","selected":false,"label":"label","height":99},"child":[{"type":"Label","props":{"y":22,"x":-7,"width":34,"text":"N\\nP\\nC","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":55,"fontSize":20,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":0,"x":0,"width":112,"var":"img_npc","skin":"image/common/fram_common_bg_01.png","sizeGrid":"58,35,64,45","height":560},"child":[{"type":"Button","props":{"y":519,"x":36,"width":32,"var":"btn_npcHasUp","stateNum":1,"skin":"image/main/btn_common_01.png","label":"label","height":32}},{"type":"Button","props":{"y":41,"x":39,"var":"btn_npcHasDown","stateNum":1,"skin":"image/main/btn_common_01.png","scaleY":-1,"label":"label"}},{"type":"Panel","props":{"y":50,"x":5,"width":100,"var":"panel_npc","height":463},"child":[{"type":"VBox","props":{"y":0,"var":"vbox_npc","right":0,"left":0,"align":"center"}}]}]}]},{"type":"Image","props":{"y":170,"x":642,"width":631,"skin":"image/main/fram_common_05.png","rotation":90,"height":19}},{"type":"Image","props":{"y":822,"x":644,"skin":"image/main/fram_common_06.png","rotation":180}},{"type":"Image","props":{"y":822,"x":620,"width":620,"skin":"image/main/fram_common_05.png","rotation":180,"height":19}},{"type":"Image","props":{"y":821,"x":0,"skin":"image/main/fram_common_06.png","rotation":270}},{"type":"Image","props":{"y":254,"x":-8,"width":27,"skin":"image/common/fram_common_07.png","sizeGrid":"18,12,20,13","height":567}},{"type":"Image","props":{"y":812,"x":0,"skin":"image/main/fram_common_10.png","right":0,"left":0}},{"type":"Box","props":{"y":827,"x":16},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"img_01","skin":"image/main/btn_common_01up.png"},"child":[{"type":"Image","props":{"y":6,"x":3,"width":60,"skin":"image/main/icon_main_renwu.png","height":51},"child":[{"type":"Label","props":{"y":33,"x":-5,"width":69,"text":"任务","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":31,"fontSize":26,"font":"FZXK","color":"#ffffff","align":"center"}}]}]},{"type":"Image","props":{"y":76,"x":0,"var":"img_chat","skin":"image/main/btn_common_01up.png"},"child":[{"type":"Image","props":{"y":6,"x":3,"width":60,"skin":"image/main/icon_main_liaotian.png","height":51},"child":[{"type":"Label","props":{"y":33,"x":-2,"width":69,"var":"lbl_chat","text":"聊天","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":31,"fontSize":26,"font":"FZXK","color":"#ffffff","align":"center"}}]}]},{"type":"Image","props":{"y":152,"x":0,"var":"img_03","skin":"image/main/btn_common_01up.png"},"child":[{"type":"Image","props":{"y":6,"x":3,"width":60,"skin":"image/main/icon_main_weizhi.png","height":51},"child":[{"type":"Label","props":{"y":33,"x":-2,"width":69,"text":"位置","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":31,"fontSize":26,"font":"FZXK","color":"#ffffff","align":"center"}}]}]}]},{"type":"ViewStack","props":{"y":819,"x":99,"width":530,"var":"vstack_task","selectedIndex":0,"height":237},"child":[{"type":"Label","props":{"y":65,"x":77,"width":388,"text":"这是游戏主界面0","name":"item0","height":80,"fontSize":40,"font":"Microsoft YaHei","bold":true,"align":"center"}},{"type":"ChatSmallItem","props":{"x":-16,"var":"ui_chatSmallItem","runtime":"view.compart.ChatSmallItem","name":"item1","bottom":7}},{"type":"Label","props":{"y":65,"x":77,"width":388,"text":"这是游戏主界面2","name":"item2","height":80,"fontSize":40,"font":"Microsoft YaHei","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":130,"x":-5,"width":656,"var":"box_contextTitle","height":134},"child":[{"type":"Image","props":{"y":2,"x":27,"skin":"image/main/fram_common_05.png"}},{"type":"Image","props":{"skin":"image/main/fram_common_06.png"}},{"type":"Image","props":{"x":653,"skin":"image/main/fram_common_06.png","rotation":90}},{"type":"Image","props":{"y":115,"x":44,"skin":"image/main/fram_common_05.png"}},{"type":"Image","props":{"y":20,"x":87,"width":485,"skin":"image/main/fram_common_08.png","sizeGrid":"0,41,0,40","height":96},"child":[{"type":"Label","props":{"y":12,"x":63,"wordWrap":true,"width":377,"var":"lbl_sceneInfo","text":"洛阳故城XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX","height":71,"fontSize":22,"color":"#ffffff","align":"left"}},{"type":"Button","props":{"y":57,"x":400,"width":32,"var":"btn_sceneMore","stateNum":1,"skin":"image/main/btn_common_01.png","height":32}}]},{"type":"Image","props":{"y":11,"x":13,"width":117,"var":"img_mapPic","skin":"image/main/img_main_luoyang.png","height":117},"child":[{"type":"Image","props":{"y":79,"x":-17,"width":148,"skin":"image/common/title_common_01.png","height":46},"child":[{"type":"Label","props":{"y":7,"x":14,"width":119,"var":"lbl_mapName","text":"洛阳洛阳","strokeColor":"#000000","stroke":6,"mouseThrough":true,"height":31,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]}]},{"type":"Button","props":{"y":13,"x":536,"var":"btn_worldMap","stateNum":2,"skin":"image/main/icon_main_ditu_finish.png"}}]},{"type":"Box","props":{"y":0,"x":0,"var":"box_mainTop","top":0,"right":0,"left":0},"child":[{"type":"Box","props":{"y":0,"right":0},"child":[{"type":"Image","props":{"y":-2,"x":-2,"width":559,"top":-5,"skin":"image/main/fram_common_02.png","sizeGrid":"5,5,5,5","right":0,"height":50}},{"type":"Box","props":{"y":0,"x":52},"child":[{"type":"Image","props":{"y":0,"x":-12,"width":50,"skin":"image/main/icon_common_jinbi01.png","height":40}},{"type":"Label","props":{"y":7,"x":35,"width":83,"var":"lbl_gold","text":"111万","height":32,"fontSize":25,"font":"Arial","color":"#ffffff","bold":false,"align":"left"}}]},{"type":"Box","props":{"y":0,"x":180},"child":[{"type":"Image","props":{"y":0,"x":-12,"width":50,"skin":"image/main/icon_common_yuanbao01.png","height":40}},{"type":"Label","props":{"y":7,"x":35,"width":83,"var":"lbl_yuanBao","text":"111万","height":32,"fontSize":25,"font":"Arial","color":"#ffffff","bold":false,"align":"left"}}]},{"type":"Box","props":{"y":0,"x":309},"child":[{"type":"Image","props":{"y":0,"x":-12,"width":50,"skin":"image/main/icon_common_jinbi01.png","height":40},"child":[{"type":"Image","props":{"y":22,"x":27,"width":15,"skin":"image/main/icon_common_shuo01.png","height":20}}]},{"type":"Label","props":{"y":7,"x":35,"width":83,"var":"lbl_goldlock","text":"111万","height":32,"fontSize":25,"font":"Arial","color":"#ffffff","bold":false,"align":"left"}}]},{"type":"Box","props":{"y":0,"x":437},"child":[{"type":"Image","props":{"y":0,"x":-12,"width":50,"skin":"image/main/icon_common_yuanbao01.png","height":40},"child":[{"type":"Image","props":{"y":22,"x":27,"width":15,"skin":"image/main/icon_common_shuo01.png","height":20}}]},{"type":"Label","props":{"y":7,"x":35,"width":83,"var":"lbl_yuanBaolock","text":"111万","height":32,"fontSize":25,"font":"Arial","color":"#ffffff","bold":false,"align":"left"}}]}]},{"type":"Box","props":{"y":53,"x":17},"child":[{"type":"Image","props":{"y":0,"x":96,"skin":"image/main/fram_common_03.png","height":40},"child":[{"type":"Label","props":{"y":5,"x":10,"width":69,"text":"等级:","mouseThrough":true,"height":30,"fontSize":25,"font":"FZXK","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":3,"x":77,"width":128,"var":"lbl_level","valign":"top","text":"666666","height":35,"fontSize":25,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]},{"type":"Image","props":{"y":-11,"x":280,"skin":"image/common/fram_common_vipdi.png"},"child":[{"type":"Image","props":{"y":13,"x":23,"skin":"image/main/zi_zhanli_01.png"}},{"type":"FontClip","props":{"y":18,"x":74,"var":"clip_power","value":"555555555","spaceX":-8,"skin":"image/common/number/zi_shuzi01.png","sheet":"0123456789"}}]}]},{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":4,"x":17,"var":"img_avatarIcon","skin":"image/common/icon_nv01.png"}},{"type":"Image","props":{"x":3,"width":130,"skin":"image/main/fram_common_01.png","height":130}},{"type":"Image","props":{"y":115,"skin":"image/common/fram_common_04.png"},"child":[{"type":"Label","props":{"y":5,"x":0,"width":151,"var":"lbl_playerName","text":"玩家姓名拉拉","height":31,"fontSize":24,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":-12,"x":-22,"skin":"image/common/fram_common_vipdi.png","scaleY":0.8,"scaleX":0.8,"alpha":0.8}},{"type":"Image","props":{"y":-3,"x":-1,"width":25,"skin":"image/common/zi_vip_01.png","height":30}},{"type":"FontClip","props":{"y":9,"x":10,"var":"font_vipLevel","value":"1","spaceX":-10,"skin":"image/common/number/zi_shuzi01.png","sheet":"0123456789"}}]},{"type":"Button","props":{"y":41,"width":120,"var":"btn_menu","stateNum":2,"skin":"image/common/btn_caidan_01_finish.png","right":0,"height":58},"child":[{"type":"Label","props":{"y":14,"x":26,"width":69,"text":"菜单","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":31,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]}]},{"type":"Box","props":{"y":1022,"x":0,"width":640,"var":"box_mainBottom","right":0,"left":0,"height":114,"bottom":0},"child":[{"type":"Box","props":{"x":0,"var":"box_jueSe","bottom":0},"child":[{"type":"Radio","props":{"y":33,"x":0,"width":130,"stateNum":2,"skin":"image/main/btn_common_02up_finish.png","height":55}},{"type":"Radio","props":{"y":-10,"x":16,"stateNum":2,"skin":"image/main/icon_common_juese01up_finish.png","scaleY":1.2,"scaleX":1.2},"child":[{"type":"Label","props":{"y":53,"x":-9,"width":98,"text":"角色","strokeColor":"#000000","stroke":4,"height":33,"fontSize":30,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]}]},{"type":"Box","props":{"x":126,"var":"box_yangCheng","bottom":0},"child":[{"type":"Radio","props":{"y":33,"x":0,"width":130,"stateNum":2,"skin":"image/main/btn_common_02up_finish.png","height":55}},{"type":"Radio","props":{"y":-10,"x":16,"stateNum":2,"skin":"image/main/icon_common_yangcheng01up_finish.png","scaleY":1.2,"scaleX":1.2},"child":[{"type":"Label","props":{"y":53,"x":-9,"width":98,"text":"养成","strokeColor":"#000000","stroke":4,"height":33,"fontSize":30,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]}]},{"type":"Box","props":{"y":26,"x":252,"var":"box_jiangHu","bottom":0},"child":[{"type":"Radio","props":{"y":33,"x":0,"width":130,"stateNum":2,"skin":"image/main/btn_common_02up_finish.png","height":55}},{"type":"Radio","props":{"y":-10,"x":16,"stateNum":2,"skin":"image/main/icon_common_shejiao01up_finish.png","scaleY":1.2,"scaleX":1.2},"child":[{"type":"Label","props":{"y":53,"x":-9,"width":98,"text":"江湖","strokeColor":"#000000","stroke":4,"height":33,"fontSize":30,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]}]},{"type":"Box","props":{"x":378,"var":"box_beiBao","bottom":0},"child":[{"type":"Radio","props":{"y":33,"x":0,"width":130,"stateNum":2,"skin":"image/main/btn_common_02up_finish.png","height":55}},{"type":"Radio","props":{"y":-10,"x":16,"stateNum":2,"skin":"image/main/icon_common_beibao01up_finish.png","scaleY":1.2,"scaleX":1.2},"child":[{"type":"Label","props":{"y":53,"x":-9,"width":98,"text":"背包","strokeColor":"#000000","stroke":4,"height":33,"fontSize":30,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]}]},{"type":"Box","props":{"var":"box_juQing","right":-5,"bottom":-15},"child":[{"type":"Radio","props":{"y":50,"x":0,"width":130,"stateNum":2,"skin":"image/main/btn_common_02up_finish.png","height":55}},{"type":"Radio","props":{"y":-7,"x":-9,"width":119,"stateNum":2,"skin":"image/main/btn_common_04up_finish.png","scaleY":1.2,"scaleX":1.2,"height":116}},{"type":"Radio","props":{"y":9,"x":14,"stateNum":2,"skin":"image/main/icon_common_juqingfubeng01up_finish.png","scaleY":1.2,"scaleX":1.2},"child":[{"type":"Label","props":{"y":63,"x":-11,"width":110,"text":"剧情副本","strokeColor":"#000000","stroke":4,"height":33,"fontSize":28,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]}]}]},{"type":"ChatSendDialog","props":{"y":564,"var":"ui_chatSendDialog","runtime":"view.dialog.ChatSendDialog","right":4}},{"type":"NpcInfoDialog","props":{"y":237,"x":118,"var":"ui_npcInfoDialog","runtime":"view.dialog.NpcInfoDialog"}},{"type":"ChatBigDialog","props":{"y":245,"x":0,"var":"ui_chatBigDialog","runtime":"view.dialog.ChatBigDialog"}},{"type":"SceneInfoDialog","props":{"y":230,"x":39,"var":"ui_sceneInfoDialog","runtime":"view.dialog.SceneInfoDialog"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("view.compart.SceneItem",view.compart.SceneItem);
			View.regComponent("view.compart.ChatSmallItem",view.compart.ChatSmallItem);
			View.regComponent("view.dialog.ChatSendDialog",view.dialog.ChatSendDialog);
			View.regComponent("view.dialog.NpcInfoDialog",view.dialog.NpcInfoDialog);
			View.regComponent("view.dialog.ChatBigDialog",view.dialog.ChatBigDialog);
			View.regComponent("view.dialog.SceneInfoDialog",view.dialog.SceneInfoDialog);

            super.createChildren();
            this.createView(ui.main.MainPanelUI.uiView);

        }

    }
}

module ui.sheJiao {
    export class SheJiaoPanelUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":20,"x":20,"top":0,"skin":"image/common/bg_common_01.png","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"y":525,"x":126,"width":388,"text":"这是社交界面","height":80,"fontSize":40,"font":"Microsoft YaHei","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.sheJiao.SheJiaoPanelUI.uiView);

        }

    }
}

module ui.yangCheng {
    export class YangChengPanelUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":30,"x":30,"top":0,"skin":"image/common/bg_common_01.png","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"y":535,"x":126,"width":388,"text":"这是养成界面","height":80,"fontSize":40,"font":"Microsoft YaHei","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.yangCheng.YangChengPanelUI.uiView);

        }

    }
}
