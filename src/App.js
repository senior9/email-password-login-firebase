import './App.css';

import { useState } from 'react';
import  intializeAuthentication from './firebase.inatialize';
import {getAuth,createUserWithEmailAndPassword } from 'firebase/auth'

intializeAuthentication();
const auth = getAuth();
function App() {
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [error,setError] =useState('');
  const handleRegistation = (e) => {
    e.preventDefault();
    if(!/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/.test(password)){
      setError('Password must be between 6  characters and contain one uppercase letter, one lowercase letter, one digit and one special character.');
      return;
    }
    createUserWithEmailAndPassword(auth,email,password)
    .then(result=>{
      const user=result.user;
      console.log(user);
      setError('');
    })
    .catch(error=>{
      setError(error.message);
    })
    console.log(email,password);

  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePassChange = (e) => {
    setPassword(e.target.value)
  }
  

  return (
    <div className="mx-5 mt-5 container">
      <h2 className="text-primary">Register Please Register Your Account Fast</h2>
      <form onSubmit={handleRegistation}>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input onBlur={handlePassChange} type="password" className="form-control" id="inputPassword3" required />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Example checkbox
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-3 text-danger"> {error}</div>
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>


    </div>
  );
}

export default App;
