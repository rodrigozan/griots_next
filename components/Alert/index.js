import Alert from 'react-bootstrap/Alert';

function AlertActions({ alertAction, alertMessage, variant }) {
    return (
        alertAction &&
        <Alert variant={variant}>
            {alertMessage}
        </Alert>

    )
}

export default AlertActions