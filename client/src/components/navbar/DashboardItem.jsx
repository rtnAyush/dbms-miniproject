import React from 'react';
import './dashBoardItem.css';

export default function DashboardItem({heading='', listItems=[]}) {
    const renderItems = listItems.map((item, ind) => <li key={ind}>{item}</li> )

    return (
        <>
            {heading !== '' && <span>{heading}</span>}
            <ul>
                {renderItems}
            </ul>
        </>
  )
}
