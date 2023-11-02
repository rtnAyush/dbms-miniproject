import React from 'react'
import './menu.css'

export default function Menu() {
    function dateData() {
        let today = new Date();
        let returnVal = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
        return returnVal;
    }

  return (
    <div className="menuContainer">
        <div className="tablecontainer">
            <h1 className="dateHeader">
                    MENU <br />
                <div className="date">
                    {dateData()}
                </div>
            </h1>
            <table className="table">
                <tr>
                    <th>Breakfast</th>
                    <th>Lunch</th>
                    <th>Snacks</th>
                    <th>Dinner</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>something</td>
                </tr>
            </table> 
        </div>
    </div>
  )
}
