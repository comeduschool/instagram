// React modules
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

// Styles
import './Header.css';

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [cookies] = useCookies();
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
          <span className="nav-item">
            <img src="assets/icons/add-outlined.svg" alt="add.svg" />
          </span>
          <span className="nav-item">
            <img 
              className="nav-item-profile" 
              src="data:image/jpeg;base64,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" 
              alt="profile" 
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