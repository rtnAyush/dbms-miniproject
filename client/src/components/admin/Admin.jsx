import './admin.css'
import DashboardGridItem from '../homepage/dashboardGridItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

const colors = [
    '#02db18',
    '#fa0202',
    '#029efa',
    '#4b26e0',
    '#02db18'
];
const profileData = [
    {
        name: "See Users",
        link: "/admin/users",
        icon: "fa fa-users",
        col: colors[0]
    },
    {
        name: "View/modify Menu",
        link: "/admin/menu",
        icon: "fa fa-cutlery",
        col: colors[1]
    }
]

export default function Admin() {

    const navigate = useNavigate();

    const currUser = useSelector((state) => state?.user);

    useEffect(() => {
        if (!currUser) {
            navigate('/login', { state: { redirect: '/admin' } })
        }
        // eslint-disable-next-line
    }, [currUser])



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
            <div className="main-container">
                <div className="maincontent">
                    <div className="somegrid">
                        {
                            profileData.map((item, idx) => (
                                <DashboardGridItem key={idx} name={item.name} col={item.col} icon={item.icon} link={item.link} />
                            ))
                        }
                    </div>
                </div>
            </div>
    );
}
