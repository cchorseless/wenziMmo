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


    public dealWithTalkTxt(txt): string {
        txt = txt.replace(/‘/g, "'").replace(/’/g, "'")
        // 处理名字
        txt = txt.replace(/拎壶冲/g, "<font color='#17930d'>" + GameApp.MainPlayer.objName + "</font>");
        // 处理事件
        txt = txt.replace(/【e/g, "<font color='#fb0a06'>");
        txt = txt.replace(/e】/g, "</font>");
        // 处理道具
        txt = txt.replace(/【i/g, "<font color='#08fb42'>");
        txt = txt.replace(/i】/g, "</font>");
        // 处理NPC 
        txt = txt.replace(/【n/g, "<font color='#08fb42'>");
        txt = txt.replace(/n】/g, "</font>");
        // 怪物
        txt = txt.replace(/【m/g, "<font color='#17930d'>");
        txt = txt.replace(/m】/g, "</font>");
        // 处理地点
        txt = txt.replace(/【p/g, "<font color='#17930d'>");
        txt = txt.replace(/p】/g, "</font>");
        // 处理超链接
        txt = txt.replace(/【a/g, "<a href=");
        txt = txt.replace(/a】/g, "</a>");
        console.log(txt);
        return txt
    }


    public changeToRichStr(str: string, color = null, size = null, font, bold, italic, ): string {

        return
    }
}