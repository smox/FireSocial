import "./rightbar.css";
import { Cake } from '@material-ui/icons';
import { Friend } from "../friend/friend";

export interface IRightbarProps {
  type: "profile" | "home"
}

export function Rightbar ({ type }: IRightbarProps) {

  const HomeRightbar = () => (
    <>
      <div className="rightbar-birthday-container">
        <Cake htmlColor="red" fontSize="large" className="rightbar-birthday-container-image" />
        <span className="rightbar-birthday-container-text">Keiner deiner Freunde hat heute Geburtstag</span>
      </div>
      <div className="rightbar-friendlist">
        <h4 className="rightbar-friendlist-title">Freunde</h4>
        <ul className="rightbar-friendlist-list">
        { [ { username: "Eva Brunner", profilePicture: "/assets/profilbild_eva.jpg" },
            { username: "Peter Mansky", profilePicture: "/assets/profilbild_peter.jpg" },
            { username: "Gert Braschel", profilePicture: "/assets/profilbild_gert.jpg"}
          ].map(u => <Friend user={u} />) }
        </ul>
      </div>
    </>
  );

  const ProfileRightbar = () => (
    <>
      <h4 className="rightbar-title">User information</h4>
      <div className="rightbar-info">
        <div className="rightbar-info-item">
          <span className="rightbar-info-item-key">City:</span>
          <span className="rightbar-info-item-value">Lengenfeld</span>
        </div>
        <div className="rightbar-info-item">
          <span className="rightbar-info-item-key">From:</span>
          <span className="rightbar-info-item-value">Baden</span>
        </div>
        <div className="rightbar-info-item">
          <span className="rightbar-info-item-key">Relationship:</span>
          <span className="rightbar-info-item-value">Married</span>
        </div>
      </div>
      <h4 className="rightbar-title">User friends</h4>
      <div className="rightbar-followings">
        <div className="rightbar-following">
          <img src="/assets/profilbild_eva.jpg" alt="" className="rightbar-following-image" />
        </div>
        <div className="rightbar-following">
          <img src="/assets/profilbild_peter.jpg" alt="" className="rightbar-following-image" />
        </div>
        <div className="rightbar-following">
          <img src="/assets/profilbild_gert.jpg" alt="" className="rightbar-following-image" />
        </div>
      </div>
    </>
  );

  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        { type === "home" ? <HomeRightbar /> : <ProfileRightbar /> }
      </div>
    </div>
  );
}
