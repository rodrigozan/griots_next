import Accordion from 'react-bootstrap/Accordion';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

function AccordionChapters({ url, title, content, key, isSelected, onSelect, onEdit, onDelete }) {
  return (
    <Accordion>
      <Accordion.Item eventKey={key}>
        <Accordion.Header>
          <Link href={url}>{title}</Link>
        </Accordion.Header>
        <Accordion.Body>
          <div><input type="checkbox" checked={isSelected} onChange={onSelect} /> <strong>Título: </strong>{title}</div>
          <div className='mt-2'>{content.substring(0, 250)}...</div>
          <div className="buttons mt-5 d-flex justify-content-between">
            <Button style={{ width: '29%' }} onClick={onEdit} variant="warning">
              Edit
            </Button>
            <Button style={{ width: '29%' }} onClick={onDelete} variant="danger">
              Delete
            </Button>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionChapters;