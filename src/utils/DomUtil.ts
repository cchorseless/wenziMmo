/**
 * XML解析类 适配NATIVE
 */
class DomUtil extends SingletonClass {
    constructor() {
        super();
    }
    public _dom = new DOMParser();
    /**
     * 解析XML
     * @param str 
     */
    public parseXML(str): Document {
        return this._dom.parseFromString(str, 'text/xml')
    }

    /**
     * 剧情对白解析
     * @param txt 
     */
    public dealWithTalkTxt(txt): string {

        txt = txt.replace(/‘/g, "'").replace(/’/g, "'")
        // 处理名字
        txt = txt.replace(/拎壶冲/g, "<font color='#179a0d'>" + GameApp.MainPlayer.objName + "</font>");
        // 处理事件
        txt = txt.replace(/【e/g, "<font color='#fb0a06'>");
        txt = txt.replace(/e】/g, "</font>");
        // 处理道具
        txt = txt.replace(/【i/g, "<font color='#a36a1d'>");
        txt = txt.replace(/i】/g, "</font>");
        // 处理NPC 
        txt = txt.replace(/【n/g, "<font color='#a53232'>");
        txt = txt.replace(/n】/g, "</font>");
        // 怪物
        txt = txt.replace(/【m/g, "<font color='#a53232'>");
        txt = txt.replace(/m】/g, "</font>");
        // 处理地点
        txt = txt.replace(/【p/g, "<font color='#81398c'>");
        txt = txt.replace(/p】/g, "</font>");
        // 处理超链接
        txt = txt.replace(/【a/g, "<a href=");
        txt = txt.replace(/a】/g, "</a>");
        txt = "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"+txt
        return txt
    }

    /**
     * 将字符串转化成富文本
     * @param str 
     * @param obj 
     */
    public changeToRichStr(str: any, obj: richLabProps): string {
        let s = ' <span style=\'';
        if (obj.color) {
            s += 'color:' + obj.color + ';'
        }
        if (obj.font) {
            s += 'font-family:' + obj.font + ';'
        }
        if (obj.fontSize) {
            s += 'fontSize:' + obj.fontSize + ';'
        }
        if (obj.stroke) {
            s += 'stroke:' + obj.stroke + ';'
        }
        if (obj.strokeColor) {
            s += 'strokeColor:' + obj.strokeColor + ';'
        }
        if (obj.bold) {
            s += 'font-weight:bold;'
        }
        s += '\'>' + str + '</span>';
        return s
    }

    // public 

}
/**
 * 富文本属性接口给
 */
interface richLabProps {
    color?: string,
    font?: string,
    fontSize?: string,
    stroke?: number,
    strokeColor?: string,
    bold?: boolean,
}