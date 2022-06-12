// react modules
import { useState, useEffect } from 'react';
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
  const dispatch = useDispatch();

  useEffect(()=>{
    if(init === true) {
      dispatch<any>(FeedService.list());
      console.log(items);
      setInit(false);
    }
    setInit(true);
  }, [init]);

  return (
    <div className="feeds">
      {
        items.map(feed=><FeedItem feed={feed}></FeedItem>)
      }
    </div>
  );
}

export default FeedList;