/**
 * Created by liujian on 2017/6/8.
 */
import 'isomorphic-fetch';
import { message } from 'antd';
// import { hashHistory } from 'react-router'
import { getUrlParam, getResult } from '../util';
import { isLocal } from './local';

import userInfo from '../static/json/userInfo.json';
import menus from '../static/json/menus.json';
import cvInfo from '../static/json/cvInfo-test.json';

const SUCCESS_CODE = 0;
const BASE_HOST = 'http://' + window.location.host + '/json/';

// 后端定义的全局错误返回码
const GLOBAL_CODES = {
  1: '服务器错误',
  2: '授权错误，访问授权 Token 无效或已过期',
  3: '请求参数错误',
  4: '调用次数达到上线',
  5: '无调用权限'
};

/**
 * 处理fetch请求成功返回
 *
 * @param {object} head 返回头信息
 * @param {object} body 返回主体信息
 * @param {boolean} globalError 是否通过 message.error 全局提示错误
 */
const handleResponse = ({ head, body }, { globalError }) => new Promise((resolve, reject) => {
  if (head.ret === SUCCESS_CODE) {
    resolve(body);
  } else {
    const error = getResult(GLOBAL_CODES, head.ret, '服务异常', head);
    if (globalError) {
      message.error(error);
    }
    reject(error);
  }
});

// json数据
const jsonConfig = {
  userInfo,
  menus,
  cvInfo
};

const getJson = (url, { params }) => {
  if (url === 'blog') {
    return {
      'head': {
        'ret': 0,
        'msg': 'OK'
      },
      'body': {
        url,
        ...params
      }
    };
  }
  return jsonConfig[url];
};

const doFetch = (url, option) => {
  if (isLocal()) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { //模拟数据请求
        resolve({
          ...option,
          status: 200,
          body: getJson(url, option),
          json: () => {
            let type = url.split('?')[0];
            return getJson(type, option);
          }
        });
      }, 100);
    });
  } else {
    return fetch(BASE_HOST + url, option);
  }
};

/**
 * fetch 请求封装
 *
 * @param {string} url 请求地址
 * @param {object} [options] 请求参数
 * @param {object} [options.params] - 追加到 url 上的 params
 * @param {object} [options.json] - request body 参数,注意这里还是 object, 传给 fetch 时会转json
 * @param {boolean} [options.globalError] - 是否通过 message.error 全局提示错误
 * @returns {promise}
 */
export const fetchRequest = async (url, options) => {
  let defaultOptions = {
    mode: 'cors'
  };
  Object.assign(options, defaultOptions);
  const newOptions = { ...options };
  let newUrl = url;
  if (options.params) {
    const paramsStr = getUrlParam(options.params);
    if (paramsStr) {
      newUrl = `${url}${url.indexOf('?') === -1 ? '?' : ''}${paramsStr}`;
    }
  }
  if (options.json) {
    newOptions.body = JSON.stringify(options.json);
  }

  const response = await doFetch(newUrl, {
    ...newOptions,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(
    (res) => {
      // 检查 HTTP 状态码
      if (res.status >= 200 && res.status < 300) {
        return res;
      }

      const error = new Error(res.statusText);
      error.res = res;

      if (newOptions.globalError) {
        message.error(`网络错误: ${res.status} ${res.statusText}`);
      }
      throw error;
    },
    (error) => {
      if (newOptions.globalError) {
        message.error(error.message || '网络错误');
      }
      throw error;
    }
  );

  const res = await response.json();
  return handleResponse(res, newOptions);
};

/**
 * 请求用户基本信息
 * @param id
 * @returns {promise}
 */
export const fetchUserInfo = id => fetchRequest('userInfo', { ...arguments });

/**
 * 请求菜单数据
 * @returns {promise}
 */
export const fetchMenus = () => fetchRequest('menus', { ...arguments });

/**
 * 请求日志详情信息
 * @param params
 * @returns {promise}
 */
export const fetchBlogDetail = params => fetchRequest('blog', { params });

/**
 * 请求简历信息
 * @returns {promise}
 */
export const fetchCvInfo = () => fetchRequest('cvInfo', { ...arguments });

export default fetchRequest;
