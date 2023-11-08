import './AttendenceMarker.css'

import { useEffect, useState } from 'react';
import useGeoLocation from '../../hooks/useLocation'
import { Container, Button, Image, Modal } from 'react-bootstrap';
import useAxios from '../../hooks/useAxios';
import Clock from './Clock';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const options = { day: '2-digit', month: 'short', year: 'numeric' };
const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date());



export default function AttendenceMarker() {

    const location = useGeoLocation();
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState(<h3>Collecting Info...</h3>);
    const [gif, setGif] = useState('/assets/happy.gif')
    const api = useAxios();
    const navigate = useNavigate();

    const currUser = useSelector((state) => state?.user);

    useEffect(() => {
        if (!currUser) {
            navigate('/login', { state: { redirect: '/attendance' } })
        }
        // eslint-disable-next-line
    }, [currUser])

    async function handleAttendence() {
        setShow(true);

        if (!location.loaded) {
            alert('Please allow the location');
            setShow(false);
            return;
        }
        try {
            const body = {
                lat: location.coordinates.lat,
                lon: location.coordinates.lng,
                userId: 1,
            }
            const res = await api.post('/attendence/mark', body);
            console.log('222', res);
            setMsg(<h3>Attendence Marked Successfully</h3>)
            setGif('/assets/happy.gif')

        } catch (error) {
            if (error) {
                setGif('/assets/sad.gif')
                setMsg(error?.response?.data ? <h3>{error?.response?.data?.msg}</h3> : <h3>Something went wrong</h3>)
                console.log(location)
            }
            console.log(error?.response?.data);
        }
    }


    return (
        <>
            <Container className="subject__block">

                <div className="details">


                    <h1 className='header' style={{ color: "white" }}>Mark Your Attendance</h1>

                    <h5 className="sub__name" style={{ color: "white" }}>
                        {/* Date: {new Date().toDateString()} */}
                        Date: {formattedDate}
                    </h5>
                    <h5 className="timings" style={{ color: "white" }}>
                        Time: {<Clock />}
                    </h5>


                </div>

                <section className="mark__btns" style={{ color: "white" }}>
                    <Button
                        variant="light"
                        onClick={handleAttendence}
                    >
                        Present
                    </Button>


                    {/* <Button
                        variant="dark" >
                        Absent
                    </Button> */}
                </section>


            </Container>
            <div>
                <Modal show={show} onHide={() => setShow(false)} size='lg'>
                    <Modal.Header className='modal-heading-cont'>
                        <Modal.Title className='modal-heading'>Welcome to Mess Buddy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modal-body-cont'>
                        <Image className='modal-image' src={gif} alt="" style={{ width: '100px', objectFit: 'cover' }} />
                        <br />
                        {/* <span className='modal-loc-data'>You are {JSON.stringify(location)} m from class</span>
                         */}
                        {/* <span className='modal-body-msg'>{msg}</span> */}
                        {msg}
                    </Modal.Body>
                    <Modal.Footer className='modal-footer-cont'>
                        <Link to="/">
                            <Button size='lg' variant="secondary" onClick={() => setShow(false)}>
                                Close
                            </Button>
                        </Link>
                        {/* <Button variant="primary" onClick={() => setShow(false)}>
                            Save Changes
                        </Button> */}
                    </Modal.Footer>
                </Modal>


            </div>

        </>
    )
}
