
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Mainpage from './components/Mainpage';
import LoginPageCustomer from './components/LoginPageCustomer';
import SignupPageCustomer from './components/SignupPageCustomer';
import LoginPageSeller from './components/loginPageSeller';
import SignupPageSeller from './components/SignupPageSeller';
function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <Router>
        <Routes>
          <Route exact path = "/" element={<Mainpage/>} ></Route>
          <Route exact path = "/customer/login" element={<LoginPageCustomer/>} ></Route>
          <Route exact path = "/customer/signup" element={<SignupPageCustomer/>} ></Route>
         <Route exact path = "/seller/login" element={<LoginPageSeller/>} ></Route>
         <Route exact path = "/seller/signup" element={<SignupPageSeller/>} ></Route>

          </Routes>
          </Router>
    </div>
  );
}

export default App;
