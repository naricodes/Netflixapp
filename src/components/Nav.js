import React from 'react';
import './Nav.scss';
import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineSearch } from 'react-icons/ai';
import { RiArrowDownSFill } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io'

function Nav() {
  const [navBlack, setNavBlack] = useState(false); // État pour gérer l'apparence du menu de navigation
  const [toggleMenu, settoggleMenu] = useState(false); // État pour gérer l'affichage du menu hamburger

  const transitionNav = () => {
    // Détermine si le menu de navigation doit devenir noir en fonction du défilement de la page
    window.scrollY > 100 ? setNavBlack(true) : setNavBlack(false);
  };

  useState(() => {
    // Ajoute un écouteur d'événements pour détecter le défilement de la page
    document.addEventListener('scroll', transitionNav);
  });

  const handleClick = () => {
    console.log(toggleMenu);
    // Inverse l'état du menu hamburger lorsqu'il est cliqué
    toggleMenu ? settoggleMenu(false) : settoggleMenu(true);
  }

  return (
    <div className={`nav ${navBlack || toggleMenu ? "nav--black" : "nav--transparent"} ${toggleMenu && "show"}`}>
      <button className='nav__burger' onClick={handleClick}><RxHamburgerMenu size={30} className='icon-burger'/></button>
      <a href='../App.js'>
        <img src='../images/netflix-logo.png' alt='Logo Netflix' className='nav__logo' />
      </a>
      <nav className='nav__links'>
        <a href='/' className='nav__link'>Accueil</a>
        <a href='/' className='nav__link'>Séries</a>
        <a href='/' className='nav__link'>Films</a>
        <a href='/' className='nav__link'>Nouveautés les plus regardées</a>
        <a href='/' className='nav__link'>Ma liste</a>
      </nav>
      <div className='nav__actions'>
        <a href='/' className='nav__action'><AiOutlineSearch /></a>
        <a href='/' className='nav__action'><IoMdNotificationsOutline /></a>
        <a href='/' className='nav__action profile__container'>
          <img src='./images/avatar.png' alt='' className='profile-picture'/>
          <RiArrowDownSFill size={18}/>
        </a>
      </div>
    </div>
  );
}

export default Nav;
