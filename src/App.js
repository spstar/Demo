import React, { useState } from 'react';
import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import ContextTest from './context';
import {
  RegisterState,
  SubscribeState,
  RegisterStore
} from './hooksStore/store';
import reducer from './hooksStore/reducers/theme';
import TestStore from './hooksStore';

const ThemeLib = ['dark', 'light'];

function getToggleThemeAlg(theme) {
  console.log(
    '获取theme index:',
    ThemeLib.indexOf(theme) + (1 % ThemeLib.length)
  );
  return ThemeLib[(ThemeLib.indexOf(theme) + 1) % ThemeLib.length];
}

const someObj = {
  a: 100,
  b: 200,
  eh: `${222}`
};
function App() {
  const [theme, setTheme] = useState(ThemeLib[0]);

  function toggleTheme() {
    const currTheme = getToggleThemeAlg(theme);

    console.log('当前要设置的theme：', currTheme);
    setTheme(currTheme);
  }

  console.dir(RegisterState);

  useEffect(() => {
    console.log('devicePixelRatio: ', devicePixelRatio);
  }, []);

  return (
    <div className="App">
      <RegisterStore
        states={[{ name: 'theme', reducer, initValue: 'light' }]}
      />
      {/* <RegisterState name="theme" reducer={reducer} initValue="light" /> */}
      hello
      <ContextTest theme={theme} signedInUser="admin" />
      <button type="button" onClick={toggleTheme}>
        更改样式
      </button>
      <div>------------------------------</div>
      <div>------------------------------</div>
      <ToggleTheme />
      <div>------------------------------</div>
      <TestStore />
      <div>------------------------------</div>
      <div>------------------------------</div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          <li>hello lolk at the 1px width;</li>
          <li>hello lolk at the 2px width;</li>
        </ul>
      </header>
      <div style={{ border: '1px solid green', width: '100%', fontSize: 20 }} />
    </div>
  );
}

function ToggleTheme() {
  const [theme, dispatch] = SubscribeState('theme', useState(null)[1]);

  function toggleTheme() {
    const currTheme = getToggleThemeAlg(theme);

    console.log('当前要设置的theme：', currTheme);
    dispatch({ type: 'toggleTheme', payload: currTheme });
  }

  return (
    <button onClick={toggleTheme} type="button">
      更改样式使用Store
    </button>
  );
}

export default App;
