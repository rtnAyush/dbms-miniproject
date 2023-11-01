import React from 'react'
import './mainarea.css'
import DashboardGridItem from './dashboardGridItem';

export default function Mainarea() {
  return (
    <div className="main-container">
        <div className="maintop">
            <div className="left">Company Name</div>
            <div className="right"><i className="fa fa-user-circle" aria-hidden="true"></i>Student Name</div>
        </div>
        <div className="maincontent">
            <div className="mainhead">
              <h1>Student Details</h1>
              Student details dashboard
            </div>
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
