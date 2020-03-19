/*
* Dialog管理类;
*/
module DialogManage {
    export let dialogs = {};
    export let resCount = {};
    /**
     * 打开Dialog(类里如果有setData方法，会在new之后自动调用一次)
     * @param cls 类名 如view.dialog.MailDialog
     * @param data setData方法的参数
     * @param closeOther 是否关闭其它的对话框。若值为true则关闭其它对话框。
     * @param showEffect 是否显示弹出效果
     */
    export function popDialog<T extends Dialog>(cls:any,data:Array<any> = [],closeOther?: boolean, showEffect?: boolean){
        if(!dialogs[cls.name] || dialogs[cls.name] == null){
            if(closeOther){
                for (var key in dialogs) {
                    if(dialogs[key] != null){
                        DialogManage.closeDialog(dialogs[key])
                    }
                }
            }
            ResManage.loadResource(ResData.DialogRes.clsRes[cls.name],() =>{
                dialogs[cls.name] = new cls;
                if(dialogs[cls.name]['setData']){
                    if(data && data.length == 1){
                        dialogs[cls.name].setData(data[0]);    
                    } else {
                        dialogs[cls.name].setData(data);
                    }
                }
                (dialogs[cls.name] as Dialog).popup(false,showEffect);
                if(!resCount[cls.name]){
                    resCount[cls.name] = 0;
                }
                resCount[cls.name] ++;
            })
        }
    }
    /**
     * 关闭Dialog
     * @param cls 如果参数填this,需要在当前类构造中设置this.name = 类名，比如：this.name = 'MailDialog',参数也可以填 如：view.dialog.MailDialog
     */
    export function closeDialog(cls:any):void{
        if(dialogs[cls.name]){
            (dialogs[cls.name] as Dialog).close();
            resCount[cls.name] --;
            if(resCount[cls.name] <= 0 ){//没有用这个资源的界面了
                let res = ResData.DialogRes.clsRes[cls.name];
                for (var i = 0; i < res.length.length; i++) {
                    Laya.loader.clearTextureRes(res.url);
                }
            }
            dialogs[cls.name] = null;
        }
    }
}