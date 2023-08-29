import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import slugify from 'slugify';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import axios from '@/utils/axios';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const UpdateChapter = ({ chaptersDetails, handleCancelUpdate }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [book, setBook] = useState('');
    const [slug, setSlug] = useState('');
    const [isUpdating, setIsUpdating] = useState(false)
    const [wordCount, setWordCount] = useState(0)

    const router = useRouter();

    const { id, chapter_id } = router.query;

    useEffect(() => {
        setTitle(chaptersDetails.title)
        setContent(chaptersDetails.content)
        setBook(chaptersDetails.book)
        setSlug(chaptersDetails.slug)
        setIsUpdating(true)
    }, []);

    const countWords = ({ text }) => {
        const words = text.trim().split(/\s+/);
        return words.length;
    }
    

    const handleEditorChange = ({ text }) => {
        setContent(text);
        const newWordCount = countWords(text)
        setWordCount(newWordCount)
    };

    const mdParser = new MarkdownIt()

    const convertSlug = (text) => {
        return slugify(text, {
            lower: true,
            remove: /[*+~.()'"!:@]/g,
            replacement: '-',
        })
    }

    const handleUpdateChapter = async (e) => {
        e.preventDefault();

        const chapter_slug = convertSlug(title)
        setSlug(chapter_slug)

        const updatedAt = Date.now()

        const updatedData = {
            title,
            content,
            slug,
            book: id,
            updatedAt
        };

        try {
            if (title !== '' && content !== '') {
                await axios.put(`http://localhost:4000/api/books/${id}/chapters/${chapter_id}`, updatedData)
                    .then(success => {
                        console.log("certo, ta no try", success)
                        //handleCancelUpdate()
                        window.location.reload(false)
                    })
                    .catch(error => console.log("Erro ao atualizar o capítulo: ", error))
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
                    <h2>{chaptersDetails ? 'Update Chapter' : 'Create New Chapter'}</h2>
                    <Form className='mb-5'>
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
                        <p>Total de Palavras: {wordCount}</p>   
                        <div className='my-5'>
                            <Button className='me-2' variant="primary" onClick={handleUpdateChapter}>
                                Update Chapter
                            </Button>
                            <Button variant="info" onClick={handleCancelUpdate}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateChapter;
