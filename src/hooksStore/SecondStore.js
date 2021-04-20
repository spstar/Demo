import React, { useState } from 'react';

import { subscribeState } from './store';

export const themes = {
  light: {
    foreground: '#000000',
    background: 'lightblue'
  },
  dark: {
    foreground: '#ffffff',
    background: 'darkblue',
    color: 'white'
  }
};

const ThemeLib = ['dark', 'light'];
function getToggleThemeAlg(theme) {
  console.log(
    '获取theme index:',
    ThemeLib.indexOf(theme) + (1 % ThemeLib.length)
  );
  return ThemeLib[(ThemeLib.indexOf(theme) + 1) % ThemeLib.length];
}

// Store('Theme2', reducer, 'light')
export default class TestStore extends React.Component {
  componentDidMount() {}

  render() {
    // 提供初始 context 值的 App 组件
    return (
      <>
        <b>hello, App Class Component</b>
        <Layout />
        <b>**************** second *********</b>
        <ToggleTheme />
      </>
    );
  }
}

function ToggleTheme() {
  const [theme, dispatch] = subscribeState('theme', useState(null)[1]);

  function toggleTheme() {
    const currTheme = getToggleThemeAlg(theme);

    console.log('当前要设置的theme：', currTheme);
    dispatch({ type: 'toggleTheme', payload: currTheme });
  }

  return <button onClick={toggleTheme}>更改样式使用Store</button>;
}

function Layout() {
  return (
    <div>
      <Content />
    </div>
  );
}

function Content() {
  const [theme] = subscribeState('theme', useState(null)[1]);

  return <div style={themes[theme]}>{`------- ${theme}`}</div>;
}
