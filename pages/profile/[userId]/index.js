import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import jwt_decode from 'jwt-decode';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import axios from '@/utils/axios';

import AlertActions from '@/components/Alert'

const UserProfile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState('')
    const router = useRouter()
    const [userId, setUserId] = useState('')
    const [user, setUser] = useState('')
    const [isEditingBasic, setIsEditingBasic] = useState(false);
    const [isEditingSecurity, setIsEditingSecurity] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [showAlertActions, setShowAlertActions] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [variant, setVariant] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    useEffect(() => {
        const storedValue = localStorage.getItem('token');
        console.log("primeiro token", isLoggedIn)
        setIsLoggedIn(storedValue)
        fetchUser();
    }, []);

    const fetchUser = async () => {
        console.log("segundo token", isLoggedIn)
        const decoded = jwt_decode(isLoggedIn)

        setUserId(decoded.userId)

        console.log(userId);

        try {
            const response = await axios.get(`http://localhost:4000/api/users/${userId}`);
            setUser(response.data)
            setBasicInfo({
                username: response.data.username,
                email: response.data.email,
                name: response.data.name
            })
            console.log("e aqui, entrou?", basicInfo)
        } catch (error) {
            console.log('Error fetching user:', error);
            return null;
        }

    }

    const [basicInfo, setBasicInfo] = useState({
        username: '',
        email: '',
        name: '',
    });

    const [securityInfo, setSecurityInfo] = useState({
        password: '',
        confirmPassword: '',
    });

    const [description, setDescription] = useState("I'm a book lover!");

    const handleEditBasic = () => {
        setIsEditingBasic(true);
    };

    const handleEditSecurity = () => {
        setIsEditingSecurity(true);
    };

    const handleEditDescription = () => {
        setIsEditingDescription(true);
    };

    const handleCancel = () => {
        setIsEditingBasic(false);
        setIsEditingSecurity(false);
        setIsEditingDescription(false);
    };

    const handleSaveBasic = async () => {
        // Send API request to update basic info
        setIsEditingBasic(false);
    };

    const handleSaveSecurity = async () => {
        // Send API request to update security info
        setIsEditingSecurity(false);
    };

    const handleSaveDescription = async () => {
        // Send API request to update description
        setIsEditingDescription(false);
    };


    const handleCancelDelete = async (e) => {
        e.preventDefault();
        setShowAlertActions(false)
    }

    const DeleteMessage = () => {
        return (
            <>
                <p className='text-uppercase mb-2'><strong>Atenção</strong></p>
                <p>Tem certeza de que quer excluir sua conta? <strong>Essa ação não pode ser desfeita posteriormente.</strong></p>
                <Button className='me-2' onClick={handleDeleteAccount} variant="danger">Yes</Button>
                <Button onClick={handleCancelDelete} variant="info">Cancel</Button>
            </>
        )
    }

    const handleConfirmDeleteBasic = async () => {
        console.log("ok, entrou no handle")
        setAlertMessage(DeleteMessage)
        setVariant('danger')
        setShowAlertActions(true)
    }

    const handleDeleteAccount = async (id) => {
        localStorage.removeItem("token")
        axios.delete(`http://localhost:4000/api/users/${id}`)
        router.push('/')
    }

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h2>User Profile</h2>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <div className="mb-4">
                        <h4>Basic Info</h4>
                        {isEditingBasic ? (
                            <Form>
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={basicInfo.username}
                                        onChange={(e) => setBasicInfo({ ...basicInfo, username: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={basicInfo.email}
                                        onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="fullName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={basicInfo.fullName}
                                        onChange={(e) => setBasicInfo({ ...basicInfo, fullName: e.target.value })}
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={handleSaveBasic} className="mr-2">
                                    Save
                                </Button>
                                <Button variant="secondary" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </Form>
                        ) : (
                            <div>
                                <p>Username: {basicInfo.username}</p>
                                <p>Email: {basicInfo.email}</p>
                                <p>Full Name: {basicInfo.name}</p>
                                <div>
                                    <Button variant="info" onClick={() => handleEditBasic}>
                                        Edit
                                    </Button>
                                    <Button variant="danger" onClick={() => handleConfirmDeleteBasic}>
                                        Delete User
                                    </Button>
                                </div>
                                {/* <Alert variant='danger'>
                                    <p>Tem certeza que deseja deletar a sua conta?</p>
                                    <Button className='me-2' onClick={handleDeleteBasic} variant="danger">Yes</Button>
                                    <Button onClick={handleCancelDelete} variant="info">Cancel</Button>
                                </Alert> */}
                                <AlertActions
                                    alertAction={showAlert}
                                    alertMessage={alertMessage}
                                    variant={variant}
                                />
                            </div>
                        )}
                    </div>

                    {/* Add Security Info Section */}
                    {/* Add Description Section */}
                </Col>
                <Col md={6}>
                    {/* Add Books Section */}
                    {/* Add Last Comments Section */}
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;
