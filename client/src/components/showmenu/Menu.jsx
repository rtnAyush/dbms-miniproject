import React, { useState, useEffect } from 'react'
import './menu.css'
import useAxios from '../../hooks/useAxios';
import { Placeholder, Table } from 'react-bootstrap';

export default function Menu() {
    const today = new Date();
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    let day = days[today.getDay()];
    const api = useAxios();
    const sessions = ["breakfast", "lunch", "snack", "dinner"];

    const [menu, setMenu] = useState([[], [], [], []]);
    const [loading, setLoading] = useState(false);

    function dateData() {
        let returnVal = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
        return returnVal;
    }

    function loadTable(arr) {
        let newMenu = [...menu];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].session === sessions[0]) {
                newMenu[0].push(arr[i].food.name);
            } else if (arr[i].session === sessions[1]) {
                newMenu[1].push(arr[i].food.name);
            } else if (arr[i].session === sessions[2]) {
                newMenu[2].push(arr[i].food.name);
            } else if (arr[i].session === sessions[3]) {
                newMenu[3].push(arr[i].food.name);
            }
        }
        setMenu(newMenu);
    }


    function CreateMenu() {
        return (
            <>
                {menu.map((items, i) => {
                    return (
                        <td key={i}>
                            <div className='d-flex flex-wrap gap-1'>
                                {
                                    items.map((item, j) => {
                                        return (
                                            <span className='food-item' key={j}>
                                                {item}
                                            </span>
                                        )
                                    })
                                }
                            </div>
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
            setLoading(true);
            const res = await api.get(`/menu?day=${day}`);
            loadTable(res.data.data);
        } catch (error) {
            console.error(error);
            alert(error?.response?.data ? error?.response?.data.msg : "something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="menuContainer">
            <div className="container">
                <h1 className="dateHeader">
                    MENU <br />
                    <div className="date">
                        {dateData()}
                    </div>
                    <br />
                </h1>
                <Table className="table" hover responsive>
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
                            {
                                !loading ?
                                    <CreateMenu />
                                    :
                                    <>
                                        <Placeholder as={'td'} animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                        <Placeholder as={'td'} animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                        <Placeholder as={'td'} animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                        <Placeholder as={'td'} animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                    </>
                            }
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
