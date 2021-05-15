import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";

export interface IShareProps {
}

export const Share = (props: IShareProps) => {
  return (
    <div className="share">
        <div className="share-wrapper">
            <div className="share-top">
                <img src="/assets/profilbild_michi.png" className="share-top-profile-img" alt="Profilbild"/>
                <input placeholder="What's in your mind" className="share-top-input" />
            </div>
            <hr className="share-hr" />
            <div className="share-bottom">
                <div className="share-bottom-options">
                    <div className="share-bottom-options-option">
                        <PermMedia htmlColor="tomato" className="share-bottom-options-option-icon" />
                        <span className="share-bottom-options-option-text">Photo / Video</span>
                    </div>
                    <div className="share-bottom-options-option">
                        <Label htmlColor="blue" className="share-bottom-options-option-icon" />
                        <span className="share-bottom-options-option-text">Tag</span>
                    </div>
                    <div className="share-bottom-options-option">
                        <Room htmlColor="green" className="share-bottom-options-option-icon" />
                        <span className="share-bottom-options-option-text">Location</span>
                    </div>
                    <div className="share-bottom-options-option">
                        <EmojiEmotions htmlColor="goldenrod" className="share-bottom-options-option-icon" />
                        <span className="share-bottom-options-option-text">Feelings</span>
                    </div>
                </div>
                <button className="share-bottom-options-option-button">Share</button>
            </div>
        </div>
    </div>
  );
}
