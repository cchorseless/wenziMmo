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



}