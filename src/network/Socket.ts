/**
* name 
*/
class Socket extends SingletonClass {
	private _needReconnect: boolean = true;
	private _maxReconnectCount = 10;
	public checkInterval: number = 2000;//重连时间间隔
	private _reconnectCount: number = 0;
	private _connectFlag: boolean;
	private _host: string;
	private _port: any;
	private _socket: Laya.Socket;
	private _msg: ByteArrayMsg;
	private _isConnecting: boolean;
	public waitSignal: boolean = false;
	public waitTime: number = 0;
	public openHandler: Laya.Handler;//open回调
	/**
	  * 构造函数
	  */
	public constructor() {
		super();
	}

	/**
	  * 添加事件监听
	  */
	private addEvents() {
		this._socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
		this._socket.on(Laya.Event.MESSAGE, this, this.onReceiveMessage);
		this._socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
		this._socket.on(Laya.Event.ERROR, this, this.onSocketError);
	}

	/**
	  * 移除事件监听
	  */
	private removeEvents(): void {
		this._socket.off(Laya.Event.OPEN, this, this.onSocketOpen);
		this._socket.off(Laya.Event.MESSAGE, this, this.onReceiveMessage);
		this._socket.off(Laya.Event.CLOSE, this, this.onSocketClose);
		this._socket.off(Laya.Event.ERROR, this, this.onSocketError);
	}

	/**
	  * 服务器连接成功
	  */
	private onSocketOpen(e: Laya.Event): void {
		this._reconnectCount = 0;
		this._isConnecting = true;
		GameApp.LListener.event(LcpEvent.SOCKET_CONNECT);
		this._connectFlag = true;
		if (this.openHandler) {
			this.openHandler.run();
		}
	}

	/**
	  * 服务器断开连接
	  */
	private onSocketClose(e: Laya.Event): void {
		this._isConnecting = false;
		GameApp.GameEngine.isLogin = false;
		GameApp.LListener.event(LcpEvent.SOCKET_CLOSE);
		if (this._needReconnect) {
			Laya.timer.once(this.checkInterval, this, this.reconnect);
		}
	}

	/**
	  * 服务器连接错误
	  */
	private onSocketError(e: Laya.Event): void {
		if (this._needReconnect) {
			Laya.timer.once(this.checkInterval, this, this.reconnect);
		}
		else {
			GameApp.LListener.event(LcpEvent.SOCKET_NOCONNECT);
		}
		this._isConnecting = false;
	}

	/**
	  * 收到服务器消息
	  * @param e
	  */
	private onReceiveMessage(msg): void {
		this._msg.receive(msg);
	}

	/**
	  * 初始化服务区地址
	  * @param host IP
	  * @param port 端口
	  * @param msg 消息发送接受处理类
	  */
	public initServer(host: string, port: any, msg: ByteArrayMsg, openHandler?: Laya.Handler): void {
		this._host = host;
		this._port = port;
		this._msg = msg;
		this.openHandler = openHandler;
		this.connect();
	}

	public resetSocket(host: string, port: any = 0): void {
		if (port != 0) {
			let oldPort = this._port;
			this._port = port;
			this.close();
			this.connect();
			this._port = oldPort;
		}
		else {
			this.close();
			this.connect();
		}
	}

	/**
	  * 开始Socket连接
	  */
	public connect(): void {
		this._socket = new Laya.Socket();
		this._socket.endian = Laya.Byte.LITTLE_ENDIAN;
		this.addEvents();
		let url = this._host + ":" + this._port;
		Log.trace("WebSocket: " + url);
		// this._socket.connectByUrl(this._host + this._port);
		this._socket.connect(this._host, this._port);
	}

	/**
	  * 重新连接
	  */
	private reconnect(): void {
		if (GameApp.GameEngine.isReady == false) {
			return;
		}
		this.closeCurrentSocket();
		GameApp.GameEngine.isLogin = false;
		this._reconnectCount++;
		if (this._reconnectCount < this._maxReconnectCount) {
			this.connect();
		}
		else {
			if (this._connectFlag) {
				GameApp.LListener.event(LcpEvent.SOCKET_CLOSE);

			} else {
				GameApp.LListener.event(LcpEvent.SOCKET_NOCONNECT);
			}
		}
	}

	/**
	  * 发送消息到服务器
	  * @param msg
	  */
	public send(msg: any): void {
		if (this._msg) {
			this._msg.send(this._socket, msg);
		}
	}

	/**
	  * 关闭Socket连接
	  */
	public close(): void {
		this._connectFlag = false;
		this.closeCurrentSocket();
	}

	/**
	  * 断开Socket连接
	  */
	public disconnect(): void {
		this._socket.close();
	}
	/**
	  * 清理当前的Socket连接
	  */
	private closeCurrentSocket() {
		this.removeEvents();
		this._socket.cleanSocket();
		this._socket.close();
		this._socket = null;
		this._isConnecting = false;
	}

	/**
	  * Socket是否在连接中
	  * @returns {boolean}
	  */
	public isConnecting(): boolean {
		return this._isConnecting;
	}

	/**
	  * Debug信息
	  * @param str
	  */
	private debugInfo(str: String): void {
		GameApp.LListener.event(LcpEvent.SOCKET_DEBUG_INFO, str);
	}

}
