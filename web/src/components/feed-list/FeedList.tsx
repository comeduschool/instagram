// react modules
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// models
import { FeedState } from '../../models/feed';

// services
import { FeedService } from '../../services/FeedService';

// components
import FeedItem from './FeedItem';

// Styles
import './FeedList.css';

const FeedList = () => {
  const [init, setInit] = useState(false);
  const page = useSelector((state: { FeedState: FeedState }) => state.FeedState.feeds.page);
  const items = useSelector((state: { FeedState: FeedState }) => state.FeedState.feeds.items);
  const bottomRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(init === true) {
      dispatch<any>(FeedService.list());
      setInit(false);
      const option = {
        root: null,
        rootMargin: "20px",
        threshold: 0
      };
      const observer = new IntersectionObserver(bottomObserver, option);
      if (bottomRef.current) {
        observer.observe(bottomRef.current)
      }
    }
    setInit(true);
  }, [init]);

  const bottomObserver = useCallback((elems: any) => {
    const target = elems[0];
    if (target.isIntersecting) {
      dispatch<any>(FeedService.nextPage());
    }
  }, []);

  return (
    <div className="feeds">
      {
        items.map(feed=><FeedItem key={feed.pk} feed={feed}></FeedItem>)
      }
      <div ref={bottomRef}></div>
    </div>
  );
}

export default FeedList;