import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import MessengerOnline from "../../components/messenger-online/Messenger-Online";
import { TopBar } from "../../components/topbar/topbar";
import { AuthContext } from "../../context/AuthContext";
import "./Messenger.css";
import { MutableRefObject, useContext, useEffect, useRef, useState } from "react"; 
import axios from "axios";
import { IConversation } from "../../interfaces/models/IConversation";
import { IMessage } from "../../interfaces/models/IMessage";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

export interface IMessengerProps {
}

const Messenger = (props: IMessengerProps) => {

  const { user } = useContext(AuthContext);
  const [ conversations, setConversations ] = useState([]);
  const [ currentConversation, setCurrentConversation ] = useState<IConversation>();
  const [ loadingConversations, setLoadingConversations ] = useState<boolean>(false);
  const [ messages, setMessages ] = useState<IMessage[]>([]);
  const [ newMessage, setNewMessage ] = useState<string>("");
  const [ socket, setSocket ] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>();


  const scrollRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    setSocket(io("ws://localhost:8900"));
  }, []);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/conversations");
        setConversations(res.data.result.get);
      } catch (error) {
        console.error(error);
      }
    }

    getConversations();
  }, [ user ]);

  useEffect(() => {
    // fetch messages for conversation
    const getMessages = async () => {
      if(currentConversation) {
        try {
          setLoadingConversations(true);
          const response = await axios.get(`/api/messages/${currentConversation._id}`);
          setMessages(response.data.result.get);
        } catch (error) {
          console.error(error);
        }
        setLoadingConversations(false);
      }
    }

    getMessages();
  }, [currentConversation])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const message = {
      text: newMessage,
      conversationId: currentConversation?._id
    }

    try {
      setNewMessage("");
      const response = await axios.post("/api/messages", message);
      setMessages([...messages, (response.data.result.get as IMessage)]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  },[messages, loadingConversations]);

  return (
    <>
      <TopBar />
      <div className="messenger">
        <div className="messenger-menu">
          <div className="messenger-menu-wrapper">
            <input type="text" placeholder="Suche" className="messenger-menu-input" />
            { user && conversations.map((conversation: IConversation) => 
            <Conversation currentUser={ user } friendId={ conversation.members[1] } onClick={ () => setCurrentConversation(conversation) } />) }
          </div>
        </div>
        <div className="messenger-box">
          <div className="messenger-box-wrapper">
            { currentConversation && !loadingConversations ? (
              <>
                <div className="messenger-box-top">
                  { messages && messages.map((message: IMessage, index: number) =>
                    <div key={index} ref={ scrollRef }>
                      <Message message={ message } own={ message.senderId === user?._id }/>
                    </div>
                  )}
                </div>
                <div className="messenger-box-bottom">
                  <textarea id="messenger-box-bottom-message" value={ newMessage } name="messenger-box-bottom-message" onChange={ (e) => setNewMessage(e.target.value)}
                    placeholder="Tippe hier deine Nachricht ein" className="messenger-box-bottom-message"/>
                  <button className="messenger-box-bottom-send-button" onClick={ handleSubmit }>Senden</button>
                </div> 
              </> ) : loadingConversations ? <span className="messenger-box-loading-conversation">Lade Nachrichten</span> : 
                <span className="messenger-box-no-conversation">Kein Chat ausgewählt</span> }
          </div>
        </div>
        <div className="messenger-online">
          <div className="messenger-online-wrapper">
            <MessengerOnline />
            <MessengerOnline />
            <MessengerOnline />
            <MessengerOnline />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
