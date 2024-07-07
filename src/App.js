import './App.css';
import Content from './components/content';
import Navbar from './components/navbar';
import Loading from './components/loading';
import {useEffect, useState} from 'react'


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="app">
      {loading ? (
        <Loading />
        ) : (
          <>
            <Navbar />
            <Content/>
          </>
        )}
    </div>
  );
}

export default App;
