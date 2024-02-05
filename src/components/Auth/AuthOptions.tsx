import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Auth0 from '../../assets/auth0.png';
import Firebase from '../../assets/firebase.png';

const AuthOptions: FC = () => {
  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
        <div className="flex gap-10 items-center justify-center">
        <Link to="/sign-in-with-firebase">
        <button className="flex gap-4 items-center justify-center px-6 py-4 border border-solid border-[#eee] rounded-lg transition duration-500 ease hover:border-[#000]">
        <img className="w-[30px] h-[30px] " src={Firebase} alt="" /> <div>Sign in with Firebase</div>
        </button>
        </Link>
        <h2>Or</h2>
        <Link to="/sign-in-with-auth0">
        <button className="items-center justify-center flex gap-4 px-6 py-4 border border-solid border-[#eee] rounded-lg transition duration-500 ease hover:border-[#000]">
        <img className="w-[30px] h-[30px] " src={Auth0} alt="" /> <div>Sign in with Auth0</div>
        </button>
        </Link>
        </div>
    </div>
  )
}

export default AuthOptions;