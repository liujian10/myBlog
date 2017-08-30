/**
 * Created by liujian on 2017/6/8.
 */
import 'isomorphic-fetch'
import { message } from 'antd'
// import { hashHistory } from 'react-router'
import { getUrlParam, getResult } from '../util'
import local from './local'

import userInfo from '../../json/userInfo.json'
import menus from '../../json/menus.json'

const SUCCESS_CODE = 0
const BASE_HOST = 'http://localhost:3000/json/'
const jsonConfig = {
  'userInfo' : userInfo,
  'menus' : menus
}

// 后端定义的全局错误返回码
const GLOBAL_CODES = {
  1: '服务器错误',
  2: '授权错误，访问授权 Token 无效或已过期',
  3: '请求参数错误',
  4: '调用次数达到上线',
  5: '无调用权限'
}

/**
 * 处理fetch请求成功返回
 *
 * @param {object} head 返回头信息
 * @param {object} body 返回主体信息
 * @param {boolean} globalError 是否通过 message.error 全局提示错误
 */
const handleResponse = ({ head, body }, { globalError }) => new Promise((resolve, reject) => {
  if (head.ret === SUCCESS_CODE) {
    resolve(body)
  } else {
    const error = getResult(GLOBAL_CODES, head.ret, '服务异常', head)
    if (globalError) {
      message.error(error)
    }
    reject(error)
  }
})

const doFetch = (url, option) => {
  if (local.isLocal()) {
    let res = new Promise((resolve, reject) => {
      resolve({
        ...option,
        status:200,
        body:jsonConfig[url],
        json:() => {
          let type = url.split('?')[0]
          return jsonConfig[type]
        }
      })
    })
    return res
  } else {
    return fetch(BASE_HOST + url, option)
  }
}

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
export const fetchRequest = async(url, options) => {
  const newOptions = { ...options }
  let newUrl = url
  if (options.params) {
    const paramsStr = getUrlParam(options.params)
    if (paramsStr) {
      newUrl = `${url}${url.indexOf('?') === -1 ? '?' : ''}${paramsStr}`
    }
  }
  if (options.json) {
    newOptions.body = JSON.stringify(options.json)
  }

  const response = await doFetch(newUrl, {
    ...newOptions,
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(
    (res) => {
      // 检查 HTTP 状态码
      if (res.status >= 200 && res.status < 300) {
        return res
      }

      const error = new Error(res.statusText)
      error.res = res

      if (newOptions.globalError) {
        message.error(`网络错误: ${res.status} ${res.statusText}`)
      }
      throw error
    },
    (error) => {
      if (newOptions.globalError) {
        message.error(error.message || '网络错误')
      }
      throw error
    }
  )

  const res = await response.json()
  return handleResponse(res, newOptions)
}

export const fetchUserInfo = (id) => {
  return fetchRequest('userInfo', {
    mode:'cors',
    params:{
      userId:id
    }
  })
}

export const fetchMenus = (id) => {
  return fetchRequest('menus', {
    mode:'cors',
    params:id ? {
      menuId:id
    } : {}
  })
}

export default fetchRequest
