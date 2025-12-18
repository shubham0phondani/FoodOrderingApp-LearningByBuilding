import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <div>
                <Link to={"/"}>                
                <img className="logo" src={LOGO_URL} />
                </Link>
            </div>
            <div className="nav-items">
                <ul>
                    <li>
                        <Link className="wtf" to={"/"} >Home</Link>
                    </li>
                    <li>
                        <Link className="wtf" to={"/contact"} >Contact Us</Link>
                    </li>
                    <li>
                        <Link className="wtf" to={"/about"} >About</Link>
                    </li>
                    <li>
                        <Link className="wtf" to={"/cart"}>Cart</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;