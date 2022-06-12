
// react modules
import { useEffect } from 'react';

// models;
import { Feed } from '../../models/feed';

// Components
import Slider from 'react-slick';

const FeedItem = ({ feed }: any) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    // className: 'slider',
  };

  useEffect(()=>{
    console.log(feed);
  }, []);

  return (
    <div className="feed">
      <div className="feed-header">
        <div className="feed-header-content">
          <div className="feed-header-profile-containter">
            <img className="feed-header-profile" src={feed.user.profile ? feed.user.profile : 'profile.png'} alt={feed.user.username} />
            <p className="feed-header-username">{feed.user.username}</p>
          </div>
          <img src="assets/icons/more.svg" alt="more icon" />
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
    </div>
  );
}

export default FeedItem;