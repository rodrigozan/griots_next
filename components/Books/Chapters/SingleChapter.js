import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

import axios from '@/utils/axios';

import AlertActions from '@/components/Alert'
import UpdateChapter from './UpdateChapter';
import ListComments from '@/components/Books/Chapters/Comments/ListComments';
import NewComment from '@/components/Books/Chapters/Comments/NewComment';

import { Button } from 'react-bootstrap';

const Listchapter = () => {
  const router = useRouter();
  const { id, chapter_id } = router.query;
  const [book, setBook] = useState(null);
  const [chapter, setChapter] = useState([]);
  const [chapterId, setChapterId] = useState('')
  const [comments, setComments] = useState({});
  const [showAlert, setShowAlert] = useState(false)
  const [variant, setVariant] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [showChapter, setShowChapter] = useState(true)

  useEffect(() => {
    fetchBookDetails()
  }, []);

  const fetchChapter = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/books/${id}/chapters/${chapter_id}`);
      setChapter(response.data);

    } catch (error) {
      console.log('Error fetching chapter:', error);
    }
  };

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/books/${id}`);
      const bookDetails = response.data;
      const authorUsername = await fetchUser(bookDetails.author);
      bookDetails.author = authorUsername;
      setBook(bookDetails);
      fetchChapter();
    } catch (error) {
      console.log('Error fetching book details:', error);
    }
  };

  const fetchUser = async (authorId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/users/${authorId}`);
      if (response.data.name) {
        return response.data.name;
      }
      else {
        return response.data.username
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };

  const handleAddComment = (paragraphIndex, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [paragraphIndex]: [...(prevComments[paragraphIndex] || []), comment],
    }));
  };

  const handleNew = async (e) => {
    router.push(`/books/${id}/chapter/new_chapter`)
  }

  const handleOnEdit = async (e) => {
    router.push(`/books/${id}/chapter/new_chapter`)
  }

  const DeleteMessage = () => {
    return (
      <>
        <p className='text-uppercase mb-2'><strong>Atenção</strong></p>
        <p>Tem certeza de que quer excluir este capítulo? <strong>Essa ação não pode ser desfeita posteriormente.</strong></p>
        <Button className='me-2' onClick={handleDelete} variant="danger">Yes</Button>
        <Button onClick={handleCancelDelete} variant="info">Cancel</Button>
      </>
    )
  }

  const SuccessDeletedMessage = () => {
    return (
      <p className='text-uppercase mb-2'><strong>O capítulo foi deletado com sucesso</strong></p>
    )
  }

  const FailDeletedMessage = () => {
    return (
      <p className='text-uppercase mb-2'><strong>Não foi possível deletar o capítulo.</strong><br />Por favor, tente novamente mais tarde</p>
    )
  }

  const handleConfirmDelete = async (id) => {
    setAlertMessage(DeleteMessage)
    setVariant('danger')
    setShowAlert(true)
    setChapterId(id)
  }

  const handleDelete = async () => {
    axiosInstance.delete(`http://localhost:4000/api/books/${id}/chapter/${chapterId}`)
      .then(success => {
        setAlertMessage(SuccessDeletedMessage)
        setVariant('success')
        setTimeout(() => {
          setShowAlert(false)
          fetchChapter();
        }, 5000);
      })
      .catch(error => {
        console.log(error)
        setAlertMessage(FailDeletedMessage)
        setVariant('warning')
        setTimeout(() => {
          setShowAlert(false)
        }, 5000);
      })
  }

  const handleCancelDelete = async (e) => {
    e.preventDefault();
    setShowAlert(false)
  }

  const handleChangeShowUpdate = async () => {
    setShowChapter(false)
  }

  const handleCancelUpdate = async () => {
    setShowChapter(true)
  }

  return (
    <div>
      <div className="float-end">
        <Button variant="primary" onClick={handleNew}>Add New Chapter</Button>
      </div>
      <div className='mt-4'>
        <AlertActions
          alertAction={showAlert}
          alertMessage={alertMessage}
          variant={variant}
        />
        {chapter ? (
          <div>
            {showChapter && (
              <>
                <h2>{chapter.title}</h2>
                <p className='text-small btn btn-info' onClick={handleChangeShowUpdate}>Update Chapter</p>
                <ReactMarkdown>{chapter.content}</ReactMarkdown>
                <ListComments bookID={id} chapterID={chapter_id} />
                <NewComment
                  paragraphIndex={0}
                  onAddComment={handleAddComment}
                  bookId={id}
                  chapterId={chapter_id}
                />
                {comments[0]?.map((comment, index) => (
                  <div key={index}>{comment}</div>
                ))}
              </>
            )}:{!showChapter && (
              <UpdateChapter
                chaptersDetails={chapter}
                handleCancelUpdate={handleCancelUpdate}
              />
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );

};

export default Listchapter;
