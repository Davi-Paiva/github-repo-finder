import Navbar from "../../components/Navbar/Navbar";
import { useParams } from 'react-router-dom';
import { AboutUser } from "../../components/AboutUser/AboutUser";
import { Repositories } from "../../components/Repositories/Repositories";
import "./userPageStyles.css";
import { useNavigate } from 'react-router-dom';

export default function UserPage() {
    const { username } = useParams();
    const navigate = useNavigate();

    if (!username) {
        return <div>User not found</div>;
    }

    return (
        <main className="user-page">
            <Navbar navigate={navigate} />
            <div className="user-page-content">
                <AboutUser username={username} />
                <Repositories username={username}/>
            </div>
        </main>
    );
}