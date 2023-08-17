import React, { useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

import axios from '@/utils/axios';

const Comments = ({ bookID, chapterID, markdownContent, comments }) => {

    useEffect(() => {
        fetchComments();
    }, [])


    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/books/${bookID}/chapters/${chapterID}/comments`);
            comments = response.data;
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
                    {comments[paragraphIndex]?.map((comment, index) => (
                        <div key={index}>{comment}</div>
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
