

const HTTP_URL = 'http://192.168.10.199:3000/';
const HTTP_SUCCESS = 200;

class HttpManager extends SingletonClass {
    constructor() {
        super();
    }

    private defaultCB(res) {
        Log.trace('http defaultCB=', res);
    }

    /**
     * 从HTTP服务器GET数据
     * @param param 格式 name=zoneList&xx=oo
     * @param cb 收到数据回调函数
     */
    public get(param, cb = this.defaultCB) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == HTTP_SUCCESS) {
                    cb(xhr.responseText);
                } else {
                    console.error('get status=', xhr.status);
                }
            }
        };
        xhr.open("GET", HTTP_URL + 'config?' + param, true);
        xhr.send();
    }

    /**
     * POST数据到HTTP服务器
     * @param data 需要发送的数据
     * @param cb 收到数据回调
     * @param isJosn true：json格式 返回也是json格式， 默认是text格式,返回也是text格式
     */
    public post(data, cb = this.defaultCB, isJosn = false, ) {
        let xhr = new XMLHttpRequest();
        let fixed = 'text';
        if (isJosn) {
            fixed = 'json';
        }
        xhr.open('POST', HTTP_URL + fixed, true);


        xhr.onload = (e) => {
            if (xhr.status == HTTP_SUCCESS) {
                cb(xhr.response)
            } else {
                console.error('post status=', xhr.status);
            }
        }

        if (isJosn) {
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(JSON.stringify(data));
            Log.trace('post json data=', JSON.stringify(data));
        } else {
            xhr.send(data);
            Log.trace('post data=', data);
        }
    }

    public postJson(data, cb = this.defaultCB) {
        this.post(data, cb, true);
    }


}