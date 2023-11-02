import React, {useState, useEffect} from 'react';
import useAxios from '../../hooks/useAxios';

export default function Users() {
    const api = useAxios();
    const [users, setUsers] = useState([{
        id: "",
        name: "",
        role: "",
        rollNumber: "",
        email: ""
    }])

    function loadTable(arr) {
        let newMenu = [];
        for(let i = 0; i < arr.length; i++) {
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
