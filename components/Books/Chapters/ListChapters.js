import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/utils/axios';

import AccordionChapters from '@/components/Accordion';
import AlertActions from '@/components/Alert'

import { Button } from 'react-bootstrap';

const ListChapters = ({ id }) => {
  const router = useRouter();
  const [chapters, setChapters] = useState([]);
  const [chapterId, setChapterId] = useState('')
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [showAlertActions, setShowAlertActions] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [variant, setVariant] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const response = await axiosInstance.get(`http://localhost:4000/api/books/${id}/chapters`);
      console.log("Chapters: ",response.data)
      setChapters(response.data)
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };

  const handleNew = async (e) => {
    router.push(`/books/${id}/chapters/new_chapter`)
  }

  const handleOnEdit = async (e) => {
    console.log("entrou na função")
   // router.push(`/books/${id}/chapters/new_chapter`)
  }

  const handleSelectChapter = (chapterId) => {
    if (selectedChapters.includes(chapterId)) {
      setSelectedChapters(selectedChapters.filter(id => id !== chapterId));
    } else {
      setSelectedChapters([...selectedChapters, chapterId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAllChecked) {
      setSelectedChapters([]);
    } else {
      const allChapterIds = chapters.map(chapter => chapter._id);
      setSelectedChapters(allChapterIds);
    }
    setSelectAllChecked(!selectAllChecked);
  };

  const ButtonDeleteAll = () => {
    return (
      <Button variant="danger" onClick={handleDeleteSelected} disabled={selectedChapters.length === 0}>
        Delete Selected
      </Button>
    )
  }

  const handleDeleteSelected = async () => {
    try {
      for (const chapterId of selectedChapters) {
        await axiosInstance.post(`http://localhost:4000/api/books/${id}/chapters/delete/${chapterId}`, {bookID: id, chapterId: chapterId});
      }
      setAlertMessage(SuccessDeletedMessage);
      setVariant('success');
      setShowAlert(true);
      setSelectedChapters([]);
      setTimeout(() => {
        setShowAlert(false);
        fetchChapters();
      }, 5000);
    } catch (error) {
      console.log(error);
      setAlertMessage(FailDeletedMessage);
      setVariant('warning');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

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
    setShowAlertActions(true)
    setChapterId(id)
  }

  const handleDelete = async () => {
    console.log('Book Id', id)
    console.log('chapter id', chapterId)
    axiosInstance.delete(`http://localhost:4000/api/books/${id}/chapters/${chapterId}`)
      .then(success => {
        console.log(success)
        setAlertMessage(SuccessDeletedMessage)
        setVariant('success')
        setTimeout(() => {
          setShowAlertActions(false)
          fetchChapters();
        }, 5000);
      })
      .catch(error => {
        console.log(error)
        setAlertMessage(FailDeletedMessage)
        setVariant('warning')
        setTimeout(() => {
          setShowAlertActions(false)
        }, 5000);
      })
  }

  const handleCancelDelete = async (e) => {
    e.preventDefault();
    setShowAlertActions(false)
  }

  return (
    <div>
      <input type="checkbox" checked={selectAllChecked} onChange={handleSelectAll} /> {selectAllChecked ? 'Deselect Chapters' : 'Select All Chapters'} {selectAllChecked ? <ButtonDeleteAll /> : ''}
      
      <div className="float-end">
          <Button variant="primary" onClick={handleNew}>Add New Chapter</Button>
        </div>
      <div className='mt-4'>
        <AlertActions
          alertAction={showAlert}
          alertMessage={alertMessage}
          variant={variant}
        />
        {chapters.length > 0 ? (
          <div>
            {chapters.map((chapter) => (
              <React.Fragment key={chapter._id}>
                <AccordionChapters
                  title={chapter.title}
                  content={chapter.content}
                  url={`/books/${id}/chapters/${chapter._id}`}
                  onEdit={() => handleOnEdit(chapter._id)}
                  onDelete={() => handleConfirmDelete(chapter._id)}
                  isSelected={selectedChapters.includes(chapter._id)}
                  onSelect={() => handleSelectChapter(chapter._id)}
                />
                <AlertActions
                  alertAction={showAlertActions}
                  alertMessage={alertMessage}
                  variant={variant}
                />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <p>No chapters available.</p>
        )}
      </div>
    </div>
  );

};

export default ListChapters;
