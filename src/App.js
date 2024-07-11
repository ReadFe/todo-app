import './App.css';
import Content from './components/content';
import Navbar from './components/navbar';


const App = () => {
  return (
    <div className="app">
        <Navbar />
        <Content/>
    </div>
  );
}

export default App;
