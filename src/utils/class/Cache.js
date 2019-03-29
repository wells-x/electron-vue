import {isArray, isNumber, isObject, isString} from "../judge-type";
import {getTimeStr} from "../time";

/**
 * @example

 let TeCache = new Cache({openSearchCache: true});
 TeCache.addCache([{id: 1, name: '1'}, {id: 12, name: '12'},], {s: "sfasd"});
 let s = TeCache.getCache(1);
 let ss = TeCache.getCache({s: "sfasd"});

 */
class Cache {
    /**
     * 单位(分钟)
     * @type {number}
     */
    static MINUTE = 60 * 1000;
    /**
     * 分钟数
     * @type {number}
     */
    time = 10;

    static Times = Cache.time * Cache.MINUTE;

    /**
     * 开启缓存搜索列表
     * @type {boolean}
     */
    openSearchCache = false;
    /**
     * 搜索
     * @type {object}
     */
    search = {};
    /**
     * 缓存主键
     * @type {string}
     */
    mainStr = 'id';
    /**
     * 缓存的列表
     * @type {Object}
     */
    list = {};
    /**
     * 缓存名字
     * @type {string}
     */
    name = 'cache';

    /**
     * 初始化
     * @param cachename 缓存名称
     * @param openSearchCache 开启缓存搜索列表
     * @param mainStr 缓存主键
     * @param time 分钟数
     */
    constructor({cachename, openSearchCache, mainStr, time} = {}) {
        this.name = cachename || this.name;
        this.openSearchCache = openSearchCache || this.openSearchCache;
        this.mainStr = mainStr || this.mainStr;
        this.time = time || this.time;
    }

    /**
     * 删除缓存
     * @param id
     */
    delCache(id = '') {
        if (id) {
            this.list[id] && delete this.list[id]
        } else {
            this.list = {};
        }
    }

    /**
     * 获取缓存
     * @param search 获取缓存 id 或者 搜索条件
     */
    getCache(search = "") {
        let timeStr = getTimeStr();
        if (isString(search) || isNumber(search)) {
            let item = this.list[search];
            if (!item || timeStr > Cache.Times + item.timeStr) return [];
            return [item];
        } else if (isObject(search)) {
            let searchStr = Cache.getSearchObjToString(search), list = [];
            if (this.search[searchStr] && this.search[searchStr].list) {
                if (timeStr - this.search[searchStr].timeStr > Cache.Times) {
                    return [];
                }
                this.search[searchStr].list.forEach(id => {
                    list = [...list, ...this.getCache(id)]
                });
                if (list.length !== this.search[searchStr].list.length) {
                    return [];
                }
            }
            return list;
        }
    }

    /**
     * 增加
     * @param list
     * @param searchObj
     */
    addCache(list, searchObj = '') {
        let timeStr = getTimeStr();
        let idList = [];
        if (!isArray(list)) return console.error(new Error('请添加数组'));
        list.forEach((item) => {
            item.timeStr = timeStr;
            let {[this.mainStr]: id} = item;
            this.list[id] = item;
            idList.push(id);
        });
        if (this.openSearchCache && searchObj) {
            let searchStr = Cache.getSearchObjToString(searchObj);
            if (searchStr === "") return;
            this.search[searchStr] = {list: idList, timeStr};
        }
    }

    /**
     * 将搜索对象转为字符串
     * @param searchObj
     * @return {string}
     */
    static getSearchObjToString(searchObj) {
        if (isString(searchObj)) return searchObj;
        let newSearchObj = Object.create(null);
        for (let prop in searchObj) {
            if (!searchObj.hasOwnProperty(prop)) continue;
            searchObj[prop] && (newSearchObj[prop] = searchObj[prop]);
        }
        let str = JSON.stringify(newSearchObj);
        console.log(str);
        return str;
    }
}

export {Cache}
