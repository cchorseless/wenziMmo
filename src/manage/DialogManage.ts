/*
* Dialog管理类;
*/
module DialogManage {
    export let dialogs = {};
    export let resCount = {};
    /**
     * 打开Dialog(类里如果有setData方法，会在new之后自动调用一次)
     */
    export function popDialog<T extends Dialog>(cls:any,data:Array<any> = [],closeOther?: boolean, showEffect?: boolean){
        if(!dialogs[cls.name] || dialogs[cls.name] == null){
            ResManage.loadResource(ResData.DialogRes.clsRes[cls.name],() =>{
                dialogs[cls.name] = new cls;
                if(dialogs[cls.name]['setData']){
                    if(data && data.length == 1){
                        dialogs[cls.name].setData(data[0]);    
                    } else {
                        dialogs[cls.name].setData(data);
                    }
                }
                (dialogs[cls.name] as Dialog).popup();
                if(!resCount[cls.name]){
                    resCount[cls.name] = 0;
                }
                resCount[cls.name] ++;
            })
        }
    }
    /**
     * 关闭Dialog
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