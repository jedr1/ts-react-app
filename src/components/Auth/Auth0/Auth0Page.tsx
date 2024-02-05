import React, { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';

const Auth0Page: FC = () => {
    const {isLoading, error} = useAuth0();
  return (
    <div className="h-[100vh] w-full flex flex-col items-center justify-center">
      <h1 className="text-[1.5rem] mb-[25px]">Auth0 Login</h1>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
        <LoginButton />
        <LogoutButton />
        <Profile />
        </>
      )}
    </div>
  )
}

export default Auth0Page