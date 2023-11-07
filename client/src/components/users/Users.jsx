import React, { useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

export default function Users() {
    const api = useAxios();
    const [users, setUsers] = useState([{
        id: "",
        name: "",
        role: "",
        rollNumber: "",
        email: ""
    }])

    const navigate = useNavigate();

    const currUser = useSelector((state) => state?.user);


    function loadTable(arr) {
        let newMenu = [];
        for (let i = 0; i < arr.length; i++) {
            newMenu.push(arr[i]);
        }
        setUsers(newMenu);
    }


    function CreateTables() {
        return (
            <>
                {users.map((c, i) => {
                    return (
                        <tr key={i}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.role}</td>
                            <td>{c.rollNumber}</td>
                            <td>{c.email}</td>
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
            const res = await api.get(`/users`);
            console.log(res.data);
            loadTable(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        currUser?.role !== 'admin' ?
            <div className="d-flex justify-content-center align-items-center" style={{ height: '65vh' }}>
                <div className="text-center">
                    <h2>You are not authorized to view this page</h2>
                    <Button onClick={() => navigate('/')} variant="primary" className='me-3'>Go to Home</Button>
                    <Button onClick={() => navigate('/login', { state: { redirect: '/admin' } })} variant="secondary">Go to Login</Button>
                </div>
            </div>
            :
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>RollNumber</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <CreateTables />
                    </tbody>
                </table>
            </div>
    )
}
