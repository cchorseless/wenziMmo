import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.common {
    export class GmPanelUI extends Laya.View {
		public btn_getItem:Laya.Button;
		public btn_close:Laya.Button;
		public input_ID:Laya.TextInput;
		public input_Count:Laya.TextInput;
        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"compId":1,"child":[{"type":"Image","props":{"y":10,"x":10,"top":0,"skin":"image/common/default/img_blackBg.png","right":0,"left":0,"bottom":0,"alpha":0.5},"compId":2},{"type":"Button","props":{"y":782,"x":175,"width":289,"var":"btn_getItem","stateNum":1,"skin":"image/main/btn_basic1.png","labelSize":40,"labelFont":"Microsoft YaHei","labelBold":true,"label":"获取道具","height":134},"compId":3},{"type":"Button","props":{"y":160,"x":461,"width":130,"var":"btn_close","stateNum":1,"skin":"image/main/btn_basic1.png","labelSize":40,"labelFont":"Microsoft YaHei","labelBold":true,"label":"关闭","height":95},"compId":4},{"type":"Box","props":{"y":342,"x":190},"compId":9,"child":[{"type":"Label","props":{"x":52,"width":159,"text":"道具ID","height":64,"fontSize":40,"font":"mini","color":"#f8f6f6","bold":true},"compId":5},{"type":"TextInput","props":{"y":85,"x":5,"width":255,"var":"input_ID","type":"number","text":"道具ID","height":79,"fontSize":40,"font":"mini","bold":true,"bgColor":"#f1e4e4"},"compId":6},{"type":"Label","props":{"y":198,"x":47,"width":159,"text":"道具数量","height":64,"fontSize":40,"font":"mini","color":"#f8f6f6","bold":true},"compId":7},{"type":"TextInput","props":{"y":283,"width":255,"var":"input_Count","type":"number","text":"道具ID","height":79,"fontSize":40,"font":"mini","bold":true,"bgColor":"#f1e4e4"},"compId":8}]}],"loadList":["image/common/default/img_blackBg.png","image/main/btn_basic1.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.GmPanelUI.uiView);
        }
    }
}
module ui.common {
    export class LoginPanelUI extends Laya.View {
		public box_login:Laya.Box;
		public input_account:Laya.TextInput;
		public input_passworld:Laya.TextInput;
		public btn_Login:Laya.Button;
		public box_start:Laya.Box;
		public btn_selectServer:Laya.Image;
		public lbl_server:Laya.Label;
		public img_avatarIcon:Laya.Image;
		public lbl_avatarDes:Laya.Label;
		public box_randomName:Laya.Box;
		public input_random:Laya.TextInput;
		public btn_randomName:Laya.Image;
		public btn_startGame:Laya.Image;
		public box_fail:Laya.Box;
		public lbl_versionInfo:Laya.Label;
		public btn_notice:Laya.Button;
        public static  uiView:any ={"type":"View","props":{"width":640,"name":"LoginPanel","height":1136},"compId":1,"child":[{"type":"Image","props":{"width":640,"top":0,"skin":"image/login/login_bg.jpg","right":0,"left":0,"height":1145,"bottom":0},"compId":3},{"type":"ViewStack","props":{"top":0,"selectedIndex":0,"right":0,"left":0,"bottom":0},"compId":37,"child":[{"type":"Box","props":{"y":666,"x":126,"var":"box_login","name":"item0"},"compId":21,"child":[{"type":"TextInput","props":{"y":0,"x":0,"width":388,"var":"input_account","valign":"middle","type":"text","text":"账号","skin":"task_bg.png","sizeGrid":"46,71,50,64","height":118,"fontSize":40,"font":"mini","bold":true,"align":"center"},"compId":11},{"type":"TextInput","props":{"y":115,"x":0,"width":388,"var":"input_passworld","valign":"middle","type":"password","text":"nnnnnnn","skin":"task_bg.png","sizeGrid":"46,71,50,64","height":118,"fontSize":40,"font":"mini","bold":true,"align":"center"},"compId":12},{"type":"Button","props":{"y":235,"x":81,"var":"btn_Login","stateNum":2,"skin":"buttonCom.png","labelSize":40,"labelFont":"Microsoft YaHei","labelColors":"#ffffff","labelBold":true,"label":"登陆"},"compId":41}]},{"type":"Box","props":{"y":659,"x":172,"var":"box_start","name":"item1"},"compId":20,"child":[{"type":"Image","props":{"x":302,"width":103,"var":"btn_selectServer","skin":"image/common/skill_icon_48.png","height":102},"compId":5},{"type":"Image","props":{"y":12,"width":296,"skin":"image/common/stage_map_2.png","sizeGrid":"14,25,32,15","height":92},"compId":15,"child":[{"type":"Label","props":{"width":296,"var":"lbl_server","valign":"middle","top":0,"text":"测试1服","right":0,"left":0,"height":92,"fontSize":30,"font":"mini","color":"#060606","bottom":28,"bold":true,"align":"center"},"compId":16}]},{"type":"Box","props":{"y":115,"x":-27,"width":368,"height":311},"compId":33,"child":[{"type":"Image","props":{"x":119,"width":120,"var":"img_avatarIcon","skin":"image/common/avatarDefault.png","height":120},"compId":22},{"type":"Label","props":{"y":146,"x":0,"width":355,"var":"lbl_avatarDes","text":"89级-超级玛丽亚","height":43,"fontSize":25,"font":"mini","color":"#0b0000","bold":true,"align":"center"},"compId":32},{"type":"Box","props":{"y":115,"x":0,"var":"box_randomName"},"compId":36,"child":[{"type":"TextInput","props":{"y":31,"x":0,"width":355,"var":"input_random","type":"text","promptColor":"#060606","prompt":"点击随机名字","height":43,"fontSize":25,"font":"mini","color":"#0b0101","bold":true,"align":"center"},"compId":34},{"type":"Image","props":{"y":90,"x":302,"var":"btn_randomName","skin":"image/common/skill_icon_54.png","rotation":-90},"compId":35}]},{"type":"Image","props":{"y":209,"x":77,"width":210,"var":"btn_startGame","skin":"image/common/stage_map_2.png","sizeGrid":"14,25,32,15","height":92},"compId":23,"child":[{"type":"Label","props":{"width":296,"valign":"middle","top":0,"text":"进入游戏","right":0,"left":0,"height":92,"fontSize":40,"font":"mini","color":"#060606","bottom":28,"bold":true,"align":"center"},"compId":24}]}]}]},{"type":"Box","props":{"y":808,"x":175,"var":"box_fail","name":"item2"},"compId":29,"child":[{"type":"Image","props":{"width":334,"skin":"image/common/stage_map_2.png","sizeGrid":"14,25,32,15","height":92},"compId":25,"child":[{"type":"Label","props":{"y":0,"x":0,"width":296,"valign":"middle","top":0,"text":"拉取列表失败","right":0,"left":0,"height":92,"fontSize":40,"font":"mini","color":"#fd0a06","bottom":28,"bold":true,"align":"center"},"compId":26}]},{"type":"Image","props":{"y":122,"x":68,"width":216,"skin":"image/common/stage_map_2.png","sizeGrid":"14,25,32,15","height":92},"compId":27,"child":[{"type":"Label","props":{"y":0,"x":0,"width":296,"valign":"middle","top":0,"text":"点击退出","right":0,"left":0,"height":92,"fontSize":40,"font":"mini","color":"#060606","bottom":28,"bold":true,"align":"center"},"compId":28}]}]}]},{"type":"Label","props":{"y":0,"x":0,"width":261,"var":"lbl_versionInfo","text":"版本:1.0.0","height":52,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","bold":true},"compId":38},{"type":"Button","props":{"y":5,"x":479,"width":159,"var":"btn_notice","labelSize":30,"labelFont":"Microsoft YaHei","labelColors":"#ffffff","labelBold":true,"label":"[游戏公告]","height":53},"compId":39}],"loadList":["image/login/login_bg.jpg","task_bg.png","buttonCom.png","image/common/skill_icon_48.png","image/common/stage_map_2.png","image/common/avatarDefault.png","image/common/skill_icon_54.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.LoginPanelUI.uiView);
        }
    }
}
module ui.common {
    export class NetLoadingPanelUI extends Laya.View {
        public static  uiView:any ={"type":"View","props":{"width":640,"top":0,"right":0,"name":"NetLoadingPanel","left":0,"height":1136,"bottom":0},"compId":1,"loadList":[],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.NetLoadingPanelUI.uiView);
        }
    }
}
module ui.common {
    export class ResLoadingPanelUI extends Laya.View {
        public static  uiView:any ={"type":"View","props":{"width":640,"top":0,"right":0,"name":"ResLoadingPanel","left":0,"height":1136,"bottom":0},"compId":1,"loadList":[],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.ResLoadingPanelUI.uiView);
        }
    }
}
module ui.common {
    export class ServerErrorPanelUI extends Laya.View {
		public lbl_des:Laya.Label;
		public lbl_reLogin:Laya.Label;
        public static  uiView:any ={"type":"View","props":{"width":640,"name":"ServerErrorPanel","height":1136},"compId":1,"child":[{"type":"Image","props":{"top":0,"skin":"image/common/default/img_blackBg.png","right":0,"left":0,"bottom":0,"alpha":0.5},"compId":2},{"type":"Label","props":{"y":495,"x":0,"var":"lbl_des","valign":"middle","text":"la","right":0,"left":0,"height":145,"fontSize":40,"font":"Microsoft YaHei","color":"#fffdfd","bold":true,"align":"center"},"compId":3},{"type":"Label","props":{"y":710,"x":174,"width":292,"var":"lbl_reLogin","valign":"middle","underline":true,"text":"[点击重新登陆]","height":224,"fontSize":40,"font":"Microsoft YaHei","color":"#f90303","bold":true,"align":"center"},"compId":5}],"loadList":["image/common/default/img_blackBg.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.ServerErrorPanelUI.uiView);
        }
    }
}
module ui.common {
    export class ServerItemUI extends Laya.View {
		public lbl_serverName:Laya.Label;
        public static  uiView:any ={"type":"View","props":{"width":230,"height":120},"compId":1,"child":[{"type":"Image","props":{"top":0,"skin":"image/common/stage_map_25.png","right":0,"left":0,"bottom":0},"compId":2,"child":[{"type":"Label","props":{"var":"lbl_serverName","valign":"middle","top":0,"text":"label","right":0,"left":0,"fontSize":30,"font":"mini","color":"#0a0909","bottom":0,"bold":true,"align":"center"},"compId":3}]}],"loadList":["image/common/stage_map_25.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.ServerItemUI.uiView);
        }
    }
}
module ui.common {
    export class ServerListDialogUI extends Laya.Dialog {
        public static  uiView:any ={"type":"Dialog","props":{"width":640,"height":1136},"compId":1,"child":[{"type":"Box","props":{"y":274,"x":10,"width":640,"right":0,"left":0,"height":505},"compId":2,"child":[{"type":"Image","props":{"top":0,"skin":"image/login/artifact_frame.png","sizeGrid":"32,36,26,32","right":0,"left":0,"bottom":0},"compId":3},{"type":"Image","props":{"y":27,"x":13,"width":615,"sizeGrid":"20,31,21,33","height":93},"compId":4,"child":[{"type":"Label","props":{"width":156,"valign":"top","top":0,"text":"服务器列表","right":0,"left":0,"height":45,"fontSize":30,"font":"Microsoft YaHei","color":"#080808","bottom":0,"bold":true,"align":"center"},"compId":5}]},{"type":"Panel","props":{"y":86,"x":52,"width":536,"height":392},"compId":6}]}],"loadList":["image/login/artifact_frame.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.ServerListDialogUI.uiView);
        }
    }
}
module ui.common {
    export class ServerNoticeDialogUI extends Laya.Dialog {
        public static  uiView:any ={"type":"Dialog","props":{"width":640,"height":1136},"compId":1,"child":[{"type":"Image","props":{"y":224,"x":34,"skin":"image/login/announcement_bg.png"},"compId":3,"child":[{"type":"TextArea","props":{"y":126,"x":50,"width":478,"type":"text","text":"这是游戏公告","height":508,"fontSize":40,"font":"Microsoft YaHei"},"compId":4}]}],"loadList":["image/login/announcement_bg.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.ServerNoticeDialogUI.uiView);
        }
    }
}
module ui.common {
    export class StartLoadingPanelUI extends Laya.View {
		public img_bg:Laya.Image;
		public lbl_progress:Laya.Label;
        public static  uiView:any ={"type":"View","props":{"width":640,"top":0,"right":0,"name":"StartLoadingPanel","left":0,"height":1136,"bottom":0},"compId":1,"child":[{"type":"Image","props":{"var":"img_bg","top":0,"skin":"image/login/offline_fight_bg.jpg","right":0,"left":0,"bottom":0},"compId":5},{"type":"Label","props":{"var":"lbl_progress","text":"label","right":0,"left":-2,"height":60,"fontSize":40,"color":"#0b0606","centerY":-158,"bold":true,"align":"center"},"compId":6}],"loadList":["image/login/offline_fight_bg.jpg"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.StartLoadingPanelUI.uiView);
        }
    }
}
module ui.common {
    export class TipsShowPanelUI extends Laya.View {
		public lbl_des:Laya.Label;
        public static  uiView:any ={"type":"View","props":{"width":400,"name":"TipsShowPanel","height":50},"compId":1,"child":[{"type":"Box","props":{"top":0,"right":0,"left":0,"bottom":0},"compId":5,"child":[{"type":"Image","props":{"top":0,"skin":"image/common/default/img_tipsbg.png","sizeGrid":"18,19,17,20","right":0,"left":0,"bottom":0},"compId":2},{"type":"Label","props":{"var":"lbl_des","valign":"top","top":0,"text":"label","right":0,"left":0,"fontSize":30,"font":"mini","color":"#f3ecec","bottom":0,"bold":true,"align":"center"},"compId":3}]}],"loadList":["image/common/default/img_tipsbg.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.TipsShowPanelUI.uiView);
        }
    }
}