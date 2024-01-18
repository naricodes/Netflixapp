import axios from 'axios';

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
      const videoEmbedCode = `<iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube bande-annonce" frameborder="0" allowfullscreen></iframe>`;
      // Afficher le code de la vidéo intégrée sur la page
      document.getElementById('video-container').innerHTML = videoEmbedCode;
    } else {
      console.log('No video found on YouTube for the film:', title);
    }
  } catch (error) {
    console.error('Error searching for video on YouTube:', error);
  }
}

export default searchYouTubeTrailer;
