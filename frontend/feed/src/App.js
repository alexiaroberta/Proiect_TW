import './App.css';
import { Routes,Route,Link,Outlet,NavLink } from 'react-router-dom';
import Autentificare from './pages/Autentificare';
import Profesor from './pages/Profesor';
import Student from './pages/Student';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Autentificare />} />
        <Route path="/Autentificare" element ={<Autentificare/>}></Route>
        <Route path="/Student" element ={<Student/>}></Route>
        <Route path="/Profesor" element ={<Profesor/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
