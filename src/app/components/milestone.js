import React, { useState, useEffect } from 'react';

import { useIdentityContext } from "react-netlify-identity-widget"

function Milestone(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState([]);

    const { user } = useIdentityContext();

    const { id, name } = props;

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

    // NOTE: get all the types of statuses
    // figure out the difference between `closed`
    // and `done` type

    const getPercentageComplete = (tasks = []) => {
        if (tasks.length === 0) return 0; // guard against 0/0 => NaN

        const numCompletedTasks = tasks.filter(t => t.status.type === 'closed').length;
        return (numCompletedTasks / tasks.length) * 100;
    }

    return (
        <div>
            { isLoading && <div>Loading...</div> }
            <div>
                { name } -> { getPercentageComplete(tasks) }% complete
            </div>
            { !!tasks.length && <ul>
                { tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <span>{ task.name }</span>
                            <span> -> </span>
                            <span>{ task.status.status }</span>
                        </li>
                    );
                })}
            </ul>}
        </div>
    );
}

export default Milestone;
