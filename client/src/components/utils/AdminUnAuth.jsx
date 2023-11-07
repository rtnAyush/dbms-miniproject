import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { setLogout } from '../../state';

export default function AdminUnAuth({ redirect }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleRedirect() {
        dispatch(setLogout());
        navigate('/login', { state: { redirect } })
    }
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '65vh' }}>
            <div className="text-center">
                <h2>You are not authorized to view this page</h2>
                <Button onClick={() => navigate('/')} variant="primary" className='me-3'>Go to Home</Button>
                <Button onClick={handleRedirect} variant="secondary">Go to Login</Button>
            </div>
        </div>
    )
}
