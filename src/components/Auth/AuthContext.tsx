import React, { createContext, FC } from 'react';

interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    // Add other properties as needed
  }
  const initialUser: User | null = null;

  const AuthContext = createContext<User | undefined>(undefined);

export const AuthContextProvider: FC = () => {
  return (
    <div>AuthContext</div>
  )
}

export default AuthContext