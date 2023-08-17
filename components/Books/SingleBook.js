import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axios from '@/utils/axios';

import ListChapters from './Chapters/ListChapters';

const SingleBook = () => {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState(null);

    useEffect(() => {
        if (id) {
            fetchBookDetails();
        }
    }, [id]);

    const fetchBookDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/books/${id}`);
            const bookDetails = response.data;
            const authorUsername = await fetchUser(bookDetails.author); // Obtenha o username do autor
            bookDetails.author = authorUsername; // Substitua o authorId pelo username
            setBook(bookDetails);
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };


    const fetchUser = async (authorId) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/users/${authorId}`);
            return response.data.username;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    };

    return (
        <div>
            {book ? (
                <div>
                    <h2>{book.title}</h2>
                    <p>Author: {book.author}</p>
                    <p>Genre: {book.genre}</p>
                    <p>Description: {book.description}</p>
                    <ListChapters id={id} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SingleBook;
