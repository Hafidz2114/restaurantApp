import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import '../styles/template/main.css';
import '../styles/template/content.css';
import '../styles/loader.css';
import '../styles/root.css';
import '../styles/responsive.css';

import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#hambugerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
