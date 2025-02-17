import "./NavbarStyles.css";
import { IoCodeSlash } from "react-icons/io5";

interface navbarProps {
    navigate: (path: string) => void;
  }
  
  export default function Navbar(props: navbarProps) {
    return (
      <div className="navbar" onClick={() => {
        props.navigate("/");
      }}>
        <div className="navbar-button">
            <IoCodeSlash size={30} className="navbar-icon" />
            <h1 className="navbar-title">GitExplorer</h1>
        </div>
      </div>
    );
  }