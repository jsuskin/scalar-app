import React from 'react';

function UserAccessOptions(props) {
  return (
    <span className={`user-access-options${props.loggedIn ? ' logged-in' : ''}`}>
      {
        props.loggedIn ? (
          <>
            <span>Favorites</span>
            <span>Groups</span>
            <span onClick={props.handleLogOut}>Sign Out</span>
          </>
        ) : (
          <>
            <span onClick={props.handleLogIn}>Sign In</span>
          </>
        )
      }
    </span>
  );
}

export default UserAccessOptions;
