import React, { FC, useState } from 'react';
import { auth, googleProvider } from '../../config/firebase-config';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';


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
    <div>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={handleSignOut}>Sign Out</button>
      
    </div>
  )
}

export default Auth;