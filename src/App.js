import './App.css';

import { useState } from 'react';
import intializeAuthentication from './firebase.inatialize';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from 'firebase/auth'

intializeAuthentication();
const auth = getAuth();
function App() {
  const [nameChange,setNameChange] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignIn, setIssignIn] = useState(false);

  const createNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('');
      })
      .catch(error => {
        setError(error.message);
      })
    console.log(email, password);
  }

  const handleRegistation = (e) => {
    e.preventDefault();
    if (!/^[A-Za-z]\w{6,15}$/.test(password)) {
      setError('Password must be between 6  characters and contain one uppercase letter, one lowercase letter, one digit and one special character.');
      return;
    }

    if (isSignIn) {
      processLogIn(email, password);
    }
    else {
      createNewUser(email, password);
    }


  }
  const processLogIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user
        console.log(user);
        verifyEmail();
        updateName();
      })
      .catch(error => {
        setError(error.message)
      })
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(err => {
        setError(err.message);
      })
  }

  const toggleSignIn = (e) => {
    setIssignIn(e.target.checked);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePassChange = (e) => {
    setPassword(e.target.value)
  }

  const handleNameChange=(e)=>{
      setNameChange(e.target.value);
  }

  const resetButton=()=>{
    sendPasswordResetEmail(auth,email)
    .then(result=>{
      
    })
    .catch(err=>{
      setError(err.message)
    })
  }

  const updateName=()=>{
    updateProfile(auth.currentUser, {displayName:nameChange})
    .then(result=>{

    })
    // .catch(err=>{
    //   setError(err.message)
    // })
  }


  return (
    <div className="mx-5 mt-5 container">
      <h2 className="text-primary"> Please {isSignIn ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleRegistation}>

      {!isSignIn && <div className="row mb-3">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input onBlur={handleNameChange} id='inputName' type="name" className="form-control" required />
          </div>
        </div>}

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
              <input onChange={toggleSignIn} className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Already Register?
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-3 text-danger"> {error}</div>
        <button type="submit" className="btn btn-primary">{isSignIn ? 'Log In' : 'Sign Up'}</button>
        <button type="reset" onClick={resetButton} className='btn btn-danger'>Pssword Reset</button>
      </form>


    </div>
  );
}

export default App;
