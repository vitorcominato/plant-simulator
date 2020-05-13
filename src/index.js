/** Regenerator is imported so the async await functions work properly */
import 'regenerator-runtime/runtime';
import Home from './pages/Home';
import Error404 from './pages/Error404';

// Route list
const routes = {
  '/': Home,
};


const router = async () => {
  const root = null || document.getElementById('root');

  const url = document.location.hash.slice(1).toLowerCase() || '/';
  const aRequestUrl = url.split('/');
  const page = aRequestUrl[1];

  const parsedURL = (page ? `/${page}` : '/');

  const pageToRender = routes[parsedURL] ? routes[parsedURL] : Error404;
  root.innerHTML = await pageToRender.render();
  await pageToRender.componentDidMount();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
