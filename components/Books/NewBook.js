import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import slugify from 'slugify';


import { Container, Row, Col, Form, InputGroup, FormControl, Button, Badge } from 'react-bootstrap';

import axios from '@/utils/axios';
import withAuth from '@/utils/withAuth';

import genres from '@/json/genres.json';
import subgenres from '@/json/subgenres.json';


const NewBook = ({ goToRegister, booksDetails }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [coAuthors, setCoAuthors] = useState([]);
    const [selectedCoauthors, setSelectedCoauthors] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedSubGenre, setSelectedSubGenre] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState('');
    const [cover, setCover] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false)

    const router = useRouter()

    useEffect(() => {
        fetchCoauthors();
        if (router.pathname == '/books/[id]') {
            setTitle(booksDetails.title)
            setAuthor(booksDetails.author)
            setCoAuthors(booksDetails.coAuthors)
            setGenre(booksDetails.genre)
            setSelectedSubGenre(booksDetails.selectedSubGenre)
            setDescription(booksDetails.description)
            setTags(booksDetails.tags)
            setCover(booksDetails.cover)
            setIsUpdating(true)
        }
    }, []);

    const fetchCoauthors = async () => {
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)

        setAuthor(decoded.userId)
        try {
            const response = await axios.get('http://localhost:4000/api/users');
            setCoAuthors(response.data.filter(user => user._id !== author));
        } catch (error) {
            console.error('Error fetching coauthors:', error);
        }
    };

    const handleCoauthorChange = (e) => {
        setSelectedCoauthors(Array.from(e.target.selectedOptions, option => option.value));
    };

    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);

        const filteredCoauthors = coauthors.filter(coauthor =>
            coauthor.username.toLowerCase().includes(searchValue)
        );
        setSelectedCoauthors(filteredCoauthors.map(coauthor => coauthor._id));
    };


    const handleChangeGenre = (e) => {
        const selectedValue = e.target.value;
        console.log("Genre", selectedValue);
        setGenre(selectedValue);
        setSelectedGenre(selectedValue)
    };

    const handleChangeSubGenre = (event) => {
        setSelectedSubGenre(event.target.value);
    };


    const handleTagChange = (e) => {
        setCurrentTag(e.target.value);
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' && currentTag === '') {
            setTags(tags.slice(0, -1));
        } else if (e.key === ',') {
            if (currentTag.trim() !== '') {
                setTags([...tags, currentTag.trim()]);
                setCurrentTag('');
            }
            e.preventDefault();
        }
    };

    const handleRemoveTag = (tagIndex) => {
        const updatedTags = tags.filter((_, index) => index !== tagIndex);
        setTags(updatedTags);
    };

    const convertSlug = (text) => {
        return slugify(text, {
            lower: true,
            remove: /[*+~.()'"!:@]/g,
            replacement: '-',
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)

        setAuthor(decoded.userId)

        const slug = convertSlug(title)

        try {
            if (title !== '' && genre !== '' && description !== '') {
                await axios.post('http://localhost:4000/api/books', {
                    title,
                    author,
                    genre,
                    selectedSubGenre,
                    description,
                    tags,
                    slug
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

                        router.push(`/books/${success.data._id}`)

                    })
            } else {
                console.log('Os campos precisam estar preenchidos');
            }
        } catch (error) {
            console.log('Ih, rolou não, sô');
            console.error(error);
        }
    };

    const handleUpdateBook = async (e) => {
        e.preventDefault();

        const { id } = router.query

        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)

        const slug = convertSlug(title)
        const updatedAt = Date.now()

        // Construa os dados atualizados a serem enviados para a API
        const updatedData = {
            title,
            author: decoded.userId,
            genre,
            selectedSubGenre,
            description,
            tags,
            slug,
            updatedAt
        };

        console.log(updatedData)

        try {
            await axios.put(`http://localhost:4000/api/books/${id}`, updatedData)
                .then(success => {
                    console.log("certo, ta no try", success)
                    setIsUpdating(false)
                    window.location.reload(false)
                })

        } catch (error) {
            console.error('Erro ao atualizar o livro:', error);
        }
    };


    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={6}>
                    <h2>{booksDetails ? 'Update Book' : 'Create New Book'}</h2>
                    <Form>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={title || ''}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="coauthors">
                            <Form.Label>Coauthors</Form.Label>
                            <Form.Select aria-label="Coauthors" value={coAuthors} onChange={handleCoauthorChange}>
                                {coAuthors && coAuthors.map(coAuthor => (
                                    <option key={coAuthor._id} value={coAuthor._id}>
                                        {coAuthor.name || coAuthor.username}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control as="select" value={genre || selectedGenre} onChange={handleChangeGenre}>
                                <option value="">Select a genre</option>
                                {genres.map(genre => (
                                    <option key={genre.genre} value={genre.genre}>
                                        {genre.label}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        {genre && (
                            <Form.Group>
                                <Form.Label>Subgenre</Form.Label>
                                <Form.Control as="select" value={selectedSubGenre} onChange={handleChangeSubGenre}>
                                    <option value="">Select a subgenre</option>
                                    {subgenres[genre].map(subgenre => (
                                        <option key={subgenre} value={subgenre}>
                                            {subgenre}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        )}
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                value={description || ''}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="tags">
                            <Form.Label>
                                Tags - <span className='small'>digite <code>, [vírgula]</code> para separar as tags</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter tags (separated by spaces)"
                                value={currentTag}
                                onChange={handleTagChange}
                                onKeyDown={handleTagKeyDown}
                            />
                            <div>
                                {tags.map((tag, index) => (
                                    <Badge key={index} pill variant="info" className="m-1">
                                        {tag} <span className="clickable" onClick={() => handleRemoveTag(index)}>x</span>
                                    </Badge>
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group controlId="cover">
                            <Form.Label>Cover</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                value={cover || ''}
                                onChange={(e) => setCover(e.target.files[0])}
                            />
                        </Form.Group>
                        {/* <Button variant="primary" onClick={handleSubmit}>
                            Create Book
                        </Button> */}
                        <Button variant="primary" onClick={isUpdating ? handleUpdateBook : handleSubmit}>
                            {isUpdating ? 'Update Book' : 'Create Book'}
                        </Button>

                        <Button variant="primary" onClick={goToRegister}>
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default withAuth(NewBook);
