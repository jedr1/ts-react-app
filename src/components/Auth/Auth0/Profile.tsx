import React, {FC} from 'react';
import { useAuth0, User } from '@auth0/auth0-react';

interface UserInfo {
    picture: string;
    name: string;
}
interface useAuth0Props {
    isAuthenticated: boolean;
    user: User | null;
}

const Profile: FC = () => {
    const { user, isAuthenticated} = useAuth0();
  return (
    <div>
        { isAuthenticated && user ? (
                <div>
                    {user?.picture && <img src={user?.picture} alt={user?.name} />}
                    <h2>{user?.name}</h2>
                    <ul>
                        {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]}</li>)}
                    </ul>
                </div>
            ) : null
        }
    </div>
  );
}

export default Profile;