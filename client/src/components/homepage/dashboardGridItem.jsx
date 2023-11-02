import React from 'react'
import './dashboardGridItem.css'
import { Link } from 'react-router-dom'

export default function DashboardGridItem({ num, link, name, col, icon }) {
  return (
    <Link to={link} className='gridItem shadow-sm' style={{ background: col }}>
      <div className='gridItemLeft'>
        <i className={icon} aria-hidden="true"></i></div>
      <div className='gridItemRight'>
        <h1>{num}</h1>
        <p>{name}</p>
      </div>
    </Link>
  )
}