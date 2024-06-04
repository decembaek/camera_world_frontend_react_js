import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import NotFound from './routes/NotFound';
import Home from './routes/Home';
import { SearchTest } from './routes/SearchTest';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { path: '', element: <Home /> },
      { path: 'place', element: <SearchTest /> },
    ],
  },
  // {
  //   path: 'users/',
  //   element: <Root />,
  //   errorElement: <NotFound />,
  //   children: [{ path: 'login', element: <Login /> }],
  // },
]);

export default router;
