import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import DemoTable from './table';

function App() {
  useEffect(() => {
    console.log('devicePixelRatio: ', devicePixelRatio);
  }, []);

  return (
    <div className="App">
      <DemoTable />
      <div style={{ border: '1px solid green', width: '100%', fontSize: 20 }} />
    </div>
  );
}

export default App;
