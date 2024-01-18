import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Row from './components/Row';
import requests from './config/Request';
import Video from './components/Video';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Banner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<Video />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

function Home() {
  return (
    <>
      <Row title="Seulement sur Netflix" url={requests.fetchNetflixOriginals} isPoster={true} />
      <Row title="Les plus populaires" url={requests.fetchPopular} />
      <Row title="Films tendance de la semaine" url={requests.fetchTrending} />
      <Row title="Science Fiction" url={requests.fetchScienceFiction} />
      <Row title="Films d'horreur" url={requests.fetchHorrorMovies} />
      <Row title="Entrez dans l'action !" url={requests.fetchActionMovies} />
      <Row title="Documentaires" url={requests.fetchDocumentaries} />
      <Row title="Films Romantiques" url={requests.fetchRomanceMovies} />
    </>
  );
}

export default App;