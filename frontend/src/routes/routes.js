const API_URI = '/api/v1';

const routes = {
  pages: {
    chat: () => '/',
    login: () => '/login',
    signup: () => '/signup',
  },
  api: {
    login: () => [API_URI, 'login'].join('/'),
    data: () => [API_URI, 'data'].join('/'),
    signup: () => [API_URI, 'signup'].join('/'),
  },
};

export default routes;
