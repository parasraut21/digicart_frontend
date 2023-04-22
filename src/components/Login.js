import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

function Login(props) {
  const [alert, setalert] = useState(null);
  
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setalert(null);
    }, 3000);
  };


  const [credentials, setCredentials] = useState({ email: '', cpassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, cpassword: credentials.cpassword }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('userEmail', credentials.email);
      console.log(credentials.email);
      localStorage.setItem('token', json.token);
      navigate('/');
     showAlert("Successfully Loged in","success")
    } else {
      navigate('/login');
     showAlert("Please Login With Correct Credentials","danger")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const forgotPassword = () => {
   navigate("/reset")
  };

  const signUp = () => {
    navigate('/signup');
  };

  return (
    <>
    <Alert alert={alert}/>
      <div className='container mt-3'>
        <h2>Log in - To continue Digicart</h2>
        <form onSubmit={handleSubmit} className='my-5'>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email address
            </label>
            <input type='email' className='form-control' value={credentials.email} onChange={onChange} id='email' name='email' aria-describedby='emailHelp' required />
            <div id='emailHelp' className='form-text'>
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input type='password' className='form-control' value={credentials.cpassword} onChange={onChange} name='cpassword' id='cpassword' required />
          </div>

          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
        <div className='row'>
          <div className='col-6'>
            <button onClick={forgotPassword} type='submit' className='btn btn-danger'>
              Forgot password?
            </button>
          </div>
          <div className='col-6 text-end'>
            <button onClick={signUp} type='submit' className='btn btn-warning'>
              Are you new to Digicart? Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;