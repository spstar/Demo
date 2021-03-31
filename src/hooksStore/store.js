/* eslint-disable */
import {
    useReducer,
    useMemo
} from 'react';
import {noop, get as _get} from 'lodash';

function reducer(state, action) {
    const {
        productList = [],
        competitorList = []
    } = state;

    switch (action.type) {
        case 'init':
            return {};
        case 'setBatchState':
            return Object.assign(state, action.payload);
        case 'setIsNeedWorkOrder':
            return Object.assign(state, {isNeedWorkOrder: action.payload});
        case 'setIsCreateWorkOrder':
            return Object.assign(state, {isCreateWorkOrder: action.payload});
        case 'setIsNeedKickoffMeeting':
            return Object.assign(state, {isNeedKickoffMeeting: action.payload});
        case 'setIsSpecial':
            return Object.assign(state, {isSpecial: action.payload});
        case 'setSelectedIds':
            return Object.assign(state, {selectedProductIds: action.payload});

        case 'updateDetail':
            return Object.assign({}, state, {refreshDetailKey: +new Date()});
        case 'detailInfo':
            return Object.assign({}, state, {detailInfo: action.payload});
        case 'setProductInvalid':
            return Object.assign(state, {productIsInvalid: action.payload});


        default:
            return state;
    }
}

export default function useReducerMain(init = {}) {
    return useReducer(reducer, init);
}

let stateLib = {
    init: [{}, noop]
};

let dispatchChainMap = {};

export function subscribeState(name, dispatch) {
    if (typeof dispatch === 'function') {
        dispatchChainMap[name]
            ? !dispatchChainMap[name].includes(dispatch) && dispatchChainMap[name].push(dispatch)
            : (dispatchChainMap[name] = [dispatch]);
    }

    return stateLib[name] || stateLib.init;
}

export function registerState(name, reducerIns) {
    const isNeedUpdate = !Object.is(reducerIns[0], _get(stateLib, `${name}[0]`));

    stateLib[name] = reducerIns;
    // 更新所有订阅的组件；
    (isNeedUpdate && dispatchChainMap[name] || []).forEach(dispatch => dispatch(_get(stateLib, `${name}[0]`)));

    return function unregisterState() {
        stateLib[name] = undefined;
    }
}
