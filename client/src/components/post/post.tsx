import { MoreVert, ThumbUp } from "@material-ui/icons";
import axios from "axios";
import  { useContext, useEffect, useState } from "react";
import IPost from "../../interfaces/models/IPost";
import IUser from "../../interfaces/models/IUser";
import "./post.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export interface IPostProps {
    givenPost: IPost
}

export const Post = ({ givenPost }: IPostProps) => {

    const [ loading, setLoading ] = useState(true);
    const [ user, setUser ] = useState<IUser>();
    const currentUser = useContext(AuthContext).user;
    const [ post, setPost ] = useState<IPost>(givenPost);

    const FQDN_API = process?.env?.API_URL ? process?.env?.API_URL : `http://localhost:3000`;

    useEffect(() => {

        const fetchUser = async () => {
            const response = await axios.get(`/api/user?id=${post.userId}`);
            setUser((response.data.result.get as IUser));
        }

        try {
            fetchUser();
        } catch (error) {
            console.error(error);
        }
    },[post]);

    const likeHandler = async (post: IPost) => {
        if(post.userId === currentUser?._id) {
            console.log("Seinen eigenen Post zu liken ist wie sich selbst ein High five zu geben....");
        } else {
            const hasAlreadyLiked = post.likes.includes(currentUser!._id);
            if(hasAlreadyLiked) {
                await axios.put(`/api/posts/${post._id}/unlike`);
                setPost({
                    ...post,
                    likes: post.likes.filter(id => id !== currentUser!._id)
                });
            } else {
                await axios.put(`/api/posts/${post._id}/like`);
                setPost({
                    ...post,
                    likes: [ ...post.likes, currentUser!._id ]
                });
            }
        }
    }

    useEffect(() => setLoading(!user), [user]);

    if(!loading) {
        return (
            <div className="post">
                <div className="post-wrapper">
                    <div className="post-top">
                        <div className="post-top-left">
                            <Link to={ `/profile/${user?.username}`}>
                                <img src={ user?.profilePicture ? `/images/${user.profilePicture}` : '/images/noAvatar.png'} 
                                alt="" className="post-top-left-profile-image" />
                            </Link>
                            <span className="post-top-left-profile-username">{ user?.username } </span>
                            <span className="post-top-left-timeleft">{ post.createdAt ? format(post.createdAt) : "" }</span>
                        </div>
                        <div className="post-top-right">
                            <MoreVert />
                        </div>
                    </div>
                    <div className="post-center">
                        <span className="post-center-text">
                            { post.text }
                        </span>
                        { post.img ? <img src={ `${FQDN_API}/images/${post.img}`} alt="" className="post-center-image" /> : undefined }
                    </div>
                    <div className="post-bottom">
                        <div className="post-bottom-left">
                            <ThumbUp className="post-bottom-left-button-like" onClick={ () => likeHandler(post) } />
                            <span className="post-bottom-left-counter-like">{ post.likes ? post.likes.length : 0 } people liked it</span>
                        </div>
                        <div className="post-bottom-right">
                            <span className="post-bottom-right-comment-text">No comments</span>
                        </div>
                    </div>
                </div>
            </div> )
    } else {
        return <p>Post is loading...</p>
    }
}
