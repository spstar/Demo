import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const someObj = {
  a: 100,
  b: 200,
  eh: `${222}`
};
function App() {
  useEffect(() => {
    console.log('devicePixelRatio: ', devicePixelRatio);
  }, []);

  return (
    <div className="App">
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

export default App;
