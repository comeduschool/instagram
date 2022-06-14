// react modules
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// external modules
import axios from 'axios';

// models
import { FeedState } from '../../models/feed';

// services
import { FeedService } from '../../services/FeedService';

// Components
import Slider from 'react-slick';

// Styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeedItem = ({ feed }: any) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    // className: 'slider',
  };
  const [userId, setUserId] = useState(0);
  const [menuModalStyle, setMenuModalStyle] = useState(" feed-menu-modal-hide");
  const [formModalStyle, setFormModalStyle] = useState(" feed-form-modal-hide");
  const [errorMsg, setErrorMsg] = useState("");
  const { register, getValues } = useForm();
  const nav = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(()=>{
    let currentUserId = localStorage.getItem("userId");
    if (currentUserId !== null) {
      setUserId(+currentUserId);
    }
  }, []);

  const showMenuModal = () => {
    setMenuModalStyle(" feed-menu-modal-show");
  }

  const hideMenuModal1 = (event: any) => {
    if (event.target.id === "feed-menu-modal") {
      setMenuModalStyle(" feed-menu-modal-hide");
    }
  }

  const hideMenuModal2 = () => {
    setMenuModalStyle(" feed-menu-modal-hide");
  }

  const showFormModal = () => {
    setMenuModalStyle(" feed-menu-modal-hide");
    setFormModalStyle(" feed-form-modal-show");
  }

  const hideFormModal1 = (event: any) => {
    if (event.target.id === "feed-update-form-modal") {
      console.log("hideForModal1");
      setFormModalStyle(" feed-form-modal-hide");
    }
  }

  const hideFormModal2 = () => {
    console.log("hideForModal2");
    setFormModalStyle(" feed-form-modal-hide");
  }

  const deleteFeed = () => {
    axios.delete(`/feeds/${feed.pk}`)
      .then(()=>{
        setMenuModalStyle(" feed-menu-modal-hide");
        nav("/")
      });
  }

  const updateFeed = () => {
    const description = getValues('description');
    if (description === "") {
      setErrorMsg("내용을 입력해 주세요.")
    } else {
      const data = {pk: feed.pk, description};
      dispatch<any>(FeedService.update(data))
        .unwrap()
        .then(()=>{
          dispatch<any>(FeedService.list());
          setFormModalStyle(" feed-form-modal-hide");
          nav('/');
        })
        .catch((error: any)=>{
          setErrorMsg(error);
        });
    }
  }

  return (
    <div key={feed.pk}>
      <div className="feed">
        <div className="feed-header">
          <div className="feed-header-content">
            <div className="feed-header-profile-containter">
              <img className="feed-header-profile" src={feed.user.profile ? feed.user.profile : 'profile.png'} alt={feed.user.username} />
              <p className="feed-header-username">{feed.user.username}</p>
            </div>
            { feed.user.pk === userId &&
              <img src="assets/icons/more.svg" alt="more icon" onClick={showMenuModal} />
            }
          </div>
        </div>
        <div className="feed-content-image">
          <Slider {...settings}>
            {
              feed.images.map((image: string)=><div key={image}><img className="feed-image" src={image} alt=""/></div>)
            }
          </Slider>
        </div>
        <div className="feed-content">
          <div className="feed-content-icons">
            <span className="feed-content-icon">
              <img src="assets/icons/favorite-outlined.svg" alt="favorite icon"/>
            </span>
            <span className="feed-content-icon">
              <img src="assets/icons/reply-outlined.svg" alt="comment icon"/>
            </span>
            <span className="feed-content-icon">
              <img src="assets/icons/send-outlined.svg" alt="message icon"/>
            </span>
            <span className="feed-content-icon-left">
              <img src="assets/icons/saved-outlined.svg" alt="save icon"/>
            </span>    
          </div>
          <p className="feed-favorites">좋아요 {feed.like} 개</p>
          <p className="feed-description"><span className="feed-username">{feed.user.username}</span>{feed.description}</p>

          <p className="feed-replies">댓글 7,519개 모두보기</p>

          <p className="feed-description"><span className="feed-username">comedu</span> hello this is the feed I made.</p>
          <p className="feed-description"><span className="feed-username">comedu</span> hello this is the feed I made.</p>
          <p className="feed-time">2분 전</p>
        </div>
        <div className="feed-comment-input-container">
          <span className="feed-comment-icon">
            <img src="assets/icons/smile.svg" alt="emoticon icon" />
          </span>
          <input className="feed-comment-input" type="text" placeholder="댓글 달기..." />
          <button className="feed-comment-btn">게시</button>
        </div>
        <div id="feed-menu-modal" className={"feed-modal-container" + menuModalStyle} onClick={hideMenuModal1}>
          <div className="feed-modal">
            <div className="feed-modal-title-container">
              <div className="feed-modal-title">
                <div>프로필 사진 바꾸기</div>
              </div>
            </div>
            <div className="feed-modal-content-container">
              <button className="feed-modal-button feed-modal-button-red" onClick={deleteFeed}>
                <div>삭제</div>
              </button>
              <button className="feed-modal-button" onClick={showFormModal}>
                <div>수정</div>
              </button>
              <button className="feed-modal-bottom-button" onClick={hideMenuModal2}>
                <div>취소</div>
              </button>
            </div>
          </div>
        </div>
        <div 
          id="feed-update-form-modal" 
          className={"feed-form-modal-container " + formModalStyle}
          onClick={hideFormModal1}
        >
          <div className="feed-form-detail-modal">
            <div className="feed-form-modal-title-container">
              <div className="feed-form-modal-title">
                <div className="feed-form-modal-title-side" onClick={hideFormModal2}>취소</div>
                <div>새 게시물</div>
                <div className="feed-form-modal-title-side" onClick={updateFeed}>완료</div>
              </div>
            </div>
            <div className="feed-form-modal-content-container">
              <div className="feed-form-detail">
                <div className="feed-form-image-slider">
                  <Slider {...settings}>
                    {
                      feed.images.map((image: string)=>
                        <div key={image}>
                          <img className="feed-form-slide-image" src={image} alt="slide" />
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
                        src={feed.user.profile ? feed.user.profile : 'profile.png'}
                        alt="profile"
                      />
                    </div>
                    <div className="feed-form-description-username">{feed.user.username}</div>
                  </div>
                  <div className="feed-form-description-input-container">
                    <textarea className="feed-form-description-input" {...register("description", {})} placeholder="문구 입력..." defaultValue={feed.description}></textarea>
                  </div>
                  {errorMsg !=="" && <div className="feed-form-description-error">{errorMsg}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedItem;