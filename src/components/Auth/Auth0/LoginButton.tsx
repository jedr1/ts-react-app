import React, {FC} from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface useAuth0Props {
    loginWithRedirect: () => void;
    isAuthenticated: boolean;
}

const LoginButton: FC = () => {
    const { loginWithRedirect, isAuthenticated} = useAuth0<useAuth0Props>();
  return (
    <div>
        { !isAuthenticated ? (
                <button className="items-center justify-center flex gap-4 px-6 py-4 border border-solid border-[#eee] rounded-lg transition duration-500 ease hover:border-[#000]" onClick={() => loginWithRedirect()}>
                    Sign In
                </button>
            ) : null
        }
    </div>
  );
}

export default LoginButton;