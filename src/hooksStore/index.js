import React, { useState } from 'react';

import { subscribeState } from './store';

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
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

export default class TestStore extends React.Component {
  componentDidMount() {}

  render() {
    // 提供初始 context 值的 App 组件
    return (
      <>
        <b>hello, App Class Component</b>
        <Layout />
      </>
    );
  }
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
