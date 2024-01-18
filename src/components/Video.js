import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './Video.scss';
import axios from 'axios';
import Row from './Row';
import QuickView from './QuickView';

function Video() {
  // Utilisation de la fonction useParams pour obtenir l'ID de la vidéo à partir des paramètres d'URL
  let { id } = useParams();
  const [videoEmbedCode, setVideoEmbedCode] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Recherche de la bande-annonce sur YouTube en utilisant l'ID de la vidéo
    searchYouTubeTrailer(id);
  }, [id]);

  async function searchYouTubeTrailer(title) {
    try {
      const API_KEY_YOUTUBE = process.env.REACT_APP_YOUTUBE_API_KEY;
      // Effectuer une requête GET vers l'API YouTube Data
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
        const videoEmbedCode = `<iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube Video Player" frameborder="0" allowfullscreen></iframe>`;
        setVideoEmbedCode(videoEmbedCode);
      } else {
        console.log('No video found on YouTube for the film:', title);
      }
    } catch (error) {
      console.error('Error searching for video on YouTube:', error);
    }
  }

  function openPopup() {
    setShowPopup(true);
  }

  return (
    <div className="video">
      <button className="video__play-button" onClick={openPopup}>
        Ouvrir la vidéo
      </button>
      {/* Utilisation de dangerouslySetInnerHTML pour afficher le code d'intégration de la vidéo */}
      <div dangerouslySetInnerHTML={{ __html: videoEmbedCode }} />
      {/* Utilisation du composant Row pour afficher d'autres informations sur la vidéo */}
      <Row title="Title" url="URL" isPoster={true} handleImageClick={searchYouTubeTrailer} />
      {/* Utilisation du composant QuickView pour afficher une vue détaillée de la vidéo */}
      <QuickView bannerStyle={{}} movie={{}} popup={() => {}} popUpStatut={showPopup} />
    </div>
  );
}

export default Video;
