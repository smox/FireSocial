import { MoreVert, ThumbUp } from "@material-ui/icons";
import "./post.css";

export interface IPostProps {
}

export const Post = (props: IPostProps) => {
  return (
    <div className="post">
        <div className="post-wrapper">
            <div className="post-top">
                <div className="post-top-left">
                    <img src="/assets/profilbild_eva.jpg" alt="" className="post-top-left-profile-image" />
                    <span className="post-top-left-profile-username">Eva Brunner</span>
                    <span className="post-top-left-timeleft">5 Minutes ago</span>
                </div>
                <div className="post-top-right">
                    <MoreVert />
                </div>
            </div>
            <div className="post-center">
                <span className="post-center-text">
                    Hey! Hier ist mein erster Post!!
                </span>
                <img src="/assets/profilbild_michi.png" alt="" className="post-center-image" />
            </div>
            <div className="post-bottom">
                <div className="post-bottom-left">
                    <ThumbUp className="post-bottom-left-button-like" />
                    <span className="post-bottom-left-counter-like">3 people liked it</span>
                </div>
                <div className="post-bottom-right">
                    <span className="post-bottom-right-comment-text">9 comments</span>
                </div>
            </div>
        </div>
    </div>
  );
}
