import * as React from 'react';
import "./sidebar.css";
import { Chat, RssFeed, VideoLibrary, School, GroupWork } from "@material-ui/icons";
export interface ISidebarProps {
}

export function Sidebar (props: ISidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
          <ul className="sidebar-list">
              <li className="sidebar-list-item">
                  <RssFeed className="sidebar-icon" />
                  <span className="sidebar-list-item-text">Feed</span>
              </li>
              <li className="sidebar-list-item">
                  <Chat className="sidebar-icon" />
                  <span className="sidebar-list-item-text">Chat</span>
              </li>
              <li className="sidebar-list-item">
                  <VideoLibrary className="sidebar-icon" />
                  <span className="sidebar-list-item-text">Video</span>
              </li>
              <li className="sidebar-list-item">
                  <GroupWork className="sidebar-icon" />
                  <span className="sidebar-list-item-text">Group</span>
              </li>
              <li className="sidebar-list-item">
                  <School className="sidebar-icon" />
                  <span className="sidebar-list-item-text">Courses</span>
              </li>
          </ul>
      </div>
    </div>
  );
}
