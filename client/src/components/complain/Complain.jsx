import { useState } from "react";
import moment from "moment";
import { Card } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";


export default function Complain({ complain }) {
    const [up, setUp] = useState(complain?.upvote);
    const [down, setDown] = useState(complain?.downvote);

    const api = useAxios();

    async function handleVote(vote) {
        try {
            const body = {
                vote: vote,
                userId1: complain?.authorId,
                complainId1: complain?.id
            }

            await api.put("/complains", body);

            if (vote === 'up') {
                setUp((prev) => prev + 1);
            } else {
                setDown((prev) => prev - 1);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Card className="complain" style={{ maxWidth: '900px', margin: '1rem auto', }}>
            <Card.Body >
                <Card.Title>{complain?.title}</Card.Title>
                <Card.Text>
                    {complain?.description}
                </Card.Text>
                <Card.Link onClick={() => handleVote('up')}><i className="vote fa fa-arrow-up" /> {up}</Card.Link>
                <Card.Link onClick={() => handleVote('down')}><i className="vote fa fa-arrow-down" /> {down}</Card.Link>
                <Card.Link className="card-point">{moment(complain?.createdAt).format("MMM DD, YYYY")}</Card.Link>
                <Card.Link className="card-point">{moment(complain?.createdAt).format("hh:mm a")}</Card.Link>
                <Card.Link className="card-point">{complain?.session}</Card.Link>
                <Card.Link className="card-point">{complain?.author?.name}</Card.Link>
            </Card.Body>
        </Card >
    );
};