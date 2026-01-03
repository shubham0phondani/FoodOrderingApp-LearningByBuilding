import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {

    const onlineStatus = useOnlineStatus();

    return (
        <div className="flex justify-between shadow-lg bg-orange-50 sm:bg-slate-50">
            <div>
                <Link to={"/"}>                
                <img className="w-20" src={LOGO_URL} />
                </Link>
            </div>
            <div className="nav-items">
                <ul className="flex p-4 m-4 w-500 justify-between">
                    <li>
                        onlineStatus : {onlineStatus === false ? "🍎" : "🤢"}
                    </li>
                    <li>
                        <Link className="m-5" to={"/"} >Home</Link>
                    </li>
                    <li>
                        <Link className="m-5" to={"/contact"} >Contact Us</Link>
                    </li>
                    <li>
                        <Link className="m-5" to={"/grocery"}>Grocery</Link>
                    </li>
                    <li>
                        <Link className="m-5" to={"/about"} >About</Link>
                    </li>
                    <li>
                        <Link className="m-5" to={"/cart"}>Cart</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;