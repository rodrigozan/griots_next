import React, { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Sidebar = ({expand}) => {
    const [url, setUrl] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token)

        const userId = decoded.userId

        setUrl(`/profile/${userId}`)
    }, [])

    return (
        <>
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
            <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href={url}>Profile</Nav.Link>
                <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                        Something else here
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </>
    )
}

export default Sidebar