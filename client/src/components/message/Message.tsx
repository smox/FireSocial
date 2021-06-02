import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { IMessage } from "../../interfaces/models/IMessage";
import IUser from "../../interfaces/models/IUser";
import "./Message.css"

export interface IMessageProps {
  message: IMessage;
  own?: boolean;
}

const Message = ({ message, own }: IMessageProps) => {

  const [ user, setUser ] = useState<IUser>();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`/api/user?id=${message.senderId}`);
        setUser(response.data.result.get);
      } catch (error) {
        console.error(error);
      }
      
    }
    getUser();   
  }, []);

  return (
    <div className={ own ? "message own" : "message" }>
      <div className="message-top">
          <img src={ user?.coverPicture ? `/images/${user.coverPicture}` : "/images/noAvatar.png" } alt="" className="message-top-image" />
          <p className="message-top-text">{ message.text }</p>
      </div>
      <div className="message-bottom">{ format(message.createdAt) }</div>
    </div>
  );
}

export default Message;