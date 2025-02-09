import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PageLoader } from '../components/PageLoader';
import { routeConfig } from './config';

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {Object.values(routeConfig).map(({ element, path }) => (
            <Route
              key={path}
              path={path}
              element={element}
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
