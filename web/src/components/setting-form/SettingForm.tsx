// react modules
import { useState, useEffect } from 'react';

// External modules
import axios, { AxiosError } from 'axios'

// Styles
import './SettingForm.css';

const SettingForm = () => {
  const [modal, setModal] = useState(" modal-hide");
  const [user, setUser] = useState({
    username: '',
    email: '',
    description: '',
    profile: null
  });

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    console.log(userId);
    axios.get(`/users/${userId}`)
      .then((resp)=>{
        console.log(resp);
        setUser(resp.data);
      })
      .catch((error)=>{});
  }, []);

  const showModal = () => {
    setModal(" modal-show");
  }

  const modalHide = (event: any) => {
    if (event.target.id === "modal") {
      setModal(" modal-hide");
    }
  }

  return (
    <div>
      <div className="profile-form">
        <div className="profile-header-container">
          <img className="profile-header-img" src={user.profile ? user.profile : 'profile.png'} alt="img" />
          <div className="profile-header-username">
            <h1 className="profile-header-username-text">
              { user.username }
            </h1>
            <button className="profile-header-username-btn" onClick={showModal}>프로필 사진 바꾸기</button>
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            이메일
          </div>
          <div className="profile-input-data">
            <input className="profile-input" placeholder="이메일" value={user.email} disabled></input>
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            사용자 이름
          </div>
          <div className="profile-input-data">
            <input className="profile-input" placeholder="사용자 이름" value={user.username}></input>
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            소개
          </div>
          <div className="profile-input-data">
            <textarea className="profile-input profile-textarea" rows={4} cols={50} value={user.description}></textarea>
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label"></div>
          <div className="profile-input-button">제출</div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            이전 비밀번호
          </div>
          <div className="profile-input-data">
            <input className="profile-input" />
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            새 비밀번호
          </div>
          <div className="profile-input-data">
            <input className="profile-input" />
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            새 비밀번호 확인
          </div>
          <div className="profile-input-data">
            <input className="profile-input" />
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label"></div>
          <div className="profile-input-button">비밀번호 변경</div>
        </div>
      </div>
      <div id="modal" className={"profile-modal-container" + modal} onClick={modalHide}>
        <div className="profile-modal">
          <div className="profile-modal-title-container">
            <div className="profile-modal-title">
              <div>프로필 사진 바꾸기</div>
            </div>
          </div>
          <div className="profile-modal-content-container">
            <div className="profile-modal-button profile-modal-button-blue">
              <div>사진 업로드</div>
            </div>
            <div className="profile-modal-button profile-modal-button-red">
              <div>현재 사진 삭제</div>
            </div>
            <div className="profile-modal-bottom-button">
              <div>취소</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingForm;