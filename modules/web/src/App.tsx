import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './views/Home/Home';
import Event from './views/Event/Event';

const router = createBrowserRouter([
    {
        path: '*',
        element: <Home />,
    },
    {
        path: '/event/:eventId',
        element: <Event />,
    },
]);
const App = () => <RouterProvider router={router} />;

export default App;
