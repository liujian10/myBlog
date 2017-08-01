/**
 * Created by liujian on 2017/6/8.
 */
/**
 * 把平对象转换成 url param 的形式
 *
 * @param {object} params
 * @returns {string}
 */
export const getUrlParam = params =>
    Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

/**
 * 支持传参的 _.result 增强版 目前不支持多层级的 path
 *
 * @param {object} obj
 * @param {string} path
 * @param {*} defaultResult
 * @param rest 剩下的参数会传给 obj 上对应的方法
 * @returns {*}
 */
export const getResult = (obj, path, defaultResult, ...rest) => {
    if (!(path in obj)) {
        return defaultResult;
    }

    const value = obj[path];

    if (typeof value === 'function') {
        return value(...rest);
    }

    return value;
};