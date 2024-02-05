import React, { FC, useState } from 'react';
import { auth, googleProvider } from '../../config/firebase-config';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import Ggl from '../../assets/google.png';

const Auth: FC = () => {

  //State Management
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //Sign In Function
  const handleSignIn = async () => {
    try{
      await createUserWithEmailAndPassword(auth, email, password)
    }
    catch (err) {
      console.log(console.error(err))
    }
    
  };

  //Sign In With Google Function
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch(err) {
      console.error(err)
    }
  }

  //Sign Out Function
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch(err) {
      console.error(err);
    }
  }
  return (
    <div className="h-full mt-[200px] w-full flex flex-col items-center justify-center gap-[25px]">
      <div onClick={signInWithGoogle} className="w-[350px] px-6 py-4 border-2 border-solid border-[#eee] flex items-center justify-center gap-3 transition duration-500 ease hover:border-black hover:cursor-pointer">
        <img className="w-[40px] h-[40px] object-cover" src={Ggl} alt=""/>
        <div className="text-[1.5rem] h-full flex items-center justify-center">Sign in with Google</div>
      </div>
      <div className="text-[1.3rem]">Or</div>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="text-[1.3rem] mb-[10px]">Sign in with Email</div>
      <input className="w-[350px] mb-[15px]" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="w-[350px] mb-[15px]" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-[#081542] px-6 py-2 text-white rounded-[5px] mb-[25px] text-[1.3rem] transition duration-300 ease-in-out border border-solid border-[#081542] hover:bg-[#102674]" onClick={handleSignIn}>Sign In</button>
      </div>
      <button className="underline text-[1.3rem]" onClick={handleSignOut}>Sign Out</button>
      
    </div>
  )
}

export default Auth;