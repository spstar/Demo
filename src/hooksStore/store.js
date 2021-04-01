import React, {useReducer} from 'react';
import {get as _get} from 'lodash';

let count = 1;
let referenceCount = 1;

let RegisterState, SubscribeState, RegisterStore;
console.log('引用Store 次数', referenceCount++);
/**
 * 创建一个store 对象，store 只能被创建一次；Store 内部使用命名空间来管理数据；
 * @param name:string Store name
 * @param reducer:function
 * @param rest: array
 * @returns {subscribeState(name:string, dispatch:function, isSubscribe: boolean)}
 */
(function createStore() {
    let
        stateLib = {init: [{}, () => void 0]},
        dispatchChainMap = {};

    console.log('create store called ', count++, ' times');
    RegisterState = function RegisterState({name, reducer, initValue, init}) {
        console.log('reducer', typeof reducer);
        let reducerIns = useReducer(reducer, initValue, init);
        const isNeedUpdate = !Object.is(reducerIns[0], _get(stateLib, `${name}[0]`));

        stateLib[name] = reducerIns;
        // 更新所有订阅的组件；
        ((isNeedUpdate && dispatchChainMap[name]) || [])
            .forEach(
                dispatch =>
                    Promise.resolve().then(() => dispatch(_get(stateLib, `${name}[0]`)))
            );

        return null;
    };
    RegisterStore = function RegisterStore({states}) {
        return (<>{states.map(it => <RegisterState key={it.name} {...it} />)}</>);
    };

    SubscribeState = function subscribeState(name, dispatch, subscribe = true) {
        console.log(dispatch);
        if (typeof dispatch !== 'function') {
            throw new Error('The "dispatch" argument of the second must be a function');
        }

        if (!subscribe) {
            dispatchChainMap[name] = dispatchChainMap[name].filter(it => it !== dispatch);

            return void 0;
        }

        dispatchChainMap[name]
            ? !dispatchChainMap[name].includes(dispatch) && dispatchChainMap[name].push(dispatch)
            : (dispatchChainMap[name] = [dispatch]);

        return stateLib[name];
    };
})();

export {
    RegisterState,
    RegisterStore,
    SubscribeState
};



