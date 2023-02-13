import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';

function App(props) {
  return (
    <div>
      <div className="d-flex">
      <Sidebar/>
      <Header/>
      </div>
    </div>
  );
}

export default App;
