import React from 'react'

export default function SignInForm({handleSignIn, handleFormChange, setShowRegister}) {
  return (
    <form onSubmit={handleSignIn} id='sign-in-form'>
      <input
        type='text'
        id='username'
        name='username'
        placeholder='Username'
        onChange={handleFormChange}
      />
      <input
        type='password'
        id='password'
        name='password'
        placeholder='Password'
        onChange={handleFormChange}
      />
      <input type='submit' id='log-in-btn' value='Log In' />
      <span id='register' onClick={() => setShowRegister(true)}>
        Register an Account
      </span>
    </form>
  );
}
