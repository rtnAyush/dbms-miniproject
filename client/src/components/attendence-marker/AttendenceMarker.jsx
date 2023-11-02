import { useState } from 'react';
import useGeoLocation from '../../hooks/useLocation'
import { Button, Image, Modal } from 'react-bootstrap';
import useAxios from '../../hooks/useAxios';

export default function AttendenceMarker() {

    const location = useGeoLocation();
    const [show, setShow] = useState(false);

    const api = useAxios();


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
        } catch (error) {
            console.log(error?.response?.data);
        }
    }


    return (
        <>
            <div className="subject__block">

                <div className="details">


                    <h1 className='header'>Mark Your Attendance For Below Subject</h1>

                    <p className="sub__name">
                        Subject:
                    </p>
                    <p className="timings">
                        Timings:
                    </p>


                </div>

                <section className="mark__btns">
                    <Button
                        variant="contained"
                        onClick={handleAttendence}
                    >
                        Present
                    </Button>


                    <Button
                        variant="outlined" >
                        Absent
                    </Button>
                </section>


            </div>
            <div>
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Image src="/assets/happy.gif" alt="" style={{ width: '100px', objectFit: 'cover' }} />
                        <span>You are {JSON.stringify(location)} m from class</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => setShow(false)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* <Modal>
                    {"Great your Attendence has been marked"}

                    <DialogContent>
                        <DialogContentText className='dialog__done'>

                            <img src={DoneGif} alt="" style={{ width: '100px', objectFit: 'cover' }} />
                            <span>You are {userLocation} m from class</span>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Thanks
                        </Button>
                    </DialogActions>

                    <DialogTitle style={{ textAlign: 'center' }} className='dialog__done'>
                        <SentimentDissatisfiedIcon />
                        <strong>Oops, Invailed Attempt to mark attendence</strong>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText className='dialog__done'>

                            <img src={SadGif} alt="" style={{ width: '100px', objectFit: 'cover' }} />
                            <span>You are {userLocation} m from class</span>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Thanks
                        </Button>
                    </DialogActions>

                </Modal> */}
            </div>

        </>
    )
}
