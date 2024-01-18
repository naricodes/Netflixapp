import React from 'react';
import './Footer.scss';
import { FaFacebookF } from 'react-icons/fa';
import { BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs';


function Footer() {
  return (
    <footer className='footer'>
      <div>
        <div className='footer__socials'>
          <a href='/' className='footer__social'><FaFacebookF /></a>
          <a href='/' className='footer__social'><BsInstagram /></a>
          <a href='/' className='footer__social'><BsTwitter /></a>
          <a href='/' className='footer__social'><BsYoutube /></a>
        </div>
        <ul className='footer__links'>
          <li className='footer__link'>
            <a href='/'>Audiodescription</a>
          </li>
          <li className='footer__link'>
            <a href='/'>Relatios Investisseurs</a>
          </li>
          <li className='footer__link'>
            <a href='/'>Confidentialité</a>
          </li>
          <li className='footer__link'>
            <a href='/'>Nous contacter</a>
          </li>
          <li className='footer__link'>
            <a href='/'>Centre d'aide</a>
          </li>
          <li className='footer__link'>
            <a href='/'>Recrutement</a>
          </li>
          <li className='footer__link'>
            <a href='/'>Informations légales</a>
          </li>
          <li className='footer__link'>
            <a href='/'>Cartes cadeaux</a>
          </li>
          <li className='footer__link'>
            <a href='/'>Boutique Netflix</a>
          </li>
          <li className='footer__link'>
            <a href='/'>Préférences de cookies</a>
          </li>
          <li className='footer__link'>
            <a href='/'>Presse</a>
          </li>
          <li className='footer__link'>
            <a href='/'>Conditions d'utilisation</a>
          </li>
          <li className='footer__link'>
            <a href='/'>Mentions légales</a>
          </li>
        </ul>
        <div className='container__copy'>
          <span className='code_service'>Code de service</span>
          <p className='copyright'>© 1997-2023 - Netflix Clone</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;