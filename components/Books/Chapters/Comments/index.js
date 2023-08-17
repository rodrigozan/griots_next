import React, { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';

import axios from '@/utils/axios';

import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';


const Comments = ({ bookID, chapterID, markdownContent, comments, author }) => {
    const [showComments, setShowComments] = useState({})

    useEffect(() => {
        fetchComments();
    }, [])


    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/books/${bookID}/chapters/${chapterID}/comments`);
            comments = response.data;
            setShowComments(response.data)
            console.log("Comments", comments)
        } catch (error) {
            console.log('Error fetching comment:', error);
            return null;
        }
    };

    const renderParagraph = (paragraph, paragraphIndex) => {
        return (
            <div key={paragraphIndex}>
                <h3>Comments</h3>
                {paragraph}
                <div>
                    {showComments}
                    {comments[paragraphIndex]?.map((comment, index) => (
                        <>
                            <div key={index}>{comment}</div>
                        </>
                    ))}
                </div>
            </div>
        );
    };

    const renderers = {
        paragraph: renderParagraph,
    };

    return (
        <div>
            <Markdown
                children={markdownContent || ''}
                options={{ forceBlock: true }}
                renderers={renderers}
            />
        </div>
    );
};

export default Comments;
