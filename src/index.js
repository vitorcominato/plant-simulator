import Home from './pages/Home';

// Route list
const routes = {
  '/': Home,
};

const router = async () => {
  const root = document.getElementById('root');

  const url = document.location.hash.slice(1).toLowerCase() || '/';
  const aRequestUrl = url.split('/');
  const page = aRequestUrl[1];

  const parsedURL = (page ? `/${page}` : '/');

  const pageToRender = routes[parsedURL];
  root.innerHTML = await pageToRender.render();
  await pageToRender.componentDidMount();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
