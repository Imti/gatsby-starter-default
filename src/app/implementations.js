import React, { useState, useEffect } from 'react';
import Implementation from './components/implementation';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useIdentityContext } from "react-netlify-identity-widget"

function Implementations() {
    const [isLoading, setIsLoading] = useState(true);
    const [implementations, setImplementations] = useState([]);
    const { user } = useIdentityContext();

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

    // TODO: style stuff better

    return (
        <Container>
            { isLoading && <div>Loading Implementations...</div> }
            <br />
            <h3>Implementations</h3>
            <br />
            <Row>
                { implementations.map((implementation) => {
                    return (
                        <Col md={6} xs={12}>
                            <Implementation
                                key={implementation.id }
                                {...implementation} />
                            <br />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default Implementations;
