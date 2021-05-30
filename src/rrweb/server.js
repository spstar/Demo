const http = require('http');
const url = require('url');
const fs = require('fs');

const baseUrl = 'http://127.0.0.1:8081/';
const baseDataPath = `${__dirname}/data/`;

const RESPONSE_INTERFACE = {
  code: 200,
  msg: '成功',
  data: null
};

function setResponseData(res, info = {}) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ...RESPONSE_INTERFACE, ...info }));
}

function parseParam(str = '', type = 'json') {
  if (typeof str !== 'string') {
    console.warn('paraseParam: 传入参数不是字符串');
  }

  const ret = {};

  if (type === 'json') {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log('参数解析错误：', e);
      return {};
    }
  }

  str.split('&').forEach((it) => {
    const [key, value] = it.split('=');
    ret[key] = value;
  });

  return ret;
}

function getPostData(req) {
  return new Promise((resolve) => {
    let data = '';

    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      resolve(parseParam(data));
    });
  });
}

function errorProcess(res, msg) {
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ...RESPONSE_INTERFACE, msg }));
}

function postRecordInterface(req, res) {  getPostData(req)
    .then((data) => {
      const currFilePath = `${baseDataPath}${data.id}`;
      const recordInfoStr = JSON.stringify(data.recordInfo);

      if (fs.existsSync(currFilePath)) {
        fs.appendFileSync(currFilePath, recordInfoStr);
      } else if (fs.existsSync(baseDataPath)) {
        fs.writeFileSync(currFilePath, recordInfoStr);
      } else {
        fs.mkdirSync(baseDataPath);
        fs.writeFileSync(currFilePath, recordInfoStr);
      }
      setResponseData(res);
    })
    .catch((error) => {
      errorProcess(res, error.message);
    });
}

function getRecordInfo(req, res) {
  const urlIns = new URL(req.url, baseUrl);
  const params = urlIns.searchParams;
  const currFilePath = `${baseDataPath}${params.get('id')}`;

  if (fs.existsSync(currFilePath)) {
    fs.readFile(currFilePath, 'utf8', (err, str) => {
      if (err) {
        setResponseData(res, { data: null, code: 500 });
      } else {
        setResponseData(res, { data: str });
      }
    });
  } else {
    setResponseData(res, { data: null, code: 500 });
  }
}

function routePath(req, res) {
  const urlIns = new URL(req.url, baseUrl);
  const pathName = urlIns.pathname;
  switch (pathName) {
    case '/api/record':
      return postRecordInterface(req, res);
    case '/api/getrecordinfo':
      return getRecordInfo(req, res);
    default:
      setResponseData(res, { data: null, code: 404, msg: '未找到请求接口' });
  }
}

http
  .createServer((request, response) => {
    routePath(request, response);
  })
  .listen(8081);

console.info('Server running at http://127.0.0.1:8081/');
