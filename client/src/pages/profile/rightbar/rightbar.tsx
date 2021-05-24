import "./rightbar.css";
import axios from "axios";
import IUser from "../../../interfaces/models/IUser";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export interface IProfileRightbarProps {
  user: IUser
}

const ProfileRightbar = ({ user }: IProfileRightbarProps) => {

  const [ friends, setFriends] = useState<IUser[]>([]);
  const [ followed, setFollowed ] = useState<Boolean>();
  const currentUser = useContext(AuthContext).user;

  const handleFollow = async (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, userId: string) => {
    try {
      await axios.put(`/api/user/follow/`, { userId });
      setFollowed(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUnfollow = async (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, userId: string) => {
    try {
      await axios.put(`/api/user/unfollow/`, { userId });
      setFollowed(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getFriendList = async () => {
      try {
        console.log(`GetFriends for User: ${user.username}`);
        const response = await axios.get(`/api/user/friends/${user._id}`);
        setFriends(response.data.result.get);
      } catch (error) {
        console.error(error);
      }
    };
    getFriendList();
  }, [user]);

  useEffect(() => {
    setFollowed(currentUser?.following.includes(user._id));
  }, [user, currentUser]);


    return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        { user?._id !== currentUser?._id ? 
            <button className="rightbar-follow-button" 
                onClick={ !followed ? (event) => handleFollow(event, user._id) : (event) => handleUnfollow(event, user._id) }>
                { !followed ? <>Freund hinzufügen <Add /></> : <>Freund entfernen <Remove /></> } 
            </button> : undefined }
            <h4 className="rightbar-title">Benutzerinformation: </h4>
            <div className="rightbar-info">
                { user?.city ? (
                    <div className="rightbar-info-item">
                        <span className="rightbar-info-item-key">Ort:</span>
                        <span className="rightbar-info-item-value">{ user.city } </span> 
                    </div> ) : undefined }
                { user?.from ? (
                    <div className="rightbar-info-item">
                        <span className="rightbar-info-item-key">Ursprungsort:</span>
                        <span className="rightbar-info-item-value">Baden</span>
                    </div> ) : undefined }
                { user?.relationship ? (
                    <div className="rightbar-info-item">
                        <span className="rightbar-info-item-key">Beziehungsstatus:</span>
                        <span className="rightbar-info-item-value">
                            {
                            user.relationship === 1 ?
                                'Single' : user.relationship === 2 ? 'In einer Beziehung' : 'Verheiratet'
                            }
                        </span>
                    </div> ) : undefined }
            </div>      
            <h4 className="rightbar-title">Freunde: </h4>
            <div className="rightbar-followings">
                { friends && friends.length > 0 ? friends.map((user: IUser) => (
                        <div className="rightbar-following">
                            <img src={ user?.profilePicture ? `/images/${user.profilePicture}` : "/images/noAvatar.png"} alt="" className="rightbar-following-image" />
                        </div>
                )) : <p>Keine Freunde</p>}
            </div>
        </div>
    </div>
  );
}

export default ProfileRightbar;
