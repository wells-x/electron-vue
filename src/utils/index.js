// import {isArray, isObject} from "./judge-type";

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  });
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function urlParse(url) {
  if (!url) url = window.location.href;
  const reg = /(([^?&=]+)(?:=([^?&=]*))*)/g;
  const result = {};
  url.replace(reg, function () {
    const key = arguments[2];
    let val = arguments[3] || "";
    val = val.split("#")[0];
    result[key] = val;
  });
  return result;
}

export const Storage = {
  get(key) {
    return window.localStorage.getItem(key);
  },
  set(key, val) {
    window.localStorage.setItem(key, val);
  },
  remove(key) {
    return window.localStorage.removeItem(key);
  }
};

export const Validator = {
  mobile(mobile) {
    if (!mobile) return { code: 0, msg: "请输入手机号" };
    if (mobile.length !== 11 || isNaN(mobile)) return { code: 1, msg: "请输入正确格式手机号" };
    return { code: 200, msg: "" };
  },
  idcard(idcard) {
    if (!idcard) return { code: 0, msg: "请输入身份证" };
    if (!idcard(idcard.toUpperCase())) return { code: 1, msg: "身份证格式错误" };
    return { code: 200, msg: "" }
  }
};

export const isWXBrowser = () => /micromessenger/.test(navigator.userAgent.toLowerCase());

export const cloneDeep = (obj) => JSON.parse(JSON.stringify(obj));

export const Helper = {
  getToday: function () {
    const date = new Date();
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    m = m < 10 ? ("0" + m) : m;
    d = d < 10 ? ("0" + d) : d;
    return y + "-" + m + "-" + d;
  },
  getNextDay: function (date) {
    if (date) {
      const _date = +new Date(date);
      if (!_date) {
        date = date.replace(/-/g, "/");
        date = +new Date(date);
      } else {
        date = _date;
      }
    } else {
      date = +new Date();
    }
    date = date ? (+new Date(date)) : (+new Date());
    let
      nextDay = date + (24 * 60 * 60 * 1000);
    nextDay = new Date(nextDay);

    let _day = nextDay.getDate();
    if (_day < 10) _day = "0" + _day;
    let _month = nextDay.getMonth() + 1;
    if (_month < 10) _month = "0" + _month;
    return [
      nextDay.getFullYear(),
      _month,
      _day
    ].join("-");
  },
  getWeekDay: function (date) {
    if (!date) return "";
    const week = {
      0: "日",
      1: "一",
      2: "二",
      3: "三",
      4: "四",
      5: "五",
      6: "六"
    };
    const day = new Date(date).getDay();
    return week[day] ? week[day] : "";
  },
  isToday: function (date) {
    if (typeof date !== "string" || date.length !== 10) return false;
    return date === this.getToday();
  },
  isTomorrow: function (date) {
    if (typeof date !== "string" || date.length !== 10) return false;
    return date === this.getNextDay();
  },
  minInArray(array) {
    return array.sort((a, b) => (a - b))[0];
  }
};

// 判断用户手机上安装的微信的版本号
export function checkWXVersion(ua) {
  ua = ua || navigator.userAgent;
  let version = ua.match(/MicroMessenger\/([\d.]+)/i);
  if (!version) return false;
  version = version[1];
  if (!version) return false;
  if (version.charAt(version.length - 1) === ".") {
    version = version.substring(0, version.length - 1);
  }
  version = version.split(".");

  return version.slice(0, 3).join(".");
}

export function isEmpty(obj) {
  let _isEmpty = true;
  for (const i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      _isEmpty = false;
      break;
    }
  }
  return _isEmpty;
}

// 把时间戳转成 2017年01月01日 10:23:23格式
export function tranformTimeStr(timeStr) {
  timeStr = timeStr * 1000;
  const strp = function (t, flag) {
    flag = flag || 10;
    return t < flag ? ("0" + t) : t;
  };
  const date = new Date(timeStr); // 获取一个时间对象
  //  var y = date.getFullYear();  // 获取完整的年份(4位,1970)
  let m = date.getMonth() + 1; // 获取月份(0-11,0代表1月,用的时候记得加上1)
  let d = date.getDate(); // 获取日(1-31)
  let h = date.getHours(); // 获取小时数(0-23)
  let mi = date.getMinutes(); // 获取分钟数(0-59)
  let s = date.getSeconds(); // 获取秒数(0-59)
  m = strp(m);
  d = strp(d);
  h = strp(h);
  mi = strp(mi);
  s = strp(s);
  return m + "月" + d + "日 " + h + ":" + mi + ":" + s;
}

/*

export let Storage = {
    get(key){
        return window.localStorage.getItem(key);
    },
    set(key,val){
        window.localStorage.setItem(key,val);
    },
    remove(key){
        return window.localStorage.removeItem(key);
    }
}
*/

// import numberToFixed from './util.numberToFixed'
// export const numberToFixed
