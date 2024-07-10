import React, { useState } from 'react';
import Modal from './Pages/Modal';
import './Header.css';

const Header = ({ onAddVideo }) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <header className="header">
            <div className="header-title">
                <h1>AluraFlix</h1>
            </div>
            <div className="header-buttons">
                <button onClick={openModal} className="header-button header-button--nuevo">Nuevo video</button>
            </div>
            {showModal && <Modal onClose={closeModal} onAddVideo={onAddVideo} />}
        </header>
    );
};

export default Header;
