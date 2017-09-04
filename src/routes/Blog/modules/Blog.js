import { createAction } from 'redux-actions'
import {
  fetchUserInfo as getUserInfoService,
  fetchMenus as getMenusService,
  fetchBlogDetail as getDetailService
} from '../../../util/fetchRequest'

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'

// ------------------------------------
// Actions

// 获取用户基本信息
export const BLOG_GET_USER_INFO = 'BLOG_GET_USER_INFO'

export const getUserInfo = createAction(BLOG_GET_USER_INFO, getUserInfoService, (params, resolved) => ({
  resolved,
  params,
}))

// 获取菜单列表
export const BLOG_GET_MENUS = 'BLOG_GET_MENUS'
export const getMenus = createAction(BLOG_GET_MENUS, getMenusService, (params, resolved) => ({
  resolved,
  params,
}))

export const BLOG_GET_DETAIL = 'BLOG_GET_DETAIL'
export const getDetail = createAction(BLOG_GET_DETAIL, getDetailService, (params, resolved) => ({
  resolved,
  params,
}))

// 添加默认页面
export const getIndexPath = (callback) => (dispatch, getState) => {
  const state = getState()
  let home = state.blog.menus[0]
  if (home) home = home.path ? home.path : ('/' + home.key)
  if (state.location.pathname === '/blog') {
    return '/blog' + home
  }
  return null
}

export const actions = {
  getMenus,
  getUserInfo,
  getIndexPath,
  getDetail
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [BLOG_GET_USER_INFO] : (state, action) => {
    const { meta = {}, payload, error } = action
    const { sequence = {} } = meta
    const newState = {
      ...state,
      pending: sequence.type === 'start',
    }

    if (!error && sequence.type === 'next') {
      newState.userInfo = {
        ...state.userInfo,
        ...payload
      }
    }
    return newState
  },
  [BLOG_GET_MENUS] : (state, action) => {
    const { meta = {}, payload, error } = action
    const { sequence = {} } = meta
    const newState = {
      ...state,
      pending: sequence.type === 'start',
    }

    if (!error && sequence.type === 'next') {
      newState.menus = payload.menus
      let cards = []
      if (Array.isArray(payload.menus)) {
        const addCards = (data) => {
          for (let cardItem of data) {
            if (cardItem.children) {
              addCards(cardItem.children)
            } else {
              cards.push(cardItem)
            }
          }
        }
        addCards(payload.menus)
      }
      newState.cards = cards
    }
    return newState
  },
  [BLOG_GET_DETAIL] : (state, action) => {
    const { meta = {}, payload, error } = action
    const { sequence = {}, params = {} } = meta
    const newState = {
      ...state,
      pending: sequence.type === 'start',
    }

    if (!error && sequence.type === 'next') {
      newState.detail = {
        ...state.detail,
        ...payload
      }
      if (params.key) {
        newState.currentKey = params.key
      }
    }
    return newState
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  userInfo:{},
  menus:[],
  detail:{},
  currentKey:'',
  pending: false
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
