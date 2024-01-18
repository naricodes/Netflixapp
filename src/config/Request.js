const API_KEY = process.env.REACT_APP_API_KEY;
const baseURL = 'https://api.themoviedb.org/3/'; // URL de base de l'API TMDB

// Objets contenant les différentes requêtes vers l'API TMDB pour récupérer des films dans différentes catégories
const requests = {
  // Requête pour récupérer les films originaux Netflix
  fetchNetflixOriginals: `${baseURL}trending/all/week?api_key=${API_KEY}&language=fr-FR`,
  // Requête pour récupérer les plus populaires 'History'
  fetchPopular: `${baseURL}movie/popular?api_key=${API_KEY}&with_genres=36`,
  // Requête pour récupérer les films tendances de la semaine
  fetchTrending: `${baseURL}trending/movie/week?api_key=${API_KEY}`,
  // Requête pour récupérer le genre 'Science Fiction'
  fetchScienceFiction: `${baseURL}movie/top_rated?api_key=${API_KEY}&with_genres=878`,
  // Requête pour récupérer les films d'horreur
  fetchHorrorMovies: `${baseURL}movie/top_rated?api_key=${API_KEY}&with_genres=27`,
  // Requête pour récupérer les recommendations 'Action'
  fetchActionMovies: `${baseURL}movie/top_rated?api_key=${API_KEY}&with_genres=28`,
  // Requête pour récupérer les documentaires
  fetchDocumentaries: `${baseURL}discover/movie?api_key=${API_KEY}&with_genres=99`,
  // Requête pour récupérer les films romantiques
  fetchRomanceMovies: `${baseURL}discover/movie?api_key=${API_KEY}&with_genres=10749`,
};

export default requests;