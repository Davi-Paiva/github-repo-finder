import "./AboutUserStyles.css";
import { getUser } from "../../services/userService";
import { User } from "../../types/userTypes";
import { useState, useEffect } from "react";

interface IAboutUserProps {
    username: string;
}

export function AboutUser({ username }: IAboutUserProps) {
    const [userInfo, setUserInfo] = useState<User | null>(null);
    
    useEffect(() => {
        getUser(username).then((user) => {
            setUserInfo(user);
        });
    }, [username]);

    if (!userInfo) {
        return <div className="about-user">Loading...</div>;
    }

    return (
        <div className="about-user">
            <div className="about-user-container">
                <img src={userInfo.avatar_url} alt={userInfo.login} className="about-user-avatar" />

                <h2 className="about-user-name">{userInfo.login}</h2>

                <div className="about-user-follow">
                    <div className="about-user-follow-item">
                        <p className="about-user-follow-number">{userInfo.followers}</p>
                        <p className="about-user-follow-text">followers</p>
                    </div>
                    <div className="about-user-follow-item">
                        <p className="about-user-follow-number">{userInfo.following}</p>
                        <p className="about-user-follow-text">following</p>
                    </div>
                </div>

                <div className="about-user-bio">
                    <p className="about-user-bio-text">{userInfo.bio}</p>
                </div>


            </div>
        </div>
    );
}