import React from 'react';
import YouTube from 'react-youtube';
import './QuickView.scss';
import { AiFillCloseCircle } from 'react-icons/ai';

function QuickView({ bannerStyle, movie, popup, popUpStatut, videoEmbedCode, contentMode }) {
  const videoId = extractVideoId(videoEmbedCode); // Extraction de l'ID de la vidéo à partir du code d'intégration fourni

  function extractVideoId(embedCode) {
    // Expression régulière pour extraire l'ID de la vidéo à partir du code d'intégration
    // Elle recherche une correspondance avec la chaîne de caractères "embed/"
    // suivie d'une séquence de caractères alphanumériques, soulignés (_) ou tirets (-).
    const regex = /embed\/([A-Za-z0-9_-]+)/;
    
    // Utilisation de la méthode match() pour trouver les correspondances entre l'expression régulière et le code d'intégration fourni
    const match = embedCode.match(regex);
    
    // Vérification si une correspondance est trouvée et si la correspondance contient au moins un groupe capturé
    if (match && match.length > 1) {
      return match[1]; // Renvoie l'ID de la vidéo extrait
    }
    return null;
  }
  

  function formatDate(dateString) {
    // Crée un objet Date à partir de la chaîne de caractères de la date
    const date = new Date(dateString);
    // Récupère le jour
    const day = date.getDate();
    // Récupère le mois (note le +1: Sert a obtenir le mois correct dans la notation de date standard '0 : Janvier')
    const month = date.getMonth() + 1;
    // Récupère l'année
    const year = date.getFullYear();
    // Formatage de la date au format jj/mm/aaaa
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  }

  return (
    <div className={`quickView ${popUpStatut && "open"}`}>
      <div className='quickView__banner' style={bannerStyle}>
        <div className='quickView__content'>
          <h3 className="quickView__title">
            {movie?.title || movie?.name || movie?.original_title} {/* Affichage du titre du film en utilisant une expression ternaire pour gérer les différentes possibilités */}
          </h3>
          {contentMode === 'video' && videoId ? ( // Vérifie si le mode de contenu est 'video' et si l'ID de la vidéo est disponible
            <YouTube videoId={videoId} /> // Affichage du composant YouTube avec l'ID de la vidéo
          ) : (
            <>
              <p>{movie?.overview}</p> {/* Affichage du résumé du film */} 
              <p className='release__date'>Date de sortie : {formatDate(movie?.release_date)}</p> {/* Affichage de la date de sortie du film en utilisant la fonction formatDate pour formater la date */}
            </>
          )}
        </div>
        <button className='quickView__close' onClick={popup}>
          <AiFillCloseCircle size={35} />
        </button>
      </div>
    </div>
  );
}

export default QuickView;
