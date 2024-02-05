import React, {FC} from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface useAuth0Props {
    logout: () => void;
    isAuthenticated: boolean;
}

const LogoutButton: FC = () => {
    const { logout, isAuthenticated} = useAuth0<useAuth0Props>();
  return (
    <div>
        { isAuthenticated ? (
                <button className="items-center justify-center flex gap-4 px-6 py-4 border border-solid border-[#eee] rounded-lg transition duration-500 ease hover:border-[#000]" onClick={() => logout()}>
                    Sign Out
                </button>
            ) : null
        }
    </div>
  );
}

export default LogoutButton;