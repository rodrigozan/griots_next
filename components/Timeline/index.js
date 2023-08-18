import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Badge } from 'react-bootstrap';
import axios from 'axios';

const Timeline = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <Container>
      <h2>Timeline</h2>
      <ListGroup>
        {notifications.map((notification) => (
          <ListGroup.Item key={notification._id}>
            {notification.type === 'new_book' && (
              <>
                <Badge variant="info">New Book</Badge>
                {' '}New book created by {notification.username}: {notification.bookTitle}
              </>
            )}
            {notification.type === 'update_book' && (
              <>
                <Badge variant="warning">Update Book</Badge>
                {' '}Book updated by {notification.username}: {notification.bookTitle}
              </>
            )}
            {notification.type === 'new_comment' && (
              <>
                <Badge variant="success">New Comment</Badge>
                {' '}New comment by {notification.username} on {notification.bookTitle}
              </>
            )}
            {/* Add more notification types */}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Timeline;
