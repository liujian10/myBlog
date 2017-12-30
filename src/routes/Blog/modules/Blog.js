import { createAction } from 'redux-actions';
import {
  fetchUserInfo as getUserInfoService,
  fetchMenus as getMenusService,
  fetchBlogDetail as getDetailService
} from '../../../util/fetchRequest';
import { getItemByKey } from '../../../util';

// ------------------------------------
// Actions

// 获取用户基本信息
export const BLOG_GET_USER_INFO = 'BLOG_GET_USER_INFO';

export const getUserInfo = createAction(BLOG_GET_USER_INFO, getUserInfoService, (params, resolved) => ({
  resolved,
  params
}));

// 获取菜单列表
export const BLOG_GET_MENUS = 'BLOG_GET_MENUS';
export const getMenus = createAction(BLOG_GET_MENUS, getMenusService, (params, resolved) => ({
  resolved,
  params
}));

export const BLOG_GET_DETAIL = 'BLOG_GET_DETAIL';
export const getDetail = createAction(BLOG_GET_DETAIL, getDetailService, (params, resolved) => ({
  resolved,
  params
}));

export const BLOG_SET_CURRENT_KEY = 'BLOG_SET_CURRENT_KEY';
export const setCurrentKey = createAction(BLOG_SET_CURRENT_KEY);

// 添加默认页面
export const getIndexPath = (callback) => (dispatch, getState) => {
  const state = getState();
  let home = state.blog.menus[0];
  home = home && home.key;
  const pathname = state.location.pathname;
  if (/^\/blog((?!\/).)*$/.test(pathname)) {
    return pathname + '/detail/' + home;
  }
  return null;
};

export const actions = {
  getMenus,
  getUserInfo,
  getIndexPath,
  getDetail,
  setCurrentKey
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [BLOG_GET_USER_INFO]: (state, action) => {
    const { meta = {}, payload, error } = action;
    const { sequence = {} } = meta;
    const newState = {
      ...state,
      pending: sequence.type === 'start'
    };

    if (!error && sequence.type === 'next') {
      newState.userInfo = {
        ...state.userInfo,
        ...payload
      };
    }
    return newState;
  },
  [BLOG_GET_MENUS]: (state, action) => {
    const { meta = {}, payload, error } = action;
    const { sequence = {} } = meta;
    const newState = {
      ...state,
      pending: sequence.type === 'start'
    };

    if (!error && sequence.type === 'next') {
      newState.menus = payload.menus;
      let menuItems = [];
      if (Array.isArray(payload.menus)) {
        const addCards = (data) => {
          for (let cardItem of data) {
            if (cardItem.children) {
              addCards(cardItem.children);
            } else {
              menuItems.push(cardItem);
            }
          }
        };
        addCards(payload.menus);
      }
      newState.menuItems = menuItems;
    }
    return newState;
  },
  [BLOG_GET_DETAIL]: (state, action) => {
    const { meta = {}, payload, error } = action;
    const { sequence = {}, params = {} } = meta;
    const newState = {
      ...state,
      pending: sequence.type === 'start'
    };

    if (!error && sequence.type === 'next') {
      newState.detail = {
        ...state.detail,
        ...payload
      };
      const { menuItems } = state;
      if (params.key) {
        const item = getItemByKey(params.key, menuItems);
        newState.detail.name = item && item.name;
      }
    }
    return newState;
  },
  [BLOG_SET_CURRENT_KEY]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      currentKey: payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  userInfo: {},
  menus: [],
  detail: {},
  currentKey: '',
  pending: false
};

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
