import { Link } from "react-router-dom";
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn"
import "./nav.css"

import React, { useState } from 'react'

export default function Nav() {


    const profileData = {
        profileName: "",
        profileImage: "https://imgs.search.brave.com/z-3_VMVbo5k1c4nYN-MGQSo7jUle-HYqNAS5ED1Soag/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9kMnFw/MHNpb3RsYTc0Ni5j/bG91ZGZyb250Lm5l/dC9pbWcvdXNlLWNh/c2VzL3Byb2ZpbGUt/cGljdHVyZS90ZW1w/bGF0ZV8wLmpwZw",
        profileId: "",
        profileEmail: ""
    }
    const [obj, setObj] = useState(profileData)

    const [isLoggedIn, setLoggedIn] = useState(true);

    const falseMake = () => {
        setLoggedIn(false)
    }

    const trueMake = () => {
        setLoggedIn(true)
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light navpad">
                <Link className="navbar-brand" to="/nav">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/nav">Home <span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                </div>

                {isLoggedIn ?
                    <>
                        <div className="dropdown">
                            <div className="profile dropdown-toggle " id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><img src={obj.profileImage} alt="" /></div>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><Link className="dropdown-item" to="/nav">{<LogoutBtn fun={falseMake} />}</Link></li>
                            </ul>
                        </div>
                    </>
                    :
                    <>
                        <div className="profile"><LoginBtn stfun={setObj} fun={trueMake} /></div>
                    </>
                }
            </nav>
        </div>
    )
}
