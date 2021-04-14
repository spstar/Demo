import React from 'react';

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

// 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效
// Theme context，默认的 theme 是 “light” 值
const ThemeContext = React.createContext('light');

// 用户登录 context
const UserContext = React.createContext({
  name: 'Guest'
});

export default class App extends React.Component {
  render() {
    const { signedInUser, theme } = this.props || {};

    console.log(this.props);
    // 提供初始 context 值的 App 组件
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <b>hello, {signedInUser}</b>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
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

// 一个组件可能会消费多个 context
function Content() {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <UserContext.Consumer>
          {(user) => (
            <div
              style={themes[theme]}
              user={user}
              theme={theme}
            >{`${user} --- ${theme}`}</div>
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
