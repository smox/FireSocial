import "./friend.css";

export interface IFriendProps {
    user: any
}

export const Friend = ({ user }: IFriendProps) => {
  return (
    <li className="rightbar-friendlist-list-item">
        <div className="rightbar-friendlist-list-item-profile-picture-container">
            <img src={ user.profilePicture ? `/images/${user.profilePicture}` : `/images/noAvatar.png` } alt="" className="rightbar-friendlist-list-item-profile-picture" />
            <span className="rightbar-friendlist-list-item-status-online" />
        </div>
        <span className="rightbar-friendlist-list-item-profile-name">{ user.username }</span>
    </li>
  );
}
