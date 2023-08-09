import { render } from '@testing-library/react';

import * as Router from 'react-router-dom';
import { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const withRouter = (child: ReactNode) => <Router.BrowserRouter>{child}</Router.BrowserRouter>;

const withQueryProvider = (child: ReactNode) => {
    const client = new QueryClient();
    return <QueryClientProvider client={client}>{child}</QueryClientProvider>;
};

export const renderWithProviders = (child: ReactNode) => render(withQueryProvider(withRouter(child)));
