import { createAction } from 'redux-actions'
import { fetchUserInfo as getUserInfoService, fetchMenus as getMenusService } from '../../../util/fetchRequest'
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

export const actions = {
  getMenus,
  getUserInfo
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
    }
    return newState
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
