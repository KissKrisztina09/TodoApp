import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Login from './components/login'
import SignUp from './components/signUp';
import UserDetails from './components/userDetails';

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='auth-wrapper'>
          <div className='auth-inner'>
            <Routes>
              <Route exact path="/" element = {<Login />} />
              <Route path="/sign-in" element ={<Login/>} />
              <Route path="/sign-up" element={<SignUp/>}/>
              <Route path="/userDetails" element={<UserDetails/>}/>
            </Routes>

          </div>

        </div>

      </div>

    </Router>
  );
}

export default App;
