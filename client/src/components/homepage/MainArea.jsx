import React from 'react'
import './mainarea.css'
import DashboardGridItem from './dashboardGridItem';

export default function Mainarea() {
  const colors = [
    '#02db18',
    '#fa0202',
    '#029efa',
    '#4b26e0',
    '#02db18'
  ];
  const profileData = [
    {
      name: "Mark Attendance",
      link: "/attendance",
      icon: "fa fa-calendar-check",
      col: colors[0]
    },
    {
      name: "See Live Mess Menu",
      link: "/menu",
      icon: "fa fa-cutlery",
      col: colors[1]
    },
    {
      name: "Complaints",
      link: "/complaints",
      icon: "fa fa-commenting",
      col: colors[2]
    },
    {
      name: "Admin",
      link: "/complaints",
      icon: "fa fa-user-secret",
      col: colors[3]
    },
  ]
  return (
    <div className="main-container">
      <div className="maincontent">
        <div className="somegrid">
          {
            profileData.map((item, idx) => (
              <DashboardGridItem key={idx} name={item.name} col={item.col} icon={item.icon} link={item.link} />
            ))
          }
        </div>
      </div>
    </div>
  );
}