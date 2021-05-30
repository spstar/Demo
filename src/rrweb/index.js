import { record } from 'rrweb';
import axios from 'axios';

let events = [];

console.log('rrweb: ', record);
// save 函数用于将 events 发送至后端存入，并重置 events 数组
function save() {
  const body = JSON.stringify({ recordInfo: events, id: 'test-id' });
  events = [];
  fetch('/api/record', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  });
}

record({
  emit(event) {
    // 将 event 存入 events 数组中
    events.push(event);

    events.length > 30 && save();
  }
});

// 每 10 秒调用一次 save 方法，避免请求过多
setInterval(save, 10 * 1000);
