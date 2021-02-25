/**
 * 实现Promise 对象，理解Promise 里面的功能方法；
 */

const STATUS = Object.freeze({
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
});

class Promise {
    #status = STATUS.PENDING;
    #fulfilledTasks = [];
    #rejectedTasks = [];

    constructor(resolver) {
        resolver(Promise.resolve.bind(this), Promise.reject.bind(this));
    }

    /**
     * 接受一个成功的消息
     * @param msg
     */
    static resolve(data) {
        console.log('resolve method');
        if (this.#status !== STATUS.PENDING) return;

        this.#status = STATUS.FULFILLED;
        this.#fulfilledTasks.reduce((prevData, task) => task(prevData), data);
    }

    /**
     * 接受一个失败的消息
     * @param msg
     */
    static reject(data) {
        console.log('reject method');
        if (this.#status !== STATUS.PENDING) return;

        this.#status = STATUS.REJECTED;
        this.#rejectedTasks.reduce((prevData,task)=> task(prevData), data);
    }

    then(success, failure) {
        typeof success === "function" && this.#fulfilledTasks.push(success);

        // * 注意： 原生的Promise then 方法返回的不是本身；
        return this;
    }

    catch

}

console.log(new Promise(()=>{}), Promise);

const p1 = new Promise((resolve, reject)=>{
    resolve('成功');
});

const p2 = new Promise((resolve, reject)=>{
    reject('失败');

});
console.log('p1', p1, 'p2', p2);
