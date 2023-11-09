import Table from 'react-bootstrap/Table';
import { useSelector } from "react-redux";
import AdminUnAuth from "../utils/AdminUnAuth";
import useAxios from '../../hooks/useAxios';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

export default function DailyCount() {
    const currUser = useSelector((state) => state?.user);
    const api = useAxios();
    const [dailyCount, setDailyCount] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDailyCount();
        // eslint-disable-next-line
    }, [])

    async function fetchDailyCount() {
        try {
            setLoading(true);
            const res = await api.get('/attendence');
            setDailyCount(res?.data?.data);
        } catch (error) {
            alert(error?.response?.data?.msg)
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        currUser?.role !== 'admin' ?
            <AdminUnAuth redirect={'/admin/daily-count'} />
            :
            <Table striped bordered hover className='mt-5'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Date</th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Snack</th>
                        <th>Dinner</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !loading ?
                            dailyCount?.length !== 0 ?
                                dailyCount.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item.id}</td>
                                        <td>{item.date}</td>
                                        <td>{item.breakfast}</td>
                                        <td>{item.lunch}</td>
                                        <td>{item.snack}</td>
                                        <td>{item.dinner}</td>
                                    </tr>
                                ))
                                :
                                "No data found"
                            :
                            <div className='text-center m-5'>
                                <Spinner />
                            </div>
                    }
                </tbody>
            </Table>
    );
}
