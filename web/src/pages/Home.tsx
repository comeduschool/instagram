// Components
import FeedForm from "../components/feed-form/FeedForm";
import FeedList from "../components/feed-list/FeedList";

const Home = () => {
    return (
      <div>
        <FeedList />
        <FeedForm />
      </div>
    );
  }
  
  export default Home