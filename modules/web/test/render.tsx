import { render } from '@testing-library/react';

import * as Router from 'react-router-dom';
import { ReactNode } from 'react';

export const renderWithRouter = (child: ReactNode) => render(<Router.BrowserRouter>{child}</Router.BrowserRouter>);
