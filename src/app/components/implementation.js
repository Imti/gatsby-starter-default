import React, { useState, useEffect } from 'react';
import Milestone from './milestone';

import { useIdentityContext } from "react-netlify-identity-widget"

function Implementation(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [lists, setLists] = useState([]);
    const { user } = useIdentityContext();

    const { id, name, statuses, features } = props;

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
        <div>
            <div><b>{ name }</b></div>
            { isLoading && <div>Loading...</div> }
            { lists.map((list) => {
                return (
                    <ul>
                        <li>{ list.name }</li>
                        <Milestone key={list.id} {...list} />
                    </ul>
                );
            })}
        </div>
    );
}

export default Implementation;
