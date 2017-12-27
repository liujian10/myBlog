/**
 * [asyncActionCallbackMiddleware 包装action ，给当前状态为next的action 添加成功失败回调]
 * author  zhangbo15@le.com
 */
export default function asyncActionCallbackMiddleware () {
  return next => (action) => {
    const { meta = {}, error, payload } = action;
    const { sequence = {}, resolved, rejected } = meta;
    if (sequence.type !== 'next') return next(action);
    if (error) {
      if (rejected) {
        rejected(payload);
      }
    } else if (resolved) {
      // 成功的回掉要晚于 reducer 执行才能取到最新的 state
      setTimeout(() => resolved(payload), 0);
    }

    next(action);
  };
}
