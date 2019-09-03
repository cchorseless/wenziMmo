// TypeScript file

class FunctionUtils {
    public constructor() {

    }

    public static passwordCrc32(passwd: string): number {
        let crc: Crc32 = new Crc32();
        let by: Laya.Byte = new Laya.Byte();
        by.endian = Laya.Byte.LITTLE_ENDIAN;
        by.writeUTFBytes(passwd);
        crc.update(by, [0, by.length]);
        by.clear();
        by = null;
        return crc.getValue();
    }


    public static passwdCypto(passwd: string, passkey: Laya.Byte): Laya.Byte {
        let varmd5: md5 = new md5();
        let md5str: string = varmd5.hex_md5(passwd);
        let by: Laya.Byte = new Laya.Byte();
        for (let i: number = 0; i < 16; ++i) {
            let hexstr: string = md5str.substr(i * 2, 2);
            let hex: number = parseInt(hexstr, 16);
            by.writeByte(hex);
        }

        let genPasswd: Laya.Byte = new Laya.Byte();
        genPasswd.writeArrayBuffer(passkey)
        genPasswd.writeArrayBuffer(by);
        let resultstr: string = varmd5.hex_md5(genPasswd);
        genPasswd.clear();
        genPasswd = null;
        by.clear();
        by = null;

        let resultby: Laya.Byte = new Laya.Byte();
        for (let i: number = 0; i < 16; ++i) {
            let hexstr: string = resultstr.substr(i * 2, 2);
            let hex: number = parseInt(hexstr, 16);
            resultby.writeByte(hex);
        }

        varmd5 = null;

        return resultby;
    }

    public static ipbytestoipstr(ipbytes: Laya.Byte): string {
        return ipbytes.getUint8() + '.' + ipbytes.getUint8() + '.' + ipbytes.getUint8() + '.' + ipbytes.getUint8();
    }

    private static PI18: number = Math.PI / 8;
    private static PI38: number = Math.PI * 3 / 8;
    private static PI58: number = Math.PI * 5 / 8;
    private static PI78: number = Math.PI * 7 / 8;

    public static CalcTitleDir(nStartX: number, nStartY: number, nTargetX: number, nTargetY: number): number {
        let nRolt: number = Math.acos((nStartY - nTargetY) / Math.sqrt(Math.pow(nTargetX - nStartX, 2) + Math.pow(nTargetY - nStartY, 2)));
        if (nTargetX < nStartX) {
            nRolt = -nRolt;
        }
        let nDir: number = 0;

        if (nRolt > -FunctionUtils.PI18 && nRolt <= FunctionUtils.PI18) {
            nDir = 0;
        } else if ((nRolt > FunctionUtils.PI18 && nRolt <= FunctionUtils.PI38)) {
            nDir = 1;
        }
        else if (nRolt > FunctionUtils.PI38 && nRolt <= FunctionUtils.PI58) {
            nDir = 2;
        }
        else if (nRolt > FunctionUtils.PI58 && nRolt <= FunctionUtils.PI78) {
            nDir = 3;
        }
        else if ((nRolt > FunctionUtils.PI78 && nRolt <= Math.PI) || (nRolt < -FunctionUtils.PI78 && nRolt >= -Math.PI)) {
            nDir = 4;
        }
        else if (nRolt > -FunctionUtils.PI78 && nRolt <= -FunctionUtils.PI58) {
            nDir = 5;
        }
        else if (nRolt > -FunctionUtils.PI58 && nRolt <= -FunctionUtils.PI38) {
            nDir = 6;
        }
        else if (nRolt > -FunctionUtils.PI38 && nRolt <= -FunctionUtils.PI18) {
            nDir = 7;
        }

        return nDir;
    }

    /* 压缩 二进制数据
       * @param bytes 
       * @returns Array.<number> or Uint8Array
       */
    public static compress(bytes: Laya.Byte): any {
        var byte8 = new Uint8Array(bytes.buffer);
        var defate = new Zlib.Deflate(byte8);
        var compressed = defate.compress();
        return compressed;
    }

    /**
     * 解压 二进制数据
     * @param compressed  Laya.Byte
     */
    public static uncompress(compressed: Laya.Byte): Laya.Byte {
        var byte8 = new Uint8Array(compressed.buffer, compressed.pos);
        var inflate = new Zlib.Inflate(byte8);
        var plain = inflate.decompress();

        var plainByte: Laya.Byte = new Laya.Byte(plain);
        plainByte.pos = 0;
        return plainByte;
    }
}