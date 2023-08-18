import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Badge } from 'react-bootstrap';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import axios from '@/utils/axios';

const mdParser = new MarkdownIt();

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [mdContent, setMdContent] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleCreatePost = async () => {
        if (newPost) {
            try {
                const response = await axios.post('http://localhost:4000/api/posts', { content: newPost });
                setPosts([...posts, response.data]);
                setMdContent('');
            } catch (error) {
                console.error('Error creating post:', error);
            }
        }
    };

    const handleEditorChange = ({ html, text }) => {
        setMdContent(text);
    };

    return (
        <Container>
            <h2>Posts</h2>
            <Row>
                <Col md={8}>
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
                <Col md={8}>
                    <ListGroup className="mt-3">
                        {posts.map((post) => (
                            <ListGroup.Item key={post._id}>
                                <Badge variant="secondary">{post.username}</Badge>
                                {' '}{mdParser.render(post.content)}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Post;
