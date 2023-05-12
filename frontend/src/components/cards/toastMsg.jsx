import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

function ToastMessage({ show, onClose, message, variant }) {
    const [showToast, setShowToast] = useState(show);

    const handleClose = () => {
        setShowToast(false);
        onClose();
    }

    return (
        <section style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 9999 }}>
            <Toast show={showToast} onClose={handleClose} delay={8000} autohide>
                <Toast.Header>
                    <strong className={`me-auto text-${variant}`}>Message</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </section>
    );
}

export default ToastMessage;
