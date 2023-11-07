import './admin.css'
import DashboardGridItem from '../homepage/dashboardGridItem';
import { useSelector } from 'react-redux';
import AdminUnAuth from '../utils/AdminUnAuth';

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
    const currUser = useSelector((state) => state?.user);



    return (
        currUser?.role !== 'admin' ?
            <AdminUnAuth redirect={'/admin'} />
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
