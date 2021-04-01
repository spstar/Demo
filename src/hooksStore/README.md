
### hooks Store 功能说明
1. 
 
- 以发布订阅的模式实现统一管理的数据中心
- 支持创建以命名空间为模块的数据更新，用以实现最小化的数据更新
- 可以让任意两个组件之间进行数据传递
- 

* 使用方式
```js
    import initReducer from 'store';
    import reducer from './myPieceReducer';
    
    let initState = {isCreate: true};

    let [state, dispatch] = enhanceReducer (reducer, initState);
    
```
