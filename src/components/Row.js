import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Row.scss';

function Row({ title, url, isPoster }) {
  const baseUrl = 'https://image.tmdb.org/t/p/original';
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données des films
    async function fetchData() {
      try {
        // Effectuer une requête GET à l'API TMDB pour les films
        const request = await axios.get(url);
        // Stocker les résultats de la requête dans l'état movies
        setMovies(request.data.results);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    }

    // Appeler la fonction fetchData une fois, lors du montage du composant (argument vide [])
    fetchData();
  }, [url]);

  async function searchYouTubeTrailer(title) {
    try {
      const API_KEY_YOUTUBE = process.env.REACT_APP_YOUTUBE_API_KEY;
      // Effectuer une requête GET à l'API YouTube pour rechercher la bande-annonce correspondant au titre
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: API_KEY_YOUTUBE,
          part: 'snippet',
          q: `${title} bande annonce`,
          maxResults: 1,
          type: 'video',
        },
      });

      // Vérifier si des vidéos ont été trouvées
      if (response.data.items.length > 0) {
        const videoId = response.data.items[0].id.videoId;
        // Rediriger vers la vidéo YouTube en utilisant l'ID de la vidéo
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      } else {
        console.log('No video found on YouTube for the film:', title);
      }
    } catch (error) {
      console.error('Error searching for video on YouTube:', error);
    }
  }

  function selectMoviesWithImage() {
    // Filtrer les films pour ne récupérer que ceux avec une image de poster ou de backdrop
    const moviesWithImage = movies.filter((movie) => {
      if (isPoster) {
        return movie.poster_path !== null;
      } else {
        return movie.backdrop_path !== null;
      }
    });

    return moviesWithImage;
  }

  const moviesWithImage = selectMoviesWithImage();

  return (
    <div className='row'>
      {/* Affichage du titre de la rangée */}
      <h2 className='row__title'>{title}</h2>
      <div className='row__images'>
        {/* Parcours des films avec images */}
        {moviesWithImage.map((movie) => (
          <div key={movie.id}>
            {/* Affichage de l'image du film */}
            <img
              // Source de l'image : l'URL de base concaténé avec le chemin de l'image (selon qu'il s'agit d'une affiche ou d'un arrière-plan)
              src={`${baseUrl}${isPoster ? movie.poster_path : movie.backdrop_path}`}
              // Classe CSS pour l'image
              className='row__image'
              // Texte alternatif de l'image (utilise le titre du film s'il existe, sinon le titre original, sinon "Titre inconnu")
              alt={movie.title ?? movie.original_title ?? 'Titre inconnu'}
              // Gestion de l'événement clic sur l'image : recherche de la bande-annonce sur YouTube avec le titre du film
              onClick={() => searchYouTubeTrailer(movie.title || movie.original_title)}
            />
          </div>
        ))}
      </div>
    </div>
);

}

export default Row;
