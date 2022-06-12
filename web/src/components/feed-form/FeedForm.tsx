// react modules
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// external modules
import { useDropzone } from 'react-dropzone';

// actions
import { HideModal } from '../../reducers/FeedReducer';

// models
import { FeedState } from '../../models/feed';

// services
import { FeedService } from '../../services/FeedService';

// Components
import Slider from 'react-slick';

// Styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './FeedForm.css';

const FeedForm = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    // className: 'slider',
  };

  const [fileInputStyle, setFileInputStyle] = useState<string>("image-input image-input-default");
  const [files, setFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const modal = useSelector((state: { FeedState: FeedState})=>state.FeedState.modal);
  const { register, getValues } = useForm();
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log(files);
  }, [files]);

  const onDrop = (acceptedFiles: any) => {
    setFiles(acceptedFiles.map((file: File, index: number)=>{return {key: index, file: URL.createObjectURL(file), fileBlob: file}}));
  }

  const { getRootProps, getInputProps, inputRef } = useDropzone({onDrop, accept: {'image/*': []}});

  const hideModal = (event: any) => {
    if (event.target.id === "feed-form-modal") {
      dispatch(HideModal());
      setFiles([]);
    }
  }

  return (
    <div 
      id="feed-form-modal" 
      className={modal ? "feed-form-modal-container feed-form-modal-show" : "feed-form-modal-container feed-form-modal-hide"}
      onClick={hideModal}
    >
      {files.length === 0 &&
        <div className="image-selector-modal">
          <div className="feed-form-modal-title-container">
            <div className="feed-form-modal-title">
              <div className="feed-form-modal-title-side"></div>
              <div>새 게시물</div>
              <div className="feed-form-modal-title-side"></div>
            </div>
          </div>
          <div className="feed-form-modal-content-container">
            <div className="feed-form-image-selector">
              <div 
                className={fileInputStyle}
                onDragOver={()=>setFileInputStyle("image-input image-input-drag")}
                onDrag={()=>setFileInputStyle("image-input image-input-default")}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <span className="image-input-icon">
                  <img src="assets/icons/contents.svg" alt="content" />
                </span>
                <div className="image-input-text">사진을 여기다 끌어다 놓으세요.</div>
                <button 
                  className="image-input-btn"
                  onClick={()=>inputRef.current.click()}
                >
                  컴퓨터에서 선택
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      {files.length !== 0 &&
        <div className="feed-form-detail-modal">
          <div className="feed-form-modal-title-container">
            <div className="feed-form-modal-title">
              <div className="feed-form-modal-title-side" onClick={()=>setFiles([])}>이전</div>
              <div>새 게시물</div>
              <div className="feed-form-modal-title-side" onClick={()=>{}}>다음</div>
            </div>
          </div>
          <div className="feed-form-modal-content-container">
            <div className="feed-form-detail">
              <div className="feed-form-image-slider">
                <Slider {...settings}>
                  {
                    files.map((file: any)=>
                      <div key={file.key}>
                        <img className="feed-form-slide-image" src={file.file} alt="slide" />
                      </div>
                    )
                  }
                </Slider>
              </div>
              <div className="feed-form-description">
                <div className="feed-form-description-user">
                  <div className="feed-form-description-profile">
                    <img 
                      className="feed-form-description-profile-image" 
                      src="assets/test-profile.jpeg"
                      alt="profile"
                    />
                  </div>
                  <div className="feed-form-description-username">comedu</div>
                </div>
                <div className="feed-form-description-input-container">
                  <textarea className="feed-form-description-input" {...register("content", {})} placeholder="문구 입력..."></textarea>
                </div>
                {errorMsg !=="" && <div className="feed-form-description-error">{errorMsg}</div>}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default FeedForm;