import React, {useState, useEffect} from 'react'
import './menu.css'
import useAxios from '../../hooks/useAxios';

export default function Menu() {
    const today = new Date();
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    let day = days[today.getDay()];
    const api = useAxios();
    const sessions = ["breakfast", "lunch", "snack", "dinner"];

    const [menu, setMenu] = useState(["", "", "", ""]);

    function dateData() {
        let returnVal = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
        return returnVal;
    }

    function loadTable(arr) {
        let newMenu = [...menu];
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].session === sessions[0]) {
                newMenu[0] += ` ${arr[i].food.name}`;
            } else if(arr[i].session === sessions[1]) {
                newMenu[1] += ` ${arr[i].food.name}`;
            } else if(arr[i].session === sessions[2]) {
                newMenu[2] += ` ${arr[i].food.name}`;
            } else if(arr[i].session === sessions[3]) {
                newMenu[3] += ` ${arr[i].food.name}`;
            }
        }
        setMenu(newMenu);
    }

    function CreateMenu() {
        return (
            <>
            {menu.map((c, i) => {
                return (
                    <td key={i}>
                        {c}
                    </td>
                )
            }
            )}
            </>
        )
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line 
    }, []);

    async function fetchData() {
        try {
            const res = await api.get(`/menu?day=${day}`);
            console.log(res.data);
            loadTable(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="menuContainer">
        <div className="tablecontainer">
            <h1 className="dateHeader">
                MENU <br />
                <div className="date">
                    {dateData()}
                </div>
                <br />
            </h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Breakfast</th>
                    <th>Lunch</th>
                    <th>Snacks</th>
                    <th>Dinner</th>
                </tr>
                </thead>
                <tbody>
                <tr className='bd'>
                    <CreateMenu />
                </tr>
                </tbody>
            </table> 
        </div>
    </div>
  )
}
