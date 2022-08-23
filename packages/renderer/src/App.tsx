import {useEffect, useState} from 'react';
// import reactLogo from './assets/react.svg';
import './App.css';
import {versions} from '#preload';
import {appPathPromise} from './main';

function App() {
  const [count, setCount] = useState(0);
  const [path, setPath] = useState<null | string>(null);

  useEffect(() => {
    const getAsync = async () => {
      const result = await appPathPromise;
      if (typeof result === 'string') setPath(result);
    };

    getAsync();
  }, []);

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
      </div>
      <p>
        App folder: <span id="appFolder">{path}</span>
      </p>
      <p>Node version: {versions.node}</p>
      <p>Electron version: {versions.electron}</p>
    </div>
  );
}

export default App;
