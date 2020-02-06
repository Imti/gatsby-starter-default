import React, { useState, useEffect } from 'react';

import { useIdentityContext } from "react-netlify-identity-widget"

function Milestone(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    console.log('Milestone props', props);

    const { user } = useIdentityContext();

    const { id } = props;

    useEffect(() => {
        fetch(`/.netlify/functions/get-tasks?list_id=${id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token.access_token,
            }
        })
            .then(response => response.json())
            .then(response => {
                setIsLoading(false);
                setTasks(response.tasks);
            });
    }, []);

    return (
        <div>
            { isLoading && <div>Loading...</div> }
            { !!tasks.length && <ul>
                { tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            { task.name }
                        </li>
                    );
                })}
            </ul>}
        </div>
    );
}

export default Milestone;
