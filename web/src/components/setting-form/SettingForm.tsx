// react modules
import { useState, useEffect } from 'react';
import { useForm, RegisterOptions } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";

// Services
import { UserService } from '../../services/UserService';

// Models
import { UserState } from '../../models/user';

// Styles
import './SettingForm.css';

const SettingForm = () => {
  const passwordOpts: RegisterOptions = {
    minLength: 6
  };

  const [modal, setModal] = useState(" modal-hide");
  const { register, getValues, formState: { errors } } = useForm({ mode: 'onChange' });

  const { user } = useSelector((state: { user: UserState })=> state.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    dispatch<any>(UserService.retrieve(userId));
  }, []);

  const showModal = () => {
    setModal(" modal-show");
  }

  const modalHide = (event: any) => {
    if (event.target.id === "modal") {
      setModal(" modal-hide");
    }
  }

  const updateProfile = () => {
    const [username, description] = getValues(["username", "description"])
    let userData: any = {pk: user.pk};
    if (username !== "") {
      userData = {...userData, username};
    }
    if (description !== "") {
      userData = {...userData, description};
    }
    
    dispatch<any>(UserService.update(userData));
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
            <input className="profile-input" placeholder="이메일" defaultValue={user.email} disabled></input>
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            사용자 이름
          </div>
          <div className="profile-input-data">
            <input className="profile-input" type="text" placeholder="사용자 이름" defaultValue={user?.username ? user.username : ''} {...register("username")}></input>
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            소개
          </div>
          <div className="profile-input-data">
            <textarea className="profile-input profile-textarea" rows={4} cols={50} defaultValue={user?.description} {...register("description")}></textarea>
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label"></div>
          <button className="profile-input-button" onClick={updateProfile}>제출</button>
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