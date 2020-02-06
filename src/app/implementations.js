import React, { useState, useEffect } from 'react';
import Implementation from './components/implementation';

import { useIdentityContext } from "react-netlify-identity-widget"

function Implementations() {
    const [isLoading, setIsLoading] = useState(true);
    const [implementations, setImplementations] = useState([]);
    const { user } = useIdentityContext()

    useEffect(() => {
        fetch(`/.netlify/functions/get-spaces`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token.access_token,
            }
        })
            .then(response => response.json())
            .then(response => {
                setIsLoading(false);
                setImplementations(response.spaces);
            });
    }, []);

    return (
        <div>
            <br/>
            { isLoading && <div>Loading Implementations...</div> }
            { implementations.map((implementation) => {
                return (
                    <Implementation
                        key={implementation.id }
                        {...implementation} />
                );
            })}
        </div>
    );
}

export default Implementations;
