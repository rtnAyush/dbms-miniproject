import React from 'react'
// import DashboardItem from './DashboardItem';
import './navbar.css'
import { NavbarData } from './NavbarData';
import {
  //createBrowserRouter,
  //RouterProvider,
  //Route,
  Link,
} from "react-router-dom";

export default function Navbar() {
  return (
    <div className="nav-container">
      <div className="logo">
        <img src='logo.png' height='40px' alt='logo'/>
      </div>
      <div className="options">
        <ul className='mainUl'>
          {NavbarData.map((val, key) => {
            return (
              <Link to={val.link} key={key} style={{display: "block", textDecoration: "none", listStyleType: "none", padding: "20px 40px", fontSize: "25px"}} >
                <a href='/' style={{display: "block", textDecoration: "none", listStyleType: "none", fontSize: "25px"}}>
                {"    "}
                <i className={val.icon} aria-hidden='true'></i>
                {val.title}
                </a>
              </Link>
            )
          })}
          {/* <DashboardItem listItems={['Dashboard']} />
          <DashboardItem heading='Students and Teachers' listItems={['Students', 'Teachers']} />
          <DashboardItem heading='Subjects And Classes' listItems={['Subjects', 'Classes']} />
          <DashboardItem heading='Exams And Results' listItems={['Exams', 'Results']} /> */}
        </ul>
      </div>
    </div>
  );
}