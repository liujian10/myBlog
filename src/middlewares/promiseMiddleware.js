/**
 * [promiseMiddleware 包装action ，检测当前action是否为一个promise,如果是则给当前action加上开始结束的状态，方便reducer根据状态来做相应的处理]
 * author  zhangbo15@le.com
 */
import { isFSA } from 'flux-standard-action'
import uniqueId from 'lodash/uniqueId'

function isPromise (val) {
  return val && typeof val.then === 'function'
}

export default function promiseMiddleware ({ dispatch }) {
  return next => (action) => {
    // console.log(action,isPromise(action),isFSA(action))
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(dispatch)
        : next(action)
    }
    const { meta = {}, payload } = action
    const id = uniqueId()
    if (isPromise(payload)) {
      dispatch({
        ...action,
        payload: undefined,
        meta: {
          ...meta,
          sequence: {
            type: 'start',
            id,
          },
        },
      })

      return payload.then(
        result => dispatch({
          ...action,
          payload: result,
          meta: {
            ...meta,
            sequence: {
              type: 'next',
              id,
            },
          },
        }),
        error => {
          console.log(error)
          return dispatch({
            ...action,
            payload: error,
            error: true,
            meta: {
              ...meta,
              sequence: {
                type: 'next',
                id,
              },
            },
          })
        }
      )
    }
    return next(action)
  }
}
