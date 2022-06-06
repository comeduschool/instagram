// Components
import SigninForm from "../components/signin-form/SigninForm";

const Signin = () => {
    return (
      <div className="center">
        <SigninForm />
        <div className="center-item">
          계정이 없으신가요? <a className="signup-link noline-link" href="/signup">가입하기</a>
        </div>
      </div>
    );
  }
  
  export default Signin