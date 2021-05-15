import * as React from 'react';
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";

export interface ITopBarProps {
}

export function TopBar (props: ITopBarProps) {
  return (
    <div>
        <div className="topbar-container">
            <div className="topbar-left">
                <div className="logo">FireSocial</div>
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
                <img src="/assets/profilbild_michi.png" alt="" className="topbar-image" />
            </div>
        </div>
    </div>
  );
}
