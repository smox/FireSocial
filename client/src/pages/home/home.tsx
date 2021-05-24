import * as React from 'react';
import { Feed } from "../../components/feed/feed";
import { Sidebar } from "../../components/sidebar/sidebar";
import { TopBar } from "../../components/topbar/topbar";
import "./home.css";
import HomeRightbar from './rightbar/rightbar';


const Home = () => {
  
  return (
    <>
      <TopBar/>
      <div className="home-container">
        <Sidebar />
        <Feed />
        <HomeRightbar />
      </div>
    </>
  );
}

export default Home;