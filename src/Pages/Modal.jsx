import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ onClose, onAddVideo }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [error, setError] = useState('');

    const generarId = () => {
        return Math.floor(Math.random() * 1000) + 1; // Generación aleatoria de ID
    };

    const handleAddVideo = async () => {
        if (!title || !url || !category) {
            setError('Por favor completa todos los campos obligatorios.');
            return;
        }

        const nuevoVideo = {
            id: generarId(),
            title: title,
            url: url,
            description: description,
            imagen: imageURL
        };

        try {
            const response = await axios.get('https://668e054dbf9912d4c92c89d3.mockapi.io/categorias');
            const categorias = response.data;

            const categoriaIndex = categorias.findIndex(cat => cat.id === category);
            if (categoriaIndex !== -1) {
                categorias[categoriaIndex].videos.push(nuevoVideo);
                await axios.put(`https://668e054dbf9912d4c92c89d3.mockapi.io/categorias/${category}`, categorias[categoriaIndex]);
                onAddVideo(nuevoVideo, category); // Actualiza la lista de videos
                onClose(); // Cierro el modal
            } else {
                setError('Categoría no encontrada');
            }
        } catch (error) {
            setError('Error al agregar el video. Por favor intenta nuevamente más tarde.');
        }
    };

    const handleClose = () => {
        setTitle('');
        setUrl('');
        setDescription('');
        setCategory('');
        setImageURL('');
        setError('');

        onClose();
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
                <h2 style={styles.modalTitle}>Agregar Nuevo Video</h2>
                <label style={styles.label}>Título:</label>
                <input type="text" style={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
                <label style={styles.label}>URL del Video:</label>
                <input type="text" style={styles.input} value={url} onChange={(e) => setUrl(e.target.value)} />
                <label style={styles.label}>Descripción:</label>
                <textarea style={{ ...styles.input, ...styles.textarea }} value={description} onChange={(e) => setDescription(e.target.value)} />
                <label style={styles.label}>URL de la Imagen:</label>
                <input type="text" style={styles.input} value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
                <label style={styles.label}>Categoría:</label>
                <select style={styles.input} value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Selecciona una categoría</option>
                    <option value="1">INFANTIL</option>
                    <option value="2">DOCUMENTALES</option>
                    <option value="3">TERROR</option>
                    <option value="4">COMEDIA</option>
                </select>
                {error && <p style={styles.errorMessage}>{error}</p>}
                <div style={styles.modalButtons}>
                    <button style={styles.button} onClick={handleAddVideo}>Agregar Video</button>
                    <button style={styles.button} onClick={handleClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

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
        color: '#000000',
        fontFamily: 'Roboto',
        fontSize: '18px',
        fontWeight: '900',
    },
    modal: {
        display: 'flex',
        flexDirection: 'column',
        background: '#232125',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '500px',
        minWidth: '250px',
        width: '100%',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        color: 'white',
    },
    modalTitle: {
        fontSize: '24px',
        marginBottom: '10px',
        textAlign: 'center',
    },
    label: {
        fontSize: '18px',
        fontWeight: '900',
        marginBottom: '5px',
    },
    input: {
        padding: '8px',
        marginBottom: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        boxSizing: 'border-box',
        background: '#847b89',
        border: '0px',
        fontSize: '16px',
        fontFamily: 'Roboto',
        fontWeight: '600',
    },
    textarea: {
        minHeight: '100px',
        background: '#847b89',
        border: '0px',
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#ffffff',
        background: '#007bff',
    },
    errorMessage: {
        color: 'red',
        marginBottom: '10px',
    },
};

export default Modal;

