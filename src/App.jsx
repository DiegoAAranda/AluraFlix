import React, { useState } from 'react';
import Header from './Header';
import ListaVideos from './Pages/ListaVideos';
import Footer from './Pages/Footer';
import './App.css';
import db from '../db.json'; 

const App = () => {
    const [categorias, setCategorias] = useState(db.categorias);

    const handleAddVideo = (newVideo, category) => {
        setCategorias(prevCategorias =>
            prevCategorias.map(categoria =>
                categoria.title === category
                    ? { ...categoria, videos: [...categoria.videos, newVideo] }
                    : categoria
            )
        );
    };

    const handleDeleteVideo = (categoriaId, deleteUrl) => {
        setCategorias(prevCategorias =>
            prevCategorias.map(categoria =>
                categoria.id === categoriaId
                    ? { ...categoria, videos: categoria.videos.filter(video => video.deleteUrl !== deleteUrl) }
                    : categoria
            )
        );
    };

    return (
        <>
            <ListaVideos categorias={categorias} onDeleteVideo={handleDeleteVideo} />
            <Footer />
        </>
    );
};

export default App;
