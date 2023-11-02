import { useEffect, useState } from 'react'
import Complain from './Complain'
import useAxios from '../../hooks/useAxios'
import './complains.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function Complains() {
    const api = useAxios();
    const [complains, setComplains] = useState([]);
    const [errMsg, setErrMsg] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const [sort, setSort] = useState('createdAt');

    useEffect(() => {
        getComplains(sort);
        console.log(sort);
        // eslint-disable-next-line
    }, [sort]);

    async function getComplains(sort) {
        try {
            const res = await api.get(`/complains?sort=${sort}`);
            setComplains(res.data?.data);
            console.log(res.data?.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleComplain(e) {
        // e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const body = {
                title: formData.get('title'),
                desc: formData.get('description'),
                session: formData.get('session'),
                userId1: 1
            }
            const res = await api.post('/complains', body);
            setErrMsg(res.data?.data?.error);
            setShow(false);
            navigate('/complaints');
        } catch (error) {
            console.log(error);
            setErrMsg(true)
        }
    }


    return (
        <>
            <div className='container'>
                <h1 className='m-4'>All Complains List</h1>
                <section className='d-flex justify-content-end my-4'>
                    <Button variant="primary" style={{ whiteSpace: 'nowrap' }} onClick={() => setShow(true)}> Add New Complaint</Button>
                </section>
                <section className='d-flex justify-content-end' style={{ maxWidth: '900px', margin: '1rem auto', }}>
                    <div>
                        <Form.Select on onChange={(e) => setSort(e.target.value)} value={sort} required className="mb-3">
                            <option>--SORT BY--</option>
                            <option value="upvote">upvote</option>
                            <option value="downvote">downvote</option>
                            <option value="createdAt">createdAt</option>
                        </Form.Select>
                    </div>
                </section>
                {
                    complains.map((complain, idx) => (
                        <Complain key={idx} complain={complain} />
                    ))
                }
            </div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Your Complaint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleComplain}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required name='title' type="text" placeholder="Enter your title..." />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter your description</Form.Label>
                            <Form.Control required name='description' as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Select name='session' required className="mb-3">
                            <option>--SELECT SESSION--</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="snack">Snack</option>
                            <option value="dinner">Dinner</option>
                        </Form.Select>
                        {
                            errMsg && <p className='text-danger text-center'>Something went wrong</p>
                        }
                        <Form.Group className="mb-3 d-flex gap-2 justify-content-end">
                            <Button variant="secondary" onClick={() => setShow(false)}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>

                </Modal.Body>
            </Modal>
        </>
    )
}
