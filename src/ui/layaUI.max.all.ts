
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.beiBao {
    export class BeiBaoPanelUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":40,"x":40,"top":0,"skin":"image/common/bg.jpg","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"y":545,"x":166,"width":388,"text":"这是角色界面","height":80,"fontSize":40,"font":"Microsoft YaHei","bold":true,"align":"center"}},{"type":"Image","props":{"y":777,"x":40,"skin":"image/main/bg_line.png","right":0,"pivotY":-2,"pivotX":2,"left":0,"height":27}},{"type":"Button","props":{"y":754,"x":524,"width":125,"stateNum":2,"skin":"image/main/all_mode_down_finish.png","height":58}},{"type":"Button","props":{"y":821,"x":52,"width":89,"stateNum":2,"skin":"image/common/btn02.png","height":101}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.beiBao.BeiBaoPanelUI.uiView);

        }

    }
}

module ui.common {
    export class CreateAvatarPanelUI extends View {
		public input_random:Laya.TextInput;
		public btn_randomName:Laya.Button;
		public btn_startGame:Laya.Button;
		public img_hero:Laya.Image;
		public rad_sex:Laya.RadioGroup;
		public rad_job:Laya.RadioGroup;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"top":0,"skin":"image/common/bg.jpg","right":0,"left":0,"bottom":0}},{"type":"Box","props":{"y":915,"x":49},"child":[{"type":"TextInput","props":{"y":-4,"x":11,"width":355,"var":"input_random","type":"text","skin":"image/common/login/task_bg.png","promptColor":"#060606","prompt":"点击随机名字","height":85,"fontSize":25,"font":"mini","color":"#000000","bold":true,"align":"center"}},{"type":"Button","props":{"y":-11,"x":287,"width":88,"var":"btn_randomName","stateNum":2,"skin":"image/common/login/dice_norm_finish.png","label":"label","height":92}}]},{"type":"Button","props":{"y":847,"x":415,"var":"btn_startGame","stateNum":2,"skin":"image/common/login/start_game_down_finish.png","labelSize":40,"labelPadding":"0,0,10,0","labelFont":"Microsoft YaHei","labelColors":"#ffffff","labelBold":true}},{"type":"Image","props":{"y":74,"x":16,"width":607,"var":"img_hero","skin":"image/common/nv03.png","height":571}},{"type":"RadioGroup","props":{"y":801,"x":95,"var":"rad_sex","space":50,"skin":"image/common/comp/check_circle.png","selectedIndex":0,"labels":"男,女","labelSize":50,"labelFont":"Microsoft YaHei","labelBold":true,"labelAlign":"center"}},{"type":"RadioGroup","props":{"y":702,"x":34,"var":"rad_job","space":40,"skin":"image/common/comp/check_circle.png","selectedIndex":0,"labels":"道士,法师,战士","labelSize":50,"labelFont":"Microsoft YaHei","labelBold":true,"labelAlign":"center"}},{"type":"Image","props":{"y":456,"x":107,"width":230,"skin":"image/common/energy.jpg","height":188}}]};
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
		public stack_login:Laya.ViewStack;
		public box_login:Laya.Box;
		public input_account:Laya.TextInput;
		public input_password:Laya.TextInput;
		public btn_Login:Laya.Button;
		public box_start:Laya.Box;
		public lbl_server:Laya.Label;
		public btn_selectServer:Laya.Button;
		public img_avatarIcon:Laya.Image;
		public lbl_avatarDes:Laya.Label;
		public btn_startGame:Laya.Button;
		public box_fail:Laya.Box;
		public lbl_versionInfo:Laya.Label;
		public btn_notice:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":640,"name":"LoginPanel","height":1136},"child":[{"type":"Image","props":{"width":640,"top":0,"skin":"image/common/login/login_bg.jpg","right":0,"left":0,"height":1145,"bottom":0}},{"type":"ViewStack","props":{"var":"stack_login","top":0,"selectedIndex":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Box","props":{"y":764,"x":148,"var":"box_login","name":"item0"},"child":[{"type":"TextInput","props":{"y":9,"x":8,"width":353,"var":"input_account","valign":"middle","type":"text","skin":"image/common/login/task_bg.png","sizeGrid":"46,71,50,64","promptColor":"#000000","prompt":"账号","height":79,"fontSize":40,"font":"mini","bold":true,"align":"center"}},{"type":"TextInput","props":{"y":96,"x":8,"width":344,"var":"input_password","valign":"middle","type":"password","skin":"image/common/login/task_bg.png","sizeGrid":"46,71,50,64","promptColor":"#000000","prompt":"密码","height":79,"fontSize":40,"font":"mini","bold":true,"align":"center"}},{"type":"Button","props":{"y":166,"x":72,"var":"btn_Login","stateNum":2,"skin":"image/common/login/start_game_down_finish.png","labelSize":40,"labelPadding":"0,0,10,0","labelFont":"Microsoft YaHei","labelColors":"#ffffff","labelBold":true}}]},{"type":"Box","props":{"y":659,"x":172,"width":388,"var":"box_start","name":"item1","height":426},"child":[{"type":"Image","props":{"y":12,"x":4,"width":296,"skin":"image/common/login/task_bg.png","sizeGrid":"14,25,32,15","height":92},"child":[{"type":"Label","props":{"width":296,"var":"lbl_server","valign":"middle","top":20,"text":"测试1服","right":0,"left":-10,"height":92,"fontSize":30,"font":"mini","color":"#060606","bottom":28,"bold":true,"align":"center"}}]},{"type":"Button","props":{"y":20,"x":235,"width":80,"var":"btn_selectServer","stateNum":2,"skin":"image/common/add_res_down_finish.png","height":80}},{"type":"Box","props":{"y":115,"x":-27,"width":368,"height":311},"child":[{"type":"Image","props":{"x":119,"width":120,"var":"img_avatarIcon","skin":"image/common/icon_nan01.png","height":120}},{"type":"Label","props":{"y":139,"x":41,"width":286,"var":"lbl_avatarDes","text":"89级-超级玛丽亚","height":34,"fontSize":30,"font":"Microsoft YaHei","color":"#fbf8f8","bold":true,"align":"center"}},{"type":"Button","props":{"y":185,"x":49,"var":"btn_startGame","stateNum":2,"skin":"image/common/login/start_game_down_finish.png","labelSize":40,"labelPadding":"0,0,10,0","labelFont":"Microsoft YaHei","labelColors":"#ffffff","labelBold":true}}]}]},{"type":"Box","props":{"y":792,"x":170,"var":"box_fail","name":"item2"},"child":[{"type":"Image","props":{"width":334,"skin":"image/common/login/task_bg.png","sizeGrid":"14,25,32,15","height":92},"child":[{"type":"Label","props":{"width":334,"valign":"middle","top":12,"text":"拉取列表失败","right":0,"left":0,"height":52,"fontSize":40,"font":"mini","color":"#fd0a06","bottom":28,"bold":true,"align":"center"}}]},{"type":"Button","props":{"y":110,"x":53,"stateNum":2,"skin":"image/common/buttonCom.png","labelSize":40,"labelPadding":"0,0,10,0","labelFont":"Microsoft YaHei","labelColors":"#ffffff","labelBold":true,"label":"退出"}}]}]},{"type":"Label","props":{"y":0,"x":0,"width":261,"var":"lbl_versionInfo","text":"版本:1.0.0","height":52,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","bold":true}},{"type":"Button","props":{"y":5,"x":479,"width":159,"var":"btn_notice","labelSize":30,"labelFont":"Microsoft YaHei","labelColors":"#ffffff","labelBold":true,"label":"[游戏公告]","height":53}}]};
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

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Box","props":{"y":284,"x":20,"width":640,"right":0,"left":0,"height":505},"child":[{"type":"Image","props":{"top":0,"skin":"image/common/serverList/artifact_frame.png","sizeGrid":"32,36,26,32","right":0,"left":0,"bottom":0}},{"type":"Image","props":{"y":27,"x":13,"width":615,"sizeGrid":"20,31,21,33","height":93},"child":[{"type":"Label","props":{"width":156,"valign":"top","top":0,"text":"服务器列表","right":0,"left":0,"height":45,"fontSize":30,"font":"Microsoft YaHei","color":"#080808","bottom":0,"bold":true,"align":"center"}}]},{"type":"Panel","props":{"y":86,"x":52,"width":536,"height":392}}]}]};
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

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"var":"img_bg","top":0,"skin":"image/common/default/img_blackBg.png","right":0,"left":0,"bottom":0,"alpha":0.7}},{"type":"Image","props":{"y":234,"x":44,"skin":"image/common/serverNotice/announcement_bg.png"},"child":[{"type":"TextArea","props":{"y":126,"x":50,"width":478,"type":"text","text":"这是游戏公告","multiline":true,"height":508,"fontSize":40,"font":"Microsoft YaHei","editable":false}}]}]};
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

        public static  uiView:any ={"type":"View","props":{"width":400,"name":"TipsShowPanel","height":50},"child":[{"type":"Box","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"image/common/default/img_tipsbg.png","sizeGrid":"18,19,17,20","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"var":"lbl_des","valign":"top","top":0,"text":"label","right":0,"left":0,"fontSize":30,"font":"mini","color":"#f3ecec","bottom":0,"bold":true,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.TipsShowPanelUI.uiView);

        }

    }
}

module ui.compart {
    export class BodyItemUI extends View {
		public img_hp_bg:Laya.Image;
		public img_hp:Laya.Image;
		public img_frame:Laya.Image;
		public img_tupe:Laya.Image;
		public lbl_name:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":215,"height":75},"child":[{"type":"Image","props":{"y":15,"x":28,"skin":"image/main/player_hp_bg.png"}},{"type":"Image","props":{"y":15,"x":28,"var":"img_hp_bg","skin":"image/main/player_hp_base.png"}},{"type":"Image","props":{"y":15,"x":28,"var":"img_hp","skin":"image/main/player_hp.png"}},{"type":"Image","props":{"y":1,"x":1,"var":"img_frame","skin":"image/main/suit_bg_0.png"}},{"type":"Image","props":{"y":-12,"x":-9,"var":"img_tupe","skin":"image/main/player_flag.png"}},{"type":"Label","props":{"y":16,"x":25,"width":162,"var":"lbl_name","text":"label","height":45,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.BodyItemUI.uiView);

        }

    }
}

module ui.compart {
    export class ChatSmallItemUI extends View {
		public panel_0:Laya.Panel;
		public vbox_0:Laya.VBox;

        public static  uiView:any ={"type":"View","props":{"width":550,"height":220},"child":[{"type":"Image","props":{"y":10,"x":10,"top":0,"skin":"image/common/comp/img_bg.png","sizeGrid":"58,30,30,30","right":0,"left":0,"bottom":0}},{"type":"Panel","props":{"var":"panel_0","top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"VBox","props":{"var":"vbox_0","top":10,"space":5,"right":10,"left":10,"align":"left"}}]}]};
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

module ui.dialog {
    export class ChatSendDialogUI extends View {
		public btn_close:Laya.Button;
		public txtInput_0:Laya.TextInput;
		public btn_send:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":500,"height":300},"child":[{"type":"Image","props":{"top":0,"skin":"image/common/comp/img_bg.png","sizeGrid":"58,30,30,30","right":0,"left":0,"bottom":0}},{"type":"Button","props":{"y":0,"x":450,"width":50,"var":"btn_close","skin":"image/common/comp/btn_close.png","height":50}},{"type":"TextInput","props":{"y":75,"x":30,"width":340,"var":"txtInput_0","type":"text","skin":"image/common/input_frame.png","prompt":"请输入：","maxChars":50,"height":61,"fontSize":30,"font":"Microsoft YaHei","bold":true}},{"type":"Button","props":{"y":74,"x":387,"width":100,"var":"btn_send","stateNum":2,"skin":"image/common/btn01.png","labelSize":30,"labelFont":"Microsoft YaHei","labelBold":true,"label":"发送","height":70}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.dialog.ChatSendDialogUI.uiView);

        }

    }
}

module ui.fuBen {
    export class FuBenPanelUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":50,"x":50,"top":0,"skin":"image/common/bg.jpg","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"y":555,"x":176,"width":388,"text":"这是角色界面","height":80,"fontSize":40,"font":"Microsoft YaHei","bold":true,"align":"center"}},{"type":"Image","props":{"y":787,"x":50,"skin":"image/main/bg_line.png","right":0,"pivotY":-2,"pivotX":2,"left":0,"height":27}},{"type":"Button","props":{"y":764,"x":534,"width":125,"stateNum":2,"skin":"image/main/all_mode_down_finish.png","height":58}},{"type":"Button","props":{"y":831,"x":62,"width":89,"stateNum":2,"skin":"image/common/btn02.png","height":101}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.fuBen.FuBenPanelUI.uiView);

        }

    }
}

module ui.juese {
    export class JueSePanelUI extends View {
		public btn_return:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":10,"x":10,"top":0,"skin":"image/common/bg.jpg","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"y":515,"x":136,"width":388,"text":"这是角色界面","height":80,"fontSize":40,"font":"Microsoft YaHei","bold":true,"align":"center"}},{"type":"Image","props":{"y":747,"x":10,"skin":"image/main/bg_line.png","right":0,"pivotY":-2,"pivotX":2,"left":0,"height":27}},{"type":"Button","props":{"y":792,"x":24,"width":89,"stateNum":2,"skin":"image/common/btn02.png","labelStrokeColor":"#ffffff","labelStroke":4,"labelSize":30,"labelFont":"Microsoft YaHei","labelBold":true,"labelAlign":"center","label":"装备","height":101}},{"type":"Button","props":{"y":792,"x":124,"width":89,"stateNum":2,"skin":"image/common/btn02.png","labelStrokeColor":"#ffffff","labelStroke":4,"labelSize":30,"labelFont":"Microsoft YaHei","labelBold":true,"labelAlign":"center","label":"装备","height":101}},{"type":"Button","props":{"y":792,"x":223,"width":89,"stateNum":2,"skin":"image/common/btn02.png","labelStrokeColor":"#ffffff","labelStroke":4,"labelSize":30,"labelFont":"Microsoft YaHei","labelBold":true,"labelAlign":"center","label":"装备","height":101}},{"type":"Button","props":{"y":792,"x":323,"width":89,"stateNum":2,"skin":"image/common/btn02.png","labelStrokeColor":"#ffffff","labelStroke":4,"labelSize":30,"labelFont":"Microsoft YaHei","labelBold":true,"labelAlign":"center","label":"装备","height":101}},{"type":"Button","props":{"y":792,"x":422,"width":89,"stateNum":2,"skin":"image/common/btn02.png","labelStrokeColor":"#ffffff","labelStroke":4,"labelSize":30,"labelFont":"Microsoft YaHei","labelBold":true,"labelAlign":"center","label":"装备","height":101}},{"type":"Button","props":{"y":792,"x":522,"width":89,"stateNum":2,"skin":"image/common/btn02.png","labelStrokeColor":"#ffffff","labelStroke":4,"labelSize":30,"labelFont":"Microsoft YaHei","labelBold":true,"labelAlign":"center","label":"装备","height":101}},{"type":"Button","props":{"y":899,"x":24,"width":89,"stateNum":2,"skin":"image/common/btn02.png","labelStrokeColor":"#ffffff","labelStroke":4,"labelSize":30,"labelFont":"Microsoft YaHei","labelBold":true,"labelAlign":"center","label":"装备","height":101}},{"type":"Button","props":{"y":899,"x":124,"width":89,"stateNum":2,"skin":"image/common/btn02.png","labelStrokeColor":"#ffffff","labelStroke":4,"labelSize":30,"labelFont":"Microsoft YaHei","labelBold":true,"labelAlign":"center","label":"装备","height":101}},{"type":"Button","props":{"y":899,"x":223,"width":89,"stateNum":2,"skin":"image/common/btn02.png","labelStrokeColor":"#ffffff","labelStroke":4,"labelSize":30,"labelFont":"Microsoft YaHei","labelBold":true,"labelAlign":"center","label":"装备","height":101}},{"type":"Button","props":{"y":899,"x":323,"width":89,"stateNum":2,"skin":"image/common/btn02.png","labelStrokeColor":"#ffffff","labelStroke":4,"labelSize":30,"labelFont":"Microsoft YaHei","labelBold":true,"labelAlign":"center","label":"装备","height":101}},{"type":"Button","props":{"y":899,"x":422,"width":89,"stateNum":2,"skin":"image/common/btn02.png","labelStrokeColor":"#ffffff","labelStroke":4,"labelSize":30,"labelFont":"Microsoft YaHei","labelBold":true,"labelAlign":"center","label":"装备","height":101}},{"type":"Button","props":{"y":899,"x":522,"width":89,"stateNum":2,"skin":"image/common/btn02.png","labelStrokeColor":"#ffffff","labelStroke":4,"labelSize":30,"labelFont":"Microsoft YaHei","labelBold":true,"labelAlign":"center","label":"装备","height":101}},{"type":"Button","props":{"y":98,"x":12,"var":"btn_return","stateNum":2,"skin":"image/main/return_sele_finish.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.juese.JueSePanelUI.uiView);

        }

    }
}

module ui.main {
    export class MainPanelUI extends View {
		public box_mainTop:Laya.Box;
		public lbl_gold:Laya.Label;
		public lbl_gold_lock:Laya.Label;
		public lbl_yuanBao:Laya.Label;
		public lbl_yuanBao_lock:Laya.Label;
		public lbl_playerName:Laya.Label;
		public lbl_level:Laya.Label;
		public lbl_power:Laya.Label;
		public lbl_vip:Laya.Label;
		public box_mainBottom:Laya.Box;
		public btn_role:Laya.Button;
		public btn_yangCheng:Laya.Button;
		public btn_fuBen:Laya.Button;
		public btn_sheJiao:Laya.Button;
		public btn_beiBao:Laya.Button;
		public ui_mainPlayer:ui.compart.BodyItemUI;
		public hbox_chat:Laya.HBox;
		public box_task:Laya.Box;
		public tab_task:Laya.Tab;
		public vstack_task:Laya.ViewStack;
		public ui_chatSmallItem:view.compart.ChatSmallItem;
		public ui_chatSendDialog:view.dialog.ChatSendDialog;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":0,"x":0,"top":0,"skin":"image/common/bg.jpg","right":0,"left":0,"bottom":0}},{"type":"Box","props":{"var":"box_mainTop","top":0,"right":0,"left":0},"child":[{"type":"Image","props":{"width":640,"top":0,"skin":"card_top_bg.png","right":0,"left":0,"height":137}},{"type":"Box","props":{"y":1,"x":6,"width":628,"height":47},"child":[{"type":"Box","props":{"y":2},"child":[{"type":"Image","props":{"y":1,"width":108,"skin":"image/common/img_zjm_pattern_003.png","sizeGrid":"0,17,0,15","height":44},"child":[{"type":"Image","props":{"y":1,"x":-12,"width":45,"skin":"image/common/img_common_icon_001.png","height":46}},{"type":"Label","props":{"y":9,"x":35,"width":60,"var":"lbl_gold","text":"111","height":32,"fontSize":25,"bold":true,"align":"right"}}]}]},{"type":"Box","props":{"y":2,"x":151},"child":[{"type":"Image","props":{"y":1,"width":108,"skin":"image/common/img_zjm_pattern_003.png","sizeGrid":"0,17,0,15","height":44},"child":[{"type":"Image","props":{"y":1,"x":-12,"width":45,"skin":"image/common/img_common_icon_002.png","height":46}},{"type":"Label","props":{"y":9,"x":35,"width":60,"var":"lbl_gold_lock","text":"111","height":32,"fontSize":25,"bold":true,"align":"right"}}]}]},{"type":"Box","props":{"x":304},"child":[{"type":"Image","props":{"y":1,"width":108,"skin":"image/common/img_zjm_pattern_003.png","sizeGrid":"0,17,0,15","height":44},"child":[{"type":"Image","props":{"y":1,"x":-12,"width":45,"skin":"image/common/img_common_icon_003.png","height":46}},{"type":"Label","props":{"y":9,"x":35,"width":60,"var":"lbl_yuanBao","text":"111","height":32,"fontSize":25,"bold":true,"align":"right"}}]}]},{"type":"Box","props":{"x":464},"child":[{"type":"Image","props":{"y":1,"width":108,"skin":"image/common/img_zjm_pattern_003.png","sizeGrid":"0,17,0,15","height":44},"child":[{"type":"Image","props":{"y":1,"x":-12,"width":45,"skin":"image/common/img_common_icon_004.png","height":46}},{"type":"Label","props":{"y":9,"x":35,"width":60,"var":"lbl_yuanBao_lock","text":"111","height":32,"fontSize":25,"bold":true,"align":"right"}}]}]}]},{"type":"Box","props":{"y":53,"x":17},"child":[{"type":"Label","props":{"width":173,"var":"lbl_playerName","text":"玩家姓名拉拉","height":41,"fontSize":30,"font":"Microsoft YaHei","color":"#f9f8f8","bold":true}},{"type":"Label","props":{"x":296,"width":121,"var":"lbl_level","text":"1转89级","height":41,"fontSize":30,"font":"Microsoft YaHei","color":"#f9f8f8","bold":true}},{"type":"Label","props":{"x":427,"width":173,"var":"lbl_power","text":"战力:666666","height":41,"fontSize":30,"font":"Microsoft YaHei","color":"#f9f8f8","bold":true}},{"type":"Label","props":{"x":192,"width":98,"var":"lbl_vip","text":"VIP15","height":41,"fontSize":30,"font":"Microsoft YaHei","color":"#f9f8f8","bold":true}}]}]},{"type":"Box","props":{"var":"box_mainBottom","right":0,"left":0,"bottom":0},"child":[{"type":"Button","props":{"x":1,"var":"btn_role","stateNum":2,"skin":"image/main/role_norm_finish.png","left":1,"label":"label","bottom":0}},{"type":"Button","props":{"x":131,"var":"btn_yangCheng","stateNum":2,"skin":"image/main/state_up_finish.png","label":"label","bottom":0}},{"type":"Button","props":{"x":260,"var":"btn_fuBen","stateNum":2,"skin":"image/main/skill_up_finish.png","label":"label","bottom":0}},{"type":"Button","props":{"x":519,"var":"btn_sheJiao","stateNum":2,"skin":"image/main/map_norm_finish.png","right":1,"label":"label","bottom":0}},{"type":"Button","props":{"x":390,"var":"btn_beiBao","stateNum":2,"skin":"image/main/shop_up_finish.png","label":"label","bottom":0}}]},{"type":"Image","props":{"y":758,"x":0,"skin":"image/main/bg_line.png","right":0,"pivotY":-2,"pivotX":2,"left":-4,"height":27}},{"type":"BodyItem","props":{"y":705,"x":212,"var":"ui_mainPlayer","scaleY":1.2,"scaleX":1.2,"runtime":"ui.compart.BodyItemUI"}},{"type":"Button","props":{"y":724,"x":16,"width":125,"stateNum":2,"skin":"image/main/all_mode_down_finish.png","height":58}},{"type":"Box","props":{"y":784,"x":13},"child":[{"type":"Image","props":{"y":1,"x":-4,"width":542,"skin":"image/main/battle_card_bg.png","sizeGrid":"9,23,7,20","height":221},"child":[{"type":"Panel","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"HBox","props":{"y":0,"var":"hbox_chat","right":0,"left":0,"height":220}}]}]},{"type":"Box","props":{"y":4,"x":543},"child":[{"type":"CheckBox","props":{"width":100,"skin":"image/common/comp/checkbox.png","scaleY":0.5,"scaleX":0.5,"labelStrokeColor":"#43f809","labelSize":50,"labelFont":"Microsoft YaHei","labelColors":"#43f809","labelBold":true,"label":"系统","height":64}},{"type":"CheckBox","props":{"y":46,"width":100,"skin":"image/common/comp/checkbox.png","scaleY":0.5,"scaleX":0.5,"labelStrokeColor":"#43f809","labelSize":50,"labelFont":"Microsoft YaHei","labelColors":"#43f809","labelBold":true,"label":"世界","height":64}},{"type":"CheckBox","props":{"y":92,"width":100,"skin":"image/common/comp/checkbox.png","scaleY":0.5,"scaleX":0.5,"labelStrokeColor":"#43f809","labelSize":50,"labelFont":"Microsoft YaHei","labelColors":"#43f809","labelBold":true,"label":"门派","height":64}},{"type":"CheckBox","props":{"y":137,"width":100,"skin":"image/common/comp/checkbox.png","scaleY":0.5,"scaleX":0.5,"labelStrokeColor":"#43f809","labelSize":50,"labelFont":"Microsoft YaHei","labelColors":"#43f809","labelBold":true,"label":"组队","height":64}},{"type":"CheckBox","props":{"y":183,"width":100,"skin":"image/common/comp/checkbox.png","scaleY":0.5,"scaleX":0.5,"labelStrokeColor":"#43f809","labelSize":50,"labelFont":"Microsoft YaHei","labelColors":"#43f809","labelBold":true,"label":"附近","height":64}}]}]},{"type":"Label","props":{"y":505,"x":126,"width":388,"text":"这是游戏主界面","height":80,"fontSize":40,"font":"Microsoft YaHei","bold":true,"align":"center"}},{"type":"Box","props":{"y":789,"x":10,"var":"box_task"},"child":[{"type":"Image","props":{"y":-4,"x":70,"width":555,"skin":"image/main/battle_card_bg.png","sizeGrid":"9,23,7,20","height":221}},{"type":"Tab","props":{"y":3,"x":0,"width":70,"var":"tab_task","space":5,"skin":"image/common/comp/checkbox.png","selectedIndex":0,"labels":"任务,闲聊,位置","labelSize":30,"labelFont":"Microsoft YaHei","labelBold":true,"height":208,"direction":"vertical"}},{"type":"ViewStack","props":{"y":0,"x":73,"width":542,"var":"vstack_task","selectedIndex":0,"height":211},"child":[{"type":"Label","props":{"y":65,"x":77,"width":388,"text":"这是游戏主界面0","name":"item0","height":80,"fontSize":40,"font":"Microsoft YaHei","bold":true,"align":"center"}},{"type":"ChatSmallItem","props":{"y":-2,"x":-2,"var":"ui_chatSmallItem","runtime":"view.compart.ChatSmallItem","name":"item1","height":220}},{"type":"Label","props":{"y":65,"x":77,"width":388,"text":"这是游戏主界面2","name":"item2","height":80,"fontSize":40,"font":"Microsoft YaHei","bold":true,"align":"center"}}]}]},{"type":"ChatSendDialog","props":{"y":479,"x":134,"var":"ui_chatSendDialog","runtime":"view.dialog.ChatSendDialog"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.compart.BodyItemUI",ui.compart.BodyItemUI);
			View.regComponent("view.compart.ChatSmallItem",view.compart.ChatSmallItem);
			View.regComponent("view.dialog.ChatSendDialog",view.dialog.ChatSendDialog);

            super.createChildren();
            this.createView(ui.main.MainPanelUI.uiView);

        }

    }
}

module ui.sheJiao {
    export class SheJiaoPanelUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":20,"x":20,"top":0,"skin":"image/common/bg.jpg","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"y":525,"x":146,"width":388,"text":"这是角色界面","height":80,"fontSize":40,"font":"Microsoft YaHei","bold":true,"align":"center"}},{"type":"Image","props":{"y":757,"x":20,"skin":"image/main/bg_line.png","right":0,"pivotY":-2,"pivotX":2,"left":0,"height":27}},{"type":"Button","props":{"y":734,"x":504,"width":125,"stateNum":2,"skin":"image/main/all_mode_down_finish.png","height":58}},{"type":"Button","props":{"y":801,"x":32,"width":89,"stateNum":2,"skin":"image/common/btn02.png","height":101}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.sheJiao.SheJiaoPanelUI.uiView);

        }

    }
}

module ui.yangCheng {
    export class YangChengPanelUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":30,"x":30,"top":0,"skin":"image/common/bg.jpg","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"y":535,"x":156,"width":388,"text":"这是角色界面","height":80,"fontSize":40,"font":"Microsoft YaHei","bold":true,"align":"center"}},{"type":"Image","props":{"y":767,"x":30,"skin":"image/main/bg_line.png","right":0,"pivotY":-2,"pivotX":2,"left":0,"height":27}},{"type":"Button","props":{"y":744,"x":514,"width":125,"stateNum":2,"skin":"image/main/all_mode_down_finish.png","height":58}},{"type":"Button","props":{"y":811,"x":42,"width":89,"stateNum":2,"skin":"image/common/btn02.png","height":101}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.yangCheng.YangChengPanelUI.uiView);

        }

    }
}
