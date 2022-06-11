import './FeedList.css';

const FeedList = () => {
    return (
      <div className="feeds">
        <div className="feed">
          <div className="feed-header">
            <div className="feed-header-content">
              <div className="feed-header-profile-containter">
                <img className="feed-header-profile" src="assets/test-profile.jpeg" alt="test profile" />
                <p className="feed-header-username">comedu</p>
              </div>
              <img src="assets/icons/more.svg" alt="more icon" />
            </div>
          </div>
          <div className="feed-content-image">
            <div>
              <img className="feed-image" src="assets/test-image01.jpg" alt="test01"/>
            </div>
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
            <p className="feed-favorites">좋아요 1,012 개</p>
            <p className="feed-description"><span className="feed-username">comedu</span> hello this is the feed I made.</p>

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
        <div className="feed">
          <div className="feed-header">
            <div className="feed-header-content">
              <div className="feed-header-profile-containter">
                <img className="feed-header-profile" src="assets/test-profile.jpeg" alt="test profile" />
                <p className="feed-header-username">comedu</p>
              </div>
              <img src="assets/icons/more.svg" alt="more icon" />
            </div>
          </div>
          <div className="feed-content-image">
            <div>
              <img className="feed-image" src="assets/test-image02.jpg" alt="test01"/>
            </div>
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
            <p className="feed-favorites">좋아요 1,012 개</p>
            <p className="feed-description"><span className="feed-username">comedu</span> hello this is the feed I made.</p>

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
        <div className="feed">
          <div className="feed-header">
            <div className="feed-header-content">
              <div className="feed-header-profile-containter">
                <img className="feed-header-profile" src="assets/test-profile.jpeg" alt="test profile" />
                <p className="feed-header-username">comedu</p>
              </div>
              <img src="assets/icons/more.svg" alt="more icon" />
            </div>
          </div>
          <div className="feed-content-image">
            <div>
              <img className="feed-image" src="assets/test-image03.jpg" alt="test01"/>
            </div>
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
            <p className="feed-favorites">좋아요 1,012 개</p>
            <p className="feed-description"><span className="feed-username">comedu</span> hello this is the feed I made.</p>

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
      </div>
    );
}

export default FeedList;