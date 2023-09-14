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
            const response = await axios.get(`/api/books/${bookId}`);
            setBookName(response.data.title);
        } catch (error) {
            console.error('Error fetching book name:', error);
        }
    }

    const fetchChapterName = async () => {
        try {
            const response = await axios.get(`/api/books/${bookId}/chapters/${chapterId}`);
            setChapterName(response.data.title)
        } catch (error) {
            console.error('Error fetching book name:', error);
        }
    }

        return (
            <nav className='container'>
                <Breadcrumb>
                    <Breadcrumb.Item href="/"><span className='link link-secundary'>Home</span></Breadcrumb.Item>
                    {pathSegments.map((segment, index) => (
                        <Breadcrumb.Item
                            key={index}
                            active={index === pathSegments.length - 1}
                            href={`/${pathSegments.slice(0, index + 1).join('/')}`}
                        >
                            <span className='link link-secundary'>{segment === bookId ? bookName : segment}</span>
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </nav>
        );
    };

    export default Breadcrumbs;
