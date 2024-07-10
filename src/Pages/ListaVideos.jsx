import React, { useState, useEffect } from 'react';
import Categoria from './Categoria';
import ConfirmModal from './ConfirmModal';
import EditarModal from './EditModal';
import Header from '../Header';
import Modal from './Modal';
import axios from 'axios';

const ListaVideos = () => {
    const [categorias, setCategorias] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEditVideo, setSelectedEditVideo] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error('Error fetching categorias:', error);
        }
    };

    const handleDeleteVideo = async (categoriaId, videoId) => {
        const categoria = categorias.find(c => c.id === categoriaId);

        if (categoria) {
            const updatedVideos = categoria.videos.filter(video => video.id !== videoId);

            try {
                const response = await axios.put(`http://localhost:5000/categorias/${categoriaId}`, {
                    ...categoria,
                    videos: updatedVideos
                });
                setCategorias(categorias.map(c => c.id === categoriaId ? response.data : c));
            } catch (error) {
                console.error('Error al eliminar el video:', error);
            }
        } else {
            console.warn(`No se encontró la categoría con ID ${categoriaId}`);
        }

        setShowConfirmModal(false);
        setSelectedVideo(null);
    };

    const handleDeleteClick = (categoriaId, videoId) => {
        console.log('Video para eliminar:', { categoriaId, videoId });  // Log para verificar los IDs de categoría y video
        setSelectedVideo({ categoriaId, videoId });
        setShowConfirmModal(true);
    };

    const handleConfirm = () => {
        if (selectedVideo) {
            const { categoriaId, videoId } = selectedVideo;
            handleDeleteVideo(categoriaId, videoId);
        }
    };

    const handleCancel = () => {
        setShowConfirmModal(false);
        setSelectedVideo(null);
    };

    const handleShowAddModal = () => {
        setShowAddModal(true);
    };

    const handleAddVideo = async (newVideo, category) => {
        try {
            const response = await axios.post(`http://localhost:5000/categorias/${category.id}/videos`, newVideo);
            const updatedCategory = response.data;
            setCategorias(prevCategorias =>
                prevCategorias.map(categoria =>
                    categoria.id === updatedCategory.id ? updatedCategory : categoria
                )
            );
            setShowAddModal(false);
        } catch (error) {
            console.error('Error adding video:', error);
        }
    };

    const handleEditClick = (video) => {
        setSelectedEditVideo(video);
        setShowEditModal(true);
    };

    const handleSaveVideo = () => {
        fetchData();
    };

    return (
        <div>
            <Header onAddVideo={handleShowAddModal} />
            {categorias.map(categoria => (
                <Categoria
                    key={categoria.id}
                    categoria={categoria}
                    onDeleteVideo={handleDeleteClick}  // Borrar
                    onEditVideo={handleEditClick}  // Editar
                />
            ))}
            <ConfirmModal show={showConfirmModal} onConfirm={handleConfirm} onCancel={handleCancel} />
            {showAddModal && <Modal onClose={() => setShowAddModal(false)} onAddVideo={handleAddVideo} />}
            {showEditModal && selectedEditVideo && (
                <EditarModal
                    video={selectedEditVideo}
                    onClose={() => setShowEditModal(false)}
                    onSaveVideo={handleSaveVideo}
                    onDeleteVideo={handleDeleteVideo} 
                />
            )}
        </div>
    );
};

export default ListaVideos;
