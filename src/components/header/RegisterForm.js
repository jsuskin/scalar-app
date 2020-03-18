import React from 'react';

export default function RegisterForm({setShowRegister, handleRegister, pwConfirm, setPwConfirm, handleFormChange}) {
  return (
    <form onSubmit={e => handleRegister(e, pwConfirm)} id='register-form'>
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
      <input
        type='password'
        id='confirm-password'
        name='confirm-password'
        placeholder='Confirm Password'
        value={pwConfirm}
        onChange={e => setPwConfirm(e.target.value)}
      />
      <input type='submit' id='register-btn' value='Register' />
      <span id='login' onClick={() => setShowRegister(false)}>
        Sign In
      </span>
    </form>
  );
}
