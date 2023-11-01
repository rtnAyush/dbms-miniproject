//import React from 'react'
import './dashboardGridItem.css'


export default function DashboardGridItem( {num, name, col, icon} ) {
  return (
    <div className='gridItem' style={{background: col}}>
      <div className='gridItemLeft'>
      <i className={icon} aria-hidden="true"></i></div>
      <div className='gridItemRight'>
        <h1>{num}</h1>
        <p>{name}</p>
      </div>
    </div>
  )
}
