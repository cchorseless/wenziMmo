
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.beiBao {
    export class BeiBaoPanelUI extends View {
		public lbl_bagInfo:Laya.Label;
		public btn_bagMore:Laya.Button;
		public btn_bagLogo:Laya.Button;
		public lbl_bagLogolbl:Laya.Label;
		public btn_itemAll:Laya.Button;
		public viw_BagViewChange:Laya.ViewStack;
		public btn_zhengli:Laya.Button;
		public tab_bag:Laya.Tab;
		public viw_bag:Laya.ViewStack;
		public panel_bag0:Laya.Panel;
		public vbox_bag0:Laya.VBox;
		public panel_bag1:Laya.Panel;
		public vbox_bag1:Laya.VBox;
		public panel_bag2:Laya.Panel;
		public vbox_bag2:Laya.VBox;
		public panel_bag3:Laya.Panel;
		public vbox_bag3:Laya.VBox;
		public panel_sellHot:Laya.Panel;
		public vbox_sellHot:Laya.VBox;
		public btn_refreshItem:Laya.Button;
		public viw_bagBottom:Laya.ViewStack;
		public ui_cangKu:view.compart.CangKuItem;
		public ui_huiShou:view.compart.HuiShouItem;
		public ui_tanWei:view.compart.BaiTanItem;
		public ui_jiaoyihang:view.compart.JiaoYiHangItem;
		public img_tabBg:Laya.Image;
		public tab_changeView:Laya.Tab;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":10,"x":10,"top":0,"skin":"image/common/bg_common_01.png","right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"x":0,"skin":"image/main/fram_common_23.png","right":0,"left":0,"height":92,"bottom":0}},{"type":"Image","props":{"y":1030,"x":0,"skin":"image/main/fram_common_21.png"}},{"type":"Image","props":{"y":1030,"x":639,"skin":"image/main/fram_common_21.png","scaleX":-1}}]},{"type":"Box","props":{"y":130,"x":-5,"width":656,"height":134},"child":[{"type":"Image","props":{"y":7,"skin":"image/main/fram_common_22.png","right":10,"left":10,"height":121}},{"type":"Image","props":{"y":2,"x":27,"skin":"image/main/fram_common_05.png"}},{"type":"Image","props":{"y":-14,"x":648,"skin":"image/main/fram_common_21.png","scaleX":-1}},{"type":"Image","props":{"skin":"image/main/fram_common_06.png"}},{"type":"Image","props":{"y":115,"x":44,"skin":"image/main/fram_common_05.png"}},{"type":"Image","props":{"y":20,"x":87,"width":485,"skin":"image/main/fram_common_08.png","sizeGrid":"0,41,0,40","height":96},"child":[{"type":"Label","props":{"y":12,"x":63,"wordWrap":true,"width":377,"var":"lbl_bagInfo","text":"背包是XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX","height":71,"fontSize":22,"color":"#ffffff","align":"left"}},{"type":"Button","props":{"y":57,"x":400,"width":32,"var":"btn_bagMore","stateNum":1,"skin":"image/main/btn_common_01.png","height":32}}]},{"type":"Button","props":{"y":11,"x":13,"width":110,"var":"btn_bagLogo","stateNum":2,"skin":"image/bag/icon_itemfunc0.png","height":117},"child":[{"type":"Image","props":{"y":79,"x":-17,"width":148,"skin":"image/common/title_common_01.png","mouseThrough":true,"height":46},"child":[{"type":"Label","props":{"y":13,"x":14,"width":119,"var":"lbl_bagLogolbl","text":"背包|仓库","strokeColor":"#000000","stroke":6,"mouseThrough":true,"height":31,"fontSize":25,"font":"FZXK","color":"#ffffff","align":"center"}}]}]},{"type":"Button","props":{"y":4,"x":525,"width":119,"var":"btn_itemAll","stateNum":2,"skin":"image/main/icon_common_beibao01up_finish.png","selected":false,"labelStrokeColor":"#000000","labelStroke":6,"labelSize":35,"labelPadding":"0,0,0,0","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"物品\\n功能","height":121}}]},{"type":"ViewStack","props":{"y":256,"x":0,"width":640,"var":"viw_BagViewChange","selectedIndex":0,"right":0,"left":0,"height":800},"child":[{"type":"Box","props":{"y":0,"x":0,"name":"item0"},"child":[{"type":"Button","props":{"x":539,"width":100,"var":"btn_zhengli","stateNum":2,"skin":"image/common/btn_caidan_01_finish.png","right":1,"labelStrokeColor":"#000000","labelStroke":4,"labelSize":30,"labelFont":"FZXK","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","labelBold":true,"label":"整理","height":57}},{"type":"Image","props":{"y":61,"x":14,"width":640,"skin":"image/main/fram_common_05.png","scaleY":-1,"rotation":0,"right":0,"left":14,"height":19}},{"type":"Tab","props":{"y":6,"width":511,"var":"tab_bag","stateNum":2,"space":-5,"skin":"image/common/btn_common_02up_finish.png","selectedIndex":0,"scaleY":0.85,"scaleX":0.82,"left":122,"labels":"装备,材料,消耗,任务","labelStrokeColor":"#000000","labelStroke":6,"labelSize":25,"labelPadding":"5,0,0,0","labelFont":"Microsoft YaHei","labelColors":"#ffffff,#ffffff,#ffffff","labelAlign":"left","height":60,"direction":"horizontal"}},{"type":"Image","props":{"y":57,"x":120,"width":510,"skin":"image/main/fram_common_bg_02.png","sizeGrid":"8,7,6,7","height":340},"child":[{"type":"ViewStack","props":{"y":0,"x":0,"width":516,"var":"viw_bag","selectedIndex":0,"height":346},"child":[{"type":"Panel","props":{"y":0,"x":0,"width":509,"var":"panel_bag0","name":"item0","height":330},"child":[{"type":"VBox","props":{"var":"vbox_bag0","right":0,"left":0,"align":"left"}}]},{"type":"Panel","props":{"y":0,"x":0,"width":509,"var":"panel_bag1","name":"item1","height":330},"child":[{"type":"VBox","props":{"var":"vbox_bag1","right":0,"left":0,"align":"left"}}]},{"type":"Panel","props":{"y":0,"x":0,"width":509,"var":"panel_bag2","name":"item2","height":330},"child":[{"type":"VBox","props":{"var":"vbox_bag2","right":0,"left":0,"align":"left"}}]},{"type":"Panel","props":{"y":0,"x":0,"width":509,"var":"panel_bag3","name":"item3","height":330},"child":[{"type":"VBox","props":{"var":"vbox_bag3","right":0,"left":0,"align":"left"}}]}]}]},{"type":"Image","props":{"y":407,"width":640,"skin":"image/main/fram_common_05.png","scaleY":-1,"rotation":0,"right":0,"left":0,"height":19}},{"type":"Image","props":{"y":358,"x":638,"skin":"image/main/fram_common_24.png","scaleX":-1}},{"type":"Image","props":{"y":441,"x":637,"skin":"image/main/fram_common_24.png","scaleY":-1,"scaleX":-1}},{"type":"Image","props":{"y":1,"x":4,"width":112,"skin":"image/common/fram_common_bg_01.png","sizeGrid":"58,35,64,45","height":778},"child":[{"type":"Image","props":{"y":15,"x":16,"width":90,"skin":"image/common/fram_common_09.png","height":40},"child":[{"type":"Label","props":{"y":4,"x":10,"width":69,"text":"热卖","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":31,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Panel","props":{"y":67,"var":"panel_sellHot","right":0,"left":8,"height":638},"child":[{"type":"VBox","props":{"y":0,"var":"vbox_sellHot","right":0,"left":0}}]},{"type":"Button","props":{"y":709,"x":6,"width":90,"var":"btn_refreshItem","stateNum":2,"skin":"image/common/btn_caidan_01_finish.png","right":11,"labelStrokeColor":"#000000","labelStroke":4,"labelSize":30,"labelFont":"FZXK","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","labelBold":true,"label":"刷新","height":50}}]},{"type":"ViewStack","props":{"y":402,"x":110,"width":520,"var":"viw_bagBottom","selectedIndex":0,"height":390},"child":[{"type":"CangKuItem","props":{"var":"ui_cangKu","top":0,"runtime":"view.compart.CangKuItem","name":"item0","left":0}},{"type":"HuiShouItem","props":{"var":"ui_huiShou","top":0,"runtime":"view.compart.HuiShouItem","name":"item1","left":0}},{"type":"BaiTanItem","props":{"var":"ui_tanWei","top":0,"runtime":"view.compart.BaiTanItem","name":"item2","left":0}}]}]},{"type":"JiaoYiHangItem","props":{"var":"ui_jiaoyihang","top":0,"runtime":"view.compart.JiaoYiHangItem","name":"item1","left":0}}]},{"type":"Image","props":{"y":157,"x":645,"width":896,"skin":"image/main/fram_common_05.png","rotation":90,"height":19}},{"type":"Image","props":{"y":257,"x":-7,"width":27,"skin":"image/common/fram_common_07.png","sizeGrid":"18,12,20,13","height":782}},{"type":"Image","props":{"y":232,"x":590,"width":185,"var":"img_tabBg","skin":"image/common/fram_common_bg_01.png","sizeGrid":"62,41,68,40","height":240,"anchorX":1},"child":[{"type":"Tab","props":{"y":0,"x":0,"width":183,"var":"tab_changeView","stateNum":2,"space":-10,"skin":"image/main/fram_common_27_finish.png","selectedIndex":0,"scaleY":1.2,"scaleX":1,"labels":"仓库,回收,摆摊,交易行","labelStrokeColor":"#000000","labelStroke":6,"labelSize":25,"labelPadding":"5,0,0,0","labelFont":"FZXK","labelColors":"#FFFFFF","height":190,"direction":"vertical"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("view.compart.CangKuItem",view.compart.CangKuItem);
			View.regComponent("view.compart.HuiShouItem",view.compart.HuiShouItem);
			View.regComponent("view.compart.BaiTanItem",view.compart.BaiTanItem);
			View.regComponent("view.compart.JiaoYiHangItem",view.compart.JiaoYiHangItem);

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

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":10,"top":0,"skin":"image/common/bg_common_01.png","right":0,"left":0,"bottom":0}},{"type":"Image","props":{"y":126,"x":10,"skin":"image/common/zi_logo01.png","centerX":0}},{"type":"Button","props":{"y":950,"x":245,"width":150,"var":"btn_startGame","stateNum":2,"skin":"image/common/btn_common_03up_finish.png","height":150},"child":[{"type":"Label","props":{"y":31,"x":25,"width":99,"text":"进入\\n江湖","mouseThrough":true,"height":88,"fontSize":40,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Button","props":{"y":12,"x":13,"width":73,"var":"btn_notice","stateNum":2,"skin":"image/common/login/icon_common_gonggao01up_finish.png","height":77},"child":[{"type":"Label","props":{"y":54,"x":-4,"text":"公告","strokeColor":"#000000","stroke":6,"fontSize":40,"font":"FZXK","color":"#ffffff"}}]},{"type":"Box","props":{"y":274,"x":99},"child":[{"type":"Image","props":{"y":151,"x":10,"skin":"image/common/fram_common_16.png"}},{"type":"Image","props":{"width":420,"var":"img_heroPic","skin":"image/common/nv01.png","height":585}},{"type":"Image","props":{"y":394,"x":283,"width":170,"skin":"image/common/fram_common_vipdi.png","height":150},"child":[{"type":"Label","props":{"y":12,"x":38,"width":103,"var":"lbl_level0","text":"6转","height":50,"fontSize":50,"font":"FZXK","color":"#ffffff"}},{"type":"Label","props":{"y":66,"x":45,"width":103,"var":"lbl_level1","text":"87级","height":36,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":466,"x":-10,"width":414,"height":162},"child":[{"type":"Image","props":{"y":96.52159862735118,"width":126,"skin":"image/common/fram_common_vipdi.png","rotation":-50,"height":121}},{"type":"Image","props":{"y":61.52159862735118,"x":47,"width":367,"skin":"image/common/fram_common_04.png","height":53},"child":[{"type":"Label","props":{"y":11,"x":72,"width":220,"var":"lbl_playerName","text":"玩家姓名拉拉","height":31,"fontSize":35,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":60.52159862735118,"x":51,"width":30,"skin":"image/common/zi_vip_01.png","height":40}},{"type":"FontClip","props":{"y":72.52159862735118,"x":69,"width":42,"var":"vip_level","value":"10","spaceX":-10,"skin":"image/common/number/zi_shuzi01.png","sheet":"0123456789","height":40}}]}]},{"type":"Image","props":{"y":873,"x":150,"width":340,"skin":"image/common/input_bg.png","height":64},"child":[{"type":"Label","props":{"y":22,"x":58,"width":166,"var":"lbl_serverName","text":"服务器1区","height":31,"fontSize":25,"font":"FZXK","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":21,"x":223,"width":84,"var":"btn_changeServer","text":"[换区]","height":31,"fontSize":25,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]}]};
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
		public btn_menPaiBg1:Laya.Button;
		public btn_menPai1:Laya.Button;
		public btn_menPaiBg2:Laya.Button;
		public btn_menPai2:Laya.Button;
		public btn_menPaiBg3:Laya.Button;
		public btn_menPai3:Laya.Button;
		public btn_menPaiBg4:Laya.Button;
		public btn_menPai4:Laya.Button;
		public btn_menPaiBg5:Laya.Button;
		public btn_menPai5:Laya.Button;
		public input_random:Laya.TextInput;
		public btn_randomName:Laya.Button;
		public btn_startGame:Laya.Button;
		public lbl_heroName:Laya.Label;
		public lbl_heroInfo:Laya.Label;
		public img_nanBg:Laya.Image;
		public img_nvBg:Laya.Image;
		public lbl_nan:Laya.Label;
		public lbl_nv:Laya.Label;
		public lbl_menPai:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"top":0,"skin":"image/common/bg_common_01.png","right":0,"left":2,"bottom":0}},{"type":"Image","props":{"y":13,"x":31,"width":347,"var":"img_hero","skin":"image/common/nan01.png","height":572}},{"type":"Box","props":{"y":609,"x":162},"child":[{"type":"Button","props":{"y":0,"x":0,"var":"btn_menPaiBg1","stateNum":2,"skin":"image/common/img_common_03.png"},"child":[{"type":"Button","props":{"y":30,"x":22,"var":"btn_menPai1","stateNum":2,"skin":"image/common/login/icon_huashan01up_finish.png"}}]},{"type":"Button","props":{"y":86,"x":54,"var":"btn_menPaiBg2","stateNum":2,"skin":"image/common/img_common_03.png"},"child":[{"type":"Button","props":{"y":30,"x":22,"var":"btn_menPai2","stateNum":2,"skin":"image/common/login/icon_wudang01up_finish.png"}}]},{"type":"Button","props":{"y":0,"x":104,"var":"btn_menPaiBg3","stateNum":2,"skin":"image/common/img_common_03.png"},"child":[{"type":"Button","props":{"y":30,"x":22,"var":"btn_menPai3","stateNum":2,"skin":"image/common/login/icon_mojiao01up_finish.png"}}]},{"type":"Button","props":{"y":0,"x":208,"var":"btn_menPaiBg4","stateNum":2,"skin":"image/common/img_common_03.png"},"child":[{"type":"Button","props":{"y":30,"x":22,"var":"btn_menPai4","stateNum":1,"skin":"image/common/login/icon_shuo.png"}}]},{"type":"Button","props":{"y":86,"x":158,"var":"btn_menPaiBg5","stateNum":2,"skin":"image/common/img_common_03.png"},"child":[{"type":"Button","props":{"y":30,"x":22,"var":"btn_menPai5","stateNum":1,"skin":"image/common/login/icon_shuo.png"}}]}]},{"type":"Box","props":{"y":927,"x":79},"child":[{"type":"Box","props":{"y":56,"x":3,"width":309,"height":81},"child":[{"type":"TextInput","props":{"y":-4,"x":14,"width":245,"var":"input_random","type":"text","skin":"image/common/fram_common_15.png","promptColor":"#000000","prompt":"点击随机名字","padding":"0,0,0,20","maxChars":6,"height":85,"fontSize":30,"font":"FZXK","color":"#000000","bold":true}},{"type":"Button","props":{"y":-13,"x":211,"width":100,"var":"btn_randomName","stateNum":2,"skin":"image/common/login/icon_shaizi01_finish.png","height":104}},{"type":"Image","props":{"y":0,"x":0,"width":37,"skin":"image/common/fram_common_07.png","height":79}}]},{"type":"Button","props":{"x":336,"width":190,"var":"btn_startGame","stateNum":2,"skin":"image/common/login/btn_chuangjian01_finish.png","labelSize":40,"labelPadding":"0,0,10,0","labelFont":"Microsoft YaHei","labelColors":"#ffffff","labelBold":true,"height":171}}]},{"type":"Image","props":{"y":20,"x":391,"skin":"image/common/login/fram_common_11.png"},"child":[{"type":"Label","props":{"y":28,"x":29,"wordWrap":true,"width":156,"var":"lbl_heroName","text":"拎壶冲","height":51,"fontSize":48,"font":"FZXK","color":"#000000"}},{"type":"Label","props":{"y":105,"x":19,"wordWrap":true,"width":196,"var":"lbl_heroInfo","text":"令狐冲生性放荡不羁，爽朗豁达，豪迈潇洒，不拘小节，喜欢乱开玩笑，却有高度的忠义心，天生侠义心肠，并且深情不移。","height":227,"fontSize":25,"font":"SimHei","color":"#000000"}},{"type":"Image","props":{"y":319,"x":-8,"skin":"image/common/login/fram_common_12.png"},"child":[{"type":"Image","props":{"y":31,"x":72,"skin":"image/common/login/fram_common_13.png"}}]}]},{"type":"Box","props":{"y":828,"x":160},"child":[{"type":"Image","props":{"y":2,"var":"img_nanBg","skin":"image/common/login/fram_common_14.png"}},{"type":"Image","props":{"y":2,"x":192,"var":"img_nvBg","skin":"image/common/login/fram_common_14.png"}},{"type":"Label","props":{"y":-15,"x":9,"width":99,"var":"lbl_nan","valign":"middle","text":"男","strokeColor":"#000000","stroke":4,"height":100,"fontSize":60,"font":"FZXK","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":-14,"x":200,"width":99,"var":"lbl_nv","valign":"middle","text":"女","strokeColor":"#000000","stroke":4,"height":100,"fontSize":60,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":609,"x":134,"width":237,"skin":"image/common/fram_common_09.png","rotation":90,"height":78},"child":[{"type":"Label","props":{"y":72,"x":32,"wordWrap":true,"width":73,"var":"lbl_menPai","text":"华山派","rotation":-90,"height":188,"fontSize":60,"font":"FZXK","color":"#ffffff"}}]}]};
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

        public static  uiView:any ={"type":"View","props":{"width":640,"name":"LoginPanel","height":1136},"child":[{"type":"Image","props":{"width":640,"top":0,"skin":"image/common/bg_common_01.png","right":0,"left":0,"height":1145,"bottom":0}},{"type":"Image","props":{"y":126,"skin":"image/common/zi_logo01.png","centerX":0}},{"type":"Image","props":{"y":258,"skin":"image/common/login/img_juese01.png","centerX":0}},{"type":"Label","props":{"y":30,"x":461,"width":168,"var":"lbl_versionInfo","text":"版本:1.0.0","strokeColor":"#000000","stroke":4,"height":40,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","bold":true}},{"type":"Button","props":{"y":12,"x":13,"width":73,"var":"btn_notice","stateNum":2,"skin":"image/common/login/icon_common_gonggao01up_finish.png","height":77},"child":[{"type":"Label","props":{"y":54,"x":-4,"text":"公告","strokeColor":"#000000","stroke":6,"fontSize":40,"font":"FZXK","color":"#ffffff"}}]},{"type":"ViewStack","props":{"var":"stack_login","selectedIndex":0,"right":0,"left":0,"height":366,"bottom":0},"child":[{"type":"Box","props":{"var":"box_login","name":"item0","centerX":0,"bottom":80},"child":[{"type":"TextInput","props":{"y":9,"x":75,"width":353,"var":"input_account","type":"text","text":"111","skin":"image/common/input_bg.png","promptColor":"#ffffff","prompt":"请输入账号","height":79,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"TextInput","props":{"y":85,"x":79,"width":344,"var":"input_password","type":"password","text":"111","skin":"image/common/input_bg.png","promptColor":"#ffffff","prompt":"请输入密码","height":79,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":243,"x":-24,"width":551,"skin":"image/common/login/img_common_02.png","height":17}},{"type":"Button","props":{"y":209,"x":82,"width":310,"var":"btn_Login","stateNum":2,"skin":"image/common/login/btn_tarujianghu01_finish.png","labelSize":40,"labelPadding":"0,0,10,0","labelFont":"Microsoft YaHei","labelColors":"#ffffff","height":70}},{"type":"Image","props":{"y":149,"x":414,"width":111,"skin":"image/common/login/img_common_01.png","height":113}}]},{"type":"Box","props":{"y":63,"x":157,"width":326,"var":"box_fail","name":"item1","height":213},"child":[{"type":"Image","props":{"y":0,"x":-87,"width":500,"skin":"image/common/input_bg.png","height":76},"child":[{"type":"Label","props":{"y":6,"x":5,"width":334,"valign":"middle","text":"拉取服务器列表失败","right":0,"left":10,"height":62,"fontSize":40,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":107,"x":71,"width":183,"var":"btn_quit","stateNum":2,"skin":"image/common/btn_caidan_01_finish.png","labelSize":40,"labelPadding":"0,0,0,0","labelFont":"FZXK","labelColors":"#ffffff","labelBold":true,"label":"退出","height":95}}]}]}]};
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
    export class BaiTanBuyItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":620,"height":90},"child":[{"type":"Image","props":{"y":10,"x":10,"top":0,"skin":"image/common/fram_common_28.png","sizeGrid":"39,46,46,55","right":0,"left":0,"bottom":0}},{"type":"DaoJuItem","props":{"y":9,"x":9,"runtime":"ui.compart.DaoJuItemUI"}},{"type":"Label","props":{"y":33,"x":94,"width":124,"text":"道具留个字啊","strokeColor":"#000000","stroke":4,"height":24,"fontSize":20,"font":"FZXK","color":"#FFFFFF"}},{"type":"Label","props":{"y":34,"x":236,"width":42,"text":"4转","strokeColor":"#000000","stroke":4,"height":22,"fontSize":20,"font":"Arial","color":"#ffffff","bold":false,"align":"left"}},{"type":"Label","props":{"y":34,"x":313,"width":42,"text":"4转","strokeColor":"#000000","stroke":4,"height":22,"fontSize":20,"font":"Arial","color":"#ffffff","bold":false,"align":"left"}},{"type":"Label","props":{"y":34,"x":396,"width":42,"text":"DDlHH:MM","strokeColor":"#000000","stroke":4,"height":22,"fontSize":20,"font":"Arial","color":"#ffffff","bold":false,"align":"left"}},{"type":"Button","props":{"y":25,"x":521,"width":84,"stateNum":2,"skin":"image/common/fram_common_09_finish.png","labelStrokeColor":"#000000","labelStroke":4,"labelSize":20,"labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"购买","height":39}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.compart.DaoJuItemUI",ui.compart.DaoJuItemUI);

            super.createChildren();
            this.createView(ui.compart.BaiTanBuyItemUI.uiView);

        }

    }
}

module ui.compart {
    export class BaiTanItemUI extends View {
		public panel_sellRecord:Laya.Panel;
		public vbox_sellRecord:Laya.VBox;
		public panel_sell:Laya.Panel;
		public vbox_sell:Laya.VBox;

        public static  uiView:any ={"type":"View","props":{"width":520,"height":390},"child":[{"type":"Box","props":{"y":0,"right":0,"left":0},"child":[{"type":"Image","props":{"y":1,"x":7,"width":213,"skin":"image/common/fram_common_09.png","height":48},"child":[{"type":"Label","props":{"y":8,"x":24,"width":69,"text":"摊位","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":31,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":8,"x":110,"width":69,"text":"0/80","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":31,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":51,"x":10,"skin":"image/main/fram_common_08.png","right":0,"left":0,"height":5}},{"type":"Label","props":{"y":4,"x":219,"width":180,"text":"交易成功\\n扣除10%手续费","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":42,"fontSize":20,"font":"FZXK","color":"#ffffff","align":"center"}},{"type":"Button","props":{"width":100,"stateNum":2,"skin":"image/common/btn_caidan_01_finish.png","right":5,"labelStrokeColor":"#000000","labelStroke":4,"labelSize":30,"labelFont":"FZXK","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","labelBold":true,"label":"领取","height":50}}]},{"type":"Panel","props":{"y":103,"x":366,"width":151,"var":"panel_sellRecord","height":279},"child":[{"type":"VBox","props":{"var":"vbox_sellRecord","top":0,"right":0,"left":0}}]},{"type":"Image","props":{"y":58,"x":364,"width":332,"skin":"image/main/fram_common_08.png","rotation":90,"height":5}},{"type":"Image","props":{"y":58,"x":8,"width":348,"skin":"image/main/fram_common_bg_02.png","sizeGrid":"20,18,23,22","height":320},"child":[{"type":"Panel","props":{"y":0,"x":0,"width":348,"var":"panel_sell","height":320},"child":[{"type":"VBox","props":{"var":"vbox_sell","top":0,"space":3,"right":0,"left":0,"align":"left"},"child":[{"type":"BaiTanSellItem","props":{"y":0,"x":-2,"runtime":"ui.compart.BaiTanSellItemUI"}},{"type":"BaiTanSellItem","props":{"y":10,"x":8,"runtime":"ui.compart.BaiTanSellItemUI"}},{"type":"BaiTanSellItem","props":{"y":20,"x":18,"runtime":"ui.compart.BaiTanSellItemUI"}},{"type":"BaiTanSellItem","props":{"y":30,"x":28,"runtime":"ui.compart.BaiTanSellItemUI"}},{"type":"BaiTanSellItem","props":{"y":40,"x":38,"runtime":"ui.compart.BaiTanSellItemUI"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.compart.BaiTanSellItemUI",ui.compart.BaiTanSellItemUI);

            super.createChildren();
            this.createView(ui.compart.BaiTanItemUI.uiView);

        }

    }
}

module ui.compart {
    export class BaiTanSellItemUI extends View {
		public ui_item:ui.compart.DaoJuItemUI;
		public btn_off:Laya.Button;
		public lbl_itemName:Laya.Label;
		public img_goldPic:Laya.Image;
		public lbl_price:Laya.Label;
		public lbl_timeLeft:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":348,"height":80},"child":[{"type":"Image","props":{"top":0,"skin":"image/common/fram_common_28.png","sizeGrid":"39,46,46,55","right":0,"left":0,"bottom":0}},{"type":"DaoJuItem","props":{"y":4,"x":4,"var":"ui_item","runtime":"ui.compart.DaoJuItemUI"}},{"type":"Button","props":{"y":8,"x":252,"width":84,"var":"btn_off","stateNum":2,"skin":"image/common/fram_common_09_finish.png","labelStrokeColor":"#000000","labelStroke":4,"labelSize":20,"labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"下架","height":39}},{"type":"Label","props":{"y":13,"x":85,"width":124,"var":"lbl_itemName","text":"道具留个字啊","strokeColor":"#000000","stroke":4,"height":24,"fontSize":20,"font":"FZXK","color":"#FFFFFF"}},{"type":"Box","props":{"y":40,"x":97},"child":[{"type":"Image","props":{"y":0,"x":-12,"width":40,"var":"img_goldPic","skin":"image/main/icon_common_yuanbao01.png","height":35}},{"type":"Label","props":{"y":6,"x":32,"width":83,"var":"lbl_price","text":"666666","strokeColor":"#000000","stroke":4,"height":27,"fontSize":20,"font":"Arial","color":"#ffffff","bold":false,"align":"left"}}]},{"type":"Label","props":{"y":50,"x":260,"width":74,"var":"lbl_timeLeft","text":"0d:hh:mm","strokeColor":"#000000","stroke":4,"height":22,"fontSize":18,"font":"Arial","color":"#ffffff","bold":false,"align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.compart.DaoJuItemUI",ui.compart.DaoJuItemUI);

            super.createChildren();
            this.createView(ui.compart.BaiTanSellItemUI.uiView);

        }

    }
}

module ui.compart {
    export class CangKuItemUI extends View {
		public panel_0:Laya.Panel;
		public vbox_0:Laya.VBox;
		public btn_zhengLi:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":520,"height":390},"child":[{"type":"Image","props":{"y":3,"x":10,"width":213,"skin":"image/common/fram_common_09.png","height":48},"child":[{"type":"Label","props":{"y":8,"x":24,"width":69,"text":"仓库","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":31,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":8,"x":110,"width":69,"text":"0/80","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":31,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":50,"x":10,"width":510,"skin":"image/main/fram_common_bg_02.png","sizeGrid":"8,7,6,7","height":340},"child":[{"type":"Panel","props":{"y":0,"x":0,"width":509,"var":"panel_0","height":330},"child":[{"type":"VBox","props":{"var":"vbox_0","right":0,"left":0,"align":"left"}}]}]},{"type":"Button","props":{"y":1,"width":100,"var":"btn_zhengLi","stateNum":2,"skin":"image/common/btn_caidan_01_finish.png","right":2,"labelStrokeColor":"#000000","labelStroke":4,"labelSize":30,"labelFont":"FZXK","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","labelBold":true,"label":"整理","height":50}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.CangKuItemUI.uiView);

        }

    }
}

module ui.compart {
    export class DaoJuBgItemUI extends View {
		public img_bg:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":78,"height":78},"child":[{"type":"Image","props":{"y":1,"x":1,"var":"img_bg","skin":"image/common/daoju/fram_common_daoju01.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.DaoJuBgItemUI.uiView);

        }

    }
}

module ui.compart {
    export class DaoJuGroupItemUI extends View {
		public box_all:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"width":505,"height":78},"child":[{"type":"Box","props":{"y":0,"x":0,"var":"box_all"},"child":[{"type":"DaoJuBgItem","props":{"runtime":"view.compart.DaoJuBgItem"}},{"type":"DaoJuBgItem","props":{"x":85,"runtime":"view.compart.DaoJuBgItem"}},{"type":"DaoJuBgItem","props":{"x":170,"runtime":"view.compart.DaoJuBgItem"}},{"type":"DaoJuBgItem","props":{"x":254,"runtime":"view.compart.DaoJuBgItem"}},{"type":"DaoJuBgItem","props":{"x":339,"runtime":"view.compart.DaoJuBgItem"}},{"type":"DaoJuBgItem","props":{"x":424,"runtime":"view.compart.DaoJuBgItem"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("view.compart.DaoJuBgItem",view.compart.DaoJuBgItem);

            super.createChildren();
            this.createView(ui.compart.DaoJuGroupItemUI.uiView);

        }

    }
}

module ui.compart {
    export class DaoJuItemUI extends View {
		public img_bg:Laya.Image;
		public img_item:Laya.Image;
		public lbl_count:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":72,"height":72},"child":[{"type":"Image","props":{"y":1,"x":1,"width":70,"var":"img_bg","skin":"image/common/daoju/quality_0.png","height":70}},{"type":"Image","props":{"y":1,"x":1,"width":70,"var":"img_item","skin":"image/common/daoju/itemicon_1122003.png","height":70}},{"type":"Label","props":{"width":51,"var":"lbl_count","text":"99999","strokeColor":"#000000","stroke":4,"right":2,"height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#48f604","bottom":-3,"align":"right"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.DaoJuItemUI.uiView);

        }

    }
}

module ui.compart {
    export class GuildItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":588,"height":88},"child":[{"type":"Box","props":{"y":3,"x":0,"width":588,"height":90},"child":[{"type":"Image","props":{"width":588,"skin":"image/common/fram_common_28.png","sizeGrid":"5,4,7,4","height":88}},{"type":"Box","props":{"y":3,"x":10},"child":[{"type":"Image","props":{"width":83,"skin":"image/guild/fram_common_37.png","height":83}},{"type":"Button","props":{"y":4,"x":9,"width":68,"stateNum":2,"skin":"image/common/icon_gonghui01_finish.png","height":74}}]},{"type":"Button","props":{"y":50,"x":483,"width":55,"stateNum":2,"skin":"image/guild/icon_fangdajing_finish.png","pivotY":29,"pivotX":50,"height":56}},{"type":"Button","props":{"y":2,"x":494,"width":83,"stateNum":2,"skin":"image/guild/img_common_21_finish.png","height":84},"child":[{"type":"Label","props":{"y":15,"x":18,"text":"申请\\n加入","strokeColor":"#000000","stroke":5,"fontSize":26,"color":"#ffffff"}}]},{"type":"Label","props":{"y":19,"x":110,"text":"门派名称XX","fontSize":24,"font":"SimHei","color":"#000000","bold":true}},{"type":"Label","props":{"y":19,"x":253,"text":"礼物Lv","fontSize":24,"font":"SimHei","color":"#000000","bold":true}},{"type":"Label","props":{"y":18,"x":345,"text":"Lv需求","fontSize":24,"font":"SimHei","color":"#000000","bold":true}},{"type":"Label","props":{"y":56,"x":123,"text":"人数：XX","fontSize":20,"color":"#000000"}},{"type":"Label","props":{"y":56,"x":270,"text":"21","fontSize":20,"color":"#000000"}},{"type":"Label","props":{"y":56,"x":351,"text":"XXXX","fontSize":20,"color":"#000000"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.GuildItemUI.uiView);

        }

    }
}

module ui.compart {
    export class HuiShouItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":520,"height":390},"child":[{"type":"Image","props":{"y":3,"x":7,"width":213,"skin":"image/common/fram_common_09.png","height":48},"child":[{"type":"Label","props":{"y":8,"x":24,"width":69,"text":"回收","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":31,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":8,"x":110,"width":69,"text":"0/80","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":31,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":53,"skin":"image/main/fram_common_08.png","right":0,"left":0,"height":5}},{"type":"Label","props":{"y":5,"x":226,"width":180,"text":"特权回收\\n格外+5%经验","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":42,"fontSize":20,"font":"FZXK","color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":2,"width":100,"stateNum":2,"skin":"image/common/btn_caidan_01_finish.png","right":2,"labelStrokeColor":"#000000","labelStroke":4,"labelSize":30,"labelFont":"FZXK","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","labelBold":true,"label":"激活","height":50}},{"type":"Image","props":{"y":78,"x":15,"width":330,"skin":"image/common/fram_common_09.png","height":38},"child":[{"type":"Label","props":{"y":7,"x":24,"width":69,"text":"点击回收89级以下的装备（0）","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":23,"fontSize":20,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":126,"x":15,"width":330,"skin":"image/common/fram_common_09.png","height":38},"child":[{"type":"Label","props":{"y":7,"x":24,"width":69,"text":"点击回收89级以下的装备（0）","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":23,"fontSize":20,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":174,"x":15,"width":330,"skin":"image/common/fram_common_09.png","height":38},"child":[{"type":"Label","props":{"y":7,"x":24,"width":69,"text":"点击回收89级以下的装备（0）","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":23,"fontSize":20,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":223,"x":15,"width":330,"skin":"image/common/fram_common_09.png","height":38},"child":[{"type":"Label","props":{"y":7,"x":24,"width":69,"text":"点击回收89级以下的装备（0）","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":23,"fontSize":20,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":271,"x":15,"width":330,"skin":"image/common/fram_common_09.png","height":38},"child":[{"type":"Label","props":{"y":7,"x":24,"width":69,"text":"点击回收89级以下的装备（0）","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":23,"fontSize":20,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":319,"x":15,"width":330,"skin":"image/common/fram_common_09.png","height":38},"child":[{"type":"Label","props":{"y":7,"x":24,"width":69,"text":"点击回收89级以下的装备（0）","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":23,"fontSize":20,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":102,"x":357,"width":45,"skin":"image/common/icon_exp_02.png","height":40}},{"type":"Image","props":{"y":234,"x":359,"width":45,"skin":"image/common/icon_exp_02.png","height":40}},{"type":"Button","props":{"y":280,"width":128,"stateNum":2,"skin":"image/common/btn_caidan_01_finish.png","right":32,"labelStrokeColor":"#000000","labelStroke":4,"labelSize":20,"labelFont":"FZXK","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","labelBold":true,"label":"非转生装备","height":52}},{"type":"Button","props":{"y":145,"width":128,"stateNum":2,"skin":"image/common/btn_caidan_01_finish.png","right":35,"labelStrokeColor":"#000000","labelStroke":4,"labelSize":20,"labelFont":"FZXK","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","labelBold":true,"label":"转生装备","height":52}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.HuiShouItemUI.uiView);

        }

    }
}

module ui.compart {
    export class JiaoYiHangItemUI extends View {
		public panel_0:Laya.Panel;
		public vbox_0:Laya.VBox;
		public img_typeShow:Laya.Image;
		public tab_type:Laya.Tab;
		public img_jobShow:Laya.Image;
		public tab_job:Laya.Tab;
		public img_levelShow:Laya.Image;
		public tab_level:Laya.Tab;
		public btn_type:Laya.Button;
		public btn_job:Laya.Button;
		public btn_level:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":800},"child":[{"type":"Image","props":{"y":38,"x":12,"width":621,"skin":"image/main/fram_common_bg_02.png","sizeGrid":"31,19,22,21","height":677}},{"type":"Image","props":{"y":5,"x":5,"width":635,"skin":"image/main/fram_common_02.png","height":48},"child":[{"type":"Label","props":{"x":103,"width":94,"text":"物品名称","height":37,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","bottom":0}},{"type":"Label","props":{"x":234,"width":69,"text":"等级","height":37,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","bottom":0}},{"type":"Label","props":{"x":318,"width":69,"text":"价格","height":37,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","bottom":0}},{"type":"Label","props":{"x":406,"width":106,"text":"剩余时间","height":37,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","bottom":0}}]},{"type":"Panel","props":{"y":52,"x":9,"width":621,"var":"panel_0","height":664},"child":[{"type":"VBox","props":{"var":"vbox_0","space":3,"right":0,"left":0,"align":"center"},"child":[{"type":"BaiTanBuyItem","props":{"runtime":"ui.compart.BaiTanBuyItemUI"}},{"type":"BaiTanBuyItem","props":{"y":10,"x":10,"runtime":"ui.compart.BaiTanBuyItemUI"}},{"type":"BaiTanBuyItem","props":{"y":20,"x":20,"runtime":"ui.compart.BaiTanBuyItemUI"}},{"type":"BaiTanBuyItem","props":{"y":30,"x":30,"runtime":"ui.compart.BaiTanBuyItemUI"}},{"type":"BaiTanBuyItem","props":{"y":40,"x":40,"runtime":"ui.compart.BaiTanBuyItemUI"}},{"type":"BaiTanBuyItem","props":{"y":50,"x":50,"runtime":"ui.compart.BaiTanBuyItemUI"}},{"type":"BaiTanBuyItem","props":{"y":60,"x":60,"runtime":"ui.compart.BaiTanBuyItemUI"}},{"type":"BaiTanBuyItem","props":{"y":70,"x":70,"runtime":"ui.compart.BaiTanBuyItemUI"}}]}]},{"type":"Image","props":{"y":709,"x":29,"width":185,"var":"img_typeShow","skin":"image/common/fram_common_bg_01.png","sizeGrid":"62,41,68,40","height":665,"anchorY":1},"child":[{"type":"Tab","props":{"y":0,"x":0,"width":183,"var":"tab_type","stateNum":2,"space":-10,"skin":"image/main/fram_common_27_finish.png","selectedIndex":0,"scaleY":1.2,"scaleX":1,"labels":"全部类型,武器,衣服,头盔,项链,腰带,手镯,戒指,鞋子,药剂,强化道具,其他物品","labelStrokeColor":"#000000","labelStroke":6,"labelSize":25,"labelPadding":"5,0,0,0","labelFont":"FZXK","labelColors":"#FFFFFF","height":552,"direction":"vertical"}}]},{"type":"Image","props":{"y":708,"x":229,"width":185,"var":"img_jobShow","skin":"image/common/fram_common_bg_01.png","sizeGrid":"62,41,68,40","height":233,"anchorY":1},"child":[{"type":"Tab","props":{"y":0,"x":0,"width":183,"var":"tab_job","stateNum":2,"space":-10,"skin":"image/main/fram_common_27_finish.png","selectedIndex":0,"scaleY":1.2,"scaleX":1,"labels":"全部职业,战士,法师,道士","labelStrokeColor":"#000000","labelStroke":6,"labelSize":25,"labelPadding":"5,0,0,0","labelFont":"FZXK","labelColors":"#FFFFFF","height":190,"direction":"vertical"}}]},{"type":"Image","props":{"y":712,"x":429,"width":185,"var":"img_levelShow","skin":"image/common/fram_common_bg_01.png","sizeGrid":"62,41,68,40","height":445,"anchorY":1},"child":[{"type":"Tab","props":{"y":0,"x":1,"width":183,"var":"tab_level","stateNum":2,"space":-10,"skin":"image/main/fram_common_27_finish.png","selectedIndex":0,"scaleY":1.2,"scaleX":1,"labels":"全部等级,1-60级,70级,80级,1-2转,3-4转,5-6转,7-8转","labelStrokeColor":"#000000","labelStroke":6,"labelSize":25,"labelPadding":"5,0,0,0","labelFont":"FZXK","labelColors":"#FFFFFF","height":370,"direction":"vertical"}}]},{"type":"Button","props":{"y":718,"x":34,"width":169,"var":"btn_type","stateNum":2,"skin":"image/common/fram_common_09_finish.png","labelStrokeColor":"#000000","labelStroke":4,"labelSize":30,"labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"全部类型","height":58}},{"type":"Button","props":{"y":718,"x":236,"width":169,"var":"btn_job","stateNum":2,"skin":"image/common/fram_common_09_finish.png","labelStrokeColor":"#000000","labelStroke":4,"labelSize":30,"labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"全部职业","height":58}},{"type":"Button","props":{"y":718,"x":438,"width":169,"var":"btn_level","stateNum":2,"skin":"image/common/fram_common_09_finish.png","labelStrokeColor":"#000000","labelStroke":4,"labelSize":30,"labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"全部等级","height":58}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.compart.BaiTanBuyItemUI",ui.compart.BaiTanBuyItemUI);

            super.createChildren();
            this.createView(ui.compart.JiaoYiHangItemUI.uiView);

        }

    }
}

module ui.compart {
    export class JuQingContentV0ItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":590,"height":100},"child":[{"type":"Image","props":{"y":95,"width":580,"skin":"image/juQing/fram_common_30.png","height":5,"centerX":0,"bottom":0}},{"type":"Label","props":{"wordWrap":true,"width":550,"top":0,"text":"楼、酒馆、当铺，街道两旁还有不少张着大伞的小商贩，街道向东向西延伸，街上行人不断：有挑担赶路的、有驾牛送货的、又赶着毛驴拉货的。","leading":3,"fontSize":25,"font":"Microsoft YaHei","color":"#ffffff","centerX":0,"bottom":5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.JuQingContentV0ItemUI.uiView);

        }

    }
}

module ui.compart {
    export class JuQingContentV1ItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":590,"height":100},"child":[{"type":"Image","props":{"x":10,"width":482,"skin":"image/juQing/fram_common_30.png","height":5,"bottom":0}},{"type":"Label","props":{"x":18,"wordWrap":true,"width":480,"top":1,"text":"楼，街道向东向西延伸，街上行人不断：有挑担赶路的、有驾牛送货的、又赶着毛驴拉货的。","leading":3,"height":94,"fontSize":25,"font":"Microsoft YaHei","color":"#ffffff","bottom":5}},{"type":"NpcIconItem","props":{"y":-5,"x":490,"right":0,"runtime":"ui.compart.NpcIconItemUI"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.compart.NpcIconItemUI",ui.compart.NpcIconItemUI);

            super.createChildren();
            this.createView(ui.compart.JuQingContentV1ItemUI.uiView);

        }

    }
}

module ui.compart {
    export class JuQingContentV2ItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":590,"height":100},"child":[{"type":"Image","props":{"x":97,"width":482,"skin":"image/juQing/fram_common_30.png","height":5,"bottom":0}},{"type":"Label","props":{"x":100,"wordWrap":true,"width":480,"text":"楼，街道向东向西延伸，街上行人不断：有挑担赶路的、有驾牛送货的、又赶着毛驴拉货的。","leading":3,"height":94,"fontSize":25,"font":"Microsoft YaHei","color":"#ffffff","bottom":5}},{"type":"NpcIconItem","props":{"y":-5,"x":0,"left":0,"runtime":"ui.compart.NpcIconItemUI"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.compart.NpcIconItemUI",ui.compart.NpcIconItemUI);

            super.createChildren();
            this.createView(ui.compart.JuQingContentV2ItemUI.uiView);

        }

    }
}

module ui.compart {
    export class MonsterInSceneItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":130,"height":80},"child":[{"type":"Image","props":{"visible":false,"top":0,"skin":"image/main/dikuaibg.png","right":0,"left":0,"bottom":0}}]};
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
    export class Person_BattlePropsItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":490,"height":780},"child":[{"type":"Image","props":{"y":50,"x":13,"width":464,"skin":"image/common/nan01_half.png","height":321,"alpha":0.5}},{"type":"Box","props":{"y":9,"x":0,"width":223,"height":47},"child":[{"type":"Image","props":{"y":7,"x":39,"width":200,"skin":"image/main/fram_common_02.png","height":30}},{"type":"Image","props":{"y":9,"x":37,"width":200,"skin":"image/juese/fram_common_10.png","sizeGrid":"5,0,5,5","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":70,"skin":"image/common/fram_common_vipdi.png","height":60},"child":[{"type":"Label","props":{"y":7,"x":13,"width":43,"valign":"middle","text":"血","height":29,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":9,"x":162,"width":81,"text":"100/100","height":26,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Box","props":{"y":63,"x":0,"width":223,"height":47},"child":[{"type":"Image","props":{"y":7,"x":39,"width":200,"skin":"image/main/fram_common_02.png","height":30}},{"type":"Image","props":{"y":9,"x":37,"width":200,"skin":"image/juese/fram_common_12.png","sizeGrid":"5,0,5,10","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":70,"skin":"image/common/fram_common_vipdi.png","height":60},"child":[{"type":"Label","props":{"y":7,"x":13,"width":43,"valign":"middle","text":"耐","height":29,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":9,"x":162,"width":81,"text":"100/100","height":26,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Box","props":{"y":117,"x":0,"width":223,"height":47},"child":[{"type":"Image","props":{"y":7,"x":39,"width":200,"skin":"image/main/fram_common_02.png","height":30}},{"type":"Image","props":{"y":9,"x":37,"width":200,"skin":"image/juese/fram_common_13.png","sizeGrid":"5,0,5,10","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":70,"skin":"image/common/fram_common_vipdi.png","height":60},"child":[{"type":"Label","props":{"y":7,"x":13,"width":43,"valign":"middle","text":"抗","height":29,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":9,"x":162,"width":81,"text":"100/100","height":26,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Box","props":{"y":172,"x":0,"width":223,"height":47},"child":[{"type":"Image","props":{"y":7,"x":39,"width":200,"skin":"image/main/fram_common_02.png","height":30}},{"type":"Image","props":{"y":9,"x":37,"width":200,"skin":"image/juese/fram_common_14.png","sizeGrid":"5,0,5,10","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":70,"skin":"image/common/fram_common_vipdi.png","height":60},"child":[{"type":"Label","props":{"y":7,"x":13,"width":43,"valign":"middle","text":"巧","height":29,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":9,"x":162,"width":81,"text":"100/100","height":26,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Box","props":{"y":226,"x":0,"width":223,"height":47},"child":[{"type":"Image","props":{"y":7,"x":39,"width":200,"skin":"image/main/fram_common_02.png","height":30}},{"type":"Image","props":{"y":9,"x":37,"width":200,"skin":"image/juese/fram_common_15.png","sizeGrid":"5,0,5,10","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":70,"skin":"image/common/fram_common_vipdi.png","height":60},"child":[{"type":"Label","props":{"y":7,"x":13,"width":43,"valign":"middle","text":"拆","height":29,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":9,"x":162,"width":81,"text":"100/100","height":26,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Box","props":{"y":280,"x":0,"width":223,"height":47},"child":[{"type":"Image","props":{"y":7,"x":39,"width":200,"skin":"image/main/fram_common_02.png","height":30}},{"type":"Image","props":{"y":9,"x":37,"width":200,"skin":"image/juese/fram_common_16.png","sizeGrid":"5,0,5,10","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":70,"skin":"image/common/fram_common_vipdi.png","height":60},"child":[{"type":"Label","props":{"y":7,"x":13,"width":43,"valign":"middle","text":"敏","height":29,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":9,"x":162,"width":81,"text":"100/100","height":26,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Box","props":{"y":8,"x":242,"width":223,"height":47},"child":[{"type":"Image","props":{"y":7,"x":39,"width":200,"skin":"image/main/fram_common_02.png","height":30}},{"type":"Image","props":{"y":9,"x":37,"width":200,"skin":"image/juese/fram_common_11.png","sizeGrid":"5,0,5,10","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":70,"skin":"image/common/fram_common_vipdi.png","height":60},"child":[{"type":"Label","props":{"y":7,"x":13,"width":43,"valign":"middle","text":"气","height":29,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":9,"x":162,"width":81,"text":"100/100","height":26,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Box","props":{"y":62,"x":242,"width":223,"height":47},"child":[{"type":"Image","props":{"y":7,"x":39,"width":200,"skin":"image/main/fram_common_02.png","height":30}},{"type":"Image","props":{"y":9,"x":37,"width":200,"skin":"image/juese/fram_common_20.png","sizeGrid":"5,0,5,10","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":70,"skin":"image/common/fram_common_vipdi.png","height":60},"child":[{"type":"Label","props":{"y":7,"x":13,"width":43,"valign":"middle","text":"攻","height":29,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":9,"x":162,"width":81,"text":"100/100","height":26,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Box","props":{"y":116,"x":242,"width":223,"height":47},"child":[{"type":"Image","props":{"y":7,"x":39,"width":200,"skin":"image/main/fram_common_02.png","height":30}},{"type":"Image","props":{"y":9,"x":37,"width":200,"skin":"image/juese/fram_common_19.png","sizeGrid":"5,0,5,10","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":70,"skin":"image/common/fram_common_vipdi.png","height":60},"child":[{"type":"Label","props":{"y":7,"x":13,"width":43,"valign":"middle","text":"化","height":29,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":9,"x":162,"width":81,"text":"100/100","height":26,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Box","props":{"y":171,"x":242,"width":223,"height":47},"child":[{"type":"Image","props":{"y":7,"x":39,"width":200,"skin":"image/main/fram_common_02.png","height":30}},{"type":"Image","props":{"y":9,"x":37,"width":200,"skin":"image/juese/fram_common_18.png","sizeGrid":"5,0,5,10","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":70,"skin":"image/common/fram_common_vipdi.png","height":60},"child":[{"type":"Label","props":{"y":7,"x":13,"width":43,"valign":"middle","text":"会","height":29,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":9,"x":162,"width":81,"text":"100/100","height":26,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Box","props":{"y":225,"x":242,"width":223,"height":47},"child":[{"type":"Image","props":{"y":7,"x":39,"width":200,"skin":"image/main/fram_common_02.png","height":30}},{"type":"Image","props":{"y":9,"x":37,"width":200,"skin":"image/juese/fram_common_17.png","sizeGrid":"5,0,5,10","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":70,"skin":"image/common/fram_common_vipdi.png","height":60},"child":[{"type":"Label","props":{"y":7,"x":13,"width":43,"valign":"middle","text":"速","height":29,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":9,"x":162,"width":81,"text":"100/100","height":26,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Box","props":{"y":279,"x":242,"width":223,"height":47},"child":[{"type":"Image","props":{"y":7,"x":39,"width":200,"skin":"image/main/fram_common_02.png","height":30}},{"type":"Image","props":{"y":9,"x":37,"width":200,"skin":"image/juese/fram_common_16.png","sizeGrid":"5,0,5,10","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":70,"skin":"image/common/fram_common_vipdi.png","height":60},"child":[{"type":"Label","props":{"y":7,"x":13,"width":43,"valign":"middle","text":"力","height":29,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":9,"x":162,"width":81,"text":"100/100","height":26,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Image","props":{"y":400,"x":30,"skin":"image/main/fram_common_05.png","right":0,"left":-1,"height":19},"child":[{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"scaleX":-1,"right":35}},{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"left":-3}}]},{"type":"Image","props":{"y":418,"x":129,"width":232,"skin":"image/common/fram_common_09.png","height":45},"child":[{"type":"Label","props":{"y":3,"x":6,"width":220,"valign":"bottom","text":"属性说明","height":39,"fontSize":28,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":600,"x":129,"width":232,"skin":"image/common/fram_common_09.png","height":45},"child":[{"type":"Label","props":{"y":3,"x":6,"width":220,"valign":"bottom","text":"我要变强","height":39,"fontSize":28,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":580,"x":40,"skin":"image/main/fram_common_05.png","right":0,"left":-1,"height":19},"child":[{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"scaleX":-1,"right":35}},{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"left":-3}}]},{"type":"Box","props":{"y":310,"x":100,"width":289,"height":100},"child":[{"type":"Image","props":{"y":36.04241652764108,"x":57,"width":232,"skin":"image/common/fram_common_09.png","height":45},"child":[{"type":"Label","props":{"y":3,"x":6,"width":220,"valign":"middle","text":"999999","height":39,"fontSize":28,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":41.04241652764108,"width":120,"skin":"image/common/fram_common_vipdi.png","rotation":-20,"height":90},"child":[{"type":"Image","props":{"y":4,"x":38,"skin":"image/juese/zi_xiayizhi01.png","rotation":20}}]}]},{"type":"Label","props":{"y":465,"x":11,"wordWrap":true,"width":342,"text":"气与血是人体内的两大类基本物质，气对人体有推动调控作用、温煦凉润作用、防御作用、固摄作用及中介作用.","strokeColor":"#ffffff","stroke":1,"height":69,"fontSize":20,"font":"Microsoft YaHei"}},{"type":"Image","props":{"y":443,"x":359,"skin":"image/juese/img_common_09.png"},"child":[{"type":"Image","props":{"y":28,"x":34,"skin":"image/juese/zi_0.png"}}]},{"type":"Image","props":{"y":539,"x":1,"width":356,"skin":"image/common/fram_common_09.png","sizeGrid":"0,39,0,37","height":38},"child":[{"type":"Label","props":{"y":-1,"x":6,"width":333,"valign":"middle","text":"参考区间:8000-10000","height":39,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"x":10,"centerX":0,"bottom":10},"child":[{"type":"Box","props":{"y":7,"x":175},"child":[{"type":"Button","props":{"y":-7,"x":14,"width":100,"stateNum":2,"skin":"image/common/img_common_03.png","height":110},"child":[{"type":"Button","props":{"y":19,"x":11,"stateNum":2,"skin":"image/juese/icon_role_shengchenbazi_finish.png"}}]},{"type":"Image","props":{"y":80,"x":-2,"width":130,"skin":"image/common/fram_common_04.png","sizeGrid":"0,56,0,38","height":37},"child":[{"type":"Label","props":{"y":4,"x":11,"width":108,"text":"玩法名称","height":29,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]},{"type":"Box","props":{"y":7,"x":348},"child":[{"type":"Button","props":{"y":-7,"x":14,"width":100,"stateNum":2,"skin":"image/common/img_common_03.png","height":110},"child":[{"type":"Button","props":{"y":19,"x":11,"stateNum":2,"skin":"image/juese/icon_role_shengchenbazi_finish.png"}}]},{"type":"Image","props":{"y":80,"x":-2,"width":130,"skin":"image/common/fram_common_04.png","sizeGrid":"0,56,0,38","height":37},"child":[{"type":"Label","props":{"y":4,"x":11,"width":108,"text":"玩法名称","height":29,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]},{"type":"Box","props":{"y":7,"x":2},"child":[{"type":"Button","props":{"y":-7,"x":14,"width":100,"stateNum":2,"skin":"image/common/img_common_03.png","height":110},"child":[{"type":"Button","props":{"y":19,"x":11,"stateNum":2,"skin":"image/juese/icon_role_shengchenbazi_finish.png"}}]},{"type":"Image","props":{"y":80,"x":-2,"width":130,"skin":"image/common/fram_common_04.png","sizeGrid":"0,56,0,38","height":37},"child":[{"type":"Label","props":{"y":4,"x":11,"width":108,"text":"玩法名称","height":29,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.Person_BattlePropsItemUI.uiView);

        }

    }
}

module ui.compart {
    export class Person_EquipInfoItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":490,"height":780},"child":[{"type":"Box","props":{"y":3,"x":37},"child":[{"type":"Image","props":{"y":49,"x":73,"skin":"image/common/nan01_half.png"}},{"type":"DaoJuBgItem","props":{"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"DaoJuBgItem","props":{"y":80,"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"DaoJuBgItem","props":{"y":160,"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"DaoJuBgItem","props":{"y":239,"x":0,"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"DaoJuBgItem","props":{"y":239,"x":112,"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"DaoJuBgItem","props":{"y":1,"x":337,"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"DaoJuBgItem","props":{"y":81,"x":337,"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"DaoJuBgItem","props":{"y":161,"x":337,"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"DaoJuBgItem","props":{"y":239,"x":337,"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"DaoJuBgItem","props":{"y":239,"x":225,"runtime":"ui.compart.DaoJuBgItemUI"}}]},{"type":"Image","props":{"y":418,"x":129,"width":232,"skin":"image/common/fram_common_09.png","height":45},"child":[{"type":"Label","props":{"y":3,"x":6,"width":220,"valign":"bottom","text":"装备推荐","height":39,"fontSize":28,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":600,"x":129,"width":232,"skin":"image/common/fram_common_09.png","height":45},"child":[{"type":"Label","props":{"y":3,"x":6,"width":220,"valign":"bottom","text":"获取途径","height":39,"fontSize":28,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"DaoJuBgItem","props":{"y":484,"x":31,"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"DaoJuBgItem","props":{"y":484,"x":148,"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"DaoJuBgItem","props":{"y":484,"x":264,"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"DaoJuBgItem","props":{"y":484,"x":381,"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"Image","props":{"y":580,"x":10,"skin":"image/main/fram_common_05.png","right":0,"left":-1,"height":19},"child":[{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"scaleX":-1,"right":35}},{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"left":-3}}]},{"type":"Image","props":{"y":400,"x":20,"skin":"image/main/fram_common_05.png","right":0,"left":-1,"height":19},"child":[{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"scaleX":-1,"right":35}},{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"left":-3}}]},{"type":"Box","props":{"centerX":0,"bottom":10},"child":[{"type":"Box","props":{"y":7,"x":175},"child":[{"type":"Button","props":{"y":-7,"x":14,"width":100,"stateNum":2,"skin":"image/common/img_common_03.png","height":110},"child":[{"type":"Button","props":{"y":19,"x":11,"stateNum":2,"skin":"image/juese/icon_role_shengchenbazi_finish.png"}}]},{"type":"Image","props":{"y":80,"x":-2,"width":130,"skin":"image/common/fram_common_04.png","sizeGrid":"0,56,0,38","height":37},"child":[{"type":"Label","props":{"y":4,"x":11,"width":108,"text":"玩法名称","height":29,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]},{"type":"Box","props":{"y":7,"x":348},"child":[{"type":"Button","props":{"y":-7,"x":14,"width":100,"stateNum":2,"skin":"image/common/img_common_03.png","height":110},"child":[{"type":"Button","props":{"y":19,"x":11,"stateNum":2,"skin":"image/juese/icon_role_shengchenbazi_finish.png"}}]},{"type":"Image","props":{"y":80,"x":-2,"width":130,"skin":"image/common/fram_common_04.png","sizeGrid":"0,56,0,38","height":37},"child":[{"type":"Label","props":{"y":4,"x":11,"width":108,"text":"玩法名称","height":29,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]},{"type":"Box","props":{"y":7,"x":2},"child":[{"type":"Button","props":{"y":-7,"x":14,"width":100,"stateNum":2,"skin":"image/common/img_common_03.png","height":110},"child":[{"type":"Button","props":{"y":19,"x":11,"stateNum":2,"skin":"image/juese/icon_role_shengchenbazi_finish.png"}}]},{"type":"Image","props":{"y":80,"x":-2,"width":130,"skin":"image/common/fram_common_04.png","sizeGrid":"0,56,0,38","height":37},"child":[{"type":"Label","props":{"y":4,"x":11,"width":108,"text":"玩法名称","height":29,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.compart.DaoJuBgItemUI",ui.compart.DaoJuBgItemUI);

            super.createChildren();
            this.createView(ui.compart.Person_EquipInfoItemUI.uiView);

        }

    }
}

module ui.compart {
    export class Person_InfoItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":490,"height":780},"child":[{"type":"Box","props":{"y":462,"x":13},"child":[{"type":"Image","props":{"y":0,"x":2,"width":144,"skin":"image/common/img_common_06.png","height":65},"child":[{"type":"Label","props":{"y":13,"x":3,"width":158,"text":"人物标签","strokeColor":"#000000","stroke":4,"height":39,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]},{"type":"Image","props":{"y":0,"x":156,"width":144,"skin":"image/common/img_common_06.png","height":65},"child":[{"type":"Label","props":{"y":13,"x":3,"width":158,"text":"人物标签","strokeColor":"#000000","stroke":4,"height":39,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]},{"type":"Image","props":{"y":0,"x":311,"width":144,"skin":"image/common/img_common_06.png","height":65},"child":[{"type":"Label","props":{"y":13,"x":3,"width":158,"text":"人物标签","strokeColor":"#000000","stroke":4,"height":39,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]},{"type":"Image","props":{"y":59,"x":2,"width":144,"skin":"image/common/img_common_06.png","height":65},"child":[{"type":"Label","props":{"y":13,"x":3,"width":158,"text":"人物标签","strokeColor":"#000000","stroke":4,"height":39,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]},{"type":"Image","props":{"y":59,"x":156,"width":144,"skin":"image/common/img_common_06.png","height":65},"child":[{"type":"Label","props":{"y":13,"x":3,"width":158,"text":"人物标签","strokeColor":"#000000","stroke":4,"height":39,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]},{"type":"Image","props":{"y":59,"x":311,"width":144,"skin":"image/common/img_common_06.png","height":65},"child":[{"type":"Label","props":{"y":13,"x":3,"width":158,"text":"人物标签","strokeColor":"#000000","stroke":4,"height":39,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]}]},{"type":"Box","props":{"y":16,"x":12},"child":[{"type":"Image","props":{"width":200,"skin":"image/common/fram_common_09.png","height":40},"child":[{"type":"Label","props":{"text":"体质:99999","right":0,"left":25,"height":33,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","bottom":0,"align":"left"}}]},{"type":"Image","props":{"y":236,"width":200,"skin":"image/common/fram_common_09.png","height":40},"child":[{"type":"Label","props":{"text":"帮派:正气帮","right":0,"left":25,"height":33,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","bottom":0,"align":"left"}}]},{"type":"Image","props":{"y":47,"width":200,"skin":"image/common/fram_common_09.png","height":40},"child":[{"type":"Label","props":{"text":"心情:100","right":0,"left":25,"height":33,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","bottom":0,"align":"left"}}]},{"type":"Image","props":{"y":94,"width":200,"skin":"image/common/fram_common_09.png","height":40},"child":[{"type":"Label","props":{"text":"职业:华山派","right":0,"left":25,"height":33,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","bottom":0,"align":"left"}}]},{"type":"Image","props":{"y":142,"width":200,"skin":"image/common/fram_common_09.png","height":40},"child":[{"type":"Label","props":{"text":"年龄:21","right":0,"left":25,"height":33,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","bottom":0,"align":"left"}}]},{"type":"Image","props":{"y":189,"width":200,"skin":"image/common/fram_common_09.png","height":40},"child":[{"type":"Label","props":{"text":"名气；江湖虾米","right":0,"left":25,"height":33,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","bottom":0,"align":"left"}}]}]},{"type":"Box","props":{"y":-30,"x":232},"child":[{"type":"Image","props":{"y":274,"x":77,"skin":"image/juese/img_common_08.png"}},{"type":"Image","props":{"x":55,"width":192,"skin":"image/common/nan01.png","height":319}},{"type":"Image","props":{"y":30,"x":52,"width":113,"skin":"image/common/img_common_06.png","rotation":90,"height":52},"child":[{"type":"Label","props":{"y":42,"x":17,"wordWrap":true,"width":31,"text":"装扮","rotation":-90,"height":60,"fontSize":30,"font":"FZXK","color":"#ffffff"}}]}]},{"type":"Box","props":{"y":300,"x":0},"child":[{"type":"Box","props":{},"child":[{"type":"Image","props":{"y":8,"x":63,"width":389,"skin":"image/main/fram_common_02.png","height":19}},{"type":"Image","props":{"y":10,"x":61,"width":200,"skin":"image/main/fram_common_exp.png","sizeGrid":"5,0,5,10","height":17}},{"type":"Image","props":{"width":114,"skin":"image/common/fram_common_vipdi.png","height":39},"child":[{"type":"Label","props":{"y":2,"x":31,"width":55,"valign":"middle","text":"健康","height":29,"fontSize":20,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":8,"x":359,"width":81,"text":"100/100","height":26,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Box","props":{"y":31,"x":2},"child":[{"type":"Image","props":{"y":8,"x":63,"width":389,"skin":"image/main/fram_common_02.png","height":19}},{"type":"Image","props":{"y":10,"x":61,"width":390,"skin":"image/main/fram_common_11.png","sizeGrid":"5,0,5,10"}},{"type":"Image","props":{"width":114,"skin":"image/common/fram_common_vipdi.png","height":39},"child":[{"type":"Label","props":{"y":2,"x":31,"width":55,"valign":"middle","text":"体力","height":29,"fontSize":20,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":10,"x":357,"width":81,"text":"100/100","height":23,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Box","props":{"y":62,"x":1},"child":[{"type":"Image","props":{"y":8,"x":63,"width":389,"skin":"image/main/fram_common_02.png","height":19}},{"type":"Image","props":{"y":10,"x":61,"width":390,"skin":"image/main/fram_common_100.png","sizeGrid":"5,0,5,10"}},{"type":"Image","props":{"width":114,"skin":"image/common/fram_common_vipdi.png","height":39},"child":[{"type":"Label","props":{"y":2,"x":31,"width":55,"valign":"middle","text":"精神力","height":29,"fontSize":20,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":9,"x":359,"width":81,"text":"100/100","height":20,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff"}}]}]},{"type":"Image","props":{"y":600,"x":129,"width":232,"skin":"image/common/fram_common_09.png","height":45},"child":[{"type":"Label","props":{"y":3,"x":6,"width":220,"valign":"bottom","text":"命数履历","height":39,"fontSize":28,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":418,"x":129,"width":232,"skin":"image/common/fram_common_09.png","height":45},"child":[{"type":"Label","props":{"y":5,"x":6,"width":220,"valign":"bottom","text":"人物标签","height":39,"fontSize":28,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":400,"skin":"image/main/fram_common_05.png","right":0,"left":0,"height":19},"child":[{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"scaleX":-1,"right":35}},{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"left":-3}}]},{"type":"Image","props":{"y":580,"skin":"image/main/fram_common_05.png","right":0,"left":-1,"height":19},"child":[{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"scaleX":-1,"right":35}},{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"left":-3}}]},{"type":"Box","props":{"centerX":0,"bottom":10},"child":[{"type":"Box","props":{"y":7,"x":175},"child":[{"type":"Button","props":{"y":-7,"x":14,"width":100,"stateNum":2,"skin":"image/common/img_common_03.png","height":110},"child":[{"type":"Button","props":{"y":19,"x":11,"stateNum":2,"skin":"image/juese/icon_role_shengchenbazi_finish.png"}}]},{"type":"Image","props":{"y":80,"x":-2,"width":130,"skin":"image/common/fram_common_04.png","sizeGrid":"0,56,0,38","height":37},"child":[{"type":"Label","props":{"y":4,"x":11,"width":108,"text":"玩法名称","height":29,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]},{"type":"Box","props":{"y":7,"x":348},"child":[{"type":"Button","props":{"y":-7,"x":14,"width":100,"stateNum":2,"skin":"image/common/img_common_03.png","height":110},"child":[{"type":"Button","props":{"y":19,"x":11,"stateNum":2,"skin":"image/juese/icon_role_shengchenbazi_finish.png"}}]},{"type":"Image","props":{"y":80,"x":-2,"width":130,"skin":"image/common/fram_common_04.png","sizeGrid":"0,56,0,38","height":37},"child":[{"type":"Label","props":{"y":4,"x":11,"width":108,"text":"玩法名称","height":29,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]},{"type":"Box","props":{"y":7,"x":2},"child":[{"type":"Button","props":{"y":-7,"x":14,"width":100,"stateNum":2,"skin":"image/common/img_common_03.png","height":110},"child":[{"type":"Button","props":{"y":19,"x":11,"stateNum":2,"skin":"image/juese/icon_role_shengchenbazi_finish.png"}}]},{"type":"Image","props":{"y":80,"x":-2,"width":130,"skin":"image/common/fram_common_04.png","sizeGrid":"0,56,0,38","height":37},"child":[{"type":"Label","props":{"y":4,"x":11,"width":108,"text":"玩法名称","height":29,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.Person_InfoItemUI.uiView);

        }

    }
}

module ui.compart {
    export class Person_TalentInfoItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":490,"height":780},"child":[{"type":"Image","props":{"y":600,"x":129,"width":232,"skin":"image/common/fram_common_09.png","height":45},"child":[{"type":"Label","props":{"y":3,"x":6,"width":220,"valign":"bottom","text":"获取途径","height":39,"fontSize":28,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":580,"x":20,"skin":"image/main/fram_common_05.png","right":0,"left":-1,"height":19},"child":[{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"scaleX":-1,"right":35}},{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"left":-3}}]},{"type":"Box","props":{"y":10,"x":10,"centerX":0,"bottom":10},"child":[{"type":"Box","props":{"y":7,"x":175},"child":[{"type":"Button","props":{"y":-7,"x":14,"width":100,"stateNum":2,"skin":"image/common/img_common_03.png","height":110},"child":[{"type":"Button","props":{"y":19,"x":11,"stateNum":2,"skin":"image/juese/icon_role_shengchenbazi_finish.png"}}]},{"type":"Image","props":{"y":80,"x":-2,"width":130,"skin":"image/common/fram_common_04.png","sizeGrid":"0,56,0,38","height":37},"child":[{"type":"Label","props":{"y":4,"x":11,"width":108,"text":"玩法名称","height":29,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]},{"type":"Box","props":{"y":7,"x":348},"child":[{"type":"Button","props":{"y":-7,"x":14,"width":100,"stateNum":2,"skin":"image/common/img_common_03.png","height":110},"child":[{"type":"Button","props":{"y":19,"x":11,"stateNum":2,"skin":"image/juese/icon_role_shengchenbazi_finish.png"}}]},{"type":"Image","props":{"y":80,"x":-2,"width":130,"skin":"image/common/fram_common_04.png","sizeGrid":"0,56,0,38","height":37},"child":[{"type":"Label","props":{"y":4,"x":11,"width":108,"text":"玩法名称","height":29,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]},{"type":"Box","props":{"y":7,"x":2},"child":[{"type":"Button","props":{"y":-7,"x":14,"width":100,"stateNum":2,"skin":"image/common/img_common_03.png","height":110},"child":[{"type":"Button","props":{"y":19,"x":11,"stateNum":2,"skin":"image/juese/icon_role_shengchenbazi_finish.png"}}]},{"type":"Image","props":{"y":80,"x":-2,"width":130,"skin":"image/common/fram_common_04.png","sizeGrid":"0,56,0,38","height":37},"child":[{"type":"Label","props":{"y":4,"x":11,"width":108,"text":"玩法名称","height":29,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]}]},{"type":"Image","props":{"y":418,"x":129,"width":232,"skin":"image/common/fram_common_09.png","height":45},"child":[{"type":"Label","props":{"y":3,"x":6,"width":220,"valign":"bottom","text":"进阶预览","height":39,"fontSize":28,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":400,"x":30,"skin":"image/main/fram_common_05.png","right":0,"left":-1,"height":19},"child":[{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"scaleX":-1,"right":35}},{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"left":-3}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.Person_TalentInfoItemUI.uiView);

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

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":560,"height":560},"child":[{"type":"Image","props":{"top":0,"skin":"image/common/scene/scene01.png","sizeGrid":"0,50,0,50","right":0,"left":0,"bottom":0}},{"type":"VBox","props":{"var":"vbox_all","top":5,"space":0,"right":0,"left":0,"align":"left"},"child":[{"type":"Panel","props":{"y":0,"width":550,"var":"panel_monster","right":0,"left":10,"height":277},"child":[{"type":"HBox","props":{"y":11,"x":0,"var":"hbox_monster01","space":30,"align":"middle"}},{"type":"HBox","props":{"y":101,"x":0,"var":"hbox_monster02","space":30,"align":"middle"}},{"type":"HBox","props":{"y":195,"x":0,"var":"hbox_monster03","space":30,"align":"middle"}}]},{"type":"Panel","props":{"y":292,"width":550,"var":"panel_player","right":0,"left":10,"height":197},"child":[{"type":"HBox","props":{"y":11,"x":0,"var":"hbox_player01","space":30,"align":"middle"}},{"type":"HBox","props":{"y":109,"x":0,"var":"hbox_player02","space":30,"align":"middle"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.SceneItemUI.uiView);

        }

    }
}

module ui.compart {
    export class ShopHotItemUI extends View {
		public lbl_price:Laya.Label;
		public img_coin:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":100,"height":110},"child":[{"type":"DaoJuItem","props":{"y":13,"x":14,"runtime":"ui.compart.DaoJuItemUI"}},{"type":"Image","props":{"y":-4,"x":66,"width":40,"skin":"image/common/icon_tishi.png","height":45}},{"type":"Image","props":{"width":100,"skin":"image/common/fram_common_04.png","right":0,"left":0,"height":30,"bottom":0},"child":[{"type":"Label","props":{"width":80,"var":"lbl_price","text":"000000","right":0,"height":24,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff","bottom":0,"align":"center"}},{"type":"Image","props":{"y":1,"x":-6,"width":38,"var":"img_coin","skin":"image/main/icon_common_jinbi01.png","height":31}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.compart.DaoJuItemUI",ui.compart.DaoJuItemUI);

            super.createChildren();
            this.createView(ui.compart.ShopHotItemUI.uiView);

        }

    }
}

module ui.compart {
    export class TaskInfoItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":465,"height":90},"child":[{"type":"Image","props":{"y":0,"x":0,"width":465,"skin":"image/task/fram_common_28.png","sizeGrid":"0,34,22,46","height":90},"child":[{"type":"Box","props":{"y":7,"x":16},"child":[{"type":"Label","props":{"text":"杀死怪盗","fontSize":22,"font":"Microsoft YaHei","color":"#000000","bold":true}},{"type":"Label","props":{"y":1,"x":93,"text":"（5/10）","fontSize":22,"font":"Microsoft YaHei","color":"#000000","bold":true}},{"type":"Label","props":{"y":4,"x":195,"text":"活跃度","fontSize":20,"font":"Microsoft YaHei","color":"#000000","bold":false}},{"type":"Label","props":{"y":4,"x":283,"text":"+5","fontSize":20,"font":"Microsoft YaHei","color":"#000000","bold":false}},{"type":"Image","props":{"y":2,"x":260,"width":22,"skin":"image/task/icon_huoyuedu.png","height":29}}]},{"type":"Image","props":{"y":16,"x":363,"width":95,"skin":"image/common/fram_common_09.png","height":45},"child":[{"type":"Label","props":{"y":8,"x":24,"text":"前往","fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Box","props":{"y":47,"x":11},"child":[{"type":"Image","props":{"width":340,"skin":"image/common/fram_common_02.png"}},{"type":"Image","props":{"y":5,"x":5,"width":170,"skin":"image/common/fram_common_12.png","height":19}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.compart.TaskInfoItemUI.uiView);

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

        public static  uiView:any ={"type":"View","props":{"width":520,"height":250},"child":[{"type":"Image","props":{"top":0,"skin":"image/common/fram_common_20.png","sizeGrid":"58,30,30,30","right":0,"left":0,"bottom":0}},{"type":"Button","props":{"y":0,"x":471,"width":50,"var":"btn_close","stateNum":2,"skin":"image/common/btn_common_guangbi01up_finish.png","height":50}},{"type":"TextInput","props":{"y":38,"x":12,"width":400,"var":"txtInput_0","type":"text","skin":"image/common/input_bg.png","promptColor":"#ffffff","prompt":"点击输入文本:","maxChars":50,"height":94,"fontSize":30,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}},{"type":"RadioGroup","props":{"y":165,"x":36,"width":644,"var":"rad_type","stateNum":3,"space":20,"skin":"image/main/btn_common_08up_finish.png","selectedIndex":0,"scaleY":0.7,"scaleX":0.7,"labels":"当前,世界,组队,帮会","labelSize":35,"labelPadding":"15,0,0,0","labelFont":"FZXK","labelColors":"#000000,#000000,#000000","height":69}},{"type":"Button","props":{"y":61,"width":100,"var":"btn_send","stateNum":2,"skin":"image/common/btn_caidan_01_finish.png","right":13,"labelStrokeColor":"#000000","labelStroke":4,"labelSize":30,"labelFont":"FZXK","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","labelBold":true,"label":"发送","height":57}},{"type":"Button","props":{"y":55,"x":337,"width":60,"var":"btn_biaoQing","stateNum":2,"skin":"image/main/icon_common_biaoqing01up_finish.png","height":60}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.dialog.ChatSendDialogUI.uiView);

        }

    }
}

module ui.dialog {
    export class ItemInfoV1DialogUI extends Dialog {
		public btn_close:Laya.Button;
		public ui_item:ui.compart.DaoJuItemUI;
		public lbl_itemName:Laya.Label;
		public btn_use:Laya.Button;
		public btn_destroy:Laya.Button;
		public lbl_itemDes:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":500,"height":400},"child":[{"type":"Image","props":{"y":20,"x":20,"top":0,"skin":"image/common/fram_common_20.png","right":0,"left":0,"bottom":0}},{"type":"Button","props":{"y":4,"x":428,"var":"btn_close","stateNum":2,"skin":"image/common/btn_common_guangbi01up_finish.png"}},{"type":"DaoJuItem","props":{"y":72,"x":46,"var":"ui_item","scaleY":1.2,"scaleX":1.2,"runtime":"ui.compart.DaoJuItemUI"}},{"type":"Label","props":{"y":34,"x":22,"width":149,"var":"lbl_itemName","text":"道具六个字啊","strokeColor":"#000000","stroke":4,"height":28,"fontSize":25,"font":"FZXK","color":"#f8f4f4","align":"center"}},{"type":"Image","props":{"y":172,"x":30,"width":450,"skin":"image/main/fram_common_bg_02.png","sizeGrid":"16,15,17,17","height":141}},{"type":"Button","props":{"y":321,"x":71,"width":105,"var":"btn_use","stateNum":2,"skin":"image/common/fram_common_09_finish.png","labelStrokeColor":"#000000","labelStroke":4,"labelSize":25,"labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"使用","height":50}},{"type":"Button","props":{"y":322,"x":324,"width":105,"var":"btn_destroy","stateNum":2,"skin":"image/common/fram_common_09_finish.png","labelStrokeColor":"#000000","labelStroke":4,"labelSize":25,"labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"销毁","height":50}},{"type":"Label","props":{"y":180,"x":39,"wordWrap":true,"width":433,"var":"lbl_itemDes","text":"label","height":123,"fontSize":20,"font":"Microsoft YaHei"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.compart.DaoJuItemUI",ui.compart.DaoJuItemUI);

            super.createChildren();
            this.createView(ui.dialog.ItemInfoV1DialogUI.uiView);

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

        public static  uiView:any ={"type":"View","props":{"width":520,"height":580},"child":[{"type":"Image","props":{"y":407,"x":110,"top":0,"skin":"image/common/fram_common_bg_01.png","sizeGrid":"55,42,67,40","right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"y":-10,"x":-10,"top":-10,"skin":"image/common/fram_common_17.png","sizeGrid":"52,60,56,62","right":-10,"left":-10,"bottom":-10}},{"type":"Image","props":{"y":-28,"x":181,"width":238,"skin":"image/common/title_common_01.png","height":81,"centerX":0},"child":[{"type":"Label","props":{"y":20,"x":29,"width":180,"var":"lbl_npcTitle","text":"王摸摸摸","height":40,"fontSize":36,"font":"FZXK","color":"#000000","align":"center"}}]},{"type":"Button","props":{"y":4,"var":"btn_close","stateNum":2,"skin":"image/common/btn_common_guangbi01up_finish.png","right":3}}]},{"type":"Image","props":{"y":63,"x":41,"var":"img_npcBg","skin":"image/common/fram_common_19.png"},"child":[{"type":"Image","props":{"y":-3,"x":-8,"skin":"image/common/fram_common_18.png"},"child":[{"type":"Image","props":{"y":2,"x":7,"var":"img_npcPic","skin":"image/common/npc/img_banshenxiang_juese01.png"}}]}]},{"type":"Label","props":{"y":69,"x":235,"width":262,"var":"lbl_npcName","text":"王大麻子(小二)","height":25,"fontSize":25,"font":"FZXK","color":"#000000","bold":true,"align":"left"}},{"type":"Label","props":{"y":105,"x":239,"width":266,"var":"lbl_npcDes","text":"他看起来骨骼轻盈。\\n他是个店小二。\\n","height":132,"fontSize":20,"font":"SimHei","color":"#000000","align":"left"}},{"type":"Image","props":{"y":302,"skin":"image/main/fram_common_05.png","right":0,"left":0}},{"type":"Image","props":{"y":261,"x":44,"skin":"image/common/icon_haogandu.png"}}]};
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

        public static  uiView:any ={"type":"View","props":{"width":600,"height":600},"child":[{"type":"Tab","props":{"y":63,"width":54,"var":"tab_scene","stateNum":2,"space":0,"skin":"image/common/btn_common_02up2_finish.png","selectedIndex":0,"scaleY":0.8,"scaleX":1,"left":0,"labels":"介\\n绍,事\\n件,景\\n观,N\\nP\\nC","labelStrokeColor":"#000000","labelStroke":6,"labelSize":30,"labelPadding":"0,0,0,10","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","labelAlign":"left","height":632,"direction":"vertical","sizeGrid":"44,15,38,32"}},{"type":"Box","props":{"y":-6,"right":0,"left":55,"height":594},"child":[{"type":"Image","props":{"top":30,"skin":"image/common/fram_common_bg_01.png","sizeGrid":"55,42,67,40","right":3,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":-10,"skin":"image/common/fram_common_17.png","sizeGrid":"52,60,56,62","right":-10,"left":-10,"bottom":-10}},{"type":"Image","props":{"width":30,"skin":"image/common/btn_common_05.png","height":20,"centerX":0,"bottom":10}}]},{"type":"Image","props":{"width":274,"top":0,"skin":"image/common/title_common_01.png","height":81,"centerX":0},"child":[{"type":"Label","props":{"y":20,"x":47,"width":180,"var":"lbl_sceneName","text":"洛阳城","height":40,"fontSize":36,"font":"FZXK","color":"#000000","align":"center"}}]},{"type":"Button","props":{"var":"btn_close","top":15,"stateNum":2,"skin":"image/common/btn_common_guangbi01up_finish.png","right":0}}]},{"type":"Image","props":{"y":90,"x":99,"width":141,"skin":"image/common/scene/img_01.png","height":142}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.dialog.SceneInfoDialogUI.uiView);

        }

    }
}

module ui.dialog {
    export class TaskLayerDialogUI extends Dialog {
		public btn_close:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"y":4,"x":-16,"width":455,"height":410},"child":[{"type":"Image","props":{"y":-6,"x":13,"width":455,"skin":"image/common/fram_common_20.png","height":410},"child":[{"type":"Label","props":{"y":34,"x":177,"text":"任务详情","fontSize":24,"font":"Microsoft YaHei","color":"#000000","bold":true}},{"type":"Image","props":{"y":72,"x":22,"width":415,"skin":"image/main/fram_common_bg_02.png","sizeGrid":"11,14,16,13","height":208},"child":[{"type":"Label","props":{"text":"   XXXXXXXXXXXXXXXXXXXXXXXXXX\\n   XXXXXXXXXXXXXX\\n   XXXXXXXXXX\\n   XXXXXXXXXXX\\n   XXXXXXXXXXXXXXXXXX\\n   XXXXXXXXXXXXX","fontSize":20}}]}]},{"type":"Image","props":{"y":282,"x":100,"skin":"image/common/img_common_05.png"}},{"type":"Image","props":{"y":305,"x":395,"skin":"image/common/img_common_05.png","rotation":180}},{"type":"Label","props":{"y":280,"x":222,"text":"奖励","fontSize":22,"font":"Microsoft YaHei","color":"#000000","bold":false}},{"type":"DaoJuBgItem","props":{"y":308,"x":58,"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"DaoJuBgItem","props":{"y":308,"x":158,"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"DaoJuBgItem","props":{"y":308,"x":258,"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"DaoJuBgItem","props":{"y":307,"x":356,"runtime":"ui.compart.DaoJuBgItemUI"}},{"type":"Button","props":{"y":-5,"x":399,"var":"btn_close","stateNum":2,"skin":"image/common/btn_common_guangbi01up_finish.png"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.compart.DaoJuBgItemUI",ui.compart.DaoJuBgItemUI);

            super.createChildren();
            this.createView(ui.dialog.TaskLayerDialogUI.uiView);

        }

    }
}

module ui.fuBen {
    export class FuBenPanelUI extends View {
		public btn_goJuQing:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":0,"x":0,"top":0,"skin":"image/common/bg_common_01.png","right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"x":0,"skin":"image/main/fram_common_23.png","right":0,"left":0,"height":92,"bottom":0}},{"type":"Image","props":{"y":1030,"x":0,"skin":"image/main/fram_common_21.png"}},{"type":"Image","props":{"y":1030,"x":639,"skin":"image/main/fram_common_21.png","scaleX":-1}}]},{"type":"Image","props":{"y":1067,"x":-5,"width":896,"skin":"image/main/fram_common_05.png","rotation":270,"height":19}},{"type":"Image","props":{"y":241,"x":153,"width":798,"skin":"image/main/fram_common_05.png","rotation":90,"height":15}},{"type":"Image","props":{"y":1039,"x":10,"skin":"image/main/fram_common_05.png","scaleY":-1,"rotation":0,"right":0,"left":0,"height":19}},{"type":"Box","props":{"y":130,"x":-5,"width":656,"height":134},"child":[{"type":"Image","props":{"y":7,"skin":"image/main/fram_common_22.png","right":10,"left":10,"height":121}},{"type":"Image","props":{"y":2,"x":27,"skin":"image/main/fram_common_05.png"}},{"type":"Image","props":{"y":-14,"x":648,"skin":"image/main/fram_common_21.png","scaleX":-1}},{"type":"Image","props":{"skin":"image/main/fram_common_06.png"}},{"type":"Image","props":{"y":115,"x":44,"skin":"image/main/fram_common_05.png"}},{"type":"Image","props":{"y":20,"x":87,"width":485,"skin":"image/main/fram_common_08.png","sizeGrid":"0,41,0,40","height":96},"child":[{"type":"Label","props":{"y":12,"x":63,"wordWrap":true,"width":377,"text":"洛阳故城XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX","height":71,"fontSize":22,"color":"#ffffff","align":"left"}},{"type":"Button","props":{"y":57,"x":400,"width":32,"stateNum":1,"skin":"image/main/btn_common_01.png","height":32}}]},{"type":"Button","props":{"y":16,"x":527,"width":116,"stateNum":2,"skin":"image/main/icon_plot_pianzhangmulu.png","labelStrokeColor":"#000000","labelStroke":6,"labelSize":35,"labelPadding":"0,0,0,0","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"篇章\\n目录","height":105}},{"type":"Button","props":{"y":15,"x":13,"width":110,"stateNum":2,"skin":"image/main/icon_plot_juqing01up_finish.png","selected":true,"height":99},"child":[{"type":"Image","props":{"y":74,"x":-17,"width":142,"skin":"image/common/title_common_01.png","mouseThrough":true,"height":46},"child":[{"type":"Label","props":{"y":13,"x":11,"width":119,"text":"竹业篇","strokeColor":"#000000","stroke":6,"mouseThrough":true,"height":31,"fontSize":25,"font":"FZXK","color":"#ffffff","align":"center"}}]}]}]},{"type":"Image","props":{"y":157,"x":645,"width":896,"skin":"image/main/fram_common_05.png","rotation":90,"height":19}},{"type":"Image","props":{"y":596,"x":191,"width":450,"skin":"image/main/fram_common_08.png","sizeGrid":"0,41,0,40","height":116},"child":[{"type":"Panel","props":{"y":1,"x":25,"width":430,"height":114},"child":[{"type":"HBox","props":{"top":0,"bottom":0,"align":"middle"},"child":[{"type":"NpcIconItem","props":{"y":4,"x":56,"runtime":"ui.compart.NpcIconItemUI"}},{"type":"NpcIconItem","props":{"y":3,"x":158,"runtime":"ui.compart.NpcIconItemUI"}},{"type":"NpcIconItem","props":{"y":4,"x":258,"runtime":"ui.compart.NpcIconItemUI"}},{"type":"NpcIconItem","props":{"y":6,"x":357,"runtime":"ui.compart.NpcIconItemUI"}}]}]}]},{"type":"Button","props":{"y":541,"x":168,"width":120,"stateNum":2,"skin":"image/common/fram_common_09_finish.png","right":352,"labelStrokeColor":"#000000","labelStroke":6,"labelSize":30,"labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"排名","height":50}},{"type":"Button","props":{"y":541,"x":332,"width":120,"stateNum":2,"skin":"image/common/fram_common_09_finish.png","right":180,"labelStrokeColor":"#000000","labelStroke":6,"labelSize":30,"labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"评论","height":50}},{"type":"Button","props":{"y":541,"width":120,"stateNum":2,"skin":"image/common/fram_common_09_finish.png","right":22,"labelStrokeColor":"#000000","labelStroke":6,"labelSize":30,"labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"分享","height":50}},{"type":"Image","props":{"y":601,"x":221,"width":110,"skin":"image/common/img_common_06.png","rotation":90,"height":88},"child":[{"type":"Label","props":{"y":65,"x":20,"width":23,"text":"解\\n锁\\n新","strokeColor":"#000000","stroke":4,"rotation":-90,"height":46,"fontSize":22,"font":"Microsoft YaHei","color":"#FFFFFF"}},{"type":"Label","props":{"y":40.99999999999999,"x":20,"width":21,"text":"N\\nP\\nC","strokeColor":"#000000","stroke":4,"rotation":-90,"height":66,"fontSize":22,"font":"Microsoft YaHei","color":"#FFFFFF"}}]},{"type":"Image","props":{"y":878,"x":231,"width":143,"skin":"image/common/img_common_06.png","rotation":90,"height":87},"child":[{"type":"Label","props":{"y":66,"x":26,"width":44,"valign":"middle","text":"事件\\n奖励","strokeColor":"#000000","stroke":4,"rotation":-90,"height":74,"fontSize":22,"font":"Microsoft YaHei","color":"#FFFFFF","align":"center"}}]},{"type":"Image","props":{"y":733,"x":217,"width":107,"skin":"image/common/img_common_06.png","rotation":90,"height":67},"child":[{"type":"Label","props":{"y":55,"x":8,"width":44,"valign":"middle","text":"事\\n件","strokeColor":"#000000","stroke":4,"rotation":-90,"height":74,"fontSize":22,"font":"Microsoft YaHei","color":"#FFFFFF","align":"center"}}]},{"type":"Image","props":{"y":872,"x":61,"width":30,"skin":"image/common/btn_common_05.png","height":22}},{"type":"Image","props":{"y":285,"x":62,"width":30,"skin":"image/common/btn_common_05.png","scaleY":-1,"height":22}},{"type":"Image","props":{"y":264,"x":158,"width":224,"skin":"image/fuben/charpterBg_01.png","height":270}},{"type":"Box","props":{"y":860,"x":239},"child":[{"type":"DaoJuItem","props":{"x":100,"runtime":"ui.compart.DaoJuItemUI"}},{"type":"DaoJuItem","props":{"x":199,"runtime":"ui.compart.DaoJuItemUI"}},{"type":"DaoJuItem","props":{"x":299,"runtime":"ui.compart.DaoJuItemUI"}},{"type":"DaoJuItem","props":{"y":88,"x":100,"runtime":"ui.compart.DaoJuItemUI"}},{"type":"DaoJuItem","props":{"y":88,"x":199,"runtime":"ui.compart.DaoJuItemUI"}},{"type":"DaoJuItem","props":{"y":88,"x":299,"runtime":"ui.compart.DaoJuItemUI"}},{"type":"DaoJuItem","props":{"runtime":"ui.compart.DaoJuItemUI"}},{"type":"DaoJuItem","props":{"y":88,"runtime":"ui.compart.DaoJuItemUI"}}]},{"type":"Image","props":{"y":711,"skin":"image/main/fram_common_05.png","right":0,"left":150,"height":19},"child":[{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"scaleX":-1,"right":35}},{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"left":-3}}]},{"type":"Image","props":{"y":844,"skin":"image/main/fram_common_05.png","right":0,"left":150,"height":19},"child":[{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"scaleX":-1,"right":35}},{"type":"Image","props":{"y":42,"skin":"image/main/fram_common_24.png","scaleY":-1,"left":-3}}]},{"type":"Button","props":{"y":882,"x":-20,"width":169,"var":"btn_goJuQing","stateNum":2,"skin":"image/fuben/btn_common_10_finish.png","labelStrokeColor":"#000000","labelStroke":4,"labelSize":35,"labelPadding":"10","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"前往\\n挑战","height":142}},{"type":"Panel","props":{"y":286,"x":7,"width":140,"height":583},"child":[{"type":"Tab","props":{"y":0,"x":0,"width":195,"skin":"image/main/fram_common_27_finish.png","labels":"label1,label2","height":245,"direction":"vertical"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.compart.NpcIconItemUI",ui.compart.NpcIconItemUI);
			View.regComponent("ui.compart.DaoJuItemUI",ui.compart.DaoJuItemUI);

            super.createChildren();
            this.createView(ui.fuBen.FuBenPanelUI.uiView);

        }

    }
}

module ui.guild {
    export class GuildSelectPanelUI extends View {
		public vstack_guild:Laya.ViewStack;
		public box_guildList:Laya.Box;
		public panel_guild:Laya.Panel;
		public vbox_guild:Laya.VBox;
		public box_createGuild:Laya.Box;
		public box_searchGuild:Laya.Box;
		public tab_guild:Laya.Tab;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"x":0,"top":0,"skin":"image/common/bg_common_01.png","bottom":0},"child":[{"type":"Image","props":{"y":1044,"x":0,"width":643,"skin":"image/main/fram_common_23.png","left":0,"height":92}},{"type":"Image","props":{"y":1030,"x":0,"skin":"image/main/fram_common_21.png"}},{"type":"Image","props":{"y":1030,"x":639,"skin":"image/main/fram_common_21.png","scaleX":-1}}]},{"type":"Box","props":{"y":130,"x":-8,"width":656,"height":134},"child":[{"type":"Image","props":{"y":7,"skin":"image/main/fram_common_22.png","right":10,"left":10,"height":121}},{"type":"Image","props":{"y":2,"x":27,"skin":"image/main/fram_common_05.png"}},{"type":"Image","props":{"y":-14,"x":648,"skin":"image/main/fram_common_21.png","scaleX":-1}},{"type":"Image","props":{"y":115,"x":9,"width":637,"skin":"image/main/fram_common_05.png","height":19}},{"type":"Image","props":{"y":20,"x":87,"width":485,"skin":"image/main/fram_common_08.png","sizeGrid":"0,41,0,40","height":96},"child":[{"type":"Label","props":{"y":21,"x":62,"wordWrap":true,"width":377,"text":"背包介绍背包介绍背包介绍背包介绍背包介绍背包介绍背包介绍背包介绍","height":71,"fontSize":22,"color":"#ffffff","align":"left"}},{"type":"Button","props":{"y":57,"x":400,"width":32,"stateNum":1,"skin":"image/main/btn_common_01.png","height":32}}]},{"type":"Button","props":{"y":14,"x":34,"width":99,"stateNum":2,"skin":"image/common/icon_gonghui01_finish.png","height":107},"child":[{"type":"Image","props":{"y":71,"x":-22,"width":156,"skin":"image/common/title_common_01.png","height":49}},{"type":"Label","props":{"y":82,"x":-11,"width":130,"text":"江湖小帮","strokeColor":"#000000","stroke":6,"mouseThrough":true,"height":33,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Button","props":{"y":23,"x":535,"width":91,"stateNum":1,"skin":"image/common/icon_social_zudui01.png","labelStrokeColor":"#000000","labelStroke":4,"labelSize":35,"labelPadding":"35,0,0,0","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"组队","height":86}}]},{"type":"Image","props":{"y":1030,"x":0,"skin":"image/main/fram_common_21.png"}},{"type":"Image","props":{"y":1030,"x":637,"skin":"image/main/fram_common_21.png","scaleX":-1}},{"type":"Image","props":{"y":220,"x":-9,"width":148,"skin":"image/common/title_common_01.png","height":46},"child":[{"type":"Label","props":{"y":9,"x":13,"width":119,"text":"江湖小帮","strokeColor":"#000000","stroke":6,"mouseThrough":true,"height":31,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"ViewStack","props":{"y":264,"x":0,"width":640,"var":"vstack_guild","selectedIndex":1,"height":701},"child":[{"type":"Box","props":{"y":0,"x":0,"width":640,"var":"box_guildList","name":"item0","height":686},"child":[{"type":"Image","props":{"y":-10,"x":22,"width":596,"skin":"image/main/fram_common_bg_02.png","sizeGrid":"9,5,8,4","height":695}},{"type":"Panel","props":{"y":44,"x":25,"width":589,"var":"panel_guild","height":642},"child":[{"type":"VBox","props":{"y":1,"var":"vbox_guild","right":0,"pivotY":1,"pivotX":5,"left":0,"align":"center"}}]},{"type":"Image","props":{"y":-1,"width":156,"skin":"image/main/fram_common_02.png","right":20,"height":40},"child":[{"type":"Label","props":{"y":8,"x":19,"text":"只看符合条件","fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]},{"type":"CheckBox","props":{"y":-2,"width":38,"stateNum":2,"skin":"image/guild/fram_common_38_finish.png","right":180,"height":38}}]},{"type":"Box","props":{"y":0,"x":0,"width":640,"var":"box_createGuild","name":"item1","height":686},"child":[{"type":"Image","props":{"y":567,"x":627,"width":631,"skin":"image/main/fram_common_05.png","rotation":180,"height":23}},{"type":"Box","props":{"y":-12,"x":4,"width":631,"height":570},"child":[{"type":"Image","props":{"y":0,"x":0,"width":629,"skin":"image/guild/bg_guild_01.png","height":569}},{"type":"Image","props":{"y":50,"x":169,"width":293,"skin":"image/guild/img_common_16.png","height":305,"alpha":0.7}},{"type":"Image","props":{"y":114,"x":258,"width":115,"skin":"image/guild/icon_gonghui02.png","height":165}},{"type":"Box","props":{"y":369,"x":122},"child":[{"type":"Image","props":{"y":0,"x":-8,"skin":"image/guild/fram_common_34.png"},"child":[{"type":"Label","props":{"y":9,"x":29,"width":107,"text":"帮派名称：","strokeColor":"#000000","stroke":2,"height":29,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Image","props":{"y":55,"x":-9,"skin":"image/guild/fram_common_34.png"},"child":[{"type":"Label","props":{"y":8,"x":30,"width":57,"text":"口号：","strokeColor":"#000000","stroke":2,"height":28,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}}]}]},{"type":"Button","props":{"y":485,"x":249,"stateNum":2,"skin":"image/common/fram_common_09_finish.png","scaleY":0.8,"scaleX":1.1,"labelStrokeColor":"#000000","labelStroke":6,"labelSize":26,"labelFont":"Microsoft YaHei","labelColors":"#ffffff"},"child":[{"type":"Label","props":{"y":22,"x":40,"width":52,"text":"创建","strokeColor":"#000000","stroke":2,"height":35,"fontSize":26,"font":"Microsoft YaHei","color":"#ffffff"}}]}]},{"type":"Image","props":{"y":46,"x":30,"skin":"image/common/img_common_23.png"},"child":[{"type":"Label","props":{"y":34,"x":48,"text":"聚\\n集\\n天\\n下\\n众\\n豪\\n杰","strokeColor":"#000000","stroke":5,"rotation":0,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Image","props":{"y":46,"x":478,"skin":"image/common/img_common_23.png"},"child":[{"type":"Label","props":{"y":34,"x":48,"width":30,"text":"义\\n气\\n千\\n秋\\n洒\\n热\\n血","strokeColor":"#000000","stroke":5,"rotation":0,"height":210,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Image","props":{"y":567,"x":26,"width":588,"skin":"image/guild/fram_common_35.png","sizeGrid":"22,27,28,25","height":114},"child":[{"type":"Label","props":{"y":17,"x":23,"text":"说明：","fontSize":22,"font":"Microsoft YaHei","color":"#000000","bold":true}},{"type":"Label","props":{"y":49,"x":39,"text":"1.加入门派可以获得XXXXXXXXXX","fontSize":20,"font":"Microsoft YaHei"}},{"type":"Label","props":{"y":81,"x":39,"text":"2.加入门派可以XXXXXXXXXX","fontSize":20,"font":"Microsoft YaHei"}}]},{"type":"Image","props":{"y":525,"x":-10,"skin":"image/main/fram_common_24.png"}},{"type":"Image","props":{"y":526,"x":631,"skin":"image/main/fram_common_24.png","scaleX":-1}}]},{"type":"Box","props":{"y":0,"x":0,"width":640,"var":"box_searchGuild","name":"item2","height":686},"child":[{"type":"Image","props":{"y":-10,"x":22,"width":596,"skin":"image/main/fram_common_bg_02.png","sizeGrid":"9,5,8,4","height":695}},{"type":"Button","props":{"y":1,"x":500,"stateNum":2,"skin":"image/common/btn_caidan_01_finish.png","labelSize":24,"labelFont":"Microsoft YaHei","labelColors":"#ffffff","label":"搜索"}},{"type":"GuildItem","props":{"y":58,"x":26,"runtime":"ui.compart.GuildItemUI"}},{"type":"Image","props":{"y":339,"x":124,"width":392,"skin":"image/common/input_bg.png","height":67,"alpha":0.75},"child":[{"type":"Label","props":{"y":18,"x":46,"text":"找不到这个江湖小帮！","strokeColor":"#000000","stroke":5,"fontSize":30,"color":"#ffffff","alpha":0.75}}]},{"type":"Box","props":{"y":4,"x":18},"child":[{"type":"TextInput","props":{"width":471,"skin":"image/guild/fram_common_36.png","sizeGrid":"5,6,10,7","prompt":"请输入帮派名称","height":57,"fontSize":30,"font":"Microsoft YaHei","align":"center"}}]}]}]},{"type":"Tab","props":{"y":967,"x":62,"width":515,"var":"tab_guild","stateNum":2,"space":60,"skin":"image/common/fram_common_09_finish.png","selectedIndex":1,"scaleY":0.8,"labels":"帮会列表,创建帮会,搜索帮会","labelStrokeColor":"#000000","labelStroke":4,"labelSize":24,"labelFont":"FZXK","labelColors":"#ffffff,#ffffff","height":78,"direction":"horizontal"}},{"type":"Image","props":{"y":1066,"x":-5,"width":929,"skin":"image/main/fram_common_05.png","rotation":270,"height":19}},{"type":"Image","props":{"y":1055,"x":632,"width":896,"skin":"image/main/fram_common_05.png","rotation":270,"height":19}},{"type":"Image","props":{"y":130,"x":-8,"skin":"image/main/fram_common_06.png"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.compart.GuildItemUI",ui.compart.GuildItemUI);

            super.createChildren();
            this.createView(ui.guild.GuildSelectPanelUI.uiView);

        }

    }
}

module ui.guild {
    export class GuildTeamPanelUI extends View {
		public vstack_team:Laya.ViewStack;
		public box_teamDetail:Laya.Box;
		public box_teamAct:Laya.Box;
		public panel_get:Laya.Panel;
		public vbox_get:Laya.VBox;
		public box_actGet:Laya.Box;
		public box_teamManage:Laya.Box;
		public tab_team:Laya.Tab;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":0,"x":0,"top":0,"skin":"image/common/bg_common_01.png","bottom":0},"child":[{"type":"Image","props":{"y":1044,"x":0,"width":640,"skin":"image/main/fram_common_23.png","left":0,"height":92,"bottom":0}},{"type":"Image","props":{"y":1030,"x":0,"skin":"image/main/fram_common_21.png"}}]},{"type":"Box","props":{"y":130,"x":-8,"width":656,"height":134},"child":[{"type":"Image","props":{"y":7,"skin":"image/main/fram_common_22.png","right":10,"left":10,"height":121}},{"type":"Image","props":{"y":2,"x":27,"skin":"image/main/fram_common_05.png"}},{"type":"Image","props":{"y":-14,"x":648,"skin":"image/main/fram_common_21.png","scaleX":-1}},{"type":"Image","props":{"y":115,"x":9,"width":637,"skin":"image/main/fram_common_05.png","height":19}},{"type":"Image","props":{"y":20,"x":87,"width":485,"skin":"image/main/fram_common_08.png","sizeGrid":"0,41,0,40","height":96},"child":[{"type":"Label","props":{"y":21,"x":62,"wordWrap":true,"width":377,"text":"背包介绍背包介绍背包介绍背包介绍背包介绍背包介绍背包介绍背包介绍","height":71,"fontSize":22,"color":"#ffffff","align":"left"}},{"type":"Button","props":{"y":57,"x":400,"width":32,"stateNum":1,"skin":"image/main/btn_common_01.png","height":32}}]},{"type":"Button","props":{"y":14,"x":34,"width":99,"stateNum":2,"skin":"image/common/icon_gonghui01_finish.png","label":"label","height":107},"child":[{"type":"Image","props":{"y":71,"x":-22,"width":156,"skin":"image/common/title_common_01.png","height":49}},{"type":"Label","props":{"y":82,"x":-11,"width":130,"text":"江湖小帮","strokeColor":"#000000","stroke":6,"mouseThrough":true,"height":33,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Button","props":{"y":23,"x":535,"width":91,"stateNum":1,"skin":"image/common/icon_social_zudui01.png","labelStrokeColor":"#000000","labelStroke":4,"labelSize":35,"labelPadding":"35,0,0,0","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"组队","height":86}}]},{"type":"ViewStack","props":{"y":255,"x":0,"var":"vstack_team","right":0,"left":0,"height":698},"child":[{"type":"Box","props":{"y":0,"var":"box_teamDetail","right":0,"name":"item0","left":0,"height":686},"child":[{"type":"Box","props":{"y":0,"x":14},"child":[{"type":"Box","props":{"y":6.999999999999886,"x":187.0000037512857},"child":[{"type":"Image","props":{"width":424,"skin":"image/common/input_bg.png","height":53,"alpha":0.8},"child":[{"type":"Label","props":{"y":10,"x":54,"width":144,"text":"成员：","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":10,"x":119,"width":77,"text":"XX/XX","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":10,"x":217,"width":77,"text":"资金：","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":10,"x":278,"width":77,"text":"177942","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Image","props":{"y":56,"width":424,"skin":"image/common/input_bg.png","height":53,"alpha":0.8},"child":[{"type":"Label","props":{"y":10,"x":54,"width":144,"text":"职位：","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":10,"x":119,"width":77,"text":"副帮主","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":10,"x":217,"width":77,"text":"贡献：","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":10,"x":278,"width":77,"text":"1554","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Image","props":{"y":114,"x":0,"width":424,"skin":"image/common/input_bg.png","height":55,"alpha":0.8},"child":[{"type":"Label","props":{"y":10,"x":113,"width":57,"text":"帮主：","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":10,"x":177,"width":124,"text":"XXXXXXXX","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}}]}]},{"type":"Box","props":{"y":-3.000000000000128,"x":-12.99999624871431},"child":[{"type":"Button","props":{"y":25.000000000000128,"x":27.99999624871431,"width":127,"stateNum":2,"skin":"image/guild/team/img_common_21_finish(1).png","height":129},"child":[{"type":"Image","props":{"y":9,"x":20,"skin":"image/guild/team/icon_bangpai.png"}}]},{"type":"Box","props":{"y":103.00000000000013,"x":106.99999624871431,"width":74,"height":46},"child":[{"type":"Image","props":{"y":41.99999999999994,"x":77.00000225077137,"width":77,"skin":"image/common/fram_common_vipdi.png","scaleY":0.6,"rotation":180,"height":70,"alpha":0.8}},{"type":"Button","props":{"y":13.999999999999943,"x":15.000002250771374,"stateNum":2,"skin":"image/guild/team/zi_buff_finish.png"}}]},{"type":"Box","props":{"y":-0.9999999999998721,"x":0.9999962487143108},"child":[{"type":"Image","props":{"y":69.99999999999989,"x":77.00000375128569,"width":77,"skin":"image/common/fram_common_vipdi.png","rotation":180,"height":70}},{"type":"Label","props":{"y":28,"x":20,"width":34,"text":"Lv.6","strokeColor":"#000000","stroke":2,"height":24,"fontSize":17,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Image","props":{"y":141.0000000000001,"x":21.99999624871431,"skin":"image/common/fram_common_04.png","alpha":0.75},"child":[{"type":"Label","props":{"y":5,"x":26,"width":96,"text":"公会名称","strokeColor":"#000000","stroke":5,"height":35,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}}]}]}]},{"type":"Box","props":{"y":166,"x":13,"width":614,"height":117},"child":[{"type":"Image","props":{"y":1,"x":612,"width":130,"skin":"image/common/img_common_23.png","sizeGrid":"24,0,26,0","rotation":90,"height":614}},{"type":"Label","props":{"y":32,"x":37,"width":103,"text":"公会宣言：","strokeColor":"#000000","height":27,"fontSize":22,"font":"Microsoft YaHei","color":"#000000","bold":false}},{"type":"Label","props":{"y":31,"x":144,"wordWrap":true,"width":431,"text":"够爷们你就来，来了就是兄弟。兄弟带你闯天下，一起霸气满天下。","strokeColor":"#000000","height":73,"fontSize":22,"font":"Microsoft YaHei","color":"#000000","bold":false}}]},{"type":"Box","props":{"y":341,"x":-5,"width":650,"height":61},"child":[{"type":"Image","props":{"y":42,"x":642,"width":640,"skin":"image/main/fram_common_05.png","rotation":180}},{"type":"Image","props":{"skin":"image/main/fram_common_24.png"}},{"type":"Image","props":{"x":643,"skin":"image/main/fram_common_24.png","scaleX":-1}}]},{"type":"Box","props":{"y":278,"x":11},"child":[{"type":"Box","props":{"y":42,"x":0,"scaleX":1.1},"child":[{"type":"Image","props":{"skin":"image/guild/team/img_common_25.png"}},{"type":"Image","props":{"skin":"image/guild/team/img_common_25down.png"}}]},{"type":"Image","props":{"x":4,"width":65,"skin":"image/common/icon_baoxiang01down.png","height":60}},{"type":"Image","props":{"y":57,"x":0,"width":25,"skin":"image/task/icon_huoyuedu.png","height":33},"child":[{"type":"Label","props":{"y":1,"x":25,"text":"5","fontSize":23}}]},{"type":"Image","props":{"y":0,"x":141,"width":65,"skin":"image/common/icon_baoxiang02down.png","height":60}},{"type":"Image","props":{"y":57,"x":144,"width":25,"skin":"image/task/icon_huoyuedu.png","height":33},"child":[{"type":"Label","props":{"y":1,"x":25,"text":"5","fontSize":23}}]},{"type":"Image","props":{"y":0,"x":264,"width":65,"skin":"image/common/icon_baoxiang03.png","height":60}},{"type":"Image","props":{"y":56,"x":266,"width":25,"skin":"image/task/icon_huoyuedu.png","height":33},"child":[{"type":"Label","props":{"y":1,"x":25,"text":"5","fontSize":23}}]},{"type":"Image","props":{"y":0,"x":372,"width":65,"skin":"image/common/icon_baoxiang04down.png","height":60}},{"type":"Image","props":{"y":57,"x":377,"width":25,"skin":"image/task/icon_huoyuedu.png","height":33},"child":[{"type":"Label","props":{"y":1,"x":25,"text":"5","fontSize":23}}]}]},{"type":"Box","props":{"y":386,"x":39},"child":[{"type":"Image","props":{"x":296,"skin":"image/guild/team/icon_team_cangku.png"}},{"type":"Image","props":{"skin":"image/guild/team/icon_team_shangdian.png"}},{"type":"Image","props":{"y":155,"skin":"image/guild/team/icon_team_fuli.png"}},{"type":"Image","props":{"y":155,"x":296,"skin":"image/guild/team/icon_team_xiezhu.png"}}]},{"type":"Box","props":{"y":278,"x":35},"child":[{"type":"Button","props":{"y":2,"x":485,"stateNum":2,"skin":"image/guild/team/icon_jiangli_finish.png","labelSize":24,"labelFont":"FZXK","labelColors":"#ffffff"},"child":[{"type":"Label","props":{"y":56,"x":-6,"text":"每日捐赠","strokeColor":"#000000","stroke":5,"fontSize":24,"font":"FZXK","color":"#ffffff"}}]}]}]},{"type":"Box","props":{"y":0,"var":"box_teamAct","right":0,"name":"item1","left":0,"height":686},"child":[{"type":"Tab","props":{"y":4,"x":22,"stateNum":2,"space":35,"skin":"image/guild/team/btn_common_12_finish(2).png","labels":"每日\\n必做,组队\\n副本,组队\\n副本,组队\\n副本,组队\\n副本","labelStroke":5,"labelSize":22,"labelFont":"FZXK","labelColors":"#ffffff,#ffffff"}},{"type":"Image","props":{"y":80,"x":0,"width":640,"skin":"image/main/fram_common_05.png","scaleY":0.4}},{"type":"Panel","props":{"y":88,"x":14,"width":612,"var":"panel_get","height":602},"child":[{"type":"VBox","props":{"y":0,"x":0,"var":"vbox_get","right":0,"left":0},"child":[{"type":"Box","props":{"y":0,"x":8,"var":"box_actGet"},"child":[{"type":"Image","props":{"width":596,"skin":"image/guild/team/fram_common_26.png","sizeGrid":"0,20,0,19","height":165}},{"type":"Image","props":{"y":11,"x":49,"width":131,"skin":"image/guild/img_common_16.png","height":137,"alpha":0.7}},{"type":"Image","props":{"y":20,"x":61,"width":134,"skin":"image/common/img_common_06.png","rotation":90,"height":52}},{"type":"Label","props":{"y":31,"x":24,"wordWrap":true,"width":32,"text":"龙城争霸","strokeColor":"#000000","stroke":4,"height":85,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Image","props":{"y":30,"x":64,"skin":"image/guild/team/icon_longchengzhenba.png"}},{"type":"Label","props":{"y":25,"x":198,"width":102,"text":"活动奖励：","height":27,"fontSize":22,"font":"Microsoft YaHei","color":"#000000","bold":true}},{"type":"Label","props":{"y":62,"x":208,"width":302,"text":"令狐冲碎片×1、任盈盈碎片×1","height":27,"fontSize":22,"font":"Microsoft YaHei","color":"#000000","bold":false}},{"type":"Label","props":{"y":90,"x":198,"width":102,"text":"活动时间：","height":27,"fontSize":22,"font":"Microsoft YaHei","color":"#000000","bold":true}},{"type":"Label","props":{"y":116,"x":198,"width":302,"text":"2019.07.11 15：00：00","height":27,"fontSize":22,"font":"Microsoft YaHei","color":"#000000","bold":false}}]}]}]}]},{"type":"Box","props":{"y":0,"var":"box_teamManage","right":0,"name":"item2","left":0,"height":686},"child":[{"type":"Box","props":{"y":1,"x":14},"child":[{"type":"Box","props":{"y":6.999999999999886,"x":187.0000037512857},"child":[{"type":"Image","props":{"width":424,"skin":"image/common/input_bg.png","height":53,"alpha":0.8},"child":[{"type":"Label","props":{"y":10,"x":54,"width":144,"text":"成员：","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":10,"x":119,"width":77,"text":"XX/XX","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":10,"x":217,"width":77,"text":"资金：","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":10,"x":278,"width":77,"text":"177942","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Image","props":{"y":56,"width":424,"skin":"image/common/input_bg.png","height":53,"alpha":0.8},"child":[{"type":"Label","props":{"y":10,"x":54,"width":144,"text":"职位：","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":10,"x":119,"width":77,"text":"副帮主","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":10,"x":217,"width":77,"text":"贡献：","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":10,"x":278,"width":77,"text":"1554","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Image","props":{"y":114,"width":424,"skin":"image/common/input_bg.png","height":53,"alpha":0.8},"child":[{"type":"Label","props":{"y":10,"x":113,"width":57,"text":"帮主：","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":10,"x":177,"width":124,"text":"XXXXXXXX","strokeColor":"#000000","stroke":5,"height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}}]}]},{"type":"Box","props":{"y":-3.000000000000128,"x":-12.99999624871431},"child":[{"type":"Button","props":{"y":25.000000000000128,"x":27.99999624871431,"width":127,"stateNum":2,"skin":"image/guild/team/img_common_21_finish(1).png","height":129},"child":[{"type":"Image","props":{"y":9,"x":20,"skin":"image/guild/team/icon_bangpai.png"}}]},{"type":"Box","props":{"y":103.00000000000013,"x":106.99999624871431,"width":74,"height":46},"child":[{"type":"Image","props":{"y":41.99999999999994,"x":77.00000225077137,"width":77,"skin":"image/common/fram_common_vipdi.png","scaleY":0.6,"rotation":180,"height":70,"alpha":0.8}},{"type":"Button","props":{"y":13.999999999999943,"x":15.000002250771374,"stateNum":2,"skin":"image/guild/team/zi_buff_finish.png"}}]},{"type":"Box","props":{"y":-0.9999999999998721,"x":0.9999962487143108},"child":[{"type":"Image","props":{"y":69.99999999999989,"x":77.00000375128569,"width":77,"skin":"image/common/fram_common_vipdi.png","rotation":180,"height":70}},{"type":"Label","props":{"y":28,"x":20,"width":34,"text":"Lv.6","strokeColor":"#000000","stroke":2,"height":24,"fontSize":17,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Image","props":{"y":141.0000000000001,"x":21.99999624871431,"skin":"image/common/fram_common_04.png","alpha":0.75},"child":[{"type":"Label","props":{"y":5,"x":26,"width":96,"text":"公会名称","strokeColor":"#000000","stroke":5,"height":35,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}}]}]}]},{"type":"Box","props":{"y":166,"x":13,"width":614,"height":156},"child":[{"type":"Image","props":{"y":1,"x":612,"width":130,"skin":"image/common/img_common_23.png","sizeGrid":"24,0,26,0","rotation":90,"height":614}},{"type":"Label","props":{"y":32,"x":37,"width":103,"text":"公会宣言：","strokeColor":"#000000","height":27,"fontSize":22,"font":"Microsoft YaHei","color":"#000000","bold":false}},{"type":"Label","props":{"y":31,"x":144,"wordWrap":true,"width":431,"text":"够爷们你就来，来了就是兄弟。兄弟带你闯天下，一起霸气满天下。","strokeColor":"#000000","height":73,"fontSize":22,"font":"Microsoft YaHei","color":"#000000","bold":false}}]},{"type":"Box","props":{"y":266,"x":-5,"width":650,"height":61},"child":[{"type":"Image","props":{"y":42,"x":642,"width":640,"skin":"image/main/fram_common_05.png","rotation":180}},{"type":"Image","props":{"skin":"image/main/fram_common_24.png"}},{"type":"Image","props":{"x":643,"skin":"image/main/fram_common_24.png","scaleX":-1}}]},{"type":"Box","props":{"y":318,"x":38},"child":[{"type":"Image","props":{"y":251,"x":297,"skin":"image/guild/team/icon_team_bangpai.png"}},{"type":"Image","props":{"y":126,"x":297,"skin":"image/guild/team/icon_team_chengyuan.png"}},{"type":"Image","props":{"x":297,"skin":"image/guild/team/icon_team_shezhi.png"}},{"type":"Image","props":{"skin":"image/guild/team/icon_team_waijiao.png"}},{"type":"Image","props":{"y":125,"skin":"image/guild/team/icon_team_rizhi.png"}},{"type":"Image","props":{"y":251,"skin":"image/guild/team/icon_team_shenqing.png"}}]}]}]},{"type":"Image","props":{"y":963,"x":638,"width":640,"skin":"image/main/fram_common_05.png","rotation":180}},{"type":"Tab","props":{"y":964,"x":22,"var":"tab_team","stateNum":2,"space":10,"skin":"image/guild/team/btn_common_11_finish.png","selectedIndex":1,"labels":"帮会信息,帮派活动,帮派管理","labelStrokeColor":"#000000","labelStroke":5,"labelSize":24,"labelFont":"FZXK","labelColors":"#ffffff,#ffffff","direction":"horizontal"}},{"type":"Image","props":{"y":1066,"x":-5,"width":929,"skin":"image/main/fram_common_05.png","rotation":270,"height":19}},{"type":"Image","props":{"y":1055,"x":632,"width":896,"skin":"image/main/fram_common_05.png","rotation":270,"height":19}},{"type":"Image","props":{"y":1030,"x":639,"skin":"image/main/fram_common_21.png","scaleX":-1}},{"type":"Image","props":{"y":130,"x":-8,"skin":"image/main/fram_common_06.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.guild.GuildTeamPanelUI.uiView);

        }

    }
}

module ui.juese {
    export class JueSePanelUI extends View {
		public box_player:Laya.Box;
		public panel_player:Laya.Panel;
		public tab_player:Laya.Tab;
		public viw_player:Laya.ViewStack;
		public box_change:Laya.Box;
		public btn_change:Laya.Button;
		public lbl_change:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":20,"x":20,"top":0,"skin":"image/common/bg_common_01.png","right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"x":0,"skin":"image/main/fram_common_23.png","right":0,"left":0,"height":92,"bottom":0}},{"type":"Image","props":{"y":1030,"x":0,"skin":"image/main/fram_common_21.png"}},{"type":"Image","props":{"y":1030,"x":639,"skin":"image/main/fram_common_21.png","scaleX":-1}}]},{"type":"Image","props":{"y":1039,"skin":"image/main/fram_common_05.png","scaleY":-1,"rotation":0,"right":0,"left":0,"height":19}},{"type":"Image","props":{"y":1045,"x":-6,"width":896,"skin":"image/main/fram_common_05.png","rotation":270,"height":19}},{"type":"Box","props":{"y":130,"x":-5,"width":656,"height":134},"child":[{"type":"Image","props":{"y":7,"skin":"image/main/fram_common_22.png","right":10,"left":10,"height":121}},{"type":"Image","props":{"y":2,"x":27,"skin":"image/main/fram_common_05.png"}},{"type":"Image","props":{"y":-14,"x":648,"skin":"image/main/fram_common_21.png","scaleX":-1}},{"type":"Image","props":{"skin":"image/main/fram_common_06.png"}},{"type":"Image","props":{"y":115,"x":44,"skin":"image/main/fram_common_05.png"}},{"type":"Image","props":{"y":20,"x":87,"width":485,"skin":"image/main/fram_common_08.png","sizeGrid":"0,41,0,40","height":96},"child":[{"type":"Label","props":{"y":12,"x":63,"wordWrap":true,"width":377,"text":"洛阳故城XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX","height":71,"fontSize":22,"color":"#ffffff","align":"left"}},{"type":"Button","props":{"y":57,"x":400,"width":32,"stateNum":1,"skin":"image/main/btn_common_01.png","height":32}}]},{"type":"Button","props":{"y":13,"x":536,"width":108,"stateNum":2,"skin":"image/juese/icon_role_xiadianlu01.png","labelStrokeColor":"#000000","labelStroke":4,"labelSize":35,"labelPadding":"35,0,0,0","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"侠典录","height":108}},{"type":"Button","props":{"y":11,"x":13,"width":110,"stateNum":2,"skin":"image/juese/icon_role_shifu_finish.png","selected":true,"height":117},"child":[{"type":"Image","props":{"y":79,"x":-17,"width":148,"skin":"image/common/title_common_01.png","mouseThrough":true,"height":46},"child":[{"type":"Label","props":{"y":13,"x":14,"width":119,"text":"人物志","strokeColor":"#000000","stroke":6,"mouseThrough":true,"height":31,"fontSize":25,"font":"FZXK","color":"#ffffff","align":"center"}}]}]}]},{"type":"Image","props":{"y":157,"x":646,"width":896,"skin":"image/main/fram_common_05.png","rotation":90,"height":19}},{"type":"Image","props":{"y":248,"x":156,"width":788,"skin":"image/main/fram_common_05.png","rotation":90,"height":15}},{"type":"Box","props":{"y":258,"x":10,"var":"box_player"},"child":[{"type":"Panel","props":{"y":6,"width":134,"var":"panel_player","height":649},"child":[{"type":"Tab","props":{"y":0,"x":0,"width":191,"var":"tab_player","stateNum":2,"space":-2,"skin":"image/main/fram_common_27_finish.png","selectedIndex":0,"scaleX":0.9,"labels":"人物简介,战斗属性,行头装备,资质天赋,内息经络,罡气护体,武学四法,外功招式,内功心法,生活技能,江湖声望,江湖履历","labelStrokeColor":"#000000","labelStroke":4,"labelSize":25,"labelPadding":"5,10","labelFont":"FZXK","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","height":642,"direction":"vertical"}}]},{"type":"ViewStack","props":{"x":140,"width":490,"var":"viw_player","selectedIndex":0,"right":0,"height":780},"child":[{"type":"Person_InfoItem","props":{"top":0,"name":"item0","left":0,"runtime":"ui.compart.Person_InfoItemUI"}},{"type":"Person_BattlePropsItem","props":{"top":0,"name":"item1","left":0,"runtime":"ui.compart.Person_BattlePropsItemUI"}},{"type":"Person_EquipInfoItem","props":{"top":0,"name":"item2","left":0,"runtime":"ui.compart.Person_EquipInfoItemUI"}},{"type":"Person_TalentInfoItem","props":{"top":0,"name":"item3","left":0,"runtime":"ui.compart.Person_TalentInfoItemUI"}}]}]},{"type":"Box","props":{"y":920,"x":11,"var":"box_change"},"child":[{"type":"Image","props":{"y":6,"skin":"image/juese/img_common_07.png"}},{"type":"Button","props":{"y":1,"x":14,"var":"btn_change","stateNum":2,"skin":"image/juese/icon_role_tudi_finish.png"}},{"type":"Label","props":{"y":35,"x":108,"wordWrap":true,"width":31,"var":"lbl_change","text":"徒弟","height":60,"fontSize":30,"font":"FZXK","color":"#ffffff"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.compart.Person_InfoItemUI",ui.compart.Person_InfoItemUI);
			View.regComponent("ui.compart.Person_BattlePropsItemUI",ui.compart.Person_BattlePropsItemUI);
			View.regComponent("ui.compart.Person_EquipInfoItemUI",ui.compart.Person_EquipInfoItemUI);
			View.regComponent("ui.compart.Person_TalentInfoItemUI",ui.compart.Person_TalentInfoItemUI);

            super.createChildren();
            this.createView(ui.juese.JueSePanelUI.uiView);

        }

    }
}

module ui.juQing {
    export class JuQingTalkPanelUI extends View {
		public img_bg:Laya.Image;
		public lbl_charpterName:Laya.Label;
		public btn_prize:Laya.Button;
		public panel_0:Laya.Panel;
		public vbox_0:Laya.VBox;
		public btn_return:Laya.Button;
		public box_pass:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":0,"x":0,"top":0,"skin":"image/juQing/juqingtalkbg01.png","right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"x":0,"skin":"image/main/fram_common_23.png","right":0,"left":0,"height":92,"bottom":0}},{"type":"Image","props":{"y":1030,"x":0,"skin":"image/main/fram_common_21.png"}},{"type":"Image","props":{"y":1030,"x":639,"skin":"image/main/fram_common_21.png","scaleX":-1}}]},{"type":"Image","props":{"var":"img_bg","top":0,"skin":"image/common/default/img_blackBg.png","right":0,"left":0,"bottom":95,"alpha":0.7}},{"type":"Image","props":{"y":29,"x":150,"width":340,"skin":"image/juQing/fram_common_29.png","height":60},"child":[{"type":"Label","props":{"var":"lbl_charpterName","valign":"middle","top":0,"text":"第一章 我与你的约定","strokeColor":"#000000","stroke":4,"right":0,"left":0,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","bottom":0,"align":"center"}}]},{"type":"Button","props":{"y":7,"x":536,"width":100,"var":"btn_prize","stateNum":2,"skin":"image/juQing/icon_jiangli_finish.png","labelStrokeColor":"#000000","labelStroke":4,"labelSize":30,"labelPadding":"30,0,0,0","labelFont":"FZXK","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","label":"奖励","height":100}},{"type":"Panel","props":{"y":120,"width":590,"var":"panel_0","right":0,"height":821},"child":[{"type":"VBox","props":{"var":"vbox_0","space":20,"right":0,"left":0,"align":"left"},"child":[{"type":"JuQingContentV0Item","props":{"runtime":"ui.compart.JuQingContentV0ItemUI"}},{"type":"JuQingContentV0Item","props":{"y":80,"x":80,"runtime":"ui.compart.JuQingContentV0ItemUI"}},{"type":"JuQingContentV1Item","props":{"runtime":"ui.compart.JuQingContentV1ItemUI"}},{"type":"JuQingContentV2Item","props":{"y":0,"x":0,"runtime":"ui.compart.JuQingContentV2ItemUI"}},{"type":"JuQingContentV0Item","props":{"y":90,"x":90,"runtime":"ui.compart.JuQingContentV0ItemUI"}},{"type":"JuQingContentV1Item","props":{"y":10,"x":10,"runtime":"ui.compart.JuQingContentV1ItemUI"}},{"type":"JuQingContentV2Item","props":{"y":10,"x":10,"runtime":"ui.compart.JuQingContentV2ItemUI"}},{"type":"JuQingContentV2Item","props":{"y":20,"x":20,"runtime":"ui.compart.JuQingContentV2ItemUI"}},{"type":"JuQingContentV2Item","props":{"y":30,"x":30,"runtime":"ui.compart.JuQingContentV2ItemUI"}},{"type":"JuQingContentV2Item","props":{"y":40,"x":40,"runtime":"ui.compart.JuQingContentV2ItemUI"}},{"type":"JuQingContentV1Item","props":{"y":10,"x":10,"runtime":"ui.compart.JuQingContentV1ItemUI"}},{"type":"JuQingContentV1Item","props":{"y":20,"x":20,"runtime":"ui.compart.JuQingContentV1ItemUI"}},{"type":"JuQingContentV1Item","props":{"y":30,"x":30,"runtime":"ui.compart.JuQingContentV1ItemUI"}}]}]},{"type":"Button","props":{"y":924,"x":-28,"width":133,"var":"btn_return","stateNum":2,"skin":"image/fuben/btn_common_10_finish.png","labelStrokeColor":"#000000","labelStroke":4,"labelSize":35,"labelPadding":"10","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"返回","height":108}},{"type":"Button","props":{"y":8,"x":12,"width":110,"stateNum":2,"skin":"image/main/icon_plot_juqing01up_finish.png","selected":true,"height":99},"child":[{"type":"Image","props":{"y":60,"x":-17,"width":142,"skin":"image/common/title_common_01.png","mouseThrough":true,"height":46},"child":[{"type":"Label","props":{"y":13,"x":11,"width":119,"text":"竹业篇","strokeColor":"#000000","stroke":6,"mouseThrough":true,"height":31,"fontSize":25,"font":"FZXK","color":"#ffffff","align":"center"}}]}]},{"type":"Box","props":{"y":952,"x":470,"width":164,"var":"box_pass","height":69},"child":[{"type":"Image","props":{"x":145,"width":145,"skin":"image/common/img_common_06.png","scaleX":-1,"height":68}},{"type":"Image","props":{"y":5,"x":34,"width":60,"skin":"image/juQing/zi_vip5.png","height":28}},{"type":"Button","props":{"y":4,"x":171,"width":61,"stateNum":2,"skin":"image/juQing/icon_jiantou_finish.png","scaleX":-1,"height":65}},{"type":"Label","props":{"y":30,"x":28,"width":92,"text":"跳过对白","height":34,"fontSize":23,"font":"FZXK","color":"#ffffff"}}]},{"type":"Image","props":{"y":958,"x":113,"width":180,"skin":"image/juQing/fram_common_29.png","height":60},"child":[{"type":"Label","props":{"valign":"middle","top":0,"text":"选项一","strokeColor":"#000000","stroke":4,"right":0,"left":0,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","bottom":0,"align":"center"}}]},{"type":"Box","props":{"y":144,"x":-8},"child":[{"type":"Image","props":{"x":14,"width":25,"skin":"image/juQing/fram_common_31.png","height":740}},{"type":"Image","props":{"skin":"image/juQing/fram_common_32.png","height":740}},{"type":"Label","props":{"y":283,"x":11,"wordWrap":true,"width":36,"text":"本章剧情进度","strokeColor":"#000000","stroke":4,"padding":"0,5,5,5","height":181,"fontSize":25,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Radio","props":{"y":83,"x":4,"width":174,"stateNum":2,"skin":"image/juQing/icon_baoxiang01_finish.png","scaleY":0.3,"scaleX":0.3,"height":194}},{"type":"Radio","props":{"y":203,"x":4,"width":174,"stateNum":2,"skin":"image/juQing/icon_baoxiang01_finish.png","scaleY":0.3,"scaleX":0.3,"height":194}},{"type":"Radio","props":{"y":446,"x":3,"width":174,"stateNum":2,"skin":"image/juQing/icon_baoxiang01_finish.png","scaleY":0.3,"scaleX":0.3,"height":194}},{"type":"Radio","props":{"y":579,"x":1,"width":174,"stateNum":2,"skin":"image/juQing/icon_baoxiang01_finish.png","scaleY":0.3,"scaleX":0.3,"height":194}}]},{"type":"Image","props":{"y":958,"x":310,"width":180,"skin":"image/juQing/fram_common_29.png","height":60},"child":[{"type":"Label","props":{"valign":"middle","top":0,"text":"选项二","strokeColor":"#000000","stroke":4,"right":0,"left":0,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","bottom":0,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.compart.JuQingContentV0ItemUI",ui.compart.JuQingContentV0ItemUI);
			View.regComponent("ui.compart.JuQingContentV1ItemUI",ui.compart.JuQingContentV1ItemUI);
			View.regComponent("ui.compart.JuQingContentV2ItemUI",ui.compart.JuQingContentV2ItemUI);

            super.createChildren();
            this.createView(ui.juQing.JuQingTalkPanelUI.uiView);

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
		public tab_task:Laya.Tab;
		public vstack_task:Laya.ViewStack;
		public panel_sceneMsg:Laya.Panel;
		public vbox_sceneMsg:Laya.VBox;
		public panel_chatMsg:Laya.Panel;
		public vbox_chatMsg:Laya.VBox;
		public box_contextTitle:Laya.Box;
		public lbl_sceneInfo:Laya.Label;
		public btn_sceneMore:Laya.Button;
		public img_mapPic:Laya.Image;
		public lbl_mapName:Laya.Label;
		public btn_worldMap:Laya.Button;
		public img_mapBg:Laya.Image;
		public btn_mapBig:Laya.Button;
		public btn_mapUp:Laya.Button;
		public btn_mapDown:Laya.Button;
		public btn_mapCenter:Laya.Button;
		public btn_mapRight:Laya.Button;
		public btn_mapLeft:Laya.Button;
		public box_mainTop:Laya.Box;
		public img_exp:Laya.Image;
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
		public btn_jieQi:Laya.Button;
		public btn_shiChen:Laya.Button;
		public box_mainBottom:Laya.Box;
		public box_modeChange:Laya.Box;
		public lbl_modeName:Laya.Label;
		public box_mode0:Laya.Box;
		public box_jueSe:Laya.Box;
		public box_yangCheng:Laya.Box;
		public box_jiangHu:Laya.Box;
		public box_beiBao:Laya.Box;
		public box_mode1:Laya.Box;
		public box_juQing:Laya.Box;
		public box_task:Laya.Box;
		public box_FuBenInJuQing:Laya.Box;
		public box_tuJian:Laya.Box;
		public box_taskInfo:Laya.Box;
		public btn_taskAll:Laya.Button;
		public lbl_taskdes:Laya.Label;
		public box_goTask:Laya.Box;
		public ui_chatSendDialog:view.dialog.ChatSendDialog;
		public ui_npcInfoDialog:view.dialog.NpcInfoDialog;
		public ui_chatBigDialog:view.dialog.ChatBigDialog;
		public ui_sceneInfoDialog:view.dialog.SceneInfoDialog;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"top":0,"skin":"image/common/bg_common_01.png","right":0,"left":3,"bottom":0},"child":[{"type":"Image","props":{"x":0,"skin":"image/main/fram_common_23.png","right":0,"left":0,"height":92,"bottom":0}},{"type":"Image","props":{"y":1030,"x":0,"skin":"image/main/fram_common_21.png"}},{"type":"Image","props":{"y":1030,"x":639,"skin":"image/main/fram_common_21.png","scaleX":-1}}]},{"type":"SceneItem","props":{"y":253,"var":"ui_scene","runtime":"view.compart.SceneItem","right":0,"left":111,"height":560}},{"type":"Box","props":{"y":256,"x":6,"var":"box_npc"},"child":[{"type":"CheckBox","props":{"y":230,"x":111,"width":47,"var":"cek_showNpc","stateNum":1,"skin":"image/main/btn_common_02.png","selected":false,"label":"label","height":99},"child":[{"type":"Label","props":{"y":22,"x":-7,"width":34,"text":"N\\nP\\nC","strokeColor":"#000000","stroke":4,"mouseThrough":true,"height":55,"fontSize":20,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":0,"x":0,"width":112,"var":"img_npc","skin":"image/common/fram_common_bg_01.png","sizeGrid":"58,35,64,45","height":560},"child":[{"type":"Button","props":{"y":519,"x":36,"width":32,"var":"btn_npcHasUp","stateNum":1,"skin":"image/main/btn_common_01.png","label":"label","height":32}},{"type":"Button","props":{"y":41,"x":39,"var":"btn_npcHasDown","stateNum":1,"skin":"image/main/btn_common_01.png","scaleY":-1,"label":"label"}},{"type":"Panel","props":{"y":50,"x":5,"width":100,"var":"panel_npc","height":463},"child":[{"type":"VBox","props":{"y":0,"var":"vbox_npc","right":0,"left":0,"align":"center"}}]}]}]},{"type":"Image","props":{"y":822,"x":620,"width":620,"skin":"image/main/fram_common_05.png","rotation":180,"height":19}},{"type":"Image","props":{"y":821,"x":0,"skin":"image/main/fram_common_06.png","rotation":270}},{"type":"Image","props":{"y":254,"x":-8,"width":27,"skin":"image/common/fram_common_07.png","sizeGrid":"18,12,20,13","height":567}},{"type":"Tab","props":{"y":885,"x":-7,"width":54,"var":"tab_task","stateNum":2,"space":-5,"skin":"image/common/btn_common_02up2_finish.png","selectedIndex":0,"scaleY":0.6,"scaleX":0.8,"left":-7,"labels":"场\\n景,聊\\n天","labelStrokeColor":"#000000","labelStroke":6,"labelSize":30,"labelPadding":"0,0,0,10","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","labelAlign":"left","height":262,"direction":"vertical","sizeGrid":"44,15,38,32"}},{"type":"Image","props":{"y":881,"x":30,"width":350,"skin":"image/main/fram_common_bg_02.png","sizeGrid":"16,16,13,10","height":170},"child":[{"type":"ViewStack","props":{"var":"vstack_task","top":0,"selectedIndex":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Panel","props":{"y":-881,"x":-30,"var":"panel_sceneMsg","top":0,"right":0,"name":"item0","left":0,"bottom":0},"child":[{"type":"VBox","props":{"var":"vbox_sceneMsg","top":10,"space":5,"right":10,"left":10,"align":"left"}}]},{"type":"Panel","props":{"y":-871,"x":-20,"var":"panel_chatMsg","top":0,"right":0,"name":"item1","left":0,"bottom":0},"child":[{"type":"VBox","props":{"var":"vbox_chatMsg","top":10,"space":5,"right":10,"left":10,"align":"left"}}]}]}]},{"type":"Box","props":{"y":130,"x":-5,"width":656,"var":"box_contextTitle","height":134},"child":[{"type":"Image","props":{"y":7,"skin":"image/main/fram_common_22.png","right":10,"left":10,"height":121}},{"type":"Image","props":{"y":2,"x":27,"skin":"image/main/fram_common_05.png"}},{"type":"Image","props":{"y":-14,"x":648,"skin":"image/main/fram_common_21.png","scaleX":-1}},{"type":"Image","props":{"skin":"image/main/fram_common_06.png"}},{"type":"Image","props":{"y":115,"x":44,"skin":"image/main/fram_common_05.png"}},{"type":"Image","props":{"y":20,"x":87,"width":485,"skin":"image/main/fram_common_08.png","sizeGrid":"0,41,0,40","height":96},"child":[{"type":"Label","props":{"y":12,"x":63,"wordWrap":true,"width":377,"var":"lbl_sceneInfo","text":"洛阳故城XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX","height":71,"fontSize":22,"color":"#ffffff","align":"left"}},{"type":"Button","props":{"y":57,"x":400,"width":32,"var":"btn_sceneMore","stateNum":1,"skin":"image/main/btn_common_01.png","height":32}}]},{"type":"Image","props":{"y":11,"x":13,"width":117,"var":"img_mapPic","skin":"image/main/img_main_luoyang.png","height":117},"child":[{"type":"Image","props":{"y":79,"x":-17,"width":148,"skin":"image/common/title_common_01.png","height":46},"child":[{"type":"Label","props":{"y":7,"x":14,"width":119,"var":"lbl_mapName","text":"洛阳洛阳","strokeColor":"#000000","stroke":6,"mouseThrough":true,"height":31,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]}]},{"type":"Button","props":{"y":14,"x":536,"width":112,"var":"btn_worldMap","stateNum":2,"skin":"image/main/icon_main_ditu_finish.png","labelStrokeColor":"#000000","labelStroke":4,"labelSize":35,"labelPadding":"35,0,0,0","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"地图","height":107}}]},{"type":"Image","props":{"y":810,"x":363,"var":"img_mapBg","skin":"image/main/img_main_weizhiditu.png"},"child":[{"type":"Button","props":{"y":51,"x":226,"width":40,"var":"btn_mapBig","stateNum":1,"skin":"image/main/btn_common_01.png","scaleY":-1,"label":"label","height":38}},{"type":"Button","props":{"y":19,"x":103,"width":76,"var":"btn_mapUp","stateNum":2,"skin":"image/main/icon_maiin_chengqiang01_finish.png","sizeGrid":"0,0,62,0","labelStrokeColor":"#000000","labelStroke":4,"labelSize":20,"labelPadding":"25,0,0,0","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"客栈","height":67}},{"type":"Button","props":{"y":170,"x":108,"width":76,"var":"btn_mapDown","stateNum":2,"skin":"image/main/icon_maiin_chengqiang01_finish.png","sizeGrid":"0,0,62,0","labelStrokeColor":"#000000","labelStroke":4,"labelSize":20,"labelPadding":"25,0,0,0","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"客栈","height":67}},{"type":"Button","props":{"y":96,"x":107,"width":76,"var":"btn_mapCenter","stateNum":2,"skin":"image/main/icon_maiin_chengqiang01_finish.png","sizeGrid":"0,0,62,0","labelStrokeColor":"#000000","labelStroke":4,"labelSize":20,"labelPadding":"25,0,0,0","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"客栈","height":67}},{"type":"Button","props":{"y":102,"x":193,"width":76,"var":"btn_mapRight","stateNum":2,"skin":"image/main/icon_maiin_chengqiang01_finish.png","sizeGrid":"0,0,62,0","labelStrokeColor":"#000000","labelStroke":4,"labelSize":20,"labelPadding":"25,0,0,0","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"客栈","height":67}},{"type":"Button","props":{"y":104,"x":16,"width":76,"var":"btn_mapLeft","stateNum":2,"skin":"image/main/icon_maiin_chengqiang01_finish.png","sizeGrid":"0,0,62,0","labelStrokeColor":"#000000","labelStroke":4,"labelSize":20,"labelPadding":"25,0,0,0","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"客栈","height":67}}]},{"type":"Image","props":{"y":159,"x":645,"width":896,"skin":"image/main/fram_common_05.png","rotation":90,"height":19}},{"type":"Image","props":{"y":822,"x":644,"skin":"image/main/fram_common_06.png","rotation":180}},{"type":"Box","props":{"y":0,"x":0,"var":"box_mainTop","top":0,"right":0,"left":0},"child":[{"type":"Box","props":{"y":45,"x":121},"child":[{"type":"Image","props":{"x":2,"width":389,"skin":"image/main/fram_common_02.png","height":19}},{"type":"Image","props":{"y":2,"var":"img_exp","skin":"image/main/fram_common_exp.png","sizeGrid":"5,0,5,10"}}]},{"type":"Box","props":{"y":0,"right":0},"child":[{"type":"Image","props":{"y":-2,"x":-2,"width":559,"top":-5,"skin":"image/main/fram_common_02.png","sizeGrid":"5,5,5,5","right":0,"height":50}},{"type":"Box","props":{"y":0,"x":52},"child":[{"type":"Image","props":{"y":0,"x":-12,"width":50,"skin":"image/main/icon_common_jinbi01.png","height":40}},{"type":"Label","props":{"y":7,"x":35,"width":83,"var":"lbl_gold","text":"111万","height":32,"fontSize":25,"font":"Arial","color":"#ffffff","bold":false,"align":"left"}}]},{"type":"Box","props":{"y":0,"x":180},"child":[{"type":"Image","props":{"y":0,"x":-12,"width":50,"skin":"image/main/icon_common_yuanbao01.png","height":40}},{"type":"Label","props":{"y":7,"x":35,"width":83,"var":"lbl_yuanBao","text":"111万","height":32,"fontSize":25,"font":"Arial","color":"#ffffff","bold":false,"align":"left"}}]},{"type":"Box","props":{"y":0,"x":309},"child":[{"type":"Image","props":{"y":0,"x":-12,"width":50,"skin":"image/main/icon_common_jinbi01.png","height":40},"child":[{"type":"Image","props":{"y":22,"x":27,"width":15,"skin":"image/main/icon_common_shuo01.png","height":20}}]},{"type":"Label","props":{"y":7,"x":35,"width":83,"var":"lbl_goldlock","text":"111万","height":32,"fontSize":25,"font":"Arial","color":"#ffffff","bold":false,"align":"left"}}]},{"type":"Box","props":{"y":0,"x":437},"child":[{"type":"Image","props":{"y":0,"x":-12,"width":50,"skin":"image/main/icon_common_yuanbao01.png","height":40},"child":[{"type":"Image","props":{"y":22,"x":27,"width":15,"skin":"image/main/icon_common_shuo01.png","height":20}}]},{"type":"Label","props":{"y":7,"x":35,"width":83,"var":"lbl_yuanBaolock","text":"111万","height":32,"fontSize":25,"font":"Arial","color":"#ffffff","bold":false,"align":"left"}}]}]},{"type":"Box","props":{"y":70,"x":17},"child":[{"type":"Image","props":{"y":0,"x":96,"skin":"image/main/fram_common_03.png","height":40},"child":[{"type":"Label","props":{"y":5,"x":10,"width":69,"text":"等级:","mouseThrough":true,"height":30,"fontSize":25,"font":"FZXK","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":3,"x":77,"width":128,"var":"lbl_level","valign":"top","text":"666666","height":35,"fontSize":25,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]},{"type":"Image","props":{"y":-11,"x":280,"skin":"image/common/fram_common_vipdi.png"},"child":[{"type":"Image","props":{"y":13,"x":23,"skin":"image/main/zi_zhanli_01.png"}},{"type":"FontClip","props":{"y":18,"x":74,"var":"clip_power","value":"555555555","spaceX":-8,"skin":"image/common/number/zi_shuzi01.png","sheet":"0123456789"}}]}]},{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":4,"x":17,"var":"img_avatarIcon","skin":"image/common/icon_nv01.png"}},{"type":"Image","props":{"x":3,"width":130,"skin":"image/main/fram_common_01.png","height":130}},{"type":"Image","props":{"y":115,"skin":"image/common/fram_common_04.png"},"child":[{"type":"Label","props":{"y":5,"x":0,"width":151,"var":"lbl_playerName","text":"玩家姓名拉拉","height":31,"fontSize":24,"font":"FZXK","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":-12,"x":-22,"skin":"image/common/fram_common_vipdi.png","scaleY":0.8,"scaleX":0.8,"alpha":0.8}},{"type":"Image","props":{"y":-3,"x":-1,"width":25,"skin":"image/common/zi_vip_01.png","height":30}},{"type":"FontClip","props":{"y":9,"x":10,"var":"font_vipLevel","value":"1","spaceX":-10,"skin":"image/common/number/zi_shuzi01.png","sheet":"0123456789"}}]},{"type":"Button","props":{"y":44,"width":120,"var":"btn_menu","stateNum":2,"skin":"image/common/btn_caidan_01_finish.png","right":2,"labelStrokeColor":"#000000","labelStroke":6,"labelSize":30,"labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"菜单","height":58}},{"type":"Button","props":{"y":104,"width":122,"var":"btn_jieQi","stateNum":2,"skin":"image/common/default/img_touming.png","right":333,"labelStrokeColor":"#000000","labelStroke":6,"labelSize":25,"labelFont":"FZXK","labelColors":"#ffffff","label":"【夏至】","height":38}},{"type":"Button","props":{"y":105,"width":123,"var":"btn_shiChen","stateNum":2,"skin":"image/common/default/img_touming.png","right":142,"labelStrokeColor":"#000000","labelStroke":6,"labelSize":25,"labelFont":"FZXK","labelColors":"#ffffff","label":"【辰时】","height":38}}]},{"type":"Box","props":{"width":640,"var":"box_mainBottom","right":0,"left":0,"height":85,"bottom":0},"child":[{"type":"Box","props":{"var":"box_modeChange","right":-5,"bottom":-15},"child":[{"type":"Radio","props":{"y":-7,"x":-9,"width":119,"stateNum":2,"skin":"image/main/btn_common_04up_finish.png","scaleY":1.2,"scaleX":1.2,"height":116}},{"type":"Radio","props":{"y":9,"x":14,"stateNum":2,"skin":"image/main/icon_common_juqingfubeng01up_finish.png","scaleY":1.2,"scaleX":1.2},"child":[{"type":"Label","props":{"y":63,"x":-11,"width":110,"var":"lbl_modeName","text":"小说模式","strokeColor":"#000000","stroke":4,"height":33,"fontSize":28,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]}]},{"type":"Box","props":{"y":0,"x":0,"width":506,"var":"box_mode0","height":84},"child":[{"type":"Box","props":{"x":0,"width":130,"var":"box_jueSe","height":88,"bottom":0},"child":[{"type":"Radio","props":{"y":-17,"x":0,"width":130,"stateNum":2,"skin":"image/main/fram_common_mainbg.png","height":105}},{"type":"Radio","props":{"y":-10,"x":16,"stateNum":2,"skin":"image/main/icon_common_juese01up_finish.png","scaleY":1.2,"scaleX":1.2},"child":[{"type":"Label","props":{"y":53,"x":-9,"width":98,"text":"角色","strokeColor":"#000000","stroke":4,"height":33,"fontSize":30,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]}]},{"type":"Box","props":{"x":124,"var":"box_yangCheng","height":88,"bottom":0},"child":[{"type":"Radio","props":{"y":-17,"x":0,"width":130,"stateNum":2,"skin":"image/main/fram_common_mainbg.png","height":105}},{"type":"Radio","props":{"y":-10,"x":16,"stateNum":2,"skin":"image/main/icon_common_yangcheng01up_finish.png","scaleY":1.2,"scaleX":1.2},"child":[{"type":"Label","props":{"y":53,"x":-9,"width":98,"text":"宅院","strokeColor":"#000000","stroke":4,"height":33,"fontSize":30,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]}]},{"type":"Box","props":{"y":26,"x":252,"var":"box_jiangHu","bottom":0},"child":[{"type":"Radio","props":{"y":-17,"x":0,"width":130,"stateNum":2,"skin":"image/main/fram_common_mainbg.png","height":105}},{"type":"Radio","props":{"y":-10,"x":16,"stateNum":2,"skin":"image/main/icon_common_shejiao01up_finish.png","scaleY":1.2,"scaleX":1.2},"child":[{"type":"Label","props":{"y":53,"x":-9,"width":98,"text":"江湖","strokeColor":"#000000","stroke":4,"height":33,"fontSize":30,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]}]},{"type":"Box","props":{"x":376,"var":"box_beiBao","bottom":0},"child":[{"type":"Radio","props":{"y":-17,"x":0,"width":130,"stateNum":2,"skin":"image/main/fram_common_mainbg.png","height":105}},{"type":"Radio","props":{"y":-10,"x":16,"stateNum":2,"skin":"image/main/icon_common_beibao01up_finish.png","scaleY":1.2,"scaleX":1.2},"child":[{"type":"Label","props":{"y":53,"x":-9,"width":98,"text":"物品","strokeColor":"#000000","stroke":4,"height":33,"fontSize":30,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]}]}]},{"type":"Box","props":{"y":0,"x":0,"width":506,"visible":false,"var":"box_mode1","height":84},"child":[{"type":"Box","props":{"x":0,"width":130,"var":"box_juQing","height":88,"bottom":0},"child":[{"type":"Radio","props":{"y":-17,"x":0,"width":130,"stateNum":2,"skin":"image/main/fram_common_mainbg.png","height":105}},{"type":"Radio","props":{"y":-10,"x":16,"stateNum":2,"skin":"image/main/icon_plot_juqing01up_finish.png","scaleY":1.2,"scaleX":1.2},"child":[{"type":"Label","props":{"y":53,"x":-9,"width":98,"text":"剧情","strokeColor":"#000000","stroke":4,"height":33,"fontSize":30,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]}]},{"type":"Box","props":{"x":124,"var":"box_task","height":88,"bottom":0},"child":[{"type":"Radio","props":{"y":-17,"x":0,"width":130,"stateNum":2,"skin":"image/main/fram_common_mainbg.png","height":105}},{"type":"Radio","props":{"y":-10,"x":15,"stateNum":2,"skin":"image/main/icon_main_renwu.png","scaleY":1.2,"scaleX":1.2},"child":[{"type":"Label","props":{"y":53,"x":-8,"width":98,"text":"任务","strokeColor":"#000000","stroke":4,"height":33,"fontSize":30,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]}]},{"type":"Box","props":{"y":26,"x":252,"var":"box_FuBenInJuQing","bottom":0},"child":[{"type":"Radio","props":{"y":-17,"x":0,"width":130,"stateNum":2,"skin":"image/main/fram_common_mainbg.png","height":105}},{"type":"Radio","props":{"y":-10,"x":20,"stateNum":2,"skin":"image/main/icon_plot_jianghu01up_finish.png","scaleY":1.2,"scaleX":1.2},"child":[{"type":"Label","props":{"y":53,"x":-12,"width":98,"text":"副本","strokeColor":"#000000","stroke":4,"height":33,"fontSize":30,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]}]},{"type":"Box","props":{"x":376,"var":"box_tuJian","bottom":0},"child":[{"type":"Radio","props":{"y":-17,"x":0,"width":130,"stateNum":2,"skin":"image/main/fram_common_mainbg.png","height":105}},{"type":"Radio","props":{"y":-10,"x":26,"stateNum":2,"skin":"image/main/icon_plot_jiedianup_finish.png","scaleY":1.2,"scaleX":1.2},"child":[{"type":"Label","props":{"y":53,"x":-17,"width":98,"text":"图鉴","strokeColor":"#000000","stroke":4,"height":33,"fontSize":30,"font":"FZXK","color":"#ffffff","bold":true,"align":"center"}}]}]}]}]},{"type":"Box","props":{"y":820,"x":-1,"width":380,"var":"box_taskInfo","height":60},"child":[{"type":"Button","props":{"y":-4,"x":3,"width":78,"var":"btn_taskAll","stateNum":2,"skin":"image/main/icon_main_renwu.png","sizeGrid":"0,0,62,0","labelStrokeColor":"#000000","labelStroke":4,"labelSize":30,"labelPadding":"25,0,0,0","labelFont":"FZXK","labelColors":"#ffffff,#ffffff,#ffffff","label":"主线","height":67}},{"type":"Image","props":{"y":0,"x":0,"skin":"image/main/fram_common_25.png"}},{"type":"Image","props":{"y":0,"skin":"image/main/fram_common_25.png","scaleX":-1,"right":20}},{"type":"Image","props":{"y":60,"skin":"image/main/fram_common_25.png","scaleY":-1,"scaleX":-1,"right":20}},{"type":"Image","props":{"y":60,"x":0,"skin":"image/main/fram_common_25.png","scaleY":-1}},{"type":"Label","props":{"x":77,"wordWrap":true,"width":197,"var":"lbl_taskdes","valign":"middle","text":"MMMMMMMMMMMMMMM","mouseThrough":true,"height":59,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","centerY":0,"bold":true,"align":"left"}},{"type":"Box","props":{"x":279,"width":100,"var":"box_goTask","centerY":0},"child":[{"type":"Label","props":{"y":3,"x":-279,"width":58,"underline":true,"text":"前往","right":35,"mouseThrough":true,"height":33,"fontSize":25,"font":"Microsoft YaHei","color":"#06fb37","align":"left"}},{"type":"Image","props":{"x":-279,"width":42,"skin":"image/main/icon_zhibiao.png","right":0,"height":39}}]}]},{"type":"ChatSendDialog","props":{"y":570,"var":"ui_chatSendDialog","runtime":"view.dialog.ChatSendDialog","right":8}},{"type":"NpcInfoDialog","props":{"y":237,"x":118,"var":"ui_npcInfoDialog","runtime":"view.dialog.NpcInfoDialog"}},{"type":"ChatBigDialog","props":{"y":245,"x":0,"var":"ui_chatBigDialog","runtime":"view.dialog.ChatBigDialog"}},{"type":"SceneInfoDialog","props":{"y":230,"x":39,"var":"ui_sceneInfoDialog","runtime":"view.dialog.SceneInfoDialog"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("view.compart.SceneItem",view.compart.SceneItem);
			View.regComponent("view.dialog.ChatSendDialog",view.dialog.ChatSendDialog);
			View.regComponent("view.dialog.NpcInfoDialog",view.dialog.NpcInfoDialog);
			View.regComponent("view.dialog.ChatBigDialog",view.dialog.ChatBigDialog);
			View.regComponent("view.dialog.SceneInfoDialog",view.dialog.SceneInfoDialog);

            super.createChildren();
            this.createView(ui.main.MainPanelUI.uiView);

        }

    }
}

module ui.map {
    export class WorldMapPanelUI extends View {
		public panel_0:Laya.Panel;
		public btn_close:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Panel","props":{"var":"panel_0","top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1113,"skin":"image/map/map.jpg","height":1500},"child":[{"type":"Image","props":{"y":745,"x":182,"width":150,"skin":"image/map/icon_map_01.png","height":150}},{"type":"Image","props":{"y":911,"x":79,"width":150,"skin":"image/map/icon_map_02.png","height":150}},{"type":"Image","props":{"y":570,"x":183,"width":150,"skin":"image/map/icon_map_03.png","height":150}},{"type":"Image","props":{"y":476,"x":368,"width":150,"skin":"image/map/icon_map_04.png","height":150}},{"type":"Image","props":{"y":656,"x":490,"width":150,"skin":"image/map/icon_map_05.png","height":150}},{"type":"Image","props":{"y":217,"x":456,"width":150,"skin":"image/map/icon_map_06.png","height":150}},{"type":"Image","props":{"y":323,"x":595,"width":150,"skin":"image/map/icon_map_07.png","height":150}},{"type":"Image","props":{"y":451,"x":695,"width":150,"skin":"image/map/icon_map_08.png","height":150}},{"type":"Image","props":{"y":640,"x":808,"width":150,"skin":"image/map/icon_map_09.png","height":150}},{"type":"Image","props":{"y":826,"x":427,"width":150,"skin":"image/map/icon_map_10.png","height":150}},{"type":"Image","props":{"y":776,"x":654,"width":150,"skin":"image/map/icon_map_11.png","height":150}},{"type":"Image","props":{"y":1031,"x":561,"width":150,"skin":"image/map/icon_map_12.png","height":150}},{"type":"Image","props":{"y":985,"x":784,"width":150,"skin":"image/map/icon_map_13.png","height":150}},{"type":"Image","props":{"y":194,"x":292,"width":150,"skin":"image/map/icon_map_14.png","height":150}},{"type":"Image","props":{"y":1082,"x":219,"width":150,"skin":"image/map/icon_map_15.png","height":150}},{"type":"Image","props":{"y":401,"x":80,"width":150,"skin":"image/map/icon_map_16.png","height":150}},{"type":"Image","props":{"y":186,"x":722,"width":150,"skin":"image/map/icon_map_17.png","height":150}},{"type":"Image","props":{"y":281,"x":844,"width":150,"skin":"image/map/icon_map_18.png","height":150}},{"type":"Image","props":{"y":221,"x":135,"width":150,"skin":"image/map/icon_map_19.png","height":150}}]}]},{"type":"Button","props":{"y":25,"x":531,"width":96,"var":"btn_close","stateNum":2,"skin":"image/common/btn_common_guangbi01up_finish.png","height":111}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.map.WorldMapPanelUI.uiView);

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

module ui.task {
    export class TaskPanelUI extends View {
		public panel_right:Laya.Panel;
		public vbox_right:Laya.VBox;
		public panel_left:Laya.Panel;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"top":-1,"skin":"image/common/bg_common_01.png","right":0,"left":0,"bottom":0}},{"type":"Box","props":{"y":140,"x":-6,"width":656,"height":134},"child":[{"type":"Image","props":{"y":7,"skin":"image/main/fram_common_22.png","right":10,"left":10,"height":121}},{"type":"Image","props":{"y":2,"x":27,"skin":"image/main/fram_common_05.png"}},{"type":"Image","props":{"y":115,"x":44,"skin":"image/main/fram_common_05.png"}},{"type":"Image","props":{"y":20,"x":87,"width":485,"skin":"image/main/fram_common_08.png","sizeGrid":"0,41,0,40","height":96},"child":[{"type":"Label","props":{"y":12,"x":63,"wordWrap":true,"width":377,"text":"背包介绍背包介绍背包介绍背包介绍背包介绍背包介绍背包介绍","rotation":0,"height":71,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","bold":false,"align":"left"}},{"type":"Button","props":{"y":57,"x":400,"width":32,"stateNum":1,"skin":"image/main/btn_common_01.png","height":32}}]},{"type":"Image","props":{"y":18,"x":554,"width":72,"skin":"image/task/icon_role_xiadianlu02.png","height":88},"child":[{"type":"Label","props":{"y":68,"x":-6,"text":"侠典录","strokeColor":"#000000","stroke":5,"fontSize":30,"font":"FZXK","color":"#ffffff"}}]}]},{"type":"Image","props":{"y":1066,"x":-5,"width":929,"skin":"image/main/fram_common_05.png","rotation":270,"height":19}},{"type":"Button","props":{"y":154,"x":24,"width":99,"stateNum":2,"skin":"image/main/icon_main_renwu.png","height":93},"child":[{"type":"Image","props":{"y":62,"x":-27,"width":148,"skin":"image/common/title_common_01.png","height":46},"child":[{"type":"Label","props":{"y":9,"x":14,"width":119,"text":"任务","strokeColor":"#000000","stroke":6,"mouseThrough":true,"height":31,"fontSize":30,"font":"FZXK","color":"#ffffff","align":"center"}}]}]},{"type":"Image","props":{"y":927,"x":11,"width":631,"skin":"image/main/fram_common_05.png","height":13}},{"type":"Image","props":{"y":126,"x":2,"skin":"image/main/fram_common_21.png"}},{"type":"Image","props":{"y":1055,"x":632,"width":896,"skin":"image/main/fram_common_05.png","rotation":270,"height":19}},{"type":"Image","props":{"y":126,"x":642,"skin":"image/main/fram_common_21.png","scaleX":-1}},{"type":"Image","props":{"y":941,"x":636,"width":620,"skin":"image/main/fram_common_05.png","rotation":180,"height":28}},{"type":"Panel","props":{"y":267,"x":159,"width":469,"var":"panel_right","height":656},"child":[{"type":"VBox","props":{"y":-1,"var":"vbox_right","right":0,"left":0,"align":"center"}}]},{"type":"Image","props":{"y":1030,"x":633,"width":620,"skin":"image/main/fram_common_05.png","rotation":180,"height":19}},{"type":"Box","props":{"y":955,"x":51},"child":[{"type":"Image","props":{"width":550,"skin":"image/common/fram_common_02.png","height":25}},{"type":"Image","props":{"y":5,"x":9,"width":470,"skin":"image/common/fram_common_10.png","height":15}},{"type":"Box","props":{"y":-31,"x":68},"child":[{"type":"Image","props":{"x":4,"width":65,"skin":"image/task/icon_baoxiang01.png","height":60}},{"type":"Image","props":{"y":57,"x":0,"width":25,"skin":"image/task/icon_huoyuedu.png","height":33},"child":[{"type":"Label","props":{"y":1,"x":25,"text":"10","fontSize":23}}]},{"type":"Image","props":{"y":-1,"x":141,"width":65,"skin":"image/task/icon_baoxiang02.png","height":60}},{"type":"Image","props":{"y":57,"x":144,"width":25,"skin":"image/task/icon_huoyuedu.png","height":33},"child":[{"type":"Label","props":{"y":1,"x":25,"text":"10","fontSize":23}}]},{"type":"Image","props":{"y":0,"x":264,"width":65,"skin":"image/common/icon_baoxiang03.png","height":60}},{"type":"Image","props":{"y":57,"x":266,"width":25,"skin":"image/task/icon_huoyuedu.png","height":33},"child":[{"type":"Label","props":{"y":1,"x":25,"text":"10","fontSize":23}}]},{"type":"Image","props":{"y":2,"x":372,"width":65,"skin":"image/task/icon_baoxiang04.png","height":60}},{"type":"Image","props":{"y":59,"x":377,"width":25,"skin":"image/task/icon_huoyuedu.png","height":33},"child":[{"type":"Label","props":{"y":1,"x":25,"text":"10","fontSize":23}}]}]}]},{"type":"Image","props":{"y":900,"x":0,"skin":"image/main/fram_common_24.png"}},{"type":"Image","props":{"y":990,"x":0,"skin":"image/main/fram_common_24.png"}},{"type":"Image","props":{"y":899,"x":641,"skin":"image/main/fram_common_24.png","scaleX":-1}},{"type":"Image","props":{"y":989,"x":641,"skin":"image/main/fram_common_24.png","scaleX":-1}},{"type":"Image","props":{"y":10,"x":0,"skin":"image/main/fram_common_23.png","height":92,"bottom":0}},{"type":"Image","props":{"y":1030,"x":0,"skin":"image/main/fram_common_21.png"}},{"type":"Image","props":{"y":1030,"x":639,"skin":"image/main/fram_common_21.png","scaleX":-1}},{"type":"Panel","props":{"y":296,"width":127,"var":"panel_left","left":27,"height":592},"child":[{"type":"Tab","props":{"y":0,"x":4,"width":119,"stateNum":1,"space":6,"skin":"image/task/btn_common_09.png","labels":"主线任务,日常任务,日常任务,日常任务,日常任务,日常任务,日常任务,日常任务,日常任务,日常任务,日常任务,日常任务","labelSize":24,"labelFont":"Microsoft YaHei","labelColors":"#000000","labelBold":false,"height":610,"direction":"vertical"}}]},{"type":"Image","props":{"y":292,"x":100,"skin":"image/common/btn_common_05.png","rotation":180}},{"type":"Image","props":{"y":890,"x":80,"skin":"image/common/btn_common_05.png"}},{"type":"Image","props":{"y":258,"x":162,"width":678,"skin":"image/main/fram_common_05.png","rotation":90,"height":23}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.task.TaskPanelUI.uiView);

        }

    }
}

module ui.yangCheng {
    export class YangChengPanelUI extends View {
		public panel_yangCheng:Laya.Panel;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Panel","props":{"var":"panel_yangCheng","top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"x":0,"top":0,"skin":"image/yangCheng/img_yangChengBJ.png","bottom":0},"child":[{"type":"Image","props":{"y":585,"x":1149,"skin":"image/yangCheng/img_stool.png"}},{"type":"Image","props":{"y":496,"x":1250,"skin":"image/yangCheng/img_chuTou.png"}},{"type":"Image","props":{"y":302,"x":1594,"skin":"image/yangCheng/img_door.png"}},{"type":"Box","props":{"y":388,"x":157},"child":[{"type":"Image","props":{"skin":"image/yangCheng/img_danLu.png"}},{"type":"Image","props":{"y":42,"x":268,"skin":"image/yangCheng/img_common_24.png"},"child":[{"type":"Label","props":{"y":29,"x":8,"text":"炼\\n丹","fontSize":40,"font":"FZXK","color":"#ffffff"}}]}]},{"type":"Box","props":{"y":715,"x":-2},"child":[{"type":"Image","props":{"skin":"image/yangCheng/img_pool.png"}},{"type":"Image","props":{"y":50,"x":376,"skin":"image/yangCheng/img_common_24.png"},"child":[{"type":"Label","props":{"y":29,"x":8,"text":"养\\n鱼","fontSize":40,"font":"FZXK","color":"#ffffff"}}]}]},{"type":"Box","props":{"y":617,"x":1443},"child":[{"type":"Image","props":{"skin":"image/yangCheng/img_tieJiangPu.png"}},{"type":"Image","props":{"y":23,"x":119,"skin":"image/yangCheng/img_common_24.png"},"child":[{"type":"Label","props":{"y":32,"x":8,"text":"炼\\n器","fontSize":40,"font":"FZXK","color":"#ffffff"}}]}]},{"type":"Box","props":{"y":789,"x":1350},"child":[{"type":"Image","props":{"y":23,"x":44,"skin":"image/yangCheng/img_shiMo.png"}},{"type":"Image","props":{"skin":"image/yangCheng/img_common_24.png"},"child":[{"type":"Label","props":{"y":29,"x":8,"text":"磨\\n石","fontSize":40,"font":"FZXK","color":"#ffffff"}}]}]},{"type":"Box","props":{"y":522,"x":1171},"child":[{"type":"Image","props":{"skin":"image/yangCheng/img_farmland.png"}},{"type":"Image","props":{"x":100,"skin":"image/yangCheng/img_common_24.png"},"child":[{"type":"Label","props":{"y":29,"x":8,"text":"种\\n地","fontSize":40,"font":"FZXK","color":"#ffffff"}}]}]},{"type":"Box","props":{"y":159,"x":546,"width":648,"height":424},"child":[{"type":"Image","props":{"x":-100,"skin":"image/yangCheng/img_house.png","scaleX":1}},{"type":"Image","props":{"y":69,"x":640,"skin":"image/yangCheng/img_common_24.png"},"child":[{"type":"Label","props":{"y":29,"x":8,"text":"宅\\n院","fontSize":40,"font":"FZXK","color":"#ffffff"}}]}]},{"type":"Box","props":{"y":508,"x":599},"child":[{"type":"Image","props":{"y":34,"skin":"image/yangCheng/img_housekeeper.png"}},{"type":"Image","props":{"x":117,"skin":"image/yangCheng/img_common_24.png"},"child":[{"type":"Label","props":{"y":29,"x":8,"text":"管\\n家","fontSize":40,"font":"FZXK","color":"#ffffff"}}]}]},{"type":"Box","props":{"y":782,"x":473},"child":[{"type":"Image","props":{"y":92,"skin":"image/yangCheng/img_table.png"}},{"type":"Image","props":{"y":0,"x":152,"skin":"image/yangCheng/img_common_24.png"},"child":[{"type":"Label","props":{"y":29,"x":8,"text":"下\\n棋","fontSize":40,"font":"FZXK","color":"#ffffff"}}]}]}]},{"type":"Image","props":{"y":922,"x":-1,"skin":"image/yangCheng/img_qj.png"}}]},{"type":"Image","props":{"y":10,"x":10,"skin":"image/main/fram_common_23.png","right":0,"left":0,"height":92,"bottom":0}},{"type":"Image","props":{"y":1030,"x":0,"skin":"image/main/fram_common_21.png"}},{"type":"Image","props":{"y":1030,"x":639,"skin":"image/main/fram_common_21.png","scaleX":-1}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.yangCheng.YangChengPanelUI.uiView);

        }

    }
}
