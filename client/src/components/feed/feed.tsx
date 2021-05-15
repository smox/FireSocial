import { Post } from '../post/post';
import { Share } from '../share/share';
import "./feed.css";

export interface IFeedProps {
}

export function Feed (props: IFeedProps) {
  return (
    <div className="feed">
      <div className="feed-wrapper">
        <Share />
        { [1,2,3,4,5,6,7,8.9].map(num => <Post />) }
      </div>
    </div>
  );
}
