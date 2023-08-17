import React, { useState, useEffect } from 'react';

import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

import axios from '@/utils/axios';

const ListComments = ({ bookID, chapterID }) => {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/books/${bookID}/chapters/${chapterID}/comments`)
            response.data.map(async (comment) => {
                console.log(comment)
                const author = await fetchUser(comment.author);
                return { ...comment, author };
            })
            setComments(response.data);
        } catch (error) {
            console.log('Error fetching comments:', error);
        }
    };

    const fetchUser = async (authorId) => {
        try {
            const response = await axiosInstance.get(`http://localhost:4000/api/users/${authorId}`);
            console.log(response.data)
            return response.data.username;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    };

    return (
        <div>
            <h3>Comments</h3>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment, index) => (
                        // <li key={index}>
                        //     Autor: {comment.author}
                        //     {comment.content}
                        // </li>
                        <ListGroup key={index}>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{comment.author}</div>
                                    {comment.content}
                                </div>
                                <Badge bg="primary" pill>
                                    14
                                </Badge>
                            </ListGroup.Item>
                        </ListGroup>
                    ))}
                </ul>
            ) : (
                <p>No comments available.</p>
            )}
        </div>
    );
};

export default ListComments;
