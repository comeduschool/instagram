// react modules
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


import SettingForm from "../components/setting-form/SettingForm";

const Setting = () => {
  const [cookies] = useCookies();
  const nav = useNavigate();
  
  useEffect(()=>{
    if (!cookies.csrftoken) {
      nav('/signin', {replace: true});
    }
  }, []);
  
  return (
    <div className="center">
      <SettingForm />
    </div>
    );
  }
  
  export default Setting