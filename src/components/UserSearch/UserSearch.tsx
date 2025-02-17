import { User } from "../../types/userTypes";
import { useState } from "react";
import "./UserSearchStyles.css";


interface searchUserProps {
    search: (value: string) => Promise<User[] | null>;
    getUser: (user: string) => void;
  }
  
  export default function SearchUser({ search, getUser }: searchUserProps) {
    const [users, setUsers] = useState<User[]>([]);
    return (
      <div className="user-search">
        <input className="user-search-input" type="text" placeholder="Search for a GitHub user" onChange={(e) => {
            search(e.target.value).then((users) => {
                if(users) {
                    setUsers(users);
                }
            });
        }} />
        <div className={users.length > 0 ? "user-search-results" : "invisible"}>
            {users.map((user) => (
                <div className="user-search-result" onClick={() => {
                    getUser(user.login);
                }}>
                    <img src={user.avatar_url} alt="User Avatar" className="user-search-result-avatar" />
                    <p>{user.login}</p>
                </div>
            ))}
        </div>  
      </div>
    );
  }