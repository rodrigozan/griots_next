import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axios from '@/utils/axios';

import ListChapters from './Chapters/ListChapters';
import NewBook from './NewBook';

const SingleBook = () => {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState(null);
    const [showBook, setShowBook] = useState(false)

    useEffect(() => {
        if (id) {
            fetchBookDetails();
        }
    }, [id]);

    const fetchBookDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/books/${id}`);
            console.log(response.data)
            const details = response.data;
            const authorUsername = await fetchUser(details.author);
            details.author = authorUsername;
            setBook(details);
            setShowBook(true)
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

    const handleChangeShowUpdate = async () => {
        console.log('bem, entrou aqui, certo?')
        setShowBook(false)
    }

    return (
        <div>
            {book ? (
                <div>
                    {showBook && (
                        <>
                            <h2>{book.title}</h2>
                            <p className='text-small btn btn-warning text-white' onClick={handleChangeShowUpdate}>Edit Book</p>
                            <p>Author: {book.author}</p>
                            <p>Genre: {book.genre}</p>
                            <p>Description: {book.description}</p>
                            <ListChapters id={book._id} />
                        </>
                    )}:{!showBook && (
                        <NewBook booksDetails={book} />
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SingleBook;
