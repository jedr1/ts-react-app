import React, { createContext, FC } from 'react';


/* Not Used */



interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  }
  const initialUser: User | null = null;

  const AuthContext = createContext<User | undefined>(undefined);

export const AuthContextProvider: FC = () => {
  return (
    <div>AuthContext</div>
  )
}

export default AuthContext