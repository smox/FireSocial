import axios from "axios";
import { useEffect, useState } from "react";
import IUser from "../../interfaces/models/IUser";
import "./Conversation.css";

export interface IConversationProps {
  currentUser: IUser,
  friendId: string,
  onClick: () => void
}

const Conversation = ({ currentUser, friendId, onClick }: IConversationProps) => {

  const [ friend, setFriend ] = useState<IUser | undefined>();

  useEffect(() => {
    const getFriend = async () => {
      try {
        const response = await axios.get(`/api/user?id=${friendId}`);
        setFriend(response.data.result.get);
      } catch (error) {
        console.error(error);
      }
    }
    getFriend();
  }, []);

  return (
    <div className="conversation" onClick={ onClick }>
      <img src={ friend?.coverPicture ? `/images/${friend.coverPicture}` : `/images/noAvatar.png`} alt="" className="conversation-image" />
      <span className="conversation-name">{ friend && friend.username }</span>
    </div>
  );
}

export default Conversation;
