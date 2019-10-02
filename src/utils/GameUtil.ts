module GameUtil {

    /**
     * 查找背包内道具的数量
     * @param itemID 
     * @param bag 
     */
    export function findItemInBag(itemID, bag): number {
        let count = 0;
        let keys = Object.keys(bag);
        for (let _key of keys) {
            let _item: ProtoCmd.ItemBase = bag[_key]
            if (_item.dwBaseID === itemID) {
                count += _item.dwCount;
            }
        }
        return count;
    }

    export function addTipsJianTou(btn: Laya.Button, rotation) {
        let img = new Laya.Image()
        img.skin = 'image/common/Indication_arrow2.png';
        img.anchorY = 0.5;
        img.rotation = rotation;
        let hudu = Laya.Utils.toRadian(rotation)
        img.pos(btn.width / 2 * Math.cos(hudu), btn.height / 2 * Math.sin(hudu))
        btn.addChild(img);
        EffectUtils.playBlinkEffect(img, 150, 30, () => {
            img.removeSelf();
        });
        btn.once(Laya.UIEvent.CLICK, this, () => { img.removeSelf(); })
    }
    // opendialog:'main'|tab:{name:'tab_3',index:3}|mapid:5001|roomid:1000|npcid:10001|button:'btn_renWu
    export function parseTaskInfo(str: string) {
        let handleList = str.split('|')
        for (let singleHandle of handleList) {
            let singlehandleList = singleHandle.split(':');
            let key = singlehandleList[0];
            let info = singlehandleList[1];
            switch (key) {
                // 打开界面
                case 'opendialog':
                    switch (info) {
                        case 'TianJian':
                            break;
                    }

                    break;
                // 选择界面内的子界面
                case 'tab':

                    break;
                // 地图ID
                case 'mapid':
                    break;
                // 房间ID
                case 'roomid':
                    break;
                // npcID
                case 'npcid':
                    break;
                // 怪物ID
                case 'monsterid':
                    break;
                // 按钮
                case 'button':
                    break;
            }

        }
    }
}