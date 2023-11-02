import React from 'react'
import './mainarea.css'
import DashboardGridItem from './dashboardGridItem';
// import { profileData } from '../login/Nav';

export default function Mainarea() {
  // console.log(profileData.profileName, " hello -> bhai")
  return (
    <div className="main-container">
        <div className="maincontent">
            <div className="somegrid">
              <DashboardGridItem num='3' name='registered students' col='#4b26e0' icon='fa fa-graduation-cap'/>
              <DashboardGridItem num='4' name='registered teachers' col='#02db18' icon='fa fa-users'/>
              <DashboardGridItem num='3' name='registered students' col='#fa0202' icon='fa fa-graduation-cap'/>
              <DashboardGridItem num='4' name='registered teachers' col='#fac002' icon='fa fa-users'/>
              <DashboardGridItem num='3' name='registered students' col='#029efa' icon='fa fa-graduation-cap'/>
              <DashboardGridItem num='3' name='registered students' col='#4b26e0' icon='fa fa-users'/>
              <DashboardGridItem num='4' name='registered teachers' col='#02db18' icon='fa fa-graduation-cap'/>
              <DashboardGridItem num='3' name='registered students' col='#fa0202' icon='fa fa-users'/>
            </div>
        </div>
    </div>
  );
}
