import React from 'react';
import './ConfirmModal.css'; // Asegúrate de tener estilos para el modal de confirmación

const ConfirmModal = ({ show, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Confirmar Eliminación</h2>
                <p>¿Estás seguro de que deseas eliminar este video?</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Eliminar</button>
                    <button onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
