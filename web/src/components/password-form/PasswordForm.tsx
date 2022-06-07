// React modules
import { useState } from 'react';

// Assets
import LockIcon from '../../icons/lock.svg';

const PasswordForm = () => {
  const [current, setCurrent] = useState("email");
  const [btnLabel, setBtnLabel] = useState("인증코드 전송하기");

  const handleInput = () => {
    if (current === "email") {
      setCurrent("authcode");
      setBtnLabel("인증코드 확인하기");
    } else if (current ==="authcode") { 
      setCurrent("password");
      setBtnLabel("비밀번호 저장");
    } else if (current ==="password") { 
    }

  }

  return (
    <form className="password-form">
      <img className="form-content-icon" src={LockIcon} alt=""/>
      <div className="form-content-title">
        로그인에 문제가 있나요?
      </div>
      <div className="form-content-subtitle">
        이메일 주소를 입력하시면 계정에 다시 액세스할 수 있는 인증코드를 보내드립니다.
      </div>
      <input className="form-input" type="text" placeholder="이메일"></input> 
      <button className="form-btn form-btn-blue" type="button" onClick={handleInput}>{btnLabel}</button>
      <a className="signup-link link-noline" href="/"><span className="form-password">새 계정 만들기</span></a>
      <button className="form-btn form-btn-bottom">로그인으로 돌아가기</button>
    </form>
  );
}

export default PasswordForm;