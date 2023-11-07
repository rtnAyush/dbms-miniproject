import React, { useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import AdminUnAuth from '../utils/AdminUnAuth';

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
            alert(error?.response?.data?.msg)
        }
    }

    return (
        currUser?.role !== 'admin' ?
            <AdminUnAuth redirect={'/admin/users'} />
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
