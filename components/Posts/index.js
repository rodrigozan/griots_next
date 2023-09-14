import React, { useState, useEffect } from 'react';
import moment from 'moment'
import jwt_decode from 'jwt-decode';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';

import { Container, Row, Col, Form, Button, ListGroup, Badge, ButtonGroup } from 'react-bootstrap';

import axios from '@/utils/axios';

const mdParser = new MarkdownIt();

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [author, setAuthor] = useState('');
    const [newPost, setNewPost] = useState('');
    const [mdContent, setMdContent] = useState('')
    const [timeDifferences, setTimeDifferences] = useState({})

    useEffect(() => {
        fetchPosts();
        const calculateTimeDifferences = () => {
            const timeDiffs = {};
            posts.forEach((post, index) => {
                const createdAt = moment(post.createdAt);
                const now = moment();
                const diff = now.diff(createdAt);
                const duration = moment.duration(diff);

                timeDiffs[index] = duration.humanize()
            });
            setTimeDifferences(timeDiffs);
        };

        calculateTimeDifferences();
    }, [posts]);

    const fetchAuthor = async () => {
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)
        return decoded.userId
    };

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/posts');
            const postsWithAuthors = await Promise.all(
                response.data.map(async (post) => {
                    const author = await fetchUser(post.author);
                    return { ...post, author };
                })
            );
            const sortedPosts = postsWithAuthors.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB - dateA;
            });
            setPosts(sortedPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const fetchUser = async (authorId) => {
        try {
            const response = await axios.get(`/api/users/${authorId}`);
            return response.data.username;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    };

    const handleCreatePost = async () => {
        const tmp = await fetchAuthor()
        console.log(tmp)
        setAuthor(tmp)
        if (mdContent) {
            try {
                const response = await axios.post('/api/posts', { content: mdContent, author: author });
                setPosts([...posts, response.data]);
                setMdContent('');
                fetchPosts()
            } catch (error) {
                console.error('Error creating post:', error);
            }
        }
    };

    const handleEditorChange = ({ html, text }) => {
        setMdContent(text);
    };

    const handleSetLikePost = (index) => {
        const updatedLikes = [...likes];
        updatedLikes[index] = !updatedLikes[index];
        setLikes(updatedLikes);
    };

    const handleLikePost = async (postId) => {
        try {
            const response = await axios.get(`/api/posts/${postId}`);

            const currentLikes = response.data.likes || 0;

            console.log('currentLikes:', currentLikes)

            const newLikes = currentLikes + 1;

            console.log('newLikes:', newLikes)

            await axios.put(`/api/posts/${postId}`, { likes: newLikes })
            .then((res) => {
                const updatedPosts = posts.map(post => {
                    if (post.id === postId) {
                        return { ...post, likes: newLikes };
                    }
                    return post;
                });
    
                setPosts(updatedPosts);
            })
            .catch((err) => {
                console.log('Não foi possível salvar o like',err);
            });
            
        } catch (error) {
            console.error('Error updating likes:', error);
        }
    };


    return (
        <Container>
            <h2>Posts</h2>
            <Row>
                <Col md={12}>
                    <MdEditor
                        value={mdContent}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                        config={{
                            view: {
                                menu: true,
                                md: true,
                                html: true,
                            },
                            canView: {
                                fullScreen: true,
                                hideMenu: true,
                            },
                        }}
                    />
                    <Button variant="primary" className="mt-3" onClick={handleCreatePost}>
                        Create Post
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <ListGroup className="mt-3">
                        {posts.map((post, index) => (
                            <ListGroup.Item key={post._id}>
                                <div className='row'>
                                    <div className='col-6'><Badge className="bg-secondary">{post.author}</Badge></div>
                                    <div className='col-5 text-end'>Posted at <Badge className="bg-warning">{timeDifferences[index]} ago</Badge></div>
                                    <div className="col-1" onClick={() => handleLikePost(post._id)}>
                                        <span className={post.likes > 0 ? 'text-danger' : ''}>
                                            <i className={post.likes > 0 ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
                                        </span>
                                        <span className={post.likes > 0 ? 'text-danger' : ''}>
                                            {post.likes && (<span>{post.likes}</span>)}
                                        </span>
                                    </div>
                                </div>
                                <div className='row'>
                                    <ReactMarkdown>{post.content}</ReactMarkdown>
                                </div>
                                <ButtonGroup className="float-start">
                                    <Button variant="outline-primary">Comentar</Button>
                                </ButtonGroup>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Posts;
