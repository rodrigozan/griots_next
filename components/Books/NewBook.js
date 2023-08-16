import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';


import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import axios from '@/utils/axios';
import withAuth from '@/utils/withAuth';

import genres from '@/json/genres.json';

const NewBook = ({ goToRegister }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [genreSelected, setGenreSelected] = useState('');
    const [description, setDescription] = useState('');
    const [cover, setCover] = useState(null);

    const handleChangeGenre = (e) => {
        const selectedValue = e.target.value;
        setGenre(selectedValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)

        setAuthor(decoded.userId)

        console.log({ title, author, genre, description })

        try {
            if (title !== '' && genre !== '' && description !== '') {
                await axios.post('http://localhost:4000/api/books', {
                    title,
                    author,
                    genre,
                    description,
                })
                    .then(success => {
                        console.log("Deu certo os books", success.data._id)
                        //if (cover) {
                        const formData = new FormData();
                        formData.append('image', cover);
                        console.log(formData)

                        axios.post(`http://localhost:4000/api/books/${success.data._id}/upload-image`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })

                        axios.get(`http://localhost:4000/api/books/${success.data._id}`)
                            .then(success => console.log("Deu certo a lista de books", success.data))

                        // }
                    })




                // await axios.get('http://localhost:4000/api/books/'+'')
                //     .then(success => console.log("Deu certo a lista de books", success.data))
            } else {
                console.log('Os campos precisam estar preenchidos');
            }
        } catch (error) {
            console.log('Ih, rolou não, sô');
            console.error(error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={6}>
                    <h2>Book</h2>
                    <Form>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="genre">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control as="select" onChange={handleChangeGenre} value={genre}>
                                <option value={genreSelected} label="Select a genre" />
                                {genres.map((genre) => (
                                    <option key={genre.genre} value={genre.label} label={genre.label} />
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="cover">
                            <Form.Label>Cover</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => setCover(e.target.files[0])}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSubmit}>
                            Create Book
                        </Button>
                        <Button variant="link" onClick={goToRegister}>
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default withAuth(NewBook);
