import React, { createContext, useState } from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
const onSuccessCallback = (credentialResponse) => {
  console.log(credentialResponse);
};
const LoginDialog = () => {
  const navigate = useNavigate()
  const handleLoginSuccess = (res) => {
    navigate("/Home")
    console.log(res.credential);
    const decodedCredential = jwt_decode(res.credential);
    console.log(decodedCredential);
  
    // Handle the successful login here, e.g., redirect to another page or store the user credentials.
  };

  const handleLoginError = () => {
    console.log('Login Failed');
    // Handle login error here, if necessary.
  };
  return (
    <div className='login'>
      <div className='logindiv'>
      <h1>Login</h1>
        <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
      </div>
    </div>
  )
}

export default LoginDialog;
