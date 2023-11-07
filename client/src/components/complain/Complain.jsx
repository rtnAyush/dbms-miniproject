import moment from "moment";
import { Card } from "react-bootstrap";
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


    return (
        <Card className="complain" style={{ maxWidth: '900px', margin: '1rem auto', }}>
            <Card.Body >
                <Card.Title>{complain?.title}</Card.Title>
                <Card.Text>
                    {complain?.description}
                </Card.Text>
                <Card.Link onClick={() => handleVote('up')}><i className="vote fa fa-arrow-up" /> {complain?.upvote}</Card.Link>
                <Card.Link onClick={() => handleVote('down')}><i className="vote fa fa-arrow-down" /> {complain?.downvote}</Card.Link>
                <Card.Link className="card-point">{moment(complain?.createdAt).format("MMM DD, YYYY")}</Card.Link>
                <Card.Link className="card-point">{moment(complain?.createdAt).format("hh:mm a")}</Card.Link>
                <Card.Link className="card-point">{complain?.session}</Card.Link>
                <Card.Link className="card-point">{complain?.author?.name}</Card.Link>
            </Card.Body>
        </Card >
    );
};