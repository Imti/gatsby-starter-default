import React, { useState, useEffect } from 'react';
import Milestone from './milestone';

import Card from 'react-bootstrap/Card';

import { useIdentityContext } from "react-netlify-identity-widget"

function Implementation(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [lists, setLists] = useState([]);
    const { user } = useIdentityContext();

    const { id, name } = props;

    useEffect(() => {
        fetch(`/.netlify/functions/get-lists?space_id=${id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token.access_token,
            }
        })
            .then(response => response.json())
            .then(response => {
                setIsLoading(false);
                setLists(response.lists);
            });
    }, []);

    return (
        <Card>
            <Card.Body>
                <Card.Title>{ name }</Card.Title>
                { isLoading && <div>Loading...</div> }
                <Card.Text className="text-muted">
                    { !!lists.length && <ol>
                        { lists.map((list) => {
                            return (
                                <li>
                                    <Milestone key={list.id} {...list} />
                                </li>
                            );
                        })}
                    </ol> }
                </Card.Text>
                <Card.Link className="float-right" href="http://google.com">See Progress →</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default Implementation;
