import 'regenerator-runtime';
import '../styles/main.css';
import App from './app';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import swRegister from './utils/sw-register';
import WebSocketInitiator from './utils/drawer-initiator';
import CONFIG from './globals/config';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App({
    button: document.querySelector('.menu-icon'),
    drawer: document.querySelector('.menu'),
    content: document.querySelector('#main-content'),
  });

  window.addEventListener('hashchange', () => {
    app.renderPage();
  });

  window.addEventListener('load', async () => {
    app.renderPage();
    await swRegister();
    WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
  });

  // Menu toggle functionality
  const menuIcon = document.querySelector('.menu-icon');
  const menu = document.querySelector('.menu');
  menuIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    menuIcon.classList.toggle('active');
    menu.classList.toggle('active');
  });

  document.body.addEventListener('click', () => {
    menuIcon.classList.remove('active');
    menu.classList.remove('active');
  });

  // Skip link functionality
  const skipLinkElem = document.querySelector('.skip-link');
  skipLinkElem.addEventListener('click', (event) => {
    event.preventDefault();
    const mainContent = document.querySelector('#main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' });
      mainContent.focus();
    }
  });

  console.log('JavaScript loaded!');
});

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  const mainContent = document.querySelector('#main-content');
  if (mainContent) {
    mainContent.innerHTML = `
      <div class="error">
        <h2>Terjadi Kesalahan</h2>
        <p>Mohon muat ulang halaman</p>
      </div>
    `;
  }
});
