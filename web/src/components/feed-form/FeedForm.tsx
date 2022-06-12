// react
import { useDispatch, useSelector } from 'react-redux';

// actions
import { HideModal } from '../../reducers/FeedReducer';

// models
import { FeedState } from '../../models/feed';

// Styles
import './FeedForm.css';
import { useEffect } from 'react';

const FeedForm = () => {
  const modal = useSelector((state: { FeedState: FeedState})=>state.FeedState.modal);
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log(modal);
  }, [modal]);

  const hideModal = (event: any) => {
    if (event.target.id === "feed-form-modal") {
      dispatch(HideModal());
    }
  }

  return (
    <div 
      id="feed-form-modal" 
      className={modal ? "feed-form-modal-container feed-form-modal-show" : "feed-form-modal-container feed-form-modal-hide"}
      onClick={hideModal}
    >
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
            <div className="image-input">
              <span className="image-input-icon">
                <img src="assets/icons/contents.svg" alt="content" />
                <div className="image-input-text">사진을 여기다 끌어다 놓으세요.</div>
                <button className="image-input-btn">컴퓨터에서 선택</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedForm;