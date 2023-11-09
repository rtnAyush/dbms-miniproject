import moment from "moment";
import { Card } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Complain({ complain, currUser, setRefresh }) {

    const api = useAxios();
    const navigate = useNavigate();
    const [voted, setVoted] = useState([]);

    useEffect(() => {
        fetchVoted();
        // eslint-disable-next-line
    }, [complain])

    async function handleVote(vote) {
        console.log(currUser);
        if (!currUser) {
            navigate('/login', { state: { redirect: '/complaints' } });
            return;
        }
        try {
            const body = {
                vote: vote,
                userId1: currUser?.id,
                complainId1: complain?.id
            }

            await api.put("/complains", body);
            setRefresh(Math.random());
        } catch (error) {
            console.error(error);
            alert(error?.response?.data ? error?.response?.data?.msg : "something went wrong");
        }
    }

    // async function handleDelete() {
    //     if (!currUser) {
    //         navigate('/login', { state: { redirect: '/complaints' } });
    //         return;
    //     }
    //     try {
    //         await api.delete(`/complains/${complain?.id}`);
    //         window.location.reload();
    //     } catch (error) {
    //         console.error(error);
    //         alert(error?.response?.data?.msg);
    //     }
    // }

    async function fetchVoted() {
        try {
            const res = await api.get(`/complains/who-voted?complainId=${complain?.id}`);
            setVoted(res.data?.data)
        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.msg);
        }
    }



    return (
        <Card className="complain" style={{ maxWidth: '900px', margin: '1rem auto', }}>
            <Card.Body >
                <Card.Title className="d-flex justify-content-between">
                    {complain?.title}
                    <div>
                        <Card.Link className="card-point d-md-none">{complain?.author?.name}</Card.Link>
                        {/* {currUser?.id === complain?.authorId && <Button variant="danger" size="sm" onClick={handleDelete} className="">Delete</Button>} */}
                    </div>
                </Card.Title>
                <Card.Text>
                    {complain?.description}
                </Card.Text>

                <Card.Link onClick={() => handleVote('up')}><i className={`vote ${voted?.whoVotedUp?.includes(currUser?.id) ? "fa-solid" : "fa-regular"} fa-circle-up`} /> {complain?.upvote}</Card.Link>
                <Card.Link onClick={() => handleVote('down')}><i className={`vote ${voted?.whoVotedDown?.includes(currUser?.id) ? "fa-solid" : "fa-regular"} fa-circle-down`} /> {complain?.downvote}</Card.Link>

                <Card.Link className="card-point">{moment(complain?.createdAt).format("MMM DD, YYYY")}</Card.Link>
                <Card.Link className="card-point">{moment(complain?.createdAt).format("hh:mm a")}</Card.Link>
                <Card.Link className="card-point">{complain?.session}</Card.Link>
                <Card.Link className="card-point d-none d-md-inline">{complain?.author?.name}</Card.Link>

            </Card.Body>
        </Card>
    );
};