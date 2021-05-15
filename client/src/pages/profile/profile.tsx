import * as React from 'react';
import "./profile.css";
import { Feed } from "../../components/feed/feed";
import { Rightbar } from "../../components/rightbar/rightbar";
import { Sidebar } from "../../components/sidebar/sidebar";
import { TopBar } from "../../components/topbar/topbar";

export interface IProfileProps {
}

export function Profile (props: IProfileProps) {
  return (
    <>
        <TopBar/>
        <div className="profile">
            <Sidebar />
            <div className="profile-right">
                <div className="profile-right-top">
                    <div className="profile-right-top-profile-cover">
                        <img className="profile-right-top-profile-cover-background-image" src="/assets/panorama_krems.jpg" alt="" />
                        <img className="profile-right-top-profile-cover-user-image" src="/assets/profilbild_michi.png" alt="" />
                    </div>
                    <div className="profile-right-top-profile-cover-info">
                        <h4 className="profile-right-top-profile-cover-info-name">Michael Brunner</h4>
                        <span className="profile-right-top-profile-cover-info-desc">Willkommen auf meinem Profil</span>
                    </div>
                </div>
                <div className="profile-right-bottom">
                    <Feed />
                    <Rightbar type="profile"/>
                </div>
            </div>
        </div>
    </>
  );
}
