import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <form action="http://hello.com/post/data" method="post" target="cross-post">
        <input type="text"/>
        <input type="textarea"/>
        <input type="radio"/>
        <input type="checkbox"/>
        <button type="submit">提交</button>
      </form>
        <iframe name="cross-post"  frameborder="0"></iframe>
    </div>
  );
}

export default App;
