import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Breadcrumb from 'react-bootstrap/Breadcrumb';

import axios from '@/utils/axios';

const Breadcrumbs = () => {
    const router = useRouter();
    const pathSegments = router.asPath.split('/').filter(segment => segment !== '');

    const [bookName, setBookName] = useState('');
    const [chapterName, setChapterName] = useState('')

    const bookId = pathSegments[1]
    const chapterId = pathSegments[3]

    console.log(("router", bookId));

    useEffect(() => {
        if (bookId) {
          fetchBookName();
        }
        if (chapterId) {
            fetchChapterName();
          }
      }, [bookId, chapterId]);

    const fetchBookName = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/books/${bookId}`);
            setBookName(response.data.title);
        } catch (error) {
            console.error('Error fetching book name:', error);
        }
    }

    const fetchChapterName = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/books/${bookId}/chapters/${chapterId}`);
            setChapterName(response.data.title)
        } catch (error) {
            console.error('Error fetching book name:', error);
        }
    }

        return (
            <nav className='container'>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    {pathSegments.map((segment, index) => (
                        <Breadcrumb.Item
                            key={index}
                            active={index === pathSegments.length - 1}
                            href={`/${pathSegments.slice(0, index + 1).join('/')}`}
                        >
                            {segment === bookId ? bookName : segment}
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </nav>
        );
    };

    export default Breadcrumbs;
