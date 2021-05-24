import axios from 'axios';
import { useEffect, useState } from 'react';
import IPost from '../../interfaces/models/IPost';
import IUser from '../../interfaces/models/IUser';
import { Post } from '../post/post';
import { Share } from '../share/share';
import "./feed.css";

export interface IFeedProps {
  user?: IUser
}

export function Feed ({ user }: IFeedProps) {

  const [ posts, setPosts ] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () =>  {
      try { 
        const response = user ?
          await axios.get(`/api/posts/${user._id}`) :
          await axios.get("/api/posts/timeline");
        setPosts(response.data.result.get);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPosts();
  },[user]);

  return (
    <div className="feed">
      <div className="feed-wrapper">
        <Share posts={ posts } setPosts={setPosts} />
        { posts && posts.length > 0 ? posts
        .sort((post1: IPost, post2: IPost) => post2.createdAt.localeCompare(post1.createdAt))
        .map(post => <Post key={post._id} givenPost={ post } />) : undefined }
      </div>
    </div>
  );
}
