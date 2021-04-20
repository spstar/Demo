import React, { useReducer } from 'react';
import { get as _get } from 'lodash';

/**
 * 创建一个store 对象，store 只能被创建一次；Store 内部使用命名空间来管理数据；
 * RegisterState / RegisterStore 是两个函数组件；
 * RegisterState 用于注册单个数据块的使用
 * RegisterStore 用于注册多个数据块；
 * 他们两个可以一起使用；但是建议只使用RegisterStore 统一注册数据；
 * 使用方式：
 *  <RegisterState name="global" reducer={(state, action) => action.payload} initValue="admin" />
 *  <RegisterStore states={{ name: "global", reducer:(state, action) => action.payload, initValue: "admin"}} />
 *
 *  在需要使用数据的函数组件订阅数据：
 *  function Button () {
 *      let [state, dispatch] = subscribeState('global', useState(null)[1]);
 *
 *      onclick () {
 *          dispatch({payload: 'Changed'});
 *      }
 *
 *      return (
 *
 *      );
 *  }
 */
const stateLib = { init: [{}, () => undefined] };
const dispatchChainMap = {};

export function RegisterState({ name, reducer, initValue, init }) {
  const reducerIns = useReducer(reducer, initValue, init);
  const isNeedUpdate = !Object.is(reducerIns[0], _get(stateLib, `${name}[0]`));

  stateLib[name] = reducerIns;
  // 更新所有订阅的组件；
  ((isNeedUpdate && dispatchChainMap[name]) || []).forEach((dispatch) =>
    Promise.resolve().then(() => dispatch(_get(stateLib, `${name}[0]`)))
  );

  return null;
}

/**
 *
 * @param {array} param0 states
 * @returns ReactDom
 */
export function RegisterStore({ states }) {
  return (
    <>
      {states?.map((it) => (
        <RegisterState key={it.name} {...it} />
      ))}
    </>
  );
}

export function subscribeState(name, dispatch, subscribe = true) {
  if (typeof dispatch !== 'function') {
    throw new Error('The "dispatch" argument of the second must be a function');
  }

  if (!subscribe) {
    dispatchChainMap[name] = dispatchChainMap[name].filter(
      (it) => it !== dispatch
    );

    return undefined;
  }

  if (dispatchChainMap[name]) {
    !dispatchChainMap[name].includes(dispatch) &&
      dispatchChainMap[name].push(dispatch);
  } else {
    dispatchChainMap[name] = [dispatch];
  }

  return stateLib[name];
}
