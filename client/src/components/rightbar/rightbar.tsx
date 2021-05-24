import "./rightbar.css";
import { Cake } from '@material-ui/icons';
import { Friend } from "../friend/friend";
import IUser from "../../interfaces/models/IUser";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export interface IRightbarProps {
  type: "profile" | "home",
  user?: IUser
}

export function Rightbar ({ type, user }: IRightbarProps) {

  const [ friends, setFriends] = useState<IUser[]>([]);
  const [ followed, setFollowed ] = useState<Boolean>();
  const currentUser = useContext(AuthContext).user;

  const handleFollow = async (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, user: IUser) => {
    try {
      console.log(`Follow user ${user.username}`);
      const response = await axios.put(`/api/user/follow/`, { userId: user._id });
      setFriends( [ ...friends, response.data.result.get ] );
    } catch (error) {
      console.log(error);
    }
  }

  const handleUnfollow = async (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, userId: string) => {
    try {
      const response = await axios.put(`/api/user/unfollow/`, { userId });
      setFriends(friends.filter(f => f._id !== (response.data.result.get as IUser)._id));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getFriendList = async () => {

      console.log(`GetFriends for ${user?.username}`);

      try {
        const response = await axios.get(`/api/user/friends/${user?._id ? user._id : ""}`);
        setFriends(response.data.result.get);
      } catch (error) {
        console.error(error);
      }
    };
    getFriendList();
  }, [user]);

  useEffect(() => {
    setFollowed(user ? friends.map(u => u._id).includes(user._id) : false);
  }, [friends, user]);

  const HomeRightbar = () => {

    return (
    <>
      <div className="rightbar-birthday-container">
        <Cake htmlColor="red" fontSize="large" className="rightbar-birthday-container-image" />
        <span className="rightbar-birthday-container-text">Keiner deiner Freunde hat heute Geburtstag</span>
      </div>
      <div className="rightbar-friendlist">
        <h4 className="rightbar-friendlist-title">Freunde</h4>
        <ul className="rightbar-friendlist-list">
          { friends.length > 0 ? friends.map(u => <Friend key={u._id} user={u} />) : <p>Du hast noch keine Freunde</p> }
        </ul>
      </div>
    </>
  )};

  const ProfileRightbar = () => {  
    return (
    <>
      { user?._id !== currentUser?._id ? 
        <button className="rightbar-follow-button" 
        onClick={ !followed ? (event) => handleFollow(event, user!) : (event) => handleUnfollow(event, user!._id) }>
          { !followed ? <>Follow <Add /></> : <>Unfollow <Remove /></>} </button> 
      : undefined }
      <h4 className="rightbar-title">User information</h4>
      <div className="rightbar-info">
        { user?.city ? (
          <div className="rightbar-info-item">
              <span className="rightbar-info-item-key">City:</span>
              <span className="rightbar-info-item-value">{ user.city } </span> 
          </div> ) : undefined }
        { user?.from ? (
          <div className="rightbar-info-item">
            <span className="rightbar-info-item-key">From:</span>
            <span className="rightbar-info-item-value">Baden</span>
          </div> ) : undefined }
        { user?.relationship ? (
          <div className="rightbar-info-item">
            <span className="rightbar-info-item-key">Relationship:</span>
              <span className="rightbar-info-item-value">
                {
                  user.relationship === 1 ?
                    'Single' : user.relationship === 2 ? 'In einer Beziehung' : 'Verheiratet'
                }
              </span>
          </div> ) : undefined }
      </div>
      <h4 className="rightbar-title">User friends</h4>
      <div className="rightbar-followings">
          { friends && friends.length > 0 ? friends.map((user: IUser) => (
            <div className="rightbar-following">
              <img src={ user?.profilePicture ? `/images/${user.profilePicture}` : "/images/noAvatar.png"} alt="" className="rightbar-following-image" />
            </div>
          )) : <p>Keine Freunde</p>}
      </div>
    </>
  )};

  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        { type === "home" ? <HomeRightbar /> : <ProfileRightbar /> }
      </div>
    </div>
  );
}
