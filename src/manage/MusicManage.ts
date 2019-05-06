// /**
//   * 简单音乐管理类
//   */
// module MusicManage {
//     //本地加载背景音乐
//     export var sound: Laya.Sound;
//     export var channel: egret.SoundChannel;
//     //本地加载的按键音效
//     export var sound1: egret.Sound;
//     export var channel1: egret.SoundChannel;
//     // 本地加载的其他音效
//     export var sound2: egret.Sound;
//     export var channel2: egret.SoundChannel;
//     //网络在线加载背景音乐
//     export var bg: HTMLAudioElement;
//     /**
//      * 外部网络加载音乐，初始化
//      */
//     export function initMusicfromNet(): void {
//         var data = GlobalData.configData;
//         MusicManage.bg = <HTMLAudioElement>document.createElement('audio');
//         MusicManage.bg.src = data.data.musicurl;
//         document.body.appendChild(MusicManage.bg);
//     }
//     /**
//      * 播放网络音乐
//      */
//     export function playMuiscFromNet(v = 1): void {
//         if (GlobalData.isMusic) {
//             MusicManage.bg.loop = true;
//             MusicManage.bg.volume = 0.4;
//             MusicManage.bg.play();
//         }
//     }
//     /**
//      * 关闭网络音乐
//      */
//     export function closeMuiscFromNet(): void {
//         MusicManage.bg.pause();
//     }
//     /**
//      * 播放背景音乐
//      * @param res 资源名称
//      * @param v 音量
//      * @param loop 循环
//      */
//     export function playBgMuisc(res, v = 1, loop = 1, filename = 'mp3'): void {
//         if (GlobalData.isMusic) {
//             MusicManage.sound = RES.getRes(res + "_" + filename);
//             if (MusicManage.sound == null) {
//                 return;
//             }
//             MusicManage.closeBgMuisc();
//             MusicManage.channel = MusicManage.sound.play(0, loop);
//             MusicManage.channel.volume = v;
//         }
//     }
//     /**
//      * 关闭背景音乐
//      */
//     export function closeBgMuisc(): void {
//         if (MusicManage.channel) {
//             MusicManage.channel.stop();
//             MusicManage.channel = null;
//         }
//     }
//     /**
//      * 本地加载的按键音效
//      * @param res 资源名称
//      * @param v 音量
//      * @param loop 循环
//      */
//     export function playButtonMuisc(res, v = 1, loop = 1, filename = "mp3"): void {
//         if (GlobalData.isSound) {
//             MusicManage.sound1 = RES.getRes(res + "_" + filename);
//             if (MusicManage.sound1 == null) {
//                 return;
//             }
//             MusicManage.closeButtonMuisc();
//             MusicManage.channel1 = MusicManage.sound1.play(0, loop);
//             MusicManage.channel1.volume = v;
//         }
//     }
//     /**
//      * 关闭音效
//      */
//     export function closeButtonMuisc(): void {
//         if (MusicManage.channel1) {
//             MusicManage.channel1.stop();
//             MusicManage.channel1 = null;
//         }
//     }
//     /**
//      * 本地加载的其他音效
//      * @param res 资源名称
//      * @param v 音量
//      * @param loop 循环
//      */
//     export function playDdzMuisc(res, v = 1, loop = 1, filename = "mp3"): void {
//         if (GlobalData.isSound) {
//             MusicManage.sound2 = RES.getRes(res + "_" + filename);
//             if (MusicManage.sound2 == null) {
//                 return;
//             }
//             MusicManage.closeDdzMuisc();
//             MusicManage.channel2 = MusicManage.sound2.play(0, loop);
//             MusicManage.channel2.volume = v;
//         }
//     }
//     /**
//     * 关闭音效
//     */
//     export function closeDdzMuisc(): void {
//         if (MusicManage.channel2) {
//             MusicManage.channel2.stop();
//             MusicManage.channel2 = null;
//         }
//     }

// }


