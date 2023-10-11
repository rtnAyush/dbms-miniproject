import React from 'react'
import DashboardItem from './DashboardItem';
import './navbar.css'

export default function Navbar() {
  return (
    <div className="nav-container">
      <div className="logo">
        hef;sdjas;z
      </div>
      <div className="options">
        <ul className='mainUl'>
          <DashboardItem listItems={['Dashboard']} />
          <DashboardItem heading='Students and Teachers' listItems={['Students', 'Teachers']} />
          <DashboardItem heading='Subjects And Classes' listItems={['Subjects', 'Classes']} />
          <DashboardItem heading='Exams And Results' listItems={['Exams', 'Results']} />
        </ul>
      </div>
    </div>
  );
}