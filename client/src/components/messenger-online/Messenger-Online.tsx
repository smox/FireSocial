import "./Messenger-Online.css";

export interface IMessengerOnlineProps {
}

const MessengerOnline = (props: IMessengerOnlineProps) => {
  return (
    <div className="messenger-online">
      <div className="messenger-online-friend">
        <div className="messenger-online-image-container">
          <img src="/images/noAvatar.png" alt="" className="messenger-online-image" />
          <div className="messenger-online-badge"></div>
        </div>
        <div className="messenger-online-name">John Doe</div>
      </div>
    </div>
  );
}

export default MessengerOnline;
