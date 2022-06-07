// React modules
import { useState } from 'react';
import { useForm, RegisterOptions } from 'react-hook-form';

// Assets
import LockIcon from '../../icons/lock.svg';

const PasswordForm = () => {
  const emailOpts: RegisterOptions = {
    required: true,
    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  };
  const codeOpts: RegisterOptions = {
    pattern: /^.{6}$/
  }
  const passwordOpts: RegisterOptions = {
    minLength: 6
  };

  const [current, setCurrent] = useState("email");
  const [btnLabel, setBtnLabel] = useState("인증코드 전송하기");
  const [errorMsg, setErrorMsg] = useState("");

  const { register, setValue, getValues, reset, formState: { errors, isDirty } } = useForm({ mode: 'onChange' });

  const handleInput = () => {
    let data = getValues();
    console.log(data);
    if (current === "email") {
      setValue('email', data.email, { shouldValidate: true, shouldDirty: true });
      console.log(errors);
      reset({...data}, {keepDirty: false});

      setCurrent("authcode");
      setBtnLabel("인증코드 확인하기");
    } else if (current ==="authcode") { 
      setValue('authcode', data.authcode, { shouldValidate: true, shouldDirty: true });
      console.log(errors);
      reset({...data}, {keepDirty: false});

      setCurrent("password");
      setBtnLabel("비밀번호 저장");
    } else if (current ==="password") { 
      setValue('password', data.password, { shouldValidate: true, shouldDirty: true });
      console.log(errors);
      reset({...data}, {keepDirty: false});
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
      { current === "email" &&
        <input className="form-input" type="text" placeholder="이메일" {...register("email", emailOpts)}></input> 
      }
      { current === "authcode" &&
        <input className="form-input" type="text" placeholder="인증코드" {...register("authcode", codeOpts)}></input>
      }
      { current === "password" &&
        <input className="form-input" type="password" placeholder="비밀번호" {...register("password", passwordOpts)}></input>
      }
      <button className="form-btn form-btn-blue" type="button" onClick={handleInput}>{btnLabel}</button>
      <a className="signup-link link-noline" href="/"><span className="form-password">새 계정 만들기</span></a>
      <button className="form-btn form-btn-bottom">로그인으로 돌아가기</button>
    </form>
  );
}

export default PasswordForm;