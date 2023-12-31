import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  App,
  ProtectedRoute,
  RouterProvider,
  StoreProvider,
} from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { store } from '~/libs/packages/store/store.js';
import { Auth } from '~/pages/auth/auth.js';
import { Landing } from './pages/landing/landing.js';
import { Deals } from './pages/deals/deals.js';
import { PublicRoute } from './libs/components/components.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
  <StrictMode>
    <StoreProvider store={store.instance}>
      <RouterProvider
        routes={[
          {
            path: AppRoute.ROOT,
            element: <App />,
            children: [
              {
                path: AppRoute.ROOT,
                element: (
                  <PublicRoute>
                    <Landing />
                  </PublicRoute>
                ),
              },
              {
                path: AppRoute.SIGN_IN,
                element: (
                  <PublicRoute>
                    <Auth />
                  </PublicRoute>
                ),
              },
              {
                path: AppRoute.SIGN_UP,
                element: (
                  <PublicRoute>
                    <Auth />
                  </PublicRoute>
                ),
              },
              {
                path: AppRoute.DEALS,
                element: (
                  <ProtectedRoute>
                    <Deals />
                  </ProtectedRoute>
                ),
              },
            ],
          },
        ]}
      />
    </StoreProvider>
  </StrictMode>,
);
