/**
 * Author: huangzhiyang
 * Date: 2016/7/27 17:00
 * Description: ""
 * Change: wells_xiaoqiang
 */
let ots = Object.prototype.toString;

/**
 * 判断是否数组
 *
 * @name isArray
 * @function
 * @memberOf type
 * @param {Object} o 判断对象
 * @return {boolean} 是否数组
 */
export function isArray (o) {
    return o && (o.constructor === Array || ots.call(o) === "[object Array]" || Array.isArray(o));
}

/**
 * 判断是否Object
 *
 * @name isObject
 * @function
 * @memberOf type
 * @param {Object} o 判断对象
 * @return {boolean} 是否Object
 */
export function isObject (o) {
    return o && (o.constructor === Object || ots.call(o) === "[object Object]");
}

/**
 * 判断是否布尔类型
 *
 * @name isBoolean
 * @function
 * @memberOf type
 * @param {Object} o 判断对象
 * @return {boolean} 是否布尔类型
 */
export function isBoolean (o) {
    return (o === false || o) && (o.constructor === Boolean);
}

/**
 * 判断是否数值类型
 *
 * @name isNumber
 * @function
 * @memberOf type
 * @param {Object} o 判断对象
 * @return {boolean} 是否数值类型
 */
export function isNumber (o) {
    return (o === 0 || o) && o.constructor === Number;
}

/**
 * 判断是否undefined
 *
 * @name isUndefined
 * @function
 * @memberOf type
 * @param {Object} o 判断对象
 * @return {boolean} 是否undefined
 */
export function isUndefined (o) {
    return typeof(o) === "undefined";
}

/**
 * 判断是否Null
 *
 * @name isNull
 * @function
 * @memberOf type
 * @param {Object} o 判断对象
 * @return {boolean} 是否Null
 */
export function isNull (o) {
    return o === null;
}

/**
 * 判断是否function
 *
 * @name isFunction
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否function
 */
export function isFunction (o) {
    return o && (o.constructor === Function);
}

/**
 * 判断是否字符串
 *
 * @name isString
 * @function
 * @memberOf type
 * @param {Object} o 判断对象
 * @return {boolean} 是否字符串
 */
export function isString (o) {
    return (o === "" || o) && (o.constructor === String);
}
