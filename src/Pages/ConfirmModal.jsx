import React from 'react';

const styles = {
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 30, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto',
        fontSize: '20px',
    },
    modal: {
        background: '#232125',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '500px',
        minWidth: '200px',
        width: '100%',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    modalTitle: {
        fontSize: '24px',
        marginBottom: '10px',
        textAlign: 'center',
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    button: {
        fontFamily: 'Roboto',
        fontSize: '20px',
        borderRadius: '20px',
        border: '0px',
        background: '#007bff',
        color: 'white',
        fontWeight: '600',
        padding: '10px',
        cursor: 'pointer',
    },
};

const ConfirmModal = ({ show, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
                <h2 style={styles.modalTitle}>Confirmar Eliminación</h2>
                <p style={{ color: 'white' }}>¿Estás seguro de que deseas eliminar este video?</p>
                <div style={styles.modalButtons}>
                    <button style={styles.button} onClick={onConfirm}>Eliminar</button>
                    <button style={styles.button} onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
