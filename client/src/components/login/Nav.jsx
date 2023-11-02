import { Link } from "react-router-dom";
import Login from './Login'
import "./nav.css"


export default function Nav() {



    return (
        <div className="navpad-outer-cont">
            <nav className="navbar navbar-expand-lg navbar-light bg-light  navpad">
                <Link className="navbar-brand" to="/">Mess Buddy</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                </div>

                <span className="dropdown">{<Login />}</span>
            </nav>
        </div>
    )
}
