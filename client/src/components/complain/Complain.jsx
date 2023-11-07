import moment from "moment";
import { Button, Card } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";


export default function Complain({ complain, currUser }) {

    const api = useAxios();
    const navigate = useNavigate();

    async function handleVote(vote) {
        if (!currUser) {
            navigate('/login', { state: { redirect: '/complaints' } });
            return;
        }
        try {
            const body = {
                vote: vote,
                userId1: currUser?.userId,
                complainId1: complain?.id
            }

            await api.put("/complains", body);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDelete() {
        try {
            await api.delete(`/complains/${complain?.id}`);
            window.location.reload();
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
                        {currUser?.id === complain?.authorId && <Button variant="danger" size="sm" onClick={handleDelete} className="">Delete</Button>}
                    </div>
                </Card.Title>
                <Card.Text>
                    {complain?.description}
                </Card.Text>

                <Card.Link onClick={() => handleVote('up')}><i className="vote fa fa-arrow-up" /> {complain?.upvote}</Card.Link>
                <Card.Link onClick={() => handleVote('down')}><i className="vote fa fa-arrow-down" /> {complain?.downvote}</Card.Link>

                <Card.Link className="card-point">{moment(complain?.createdAt).format("MMM DD, YYYY")}</Card.Link>
                <Card.Link className="card-point">{moment(complain?.createdAt).format("hh:mm a")}</Card.Link>
                <Card.Link className="card-point">{complain?.session}</Card.Link>
                <Card.Link className="card-point d-none d-md-inline">{complain?.author?.name}</Card.Link>

            </Card.Body>
        </Card>
    );
};