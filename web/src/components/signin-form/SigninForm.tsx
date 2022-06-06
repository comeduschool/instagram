const SigninForm = () =>{

  return (
    <form className="signin-form">
      <img className="form-logo" src="logo.png" alt="logo.png" />
      <input className="form-input" type="text" placeholder="이메일"/>
      <input className="form-input" type="password" placeholder="비밀번호"/>
      <button className="form-btn form-btn-blue" type="submit">로그인</button>
      <a className="password-link noline-link" href="/password">
        <span className="password-link-text">비밀번호를 잊으셨나요?</span>
      </a>
    </form>
  );
}

export default SigninForm;