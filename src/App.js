
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ProSidebarProvider } from 'react-pro-sidebar';
import Mainpage from './components/Mainpage';
import LoginPageCustomer from './components/LoginPageCustomer';
import SignupPageCustomer from './components/SignupPageCustomer';
import LoginPageSeller from './components/loginPageSeller';
import SignupPageSeller from './components/SignupPageSeller';
import CustomerDashboard from './components/Dashboard';
import Cart from './components/Cart';
function App() {
  return (
    <ProSidebarProvider>
    <div className="App">
        <Navbar></Navbar>
        <Router>
        <Routes>
          <Route exact path = "/" element={<Mainpage/>} ></Route>
          <Route exact path = "/customer/login" element={<LoginPageCustomer/>} ></Route>
          <Route exact path = "/customer/signup" element={<SignupPageCustomer/>} ></Route>
          <Route exact path = "/cart" element={<Cart/>} ></Route>
          
          <Route exact path = "/customer/dashboard" element={<CustomerDashboard/>} ></Route>
         <Route exact path = "/seller/login" element={<LoginPageSeller/>} ></Route>
         <Route exact path = "/seller/signup" element={<SignupPageSeller/>} ></Route>

          </Routes>
          </Router>
    </div>
    </ProSidebarProvider>
  );
}

export default App;
