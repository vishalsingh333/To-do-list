import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Lists from './components/Lists';

function App() {
  return (
    <div className="h-screen w-screen bg-blue-100 flex flex-col">
      <Navbar/>
      <Lists/>
    </div>
  );
}

export default App;
