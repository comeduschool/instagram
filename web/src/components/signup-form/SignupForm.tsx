// React modules
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, RegisterOptions } from 'react-hook-form';
import axios from 'axios';

const SignupForm = () => {
    const emailOpts: RegisterOptions = {
      required: true,
      pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    };
    const usernameOpts: RegisterOptions = {
      required: true,
      minLength: 6
    };
    const passwordOpts: RegisterOptions = {
      required: true,
      minLength: 6
    };

    const logo = "logo.png";

    // States
    const [errorMsg, setErrorMsg] = useState("");
    const {register, handleSubmit, formState: { isValid }} = useForm({ mode: 'onChange'});
    const nav = useNavigate();

    const submit = (data: any) => {
      axios.post('/users/signup', data)
        .then((resp)=>{
          console.log(resp);
          localStorage.setItem("userId", resp.data.pk);
          nav('/', {replace: true});
        })
        .catch((errors)=>{
          console.log(errors);
          let errorArray:string[] = [];
          Object.keys(errors.response.data).map((key)=>{
            errorArray = [...errorArray.concat(errors.response.data[key])];
            return null;
          });
          setErrorMsg(errorArray.join(" "));
        });
    }

    return (
      <form className="signup-form" onSubmit={handleSubmit(submit)}>
        <img className="form-logo" src={logo} alt="logo.png"/>
        <input className="form-input" type="text" placeholder="이메일" {...register("email", emailOpts)}/>
        <input className="form-input" type="text" placeholder="사용자이름" {...register("username", usernameOpts)}/>
        <input className="form-input" type="password" placeholder="비밀번호" {...register("password", passwordOpts)}/>
        <button className="form-btn form-btn-blue" type="submit" disabled={!isValid}>가입</button>
        { errorMsg !== "" && <div className="form-error">{errorMsg}</div> }
      </form>
    );
}

export default SignupForm;