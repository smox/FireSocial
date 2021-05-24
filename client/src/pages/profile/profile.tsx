import * as React from 'react';
import "./profile.css";
import { Feed } from "../../components/feed/feed";
import { Sidebar } from "../../components/sidebar/sidebar";
import { TopBar } from "../../components/topbar/topbar";
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import IUser from '../../interfaces/models/IUser';
import axios from 'axios';
import ProfileRightbar from './rightbar/rightbar';

export interface IProfileProps {
}

export function Profile (props: IProfileProps) {

    const { username } = useParams<{ username: string }>();

    const [ user, setUser ] = useState<IUser | undefined>();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {

        const fetchUserByUsername = async () => {
            const response = await axios.get(`/api/user?username=${username}`);
            setUser(response.data.result.get);
        }

        if(username) {
            fetchUserByUsername();
        } else {
            setUser(undefined);
        }
        setLoading(false);
    }, [username]);


    if(username) {
        if(user) {
            return (
            <>
                <TopBar/>
                <div className="profile">
                    <Sidebar />
                    <div className="profile-right">
                        <div className="profile-right-top">
                            <div className="profile-right-top-profile-cover">
                                <img className="profile-right-top-profile-cover-background-image" 
                                    src={ user.coverPicture ? `/images/${user.coverPicture}` : "/images/noCover.png" } alt="" />
                                <img className="profile-right-top-profile-cover-user-image" 
                                src={ user.profilePicture ? `/images/${user.profilePicture}` : `/images/noAvatar.png` } alt="" />
                            </div>
                            <div className="profile-right-top-profile-cover-info">
                                <h4 className="profile-right-top-profile-cover-info-name">{ user?.username }</h4>
                                <span className="profile-right-top-profile-cover-info-desc">Willkommen auf meinem Profil</span>
                            </div>
                        </div>
                        <div className="profile-right-bottom">
                            <Feed user={ user }/>
                            <ProfileRightbar user={ user }/>
                        </div>
                    </div>
                </div>
            </>
            );
        } else if(!user && !loading) {
            return <p>User konnte nicht gefunden werden!</p>
        } else {
            return <p>User wird geladen</p>
        }
    } else {
        return <p>Kein Benutzername angegeben</p>
    }
}
