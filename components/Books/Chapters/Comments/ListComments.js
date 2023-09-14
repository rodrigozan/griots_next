import React, { useState, useEffect } from 'react'

import Badge from 'react-bootstrap/Badge'
import ListGroup from 'react-bootstrap/ListGroup'

import axios from '@/utils/axios'

const ListComments = ({ bookID, chapterID }) => {
    const [comments, setComments] = useState([])
    const [answers, setAnswers] = useState([])
    useEffect(() => {
        fetchComments()
    }, [])

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/books/${bookID}/chapters/${chapterID}/comments/chapter`)

            console.log('óia, tem data',response.data)

            if (response.data) {
                console.log('tem sim moço');
                const answerAuthors = await Promise.all(response.data.answers.map(async (answer) => {
                    const author = await fetchUser(answer.author)
                    return { ...answer, author }
                }))
                setAnswers(answerAuthors)
                console.log(answerAuthors)
            }
            

           const commentsWithAuthors = await Promise.all(response.data.map(async (comment) => {
                const author = await fetchUser(comment.author)
                return { ...comment, author }
            }))
            setComments(commentsWithAuthors)
            console.log('----')
            console.log(commentsWithAuthors)
        } catch (error) {
            console.log('Error fetching comments:', error)
        }
    }

    const fetchUser = async (authorId) => {
        try {
            const response = await axios.get(`/api/users/${authorId}`)
            if (response.data.name) {
                return response.data.name
            }
            else {
                return response.data.username
            }
        } catch (error) {
            console.error('Error fetching user:', error)
            return null
        }
    }

    return (
        <div>
            <h3 className='text-warning'>Comments</h3>
            {comments.length > 0 ? (
                comments.map((comment, index) => (
                    <ListGroup key={index}>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto w-100">
                                <div><span className="fw-medium">{comment.author}</span><span className='ms-5 fw-light'>{comment.createdAt}</span></div>
                                {comment.content}
                                {comment.answers.map(item => item.author)}
                                <div><span className='small fw-light'>Responder</span> | <span className='small fw-light'>Compartilhar</span></div>
                            </div>
                            {comment.answers && (
                                <ListGroup>
                                    {comment.answers.map((answer, index) => (
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-10 me-auto">
                                            <div><span className="fw-medium">{answer.author}</span><span className='ms-5 fw-light'>{answer.createdAt}</span></div>
                                            {answer.content}
                                            <div><span className='small fw-light'>Responder</span> | <span className='small fw-light'>Compartilhar</span></div>
                                        </div>
                                    </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                ))
            ) : (
                <p>No comments available.</p>
            )}
        </div>
    )
}

export default ListComments
