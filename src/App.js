import React, { useState } from 'react';
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

function App() {
  let [theme, setTheme] = useState(ThemeLib[0]);

  function toggleTheme() {
    let currTheme = getToggleThemeAlg(theme);

    console.log('当前要设置的theme：', currTheme);
    setTheme(currTheme);
  }

  console.dir(RegisterState);

  return (
    <div className="App">
      <RegisterStore
        states={[{ name: 'theme', reducer, initValue: 'light' }]}
      />
      {/*<RegisterState name="theme" reducer={reducer} initValue="light" />*/}
      hello
      <ContextTest theme={theme} signedInUser={'admin'} />
      <button onClick={toggleTheme}>更改样式</button>
      <div>------------------------------</div>
      <div>------------------------------</div>
      <ToggleTheme />
      <div>------------------------------</div>
      <TestStore />
      <div>------------------------------</div>
      <div>------------------------------</div>
    </div>
  );
}

function ToggleTheme() {
  let [theme, dispatch] = SubscribeState('theme', useState(null)[1]);

  function toggleTheme() {
    let currTheme = getToggleThemeAlg(theme);

    console.log('当前要设置的theme：', currTheme);
    dispatch({ type: 'toggleTheme', payload: currTheme });
  }

  return <button onClick={toggleTheme}>更改样式使用Store</button>;
}

export default App;
