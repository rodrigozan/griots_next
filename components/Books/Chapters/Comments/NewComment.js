import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';

import { Form, Button } from 'react-bootstrap';

import axios from '@/utils/axios';

const NewComment = ({ paragraphIndex, onAddComment, bookId, chapterId }) => {
    const [comment, setComment] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)

        setAuthor(decoded.userId)

        await axios.post(`http://localhost:4000/api/books/${bookId}/chapters/${chapterId}/comments`, { content: comment, author, bookId, chapterId })
            .then(success => alert("Comentário adicionado com sucesso"))
        onAddComment(paragraphIndex, comment);
        setComment('');
    };

    return (
        <Form>
            <Form.Group className="my-3" controlId="comment">
                <Form.Label>Add your comment</Form.Label>
                <Form.Control onChange={(e) => setComment(e.target.value)} as="textarea" rows={3} />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
                Create Comment
            </Button>
        </Form>
    );
};

export default NewComment;
