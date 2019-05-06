/*
* 位图字体;
*/
class BPFont extends Laya.Sprite {
    // 文本内容
    private _text: string;
    // 水平排列方式
    private _align: string;
    // 资源前缀
    private resFix: string;
    // 间距
    private _padding: number;
    // 位图集合
    private chars = [];
    // 回收池
    private static fontPool = [];
    /**
     * 
     * @param resFix  资源前缀
     * @param width  宽度
     * @param align 水平排列方式
     * @param padding 间距
     */
    public constructor(resFix: string, width: number, align: string = "left", padding: number = 0) {
        super();
        this.width = width;
        this.resFix = resFix;
        this._align = align;
        this._padding = padding;
    }
    /**
     * 字间距
     */
    public set padding(v: number) {
        if (v === this._padding) { return; }
        this._padding = v;
        if (this.text) {
            this.createFnt(this.text);
        }
    }
    public get padding(): number {
        return this._padding;
    }
    /**
     * 文本内容
     */
    public set text(v: string) {
        if (v === this._text) { return; }
        this._text = v;
        this.createFnt(v);
    }
    public get text(): string {
        return this._text;
    }
    /**
     * 获取资源名字（laya自己合成的图）
     * @param keyChar 
     */
    private getResName(keyChar: string): string {
        return this.resFix + keyChar + ".png";
    }
    /**
     * 清除字体
     */
    private clearFnt(): void {
        BPFont.fontPool = BPFont.fontPool.concat(this.chars);
        this.chars.length = 0;
        this.removeChildren();
    }
    /**
     * 获取一个字体对象
     */
    private getSprite(): Laya.Sprite {
        let sp = BPFont.fontPool.shift() || new Laya.Sprite();
        return sp;
    }
    /**
     * 创建位图文本
     * @param v 
     */
    private createFnt(v: string): void {
        this.clearFnt();
        this.createChars(v);
    }
    /**
     * 创建字符
     * @param v 
     */
    private createChars(v: string): void {
        if (!v) { return; }
        let charNum = v.length;
        for (let i = 0; i < charNum; i++) {
            let char = v.charAt(i);
            let resName = this.getResName(char);
            let sp: Laya.Sprite = this.getSprite();
            let tx = Laya.Loader.getRes(resName);
            if (!tx) {
                console.warn('bitmapfont缺少' + char);
            }
            sp.texture = tx;
            this.chars.push(sp);
            this.addChild(sp);
        }
        this.sortCharsByAlign(this._align);
    }
    /**
     * 水平对齐方式
     */
    public set align(v: string) {
        if (v === this._align) { return; }
        this._align = v;
        this.sortCharsByAlign(v);
    }
    public get align(): string {
        return this._align;
    }
    /**
     * 根据对齐方式排列字符
     * @param align 
     */
    private sortCharsByAlign(align: string): void {
        switch (align) {
            case 'center':
                this.sortOnCenter();
                break;
            case 'right':
                this.sortOnRight();
                break;
            case 'left':
            default:
                this.sortOnLeft();
                break;
        }
    }

    /**
     * 排列字符（适合从左到右）
     * @param preX 
     * @param preW 
     */
    private sortChars(preX: number = 0, preW: number = 0) {
        let chars = this.chars;
        let length = chars.length;
        for (let i = 0; i < length; i++) {
            let c = chars[i];
            c.x = preX + preW;
            preX = c.x;
            preW = c.getBounds().width + this.padding;
        }
    }
    /**
     * 靠左排列
     */
    private sortOnLeft(): void {
        this.sortChars(0, 0);
    }
    /**
     * 靠右排列
     */
    private sortOnRight(): void {
        let chars = this.chars;
        let length = chars.length;
        let prex = this.width;
        for (let i = length - 1; i > -1; i--) {
            let c = chars[i];
            let cBouns = c.getBounds();
            c.x = prex - (cBouns.width + this.padding);
            prex = c.x;
        }
    }
    /**
     * 居中
     */
    private sortOnCenter(): void {
        let totalWidth = 0;
        let chars = this.chars;
        let length = chars.length;
        for (let i = 0; i < length; i++) {
            let bouns = chars[i].getBounds();
            totalWidth += bouns.width;
        }
        totalWidth = totalWidth + (length - 1) * this.padding;
        let startX = (this.width - totalWidth) / 2;
        this.sortChars(startX, 0);
    }
}