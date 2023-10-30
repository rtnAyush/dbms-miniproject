import React from 'react'
import './mainarea.css'
import DashboardGridItem from './dashboardGridItem';

export default function Mainarea() {
  return (
    <div className="main-container">
        <div className="maintop">
            <div className="left">Company Name</div>
            <div className="right">Student Name</div>
        </div>
        <div className="maincontent">
            <div className="mainhead">
              <h1>Student Details</h1>
              Student details dashboard
            </div>
            <div className="somegrid">
              <DashboardGridItem num='3' name='registered students'/>
              <DashboardGridItem num='4' name='registered teachers'/>
              <DashboardGridItem num='3' name='registered students'/>
              <DashboardGridItem num='4' name='registered teachers'/>
              <DashboardGridItem num='3' name='registered students'/>
              <DashboardGridItem num='4' name='registered teachers'/>
              <DashboardGridItem num='3' name='registered students'/>
              <DashboardGridItem num='4' name='registered teachers'/>
            </div>
        </div>
    </div>
  );
}
