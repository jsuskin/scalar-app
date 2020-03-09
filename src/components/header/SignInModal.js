import React from 'react';

export default function SignInModal({ showModal, handleSignIn, handleFormChange }) {
  return (
    <div className={`sign-in-modal${showModal ? " show-modal" : ""}`}>
      <form onSubmit={handleSignIn}>
        <input
          type='text'
          id='username'
          name='username'
          placeholder='username'
          onChange={handleFormChange}
        />
        <input
          type='password'
          id='password'
          name='password'
          placeholder='password'
          onChange={handleFormChange}
        />
        <input type='submit' id='log-in-btn' value='Log In' />
        <span>Register an Account</span>
      </form>
    </div>
  );
}
