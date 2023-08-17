import React, { useState } from 'react';
import { useRouter } from 'next/router';
import slugify from 'slugify';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import axios from '@/utils/axios';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const NewChapter = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const router = useRouter();
    const { id } = router.query;

    const handleEditorChange = ({ text }) => {
        setContent(text);
    };

    const mdParser = new MarkdownIt()

    const handleCreateChapter = async (e) => {
        e.preventDefault();

        const slug = slugify(title, {
            lower: true,
            remove: /[*+~.()'"!:@]/g,
            replacement: '-',
        })

        try {
            if (title !== '' && content !== '') {
                const newChapter = { title, content };
                await axios.post(`http://localhost:4000/api/books/${id}/chapters`, { title, content, slug });
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
                <Col xs={12}>
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
                                style={{ height: '500px' }}
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
