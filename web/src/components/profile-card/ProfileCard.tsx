// react modules
import { useNavigate } from 'react-router-dom';

// Styles
import './ProfileCard.css';

const ProfileCard = ({ user }) => {
  const nav = useNavigate();

  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src={user.profile ? user.profile : "profile.png"} alt="profile" />
      </div>
      <div className="profile-user-settings">
        <h1 className="profile-user-name">{user.username}</h1>
        <button className="btn profile-edit-btn">프로필 편집</button>
        <button className="btn profile-settings-btn" onClick={()=>nav('/setting')}>
          <img src="assets/icons/setting.svg" alt="" />
        </button>
      </div>
      <div className="profile-stats">
        <ul>
          <li><span className="profile-stat-count">164</span> posts</li>
          <li><span className="profile-stat-count">0</span> followers</li>
          <li><span className="profile-stat-count">0</span> following</li>
        </ul>
      </div>
      <div className="profile-bio">
        <p><span className="profile-real-name">{user.username}</span>{user.description}</p>
      </div>
    </div>
  );
}

export default ProfileCard;