import React, { useState, useEffect } from 'react';
import './Banner.scss';
import { IoMdPlay } from 'react-icons/io';
import { BiInfoCircle } from 'react-icons/bi';
import requests from '../config/Request';
import QuickView from './QuickView';
import axios from 'axios';

function Banner() {
  // État pour stocker les informations du film
  const [movie, setMovie] = useState([]);
  // État pour gérer l'affichage du popup
  const [popup, setPopUp] = useState(false);
  // État pour stocker le code d'intégration de la vidéo
  const [videoEmbedCode, setVideoEmbedCode] = useState('');
  // État pour définir le mode du contenu du popup
  const [contentMode, setContentMode] = useState('video');

  function handleClickPopUp() {
    // Inversion de la valeur de l'état popup lors du clic sur le bouton du popup
    setPopUp(!popup);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // Requête pour récupérer les films depuis l'API
        const request = await axios.get(requests.fetchNetflixOriginals);
        const randomMovie =
          request.data.results[
            // Sélection d'un film aléatoire parmi les résultats
            Math.floor(Math.random() * request.data.results.length)
          ];
          // Mise à jour de l'état avec les informations du film sélectionné
        setMovie(randomMovie);
        
        // Recherche de la bande-annonce du film sur YouTube
        searchYouTubeTrailer(randomMovie.title || randomMovie.original_title);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }
    fetchData(); // Appel de la fonction fetchData lors du montage du composant (argument vide [])
  }, []);
  
  //truncateText prend deux arguments : 
  //string (une chaîne de caractères) et n (un nombre).
  function truncateText(string, n) {
    // Vérifie si la chaîne de caractères est définie et non nulle
    // et si sa longueur dépasse la valeur maximale spécifiée (n)
    if (string?.length > n) {
      // Tronque la chaîne de caractères à une longueur maximale (n - 1)
      // et ajoute des points de suspension (...) à la fin
      return string.substr(0, n - 1) + '...';
    } else {
      // Si la chaîne de caractères est vide ou ne dépasse pas la longueur maximale (n),
      // renvoie le texte par défaut "Pas de description"
      return 'Pas de description';
    }
  }
  

  async function searchYouTubeTrailer(title) {
    try {
      // Récupération de la clé d'API YouTube
      const API_KEY_YOUTUBE = process.env.REACT_APP_YOUTUBE_API_KEY;
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', { //envoie une requête HTTP GET à l'URL
        params: { //Paramètres de la requête
          key: API_KEY_YOUTUBE, // Clé de l'api
          part: 'snippet', // Parties des ressources (titre, description)
          q: `${title} bande annonce`,// Requête de recherche video avec le titre du film
          maxResults: 1,// Nombre max de resultats qu'on veux obtenir
          type: 'video',// Type définit le type de ressource qu'on recherche 'Video'
        },
      });
  
      if (response.data.items.length > 0) {
        // Récupération de l'ID de la vidéo trouvée
        const videoId = response.data.items[0].id.videoId;
        // Génération du code d'intégration de la vidéo
        const videoEmbedCode = `<iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube Video Player" frameborder="0" allowfullscreen></iframe>`;
        // Mise à jour de l'état avec le code d'intégration de la vidéo
        setVideoEmbedCode(videoEmbedCode);
      } else {
        console.log('Aucune vidéo trouvée sur YouTube pour le film :', title);
      }
    } catch (error) {
      console.error('Erreur lors de la recherche de la vidéo sur YouTube :', error);
    }
  }
  
  function openVideoPopup() {
    // Affichage du popup
    setPopUp(true); 
    // Définition du mode du contenu du popup comme vidéo
    setContentMode('video');
  }

  function openDetailsPopup() {
    // Affichage du popup
    setPopUp(true);
    // Définition du mode du contenu du popup comme détails
    setContentMode('details');
  }

  function closeVideoPopup() {
    // Fermeture du popup
    setPopUp(false);
  }

  const bannerStyle = {
    // Style d'arrière-plan du banner avec l'image du film
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://image.tmdb.org/3/t/p/original/${movie?.backdrop_path}")`,
  };

  return (
    <header className={`banner ${popup ? 'banner__overlay' : ''}`} style={bannerStyle}>
      <div className="banner__content">
        <h1 className="banner__title">
          {/* Titre du film */}
          {movie?.title || movie?.original_title || 'Titre inconnu'}
        </h1>
        {/* 
        Si la longueur de la description du film dépasse 200 caractères, 
        elle sera tronquée et des points de suspension seront ajoutés à la fin.  
        */}
        <p className="banner__description">{truncateText(movie?.overview, 200)}</p>
        <div className="banner__buttons">
          <button className="banner__button" onClick={openVideoPopup}>
            <IoMdPlay /> Lecture {/* Bouton de lecture de la bande-annonce */}
          </button>
          <button className="banner__button button__more" onClick={openDetailsPopup}>
            <BiInfoCircle /> Plus d'infos {/* Bouton pour afficher plus d'informations */}
          </button>
        </div>
      </div>
      {popup && (
        <div className="popup">
          <div className="popup__content">
            <button className="popup__close" onClick={closeVideoPopup}>
              &times;
            </button>
            {/* Contenu du popup (vidéo ou détails) */}
            <div className="popup__video" dangerouslySetInnerHTML={{ __html: videoEmbedCode }}></div>
          </div>
        </div>
      )}
      <QuickView
        bannerStyle={bannerStyle}
        movie={movie}
        popup={handleClickPopUp}
        popUpStatut={popup}
        videoEmbedCode={videoEmbedCode}
        contentMode={contentMode}
      />
    </header>
  );
}

export default Banner;
