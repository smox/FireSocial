import "./rightbar.css";
import { Cake } from '@material-ui/icons';
import { Friend } from "../../../components/friend/friend";
import IUser from "../../../interfaces/models/IUser";
import axios from "axios";
import { useEffect, useState } from "react";

const HomeRightbar = () => {

  const [ friends, setFriends] = useState<IUser[]>([]);

  useEffect(() => {
    const getFriendList = async () => {
      try {
        const response = await axios.get(`/api/user/friends/`);
        setFriends(response.data.result.get);
      } catch (error) {
        console.error(error);
      }
    };
    getFriendList();
  }, []);

  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
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
      </div>
    </div>
  );
}

export default HomeRightbar;
