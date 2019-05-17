// TypeScript file

class Crc32 {
    private crc32: number = 0;
    private static CrcTable: Array<any> = Crc32.initCrcTable();

    public constructor() {

    }

    private static initCrcTable(): Array<any> {
        let crcTable: Array<any> = new Array(256);
        for (let i: number = 0; i < 256; ++i) {
            let crc: number = i;
            for (let j: number = 0; j < 8; ++j) {
                crc = (crc & 1) ? (crc >> 1) ^ 0xEDB88320 : (crc >> 1);
            }
            crcTable[i] = crc;
        }
        return crcTable;
    }

    public update(buffer: Laya.Byte, arg: Array<any>): void {
        let offset: number = arg[0] ? arg[0] : 0;
        let len: number = arg[1] ? arg[1] : buffer.length;
        let crc: number = ~this.crc32;
        for (let i: number = offset; i < len; ++i) {
            crc = Crc32.CrcTable[(crc ^ buffer[i]) & 0xFF] ^ (crc >> 8);
        }
        this.crc32 = ~crc;
    }

    public getValue(): number {
        return this.crc32 & 0xFFFFFFFF;
    }

    public reset(): void {
        this.crc32 = 0;
    }
}