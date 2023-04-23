
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Mainpage from './components/Mainpage';
import LoginPageCustomer from './components/LoginPageCustomer';
function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <Router>
        <Routes>
          <Route exact path = "/" element={<Mainpage/>} ></Route>
          <Route exact path = "/customer/login" element={<LoginPageCustomer/>} ></Route>
          </Routes>
          </Router>
    </div>
  );
}

export default App;
