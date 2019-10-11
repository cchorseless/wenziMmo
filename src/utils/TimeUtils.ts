/**
 * Date工具类
 */
module TimeUtils {


    /**
     * 根据秒数格式化字符串
     * @param second 秒数
     * @param type 1:hh:mm:ss;2:yyyy-mm-dd h:m:s;3:mm:ss;4:xx天前,xx小时前，xx分钟前;5:XX天XX小时XX分钟XX秒;6:dd:hh:mm;7:hh:mm
     * @return {string}
     *
     */
    export function getFormatBySecond(second: number, type: number = 1): string {
        var str: string = "";
        switch (type) {
            case 1:
                str = getFormatBySecond1(second);
                break;
            case 2:
                str = getFormatBySecond2(second);
                break;
            case 3:
                str = getFormatBySecond3(second);
                break;
            case 4:
                str = getFormatBySecond4(second);
                break;
            case 5:
                str = getFormatBySecond5(second);
                break;
            case 6:
                str = getFormatBySecond6(second);
                break;
            case 7:
                str = getFormatBySecond7(second);
                break;
        }
        return str;
    }
    /**
    * 根据毫秒数格式化字符串
    * @param mss 秒数
    * @param type 1:hh:mm:ss;2:yyyy-mm-dd h:m:s;3:mm:ss;4:xx天前,xx小时前，xx分钟前;5:XX天XX小时XX分钟XX秒
    * @return
    *
    */
    export function getFormatByMSS(mss: number, type: number = 1): string {
        let str: string = '';
        let second = Math.floor(mss / 1000);
        let tail = Math.floor(mss % 1000 / 10);
        let mss_tail: string;
        if (tail < 10) {
            mss_tail = ':0' + tail;
        }
        else {
            mss_tail = ':' + Math.floor(mss % 1000 / 10);
        }

        switch (type) {
            // hh:mm:ss:mssmss
            case 1:
                str = getFormatBySecond1(second);
                break;
            //2:yyyy-mm-dd h:m:s:mss
            case 2:
                str = getFormatBySecond2(second);
                break;
            // mm:ss:mssmss
            case 3:
                str = getFormatBySecond3(second);
                break;
            case 4:
                str = getFormatBySecond4(second);
                break;
            case 5:
                str = getFormatBySecond5(second);
                break;
            case 6:
                str = getFormatBySecond6(second);
                break;
            case 7:
                str = getFormatBySecond7(second);
                break;
     
        }
        str += mss_tail;
        return str;
    }

    // 1: hh:mm:ss
    function getFormatBySecond1(t: number = 0): string {
        var hourst: number = Math.floor(t / 3600);
        var hours: string;
        if (hourst == 0) {
            hours = "00";
        } else {
            if (hourst < 10)
                hours = "0" + hourst;
            else
                hours = "" + hourst;
        }
        var minst: number = Math.floor((t - hourst * 3600) / 60);
        var secondt: number = Math.floor((t - hourst * 3600) % 60);
        var mins: string;
        var sens: string;
        if (minst == 0) {
            mins = "00";
        } else if (minst < 10) {
            mins = "0" + minst;
        } else {
            mins = "" + minst;
        }
        if (secondt == 0) {
            sens = "00";
        } else if (secondt < 10) {
            sens = "0" + secondt;
        } else {
            sens = "" + secondt;
        }
        return hours + ":" + mins + ":" + sens;
    }

    // 2:yyyy-mm-dd h:m:s
    function getFormatBySecond2(time: number): string {
        var date: Date = new Date(time);
        var year: number = date.getFullYear();
        var month: number = date.getMonth() + 1; 	//返回的月份从0-11；
        var day: number = date.getDate();
        var hours: number = date.getHours();
        var minute: number = date.getMinutes();
        var second: number = date.getSeconds();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;
    }
    // 3: mm:ss
    function getFormatBySecond3(t: number = 0): string {
        var hourst: number = Math.floor(t / 3600);
        var minst: number = Math.floor((t - hourst * 3600) / 60);
        var secondt: number = Math.floor((t - hourst * 3600) % 60);
        var mins: string;
        var sens: string;
        if (minst == 0) {
            mins = "00";
        } else if (minst < 10) {
            mins = "0" + minst;
        } else {
            mins = "" + minst;
        }
        if (secondt == 0) {
            sens = "00";
        } else if (secondt < 10) {
            sens = "0" + secondt;
        } else {
            sens = "" + secondt;
        }
        return mins + ":" + sens;
    }
    // 4:xx天前，xx小时前，xx分钟前
    function getFormatBySecond4(time: number): string {
        var t = Math.floor(time / 3600);
        if (t > 0) {
            if (t > 24) {
                return Math.floor(t / 24) + "天前";
            }
            else {
                return t + "小时前";
            }
        }
        else {
            return Math.floor(time / 60) + "分钟前";
        }
    }
    // 5:XX天XX小时XX分钟XX秒
    function getFormatBySecond5(time: number): string {
        if (time <= 0) {
            return "";
        }
        //每个时间单位所对应的秒数
        var oneDay: number = 3600 * 24;
        var oneHourst: number = 3600;
        var oneMinst: number = 60;

        var days = Math.floor(time / oneDay);
        var hourst: number = Math.floor((time - days * oneDay) / oneHourst)
        var minst: number = Math.floor((time - hourst * oneHourst - days * oneDay) / oneMinst)
        var secondt: number = Math.floor((time - minst * oneMinst - hourst * oneHourst - days * oneDay) % oneMinst)
        let str = "";
        if (days > 0) {
            str += days + "天";
        }
        if (hourst > 0 && hourst < 10) {
            if (days > 0) {
                str += "0" + hourst + "小时";
            }
            else {
                str += hourst + "小时";
            }

        }
        else if (hourst >= 10) {
            str += hourst + "小时";
        }
        if (minst > 0 && minst < 10) {
            if (days > 0 || hourst > 0) {
                str += "0" + minst + "分";
            }
            else {
                str += minst + "分";
            }

        }
        else if (minst >= 10) {
            str += minst + "分";
        }
        if (secondt > 0 && secondt < 10) {
            if ((days > 0 || hourst > 0 || minst > 0)) {
                str += "0" + secondt + "秒";
            }
            else {
                str += secondt + "秒";
            }

        }
        else if (secondt >= 10) {
            str += secondt + "秒";
        }
        return str;

        // var dayss: string = "";
        // var hourss: string = "";
        // var minss: string = "";
        // var secss: string = "";
        // if (time > 0) {
        //     //天
        //     if (days == 0) {
        //         dayss = "";
        //         //小时
        //         if (hourst == 0) {
        //             hourss = "";
        //             //分
        //             if (minst == 0) {
        //                 minss = "";
        //                 if (secondt == 0) {
        //                     secss = "";
        //                 } else if (secondt < 10) {
        //                     secss = "0" + secondt + "秒";
        //                 } else {
        //                     secss = "" + secondt + "秒";
        //                 }

        //                 return secss;
        //             }
        //             else {
        //                 minss = "" + minst + "分";
        //                 if (secondt == 0) {
        //                     secss = "";
        //                 } else if (secondt < 10) {
        //                     secss = "0" + secondt + "秒";
        //                 } else {
        //                     secss = "" + secondt + "秒";
        //                 }

        //             }

        //             return minss + secss;
        //         }
        //         else {
        //             hourss = hourst + "小时";
        //             if (minst == 0) {
        //                 minss = "";
        //                 if (secondt == 0) {
        //                     secss = "";
        //                 } else if (secondt < 10) {
        //                     secss = "0" + secondt + "秒";
        //                 } else {
        //                     secss = "" + secondt + "秒";
        //                 }

        //                 return hourss + minss + secss;

        //             } else if (minst < 10) {
        //                 minss = "0" + minst + "分";
        //             } else {
        //                 minss = "" + minst + "分";
        //             }

        //             return hourss + minss;

        //         }
        //     }
        //     else {
        //         dayss = days + "天";
        //         if (hourst == 0) {
        //             hourss = "";
        //         } else {
        //             if (hourst < 10)
        //                 hourss = "0" + hourst + "小时";
        //             else
        //                 hourss = "" + hourst + "小时";
        //             ;
        //         }
        //         return dayss + hourss;
        //     }
        // }
    }

    // 6: XX天XX小时XX分钟  不精确到秒
    function getFormatBySecond6(time: number): string {
        if (time <= 0) {
            return "";
        }
        //每个时间单位所对应的秒数
        var oneDay: number = 3600 * 24;
        var oneHourst: number = 3600;
        var oneMinst: number = 60;

        var days = Math.floor(time / oneDay);
        var hourst: number = Math.floor((time - days * oneDay) / oneHourst)
        var minst: number = Math.floor((time - hourst * oneHourst - days * oneDay) / oneMinst)
        var secondt: number = Math.floor((time - minst * oneMinst - hourst * oneHourst - days * oneDay) % oneMinst)
        let str = "";
        if (days > 0) {
            str += days + "天";
        }
        if (hourst > 0 && hourst < 10) {
            if (days > 0) {
                str += "0" + hourst + "小时";
            }
            else {
                str += hourst + "小时";
            }

        }
        else if (hourst >= 10) {
            str += hourst + "小时";
        }
        if (minst > 0 && minst < 10) {
            if (days > 0 || hourst > 0) {
                str += "0" + minst + "分";
            }
            else {
                str += minst + "分";
            }

        }
        else if (minst >= 10) {
            str += minst + "分";
        }
        return str;
    }

    function getFormatBySecond7(time: number): string {
        if (time <= 0) {
            return "";
        }
        let str = "";
        var oneHourst: number = 3600;
        var oneMinst: number = 60;
        var hourst: number = Math.floor((time) / oneHourst)
        var minst: number = Math.floor((time - hourst * oneHourst) / oneMinst)
        if (hourst > 0 && hourst < 10) {
            str += hourst + "小时";
        }
        else if (hourst >= 10) {
            str += hourst + "小时";
        }
        if (minst > 0 && minst < 10) {

            str += "0" + minst + "分";
        }
        else if (minst >= 10) {
            str += minst + "分";
        }
        return str;
    }


    export function getFormatBySecond8(s): any {
        let time = new Date(s*1000);
        let obj: any = {}
        obj.year = time.getFullYear();
        obj.mon = time.getMonth();
        obj.day = time.getDay();
        obj.hour = time.getHours();
        obj.min = time.getMinutes();
        return obj;

    }
}