// React modules
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// actions
import { ShowModal } from '../../reducers/FeedReducer';

// models
import { FeedState } from '../../models/feed';
import { UserState } from '../../models/feed';

// Styles
import './Header.css';

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [cookies] = useCookies();
  const modal = useSelector((state: { FeedState: FeedState}) => state.FeedState.modal);
  const user = useSelector((state: { UserState: UserState}) => state.UserState.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const showMenu = () => {
    console.log("showMenu");
    setMenu(true);
  }

  const hideMenu = (event: any) => {
    if (event?.target.id === "menu-background") {
      setMenu(false);
    }
  }

  const handleAuth = () => {
    if (!cookies.csrftoken) {
      nav('/signin', {replace: true});
    } else {
      document.cookie = 'csrftoken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      localStorage.clear();
      window.location.replace('/');
    } 
    setMenu(false);
  }

  const showFeedForm = () => {
    console.log("showFeedForm");
    if (modal === false) {
      dispatch(ShowModal());
    }
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/">
            <img className="logo" src="header-logo.png" alt="logo2.png" />
          </Link>
        </div>
        <div className="nav-center"></div>
        <div className="nav-right">
          <span className="nav-item">
            <Link to="/">
              <img src="assets/icons/home-outlined.svg" alt="home.svg" />
            </Link>
          </span>
          <span className="nav-item" onClick={showFeedForm}>
            <img src="assets/icons/add-outlined.svg" alt="add.svg" />
          </span>
          <span className="nav-item">
            <img 
              className="nav-item-profile" 
              src={user.profile ? user.profile : 'profile.png'}
              alt={user.username}
              onClick={showMenu}
            />
            <div className="nav-menu">
              <div className={menu ? "nav-menu-container nav-menu-container-show" : "nav-menu-container nav-menu-container-hide"}>
                <div className="nav-menu-container-tail"></div>
                <div className="nav-menu-item-list">
                  <a className="icon-label-container" href="/:">
                    <img src="assets/icons/profile.svg" alt="profile.svg" />
                    <span className="icon-label">프로필</span>
                  </a>
                  <a className="icon-label-container" href="/setting">
                    <img src="assets/icons/setting.svg" alt="setting.svg" />
                    <span className="icon-label">설정</span>
                  </a>
                  <div className="icon-label-container nav-menu-logout" onClick={handleAuth}>
                    <span className="icon-label">{cookies.csrftoken ? "로그아웃": "로그인" }</span>
                  </div>
                </div>
              </div>
              
              <div id="menu-background" className={menu ? "nav-menu-background-show" : "nav-menu-background-hide"}  onClick={hideMenu}></div>
            </div>
          </span>
        </div>
      </div>
    </nav>
  );
}
export default Header;