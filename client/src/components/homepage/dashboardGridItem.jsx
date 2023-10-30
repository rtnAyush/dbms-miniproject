import React from 'react'
import './dashboardGridItem.css'

export default function DashboardGridItem( {num, name} ) {
  return (
    <div className='gridItem'>
      <div className='gridItemLeft'>dashboardGridItem</div>
      <div className='gridItemRight'>
        <h1>{num}</h1>
        <p>{name}</p>
      </div>
    </div>
  )
}
