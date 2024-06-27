import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/Login'
import SignUp from './components/SignUp';
import UserDetails from './components/UserDetails';

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
