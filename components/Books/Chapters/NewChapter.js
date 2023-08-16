import React, { useState } from 'react';
import axios from 'axios';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';



const NewChapter = ({ bookId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const handleEditorChange = ({ text }) => {
        setContent(text);
    };

    const mdParser = new MarkdownIt()

    const handleCreateChapter = async (e) => {
        e.preventDefault();

        try {
            if (title !== '' && content !== '') {
                const newChapter = { title, content };
                await axios.post(`http://localhost:4000/api/books/${bookId}/chapters`, newChapter);
                setTitle('');
                setContent('');
                console.log('Chapter created successfully');
            } else {
                console.log('Please fill in all fields');
            }
        } catch (error) {
            console.error('Error creating chapter:', error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={6}>
                    <h2>Create New Chapter</h2>
                    <Form>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <MdEditor
                                value={content}
                                style={{ height: '400px' }} 
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={handleEditorChange}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleCreateChapter}>
                            Create Chapter
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default NewChapter;
