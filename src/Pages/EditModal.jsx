import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarModal = ({ video, onClose, onSaveVideo }) => {
    const [editedVideo, setEditedVideo] = useState({ ...video });
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('https://my-json-server.typicode.com/DiegoAAranda/AluraFlixjson/categorias');
                setCategorias(response.data);
                const categoriaActual = response.data.find(cat => cat.videos.some(v => v.id === video.id));
                if (categoriaActual) {
                    setCategoriaSeleccionada(categoriaActual.id);
                }
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };

        fetchCategorias();
    }, [video.id]);

    const generarNuevoId = () => {
        return Math.floor(Math.random() * 1000) + 1;
    };

    const handleSave = async () => {
        const categoriaActual = categorias.find(cat => cat.videos.some(v => v.id === editedVideo.id));

        if (!categoriaActual) {
            console.error('No se encontró la categoría del video.');
            return;
        }

        const updatedVideos = categoriaActual.videos.map(v => v.id === editedVideo.id ? editedVideo : v);

        try {
            const response = await axios.put(`https://my-json-server.typicode.com/DiegoAAranda/AluraFlixjson/categorias//${categoriaActual.id}`, {
                ...categoriaActual,
                videos: updatedVideos
            });
            console.log('Video editado guardado:', response.data);

            setCategorias(prevCategorias =>
                prevCategorias.map(cat =>
                    cat.id === categoriaActual.id ? response.data : cat
                )
            );

            onSaveVideo(); // Llamar a la función para actualizar la lista de videos
            onClose(); // Cerrar el modal después de editar el video
        } catch (error) {
            console.error('Error al editar el video:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedVideo({ ...editedVideo, [name]: value });
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
            width: '100%',
            boxSizing: 'border-box',
            background: '#847b89',
            fontFamily: 'Roboto',
            fontWeight: '600',
            color: '#000000',
        },
        textarea: {
            minHeight: '100px',
            background: '#847b89',
            border: '0px',
            color: '#000000',
        },
        modalButtons: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '12px',
        },
        button: {
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#ffffff',
            background: '#007bff',
        },
        errorMessage: {
            color: 'red',
            marginBottom: '10px',
        },
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
                <h2 style={styles.modalTitle}>Editar Video</h2>
                <label style={styles.label}>Título:</label>
                <input type="text" name="title" value={editedVideo.title} onChange={handleChange} style={styles.input} />
                <label style={styles.label}>URL del Video:</label>
                <input type="text" name="url" value={editedVideo.url} onChange={handleChange} style={styles.input} />
                <label style={styles.label}>Descripción:</label>
                <textarea name="description" value={editedVideo.description} onChange={handleChange} style={{ ...styles.input, ...styles.textarea }} />
                <label style={styles.label}>URL de la Imagen:</label>
                <input type="text" name="imagen" value={editedVideo.imagen} onChange={handleChange} style={styles.input} />
                <div style={styles.modalButtons}>
                    <button style={styles.button} onClick={handleSave}>Guardar Cambios</button>
                    <button style={styles.button} onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default EditarModal;
