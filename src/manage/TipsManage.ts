/**
  * tIPS管理
  */
module TipsManage {
    /**对象池的key*/
    // 弹窗
    const TipsPanel = 'TipsShowPanel';
    // 弹图片
    const TipsImage = 'TipsImage';
    // 弹伤害数字
    const TipsTxt = 'TipsTxt';

    /**
     * 界面文字提示
     * @param str 文本内容
     * @param props 文本属性
     */
    export function showTxt(str: string, props = {}): void {
        var txt: Laya.Text = Laya.Pool.getItemByClass(TipsTxt, Laya.Text)
        txt.text = str;
        // 字体默认属性
        let defaultProps = {
            x: Laya.stage.width / 2,
            y: Laya.stage.height/ 2,
            fontSize: EnumData.FONT_SIZE.DEFAULT,
            bold: true,
        }
        for (let i in defaultProps) {
            txt[i] = defaultProps[i];
        }
        for (let i in props) {
            txt[i] = props[i];
        }
        // 位置偏移量
        let count = QuickUtil.getStrLength(str);
        let offsetX = count * txt.fontSize / 3.5;
        txt.x -= offsetX;
        PanelManage.tipsLayer.addChild(txt);
        EffectUtils.disposeEffectTips2(txt, 200, () => {
            txt.alpha = 1;
            Laya.Pool.recover(TipsTxt, txt.removeSelf())
        })
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
        let show: view.common.TipsShowPanel = Laya.Pool.getItemByClass(TipsPanel, view.common.TipsShowPanel)
        show.setData(str);
        show.alpha = 0;
        show.centerX = 0;
        show.centerY = 0;
        PanelManage.tipsLayer.addChild(show);
        EffectUtils.disposeEffectTips1(show, 800, () => {
            Laya.Pool.recover(TipsPanel, show.removeSelf())
        });
    }
}


