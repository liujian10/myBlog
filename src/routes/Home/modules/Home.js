import { createAction } from 'redux-actions';
import {
  fetchCvInfo as fetchCvInfoService,
  projectInfo as projectInfoService
} from '../../../util/fetchRequest';

// ------------------------------------
// Actions

// 获取简历信息
export const HOME_GET_CV_INFO = 'HOME_GET_CV_INFO';

/**
 * action: 获取简历信息
 */
export const getCvInfo = createAction(HOME_GET_CV_INFO, fetchCvInfoService, (params, resolved) => ({
  resolved,
  params
}));

// 更新页面元素尺寸信息
export const HOME_ADAPTIVE_TO_UPDATE = 'HOME_ADAPTIVE_TO_UPDATE';

/**
 * action: 更新页面元素尺寸信息
 */
export const adaptiveToUpdate = createAction(HOME_ADAPTIVE_TO_UPDATE);

// 设置卡片属性
export const HOME_SET_CARD_PROPS = 'HOME_SET_CARD_PROPS';

/**
 * action: 设置卡片属性
 */
export const setCardProps = createAction(HOME_SET_CARD_PROPS);

// 设置根属性
export const HOME_ASSIGN_PROPS = 'HOME_ASSIGN_PROPS';

/**
 * action: 设置根属性
 */
export const assignProps = createAction(HOME_ASSIGN_PROPS);

// 更新页面元素尺寸信息
export const HOME_GET_PROJECT = 'HOME_GET_PROJECT';

/**
 * action: 获取简历信息
 */
export const getProjectInfo = createAction(HOME_GET_PROJECT, projectInfoService, (params, resolved) => ({
  resolved,
  params
}));

/**
 * action 列表
 * @type {{getCvInfo}}
 */
export const actions = {
  getCvInfo,
  adaptiveToUpdate,
  setCardProps,
  assignProps,
  getProjectInfo
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [HOME_ASSIGN_PROPS]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      ...payload
    };
  },
  [HOME_GET_CV_INFO]: (state, action) => {
    const { meta = {}, payload, error } = action;
    const { sequence = {} } = meta;
    return !error ? {
      ...state,
      ...payload,
      pending: sequence.type === 'start'
    } : state;
  },
  [HOME_ADAPTIVE_TO_UPDATE]: (state) => {
    const content = window.document.getElementsByClassName('ant-layout-footer')[0]; // 获取右侧容器宽度
    let cardWidth = content && content.clientWidth - 80 || 0;
    let bodyWidth = window.document.documentElement.clientWidth;
    let bodyHeight = window.document.documentElement.clientHeight;
    let isMobile = bodyWidth <= bodyHeight;

    return {
      ...state,
      cardWidth,
      bodyHeight,
      bodyWidth,
      isMobile
    };
  },
  [HOME_SET_CARD_PROPS]: (state, action) => {
    const { payload } = action;
    const { key, value } = payload;
    const cardProps = {
      ...state.cardProps
    };
    cardProps[key] = value;
    return {
      ...state,
      cardProps
    };
  },
  [HOME_GET_PROJECT]: (state, action) => {
    const { meta = {}, payload, error } = action;
    const { sequence = {} } = meta;
    let newState = {
      ...state
    };

    if (!error && sequence.type === 'next') {
      newState.project = {
        ...newState.project,
        ...payload
      };
    }
    return newState;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  introduction: {},
  educations: [],
  works: [],
  careers: [],
  technologies: [],
  titles: {},
  project: {},
  cardWidth: 0,
  bodyHeight: 0,
  bodyWidth: 0,
  isMobile: false,
  collapsed: false,
  logoPaused: true,
  cardProps: {},
  showModal: false,
  showKey: -1,
  currentDeg: 0,
  bannerCurIndex: 0,
  bannerLastIndex: 0,
  pending: false
};

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
