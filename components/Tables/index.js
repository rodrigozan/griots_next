import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function TableContent({ key, title, description, onView, onEdit, onDelete }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Chapters</th>
                    <th colSpan='3'>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{key}</td>
                    <td><span className="fw-bold">{title}</span><br />{description}</td>
                    <td><Button onClick={onView} variant="primary">View</Button></td>
                    <td><Button onClick={onEdit} variant="secondary">Edit</Button></td>
                    <td><Button onClick={onDelete} variant="danger">Delete</Button></td>
                </tr>
            </tbody>
        </Table>
    );
}

export default TableContent;