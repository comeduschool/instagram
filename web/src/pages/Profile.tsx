// React modules
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// models
import { InitUser, UserState } from '../models/user';

// Components
import ProfileCard from '../components/profile-card/ProfileCard';

const Profile = () => {
  const [user, setUser] = useState(InitUser);
  const { username } = useParams();

  const currentUser = useSelector((state: { UserState: UserState})=> state.UserState.user);

  useEffect(()=>{
    if (username === currentUser.username) {
      setUser({...currentUser});
    }
  }, [currentUser]);

  return (
    <div className="horizontal-center">
      <ProfileCard user={user}/>
    </div>
  );
}
  
export default Profile;