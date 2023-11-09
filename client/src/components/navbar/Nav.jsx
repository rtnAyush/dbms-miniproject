import { Link, useLocation } from "react-router-dom";
import "./nav.css"
import AccountIcon from "./AccountIcon";



export default function Nav() {

    const location = useLocation();


    return (
        <nav className="d-flex justify-content-between navpad-outer-cont navbar navbar-expand-lg navbar-light bg-light navpad">
            <Link className="navbar-brand" to={location?.pathname.startsWith("/admin/") ? "/admin" : '/'}>Mess Buddy</Link>
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
            {/* <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                </ul>
            </div> */}

            <span className="dropdown">
                <AccountIcon />
            </span>
        </nav>
    )
}
