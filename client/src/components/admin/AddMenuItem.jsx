import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";

export default function AddMenuItem() {
    const api = useAxios();
    const [show, setShow] = useState(false);
    // eslint-disable-next-line
    const [day, setDay] = useState("");
    const sessions = ["breakfast", "lunch", "snack", "dinner"];
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const [tabledata, setTable] = useState([
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
    ]);

    function loadTable(arr) {
        let newTable = [[...tabledata[0]], [...tabledata[1]], [...tabledata[2]], [...tabledata[3]], [...tabledata[4]], [...tabledata[5]], [...tabledata[6]]]
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].day === days[0]) {
                if (arr[i].session === sessions[0]) {
                    newTable[0][0] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[1]) {
                    newTable[0][1] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[2]) {
                    newTable[0][2] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[3]) {
                    newTable[0][3] += ` ${arr[i].food.name},`;
                }
            } else if (arr[i].day === days[1]) {
                if (arr[i].session === sessions[0]) {
                    newTable[1][0] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[1]) {
                    newTable[1][1] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[2]) {
                    newTable[1][2] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[3]) {
                    newTable[1][3] += ` ${arr[i].food.name},`;
                }
            } else if (arr[i].day === days[2]) {
                if (arr[i].session === sessions[0]) {
                    newTable[2][0] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[1]) {
                    newTable[2][1] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[2]) {
                    newTable[2][2] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[3]) {
                    newTable[2][3] += ` ${arr[i].food.name},`;
                }
            } else if (arr[i].day === days[3]) {
                if (arr[i].session === sessions[0]) {
                    newTable[3][0] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[1]) {
                    newTable[3][1] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[2]) {
                    newTable[3][2] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[3]) {
                    newTable[3][3] += ` ${arr[i].food.name},`;
                }
            } else if (arr[i].day === days[4]) {
                if (arr[i].session === sessions[0]) {
                    newTable[4][0] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[1]) {
                    newTable[4][1] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[2]) {
                    newTable[4][2] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[3]) {
                    newTable[4][3] += ` ${arr[i].food.name},`;
                }
            } else if (arr[i].day === days[5]) {
                if (arr[i].session === sessions[0]) {
                    newTable[5][0] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[1]) {
                    newTable[5][1] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[2]) {
                    newTable[5][2] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[3]) {
                    newTable[5][3] += ` ${arr[i].food.name},`;
                }
            } else if (arr[i].day === days[6]) {
                if (arr[i].session === sessions[0]) {
                    newTable[6][0] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[1]) {
                    newTable[6][1] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[2]) {
                    newTable[6][2] += ` ${arr[i].food.name},`;
                } else if (arr[i].session === sessions[3]) {
                    newTable[6][3] += ` ${arr[i].food.name},`;
                }
            }
        }
        setTable(newTable);
    }

    function CreateTable() {
        return (
            <>
                {tabledata.map((c, i) => {
                    return (
                        <tr key={i}>
                            <td key={`${i}5`}>{days[i]}</td>
                            {c.map((el, j) => {
                                return (
                                    <td key={`${i}${j}`}>{el}</td>
                                )
                            }
                            )}
                        </tr>
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

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        // console.log(formData.get("name"));

        try {
            const body = {
                day: formData.get("day"),
                session: formData.get("session"),
                name: formData.get("name"),
            };
            const res = await api.post("/menu", body);
            console.log(res.data);
            setShow(false);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div style={{ margin: "10px 10px 10px auto" }}>
                <Button onClick={() => setShow(true)}>Add menu</Button>
            </div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1>Add Item To Menu</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Select
                            name="day"
                            aria-label="select day"
                        >
                            <option value="" disabled selected hidden>Choose a day</option>
                            <option value={days[0]}>{days[0]}</option>
                            <option value={days[1]}>{days[1]}</option>
                            <option value={days[2]}>{days[2]}</option>
                            <option value={days[3]}>{days[3]}</option>
                            <option value={days[4]}>{days[4]}</option>
                            <option value={days[5]}>{days[5]}</option>
                            <option value={days[6]}>{days[6]}</option>
                        </Form.Select>
                        <Form.Select
                            name="session"
                            aria-label="select session"
                        >
                            <option value="" disabled selected hidden>Choose a session</option>
                            <option value={sessions[0]}>{sessions[0]}</option>
                            <option value={sessions[1]}>{sessions[1]}</option>
                            <option value={sessions[2]}>{sessions[2]}</option>
                            <option value={sessions[3]}>{sessions[3]}</option>
                        </Form.Select>
                        <Form.Control
                            name="name"
                            type="text"
                            placeholder="Enter Item Name"
                        />
                        <Form.Control type="submit" value="submit" />
                        <Form.Control onClick={() => setShow(false)} type="button" value="Close" />
                    </Form>
                </Modal.Body>
            </Modal>
            <div className="table2">
                <div className="tablecontainer2">
                    <table className="table3">
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>{sessions[0]}</th>
                                <th>{sessions[1]}</th>
                                <th>{sessions[2]}</th>
                                <th>{sessions[3]}</th>
                            </tr>
                        </thead>
                        <tbody className='tb'>
                            <CreateTable />
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
