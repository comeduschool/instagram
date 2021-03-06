// react modules
import { useState, useEffect } from 'react';
import { useForm, RegisterOptions } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";

// external modules
import { useDropzone } from 'react-dropzone';

// Services
import { UserService } from '../../services/UserService';

// Models
import { UserState } from '../../models/user';

// Actions
import { UpdateUser } from '../../reducers/UserReducer';

// Styles
import './SettingForm.css';
import axios from 'axios';

const SettingForm = () => {
  const passwordOpts: RegisterOptions = {
    minLength: 6
  };

  const [modal, setModal] = useState(" profile-modal-hide");
  const [errorMsg, setErrorMsg] = useState("");
  const { register, setValue, getValues, formState: { errors } } = useForm({ mode: 'onChange' });
  const user = useSelector((state: { UserState: UserState })=> state.UserState.user);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    dispatch<any>(UserService.retrieve(userId));
  }, []);

  const showModal = () => {
    setModal(" profile-modal-show");
  }

  const hideModal = (event: any) => {
    if (event.target.id === "modal") {
      setModal(" profile-modal-hide");
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

  const change_password = () => {
    const [password, new_password, check_password] = getValues(['password', 'new_password', 'check_password']);
    setValue("password", password, { shouldValidate: true, shouldDirty: true});
    setValue("new_password", new_password, { shouldValidate: true, shouldDirty: true});
    setValue("check_password", check_password, { shouldValidate: true, shouldDirty: true});
    if (errors.password === undefined && 
        errors.new_password === undefined &&
        errors.check_password === undefined) {
      if (new_password === check_password) {
        let userData: any = {password, new_password};
        axios.put(`/users/${user.pk}/password`, userData)
          .then((resp)=>{
            setErrorMsg("");
          })
          .catch((error)=>{
            let e = "";
            Object.keys(error.response.data).map((key)=>{
              e = error.response.data[key]
              return null;
            });
            setErrorMsg(e);
          });
      } else {
        setErrorMsg("??????????????? ??????????????????.")
      }
    }
  }
  
  const onDrop = (files: any) => {
    const formData = new FormData();
    formData.append('file', files[0]);
    axios.patch(`users/${user.pk}/profile`, formData)
      .then((resp)=>{
        dispatch<any>(UpdateUser(resp.data));
        setErrorMsg("");
        setModal(" profile-modal-hide");
      })
      .catch((error)=>{
        setErrorMsg(error.response.data.message);
        setModal(" profile-modal-hide");
      });
  }

  const { open } = useDropzone({
    onDrop,
    accept: {'image/*': []}, 
    multiple: false, 
    noClick:true
  });

  const openFileSelector = () => {
    open();
  }

  const uploadFile = (event: any) => {
    console.log(event);
    if (event.target.value !== '') {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      axios.patch(`users/${user.pk}/profile`, formData)
        .then((resp)=>{
          dispatch<any>(UpdateUser(resp.data));
          setErrorMsg("");
          setModal(" profile-modal-hide");
        })
        .catch((error)=>{
          setErrorMsg(error.response.data.message);
          setModal(" profile-modal-hide");
        })
    }
  }
  

  const deleteFile = () => {
    axios.delete(`users/${user.pk}/profile`)
      .then((resp)=>{
        dispatch<any>(UpdateUser(resp.data));
        setErrorMsg("");
        setModal(" modal-hide");
      })
      .catch((error)=>{
        setErrorMsg(error.response.data.message);
        setModal(" modal-hide");
      })
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
            <button className="profile-header-username-btn" onClick={showModal}>????????? ?????? ?????????</button>
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            ?????????
          </div>
          <div className="profile-input-data">
            <input className="profile-input" placeholder="?????????" defaultValue={user.email} disabled></input>
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            ????????? ??????
          </div>
          <div className="profile-input-data">
            <input className="profile-input" type="text" placeholder="????????? ??????" defaultValue={user?.username ? user.username : ''} {...register("username")}></input>
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            ??????
          </div>
          <div className="profile-input-data">
            <textarea className="profile-input profile-textarea" rows={4} cols={50} defaultValue={user?.description} {...register("description")}></textarea>
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label"></div>
          <button className="profile-input-button" onClick={updateProfile}>??????</button>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            ?????? ????????????
          </div>
          <div className="profile-input-data">
            <input className="profile-input" type="password" {...register('password', passwordOpts)} />
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            ??? ????????????
          </div>
          <div className="profile-input-data">
            <input className="profile-input" type="password" {...register('new_password', passwordOpts)} />
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            ??? ???????????? ??????
          </div>
          <div className="profile-input-data">
            <input className="profile-input" type="password" {...register('check_password', passwordOpts)} />
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label"></div>
          <button className="profile-input-button" onClick={change_password}>???????????? ??????</button>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
          </div>
          <div className="profile-input-data">
            {errorMsg !=="" && <div className="profile-form-error">{errorMsg}</div>}
          </div>
        </div>
      </div>

      <div id="modal" className={"profile-modal-container" + modal} onClick={hideModal}>
        <div className="profile-modal">
          <div className="profile-modal-title-container">
            <div className="profile-modal-title">
              <div>????????? ?????? ?????????</div>
            </div>
          </div>
          <div className="profile-modal-content-container">
            <button className="profile-modal-button profile-modal-button-blue" onClick={openFileSelector}>
              <div>?????? ?????????</div>
            </button>
            <button className="profile-modal-button profile-modal-button-red" disabled={user.profile ? false : true} onClick={deleteFile}>
              <div>?????? ?????? ??????</div>
            </button>
            <button className="profile-modal-bottom-button">
              <div>??????</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingForm;