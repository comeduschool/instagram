// React modules
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Components
import SigninForm from "../components/signin-form/SigninForm";

const Signin = () => {
  const [cookies] = useCookies();
  const nav = useNavigate();

  useEffect(()=>{
    if (cookies.csrftoken) {
      nav('/', {replace: true});
    }
  })

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