import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import IPost from "../../interfaces/models/IPost";

export interface IShareProps {
    posts: IPost[],
    setPosts: (posts: IPost[]) => void
}

export const Share = ({ posts, setPosts }: IShareProps) => {

    const { user } = useContext(AuthContext);
    const shareInput = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [ file, setFile ] = useState<File | undefined>();


    const handleShare = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const text = shareInput.current.value;
            let filename: string | undefined = undefined;
            if(file) {
                const data = new FormData();
                data.append("file", file);
                
                try {
                    const fileResponse = await axios.post("/api/upload", data);
                    filename = fileResponse.data.result.get.filename;
                } catch (error) {
                    console.error(error);
                }
            }

            if(text && text.length >= 5) {
                const response = await axios.post(`/api/posts`, { text, img: filename } as IPost);
                setPosts([ ...posts, (response.data.result.get as IPost) ]);
            } else {
                console.error("Post zu kurz!");
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="share">
            <div className="share-wrapper">
                <div className="share-top">
                    <img src={user?.profilePicture ? `/images/${user.profilePicture}` : `/images/noAvatar.png`} 
                        className="share-top-profile-img" alt="Profilbild"/>
                    <input placeholder="Was beschäftigt dich gerade?" className="share-top-input" required minLength={5} ref={ shareInput } />
                </div>
                <hr className="share-hr" />
                { file && 
                    <div className="share-image-container">
                        <img src={ URL.createObjectURL(file) } alt="" className="share-image" />
                        <Cancel className="share-image-cancel" onClick={ () => setFile(undefined) }/>
                    </div> }
                <form onSubmit={ handleShare } className="share-bottom">
                    <div className="share-bottom-options">
                        <label htmlFor="file" className="share-bottom-options-option" title="Noch nicht implementiert">
                            <PermMedia htmlColor="tomato" className="share-bottom-options-option-icon" />
                            <span className="share-bottom-options-option-text">Foto / Video</span>
                            <input style={{ display: "none" }} type="file" id="file" accept=".png,jpeg,jpg" 
                                onChange={ (e) => e.target.files ? setFile(e.target.files[0]) : setFile(undefined) } />
                        </label>
                        <div className="share-bottom-options-option-disabled" title="Noch nicht implementiert">
                            <Label htmlColor="blue" className="share-bottom-options-option-icon" />
                            <span className="share-bottom-options-option-text">Tag</span>
                        </div>
                        <div className="share-bottom-options-option-disabled" title="Noch nicht implementiert">
                            <Room htmlColor="green" className="share-bottom-options-option-icon" />
                            <span className="share-bottom-options-option-text">Standort</span>
                        </div>
                        <div className="share-bottom-options-option-disabled" title="Noch nicht implementiert">
                            <EmojiEmotions htmlColor="goldenrod" className="share-bottom-options-option-icon" />
                            <span className="share-bottom-options-option-text">Gefühle</span>
                        </div>
                    </div>
                    <button className="share-bottom-options-option-button" type="submit">Teilen</button>
                </form>
            </div>
        </div>
    );
}
