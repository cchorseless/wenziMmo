/**
* name 
*/
module NetWork {
	export class Socket extends BaseClass {
		private _needReconnect: boolean = true;
		private _maxReconnectCount = 10;

		private _reconnectCount: number = 0;
		private _connectFlag: boolean;
		private _host: string;
		private _port: any;
		private _socket: egret.WebSocket;
		private _msg: BaseMsg;
		private _isConnecting: boolean;
		public waitSignal: boolean = false;
		public waitTime: number = 0;
		public checkInterval: number = 2000;
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
			this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
			this._socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
			this._socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
			this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
		}

		/**
		 * 移除事件监听
		 */
		private removeEvents(): void {
			this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
			this._socket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
			this._socket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
			this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
		}

		/**
		 * 服务器连接成功
		 */
		private onSocketOpen(): void {
			this._reconnectCount = 0;
			this._isConnecting = true;

			// if (this._connectFlag && this._needReconnect) {
			//     App.MessageCenter.dispatch(SocketConst.SOCKET_RECONNECT);
			// } else {
			//     App.MessageCenter.dispatch(SocketConst.SOCKET_CONNECT);
			// }

			App.MessageCenter.dispatch(SocketConst.SOCKET_CONNECT);

			this._connectFlag = true;
		}

		/**
		 * 服务器断开连接
		 */
		private onSocketClose(): void {
			this._isConnecting = false;
			App.GameEngine.isLogin = false;
			if (this._needReconnect) {
				//App.MessageCenter.dispatch(SocketConst.SOCKET_START_RECONNECT);
				this.reconnect();
			} else {
				App.MessageCenter.dispatch(SocketConst.SOCKET_CLOSE);
			}
		}

		/**
		 * 服务器连接错误
		 */
		private onSocketError(): void {
			if (this._needReconnect) {
				this.reconnect();
			} else {
				App.MessageCenter.dispatch(SocketConst.SOCKET_NOCONNECT);
			}
			this._isConnecting = false;
		}

		/**
		 * 收到服务器消息
		 * @param e
		 */
		private onReceiveMessage(e: egret.Event): void {
			this._msg.receive(this._socket);
		}

		/**
		 * 初始化服务区地址
		 * @param host IP
		 * @param port 端口
		 * @param msg 消息发送接受处理类
		 */
		public initServer(host: string, port: any, msg: BaseMsg): void {
			this._host = host;
			this._port = port;
			this._msg = msg;

			//this.connect();
		}

		public resetSocket(host: string, port: any = 0): void {
			if (port != 0) {
				let oldhost = this._host;
				let oldport = this._port;
				//this._host = host;
				this._port = port;
				this.close();
				this.connect();
				this._host = oldhost;
				this._port = oldport;
			} else {
				this.close();
				this.connect();
			}

		}

		/**
		 * 开始Socket连接
		 */
		public connect(): void {
			if (App.DeviceUtils.IsHtml5) {
				if (!window["WebSocket"]) {
					Log.trace("不支持WebSocket");
					return;
				}
			}
			this._socket = new egret.WebSocket();
			if (this._msg instanceof ByteArrayMsg) {
				this._socket.type = egret.WebSocket.TYPE_BINARY;
			}
			Log.trace("WebSocket: " + this._host + ":" + this._port);
			this.addEvents();
			//this._socket.connect(this._host, this._port);
			let url = this._host + this._port;
			this._socket.connectByUrl(url);
		}

		/**
		 * 重新连接
		 */
		private reconnect(): void {
			if (App.GameEngine.isReady == false) {
				return;
			}
			this.closeCurrentSocket();
			App.GameEngine.isLogin = false;
			this._reconnectCount++;
			if (this._reconnectCount < this._maxReconnectCount) {
				this.connect();
			} else {
				this._reconnectCount = 0;
				if (this._connectFlag) {
					App.MessageCenter.dispatch(SocketConst.SOCKET_CLOSE);
				} else {
					App.MessageCenter.dispatch(SocketConst.SOCKET_NOCONNECT);
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
			App.MessageCenter.dispatch(SocketConst.SOCKET_DEBUG_INFO, str);
		}

		public checkSignalCmd() {
			let signal = new CheckSignalCmdRet();
			signal.setValue('checknum', 66)
			signal.send();
			signal.clear();
			signal = null;
			this.waitSignal = true;
			this.waitTime = egret.getTimer() + 5;
		}
	}

}