import React from 'react';
import './Categoria.css';

const Categoria = ({ categoria, onDeleteVideo, onEditVideo }) => {
    const handleEdit = (video) => {
        onEditVideo(video);
    };

    const handleDelete = (videoId) => {
        onDeleteVideo(categoria.id, videoId);  // Pasamos los dos ID por acá
    };

    return (
        <div className={`categoria categoria-${categoria.id}`}>
            <h2>{categoria.title}</h2>
            <div className="videoCategoria">
                {categoria.videos.map(video => (
                    <div key={video.id} className="video">
                        <a href={video.url} target="_blank" rel="noopener noreferrer">
                            <img src={video.imagen} alt={video.title} className="video-thumbnail" />
                        </a>
                        <h3>{video.title}</h3>
                        <p>{video.description}</p>
                        <div className="buttonCategoria">
                            <button onClick={() => handleEdit(video)}>Editar</button>
                            <button onClick={() => handleDelete(video.id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categoria;
