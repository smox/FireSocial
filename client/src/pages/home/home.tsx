import * as React from 'react';
import { Feed } from "../../components/feed/feed";
import { Rightbar } from "../../components/rightbar/rightbar";
import { Sidebar } from "../../components/sidebar/sidebar";
import { TopBar } from "../../components/topbar/topbar";
import "./home.css";

export interface IHomeProps {
}

export default function Home (props: IHomeProps) {
  return (
    <>
      <TopBar/>
      <div className="home-container">
        <Sidebar />
        <Feed />
        <Rightbar type="home" />
      </div>
    </>
  );
}
