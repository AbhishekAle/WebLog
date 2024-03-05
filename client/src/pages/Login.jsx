import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className='login-cont'>
      <div className='form-cont'>
        <form>
          <label>Username</label>
          <input type='text' required />
          <label>Password</label>
          <input type='text' required />
          <button>Login</button>
        </form>
        <p>
          Don't have account? a<span>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
