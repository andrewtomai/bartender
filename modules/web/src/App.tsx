import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './views/Home/Home';
import Event from './views/Event/Event';
import PreferencesForm from './components/PreferencesForm';

const router = createBrowserRouter([
    {
        path: '*',
        element: <Home />,
    },
    {
        path: '/event/:eventId',
        element: <Event />,
    },
    {
        path: 'preferences',
        element: (
            <PreferencesForm
                options={[
                    { name: 'beer', isSelected: false },
                    { name: 'wine', isSelected: true },
                    { name: 'cocktail', isSelected: true },
                    { name: 'No Alcohol', isSelected: true },
                    { name: 'Selzter', isSelected: true },
                ]}
                onOptionClick={console.log}
            />
        ),
    },
]);
const App = () => <RouterProvider router={router} />;

export default App;
