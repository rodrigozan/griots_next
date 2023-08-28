import Link from 'next/link';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardChapter({ cover, url, title, content, key, isSelected, onSelect, onEdit, onDelete }) {
    return (
        <Card eventKey={key}>
            {}
            <Card.Img variant="top" src={cover} />
            <Card.Body>
                <Card.Title>
                    <input type="checkbox" checked={isSelected} onChange={onSelect} />
                    <Link className='ms-2' href={url}>{title}</Link>
                </Card.Title>
                <Card.Text>
                    <div className='mt-2'>{content.substring(0, 250)}...</div>
                </Card.Text>
                <div className="buttons mt-5">
                    <Button className="me-5" style={{ width: '29%' }} onClick={onEdit} variant="warning">
                        Edit
                    </Button>
                    <Button style={{ width: '29%' }} onClick={onDelete} variant="danger">
                        Delete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CardChapter;