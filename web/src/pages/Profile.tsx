// React modules
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams();

  useEffect(()=>{
    console.log(username);
  });

  return (
    <div className="center">
      <div>Profile</div>
    </div>
  );
}
  
export default Profile;