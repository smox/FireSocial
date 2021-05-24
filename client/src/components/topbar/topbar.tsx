import * as React from 'react';
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';



export function TopBar () {

    const { user } = useContext(AuthContext);

    return (
        <div>
            <div className="topbar-container">
                <div className="topbar-left">
                    <Link to="/" style={{ textDecoration: "none", color: "#FCF6F5FF"}}>
                        <span className="logo">FireSocial</span>
                    </Link>
                </div>    
                <div className="topbar-center">
                    <div className="searchbar">
                        <Search className="search-icon" />
                        <input placeholder="Search for friend, post or video" type="text" className="search-input"/>
                    </div>
                </div>
                <div className="topbar-right">
                    <div className="topbar-links">
                        <span className="topbar-link">Home</span>
                        <span className="topbar-link">Timeline</span>
                    </div>
                    <div className="topbar-icons">
                        <div className="topbar-icon-item">
                            <Person />
                            <span className="topbar-icon-badge">1</span>
                        </div>
                        <div className="topbar-icon-item">
                            <Chat />
                            <span className="topbar-icon-badge">1</span>
                        </div>
                        <div className="topbar-icon-item">
                            <Notifications />
                            <span className="topbar-icon-badge">1</span>
                        </div>
                    </div>
                    <Link to={ `/profile/${user?.username}`}>
                        <img src={user?.profilePicture ? `/images/${user.profilePicture}` : `/images/noAvatar.png`} alt="" className="topbar-image" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
