import { useNavigate } from 'react-router-dom';
import UserSearch from "../../components/UserSearch/UserSearch";
import { searchUser } from "../../services/userService";
import Navbar from "../../components/Navbar/Navbar";
import "./homePageStyles.css";

export default function HomePage() {
    const navigate = useNavigate();


    const handleUserSelect = (username: string) => {
      navigate(`/user/${username}`);
    };

    return (
      <main className="home">
        <Navbar navigate={navigate} />
        <div className="user-search-container">
          <UserSearch search={searchUser} getUser={handleUserSelect} />
        </div>
        
      </main>
    );
  }