/**
  * tIPS管理
  */
module TipsManage {
    /**对象池的key*/
    // 弹窗
    export const TipsPanel = 'TipsDialog';
    // 弹图片
    export const TipsImage = 'TipsImage';
    // 弹伤害数字
    export const TipsTxt = 'TipsTxtDialog';

    /**
     * 界面文字提示
     * @param str 文本内容
     * @param props 文本属性
     */
    export function showTxt(str: string): void {
        var show: view.dialog.TipsTxtDialog = Laya.Pool.getItemByClass(TipsTxt, view.dialog.TipsTxtDialog)
        show.setData(str).show(false, false)
    }
    /**
     * 界面图片提示
     * @param res 
     * @param props 
     */
    export function showImg(res: string, props): void {
        let show: Laya.Image = Laya.Pool.getItemByClass(TipsImage, Laya.Image)
        show.skin = res;
        for (let i in props) {
            show[i] = props[i];
        }
        PanelManage.tipsLayer.addChild(show);
        EffectUtils.disposeEffectTips2(show, 200, () => {
            show.alpha = 1;
            Laya.Pool.recover(TipsImage, show.removeSelf())
        })
    }

    /**
     * 界面TIPS弹窗提示
     * @param str 
     */
    export function showTips(str): void {
        console.log("收到了吗？",str)
        let show: view.dialog.TipsDialog = Laya.Pool.getItemByClass(TipsPanel, view.dialog.TipsDialog);
        show.setData(str).show()
    }
}


