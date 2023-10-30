import React from 'react'
import './mainarea.css'

export default function Mainarea() {
  return (
    <div className="main-container">
        <div className="maintop">
            <div className="left">Company Name</div>
            <div className="right">Student Name</div>
        </div>
        <div className="maincontent">
            <h1 className="mainhead">Student Details</h1>
            <div className="somegrid">some grid</div>
        </div>
    </div>
  );
}
