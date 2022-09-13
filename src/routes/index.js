import React, { Suspense } from 'react';
import {
  BrowserRouter,
  Routes as BrowserRoutes,
  Route,
} from 'react-router-dom';
// import ErrorBoundary from 'ErrorBoundary';

import ModalContextProvider from 'context/modalContext';
import DrawerContextProvider from 'context/drawerContext';
import AuthContextProvider from 'context/authContext';

import PrivateRoute from 'routes/PrivateRoute';

import { Loader } from 'shared';

import BaseRoutes from 'constant/baseRoute';
import { TableRecordsProvider } from 'shared/NewTable';

function Routes() {
  return (
    <Suspense fallback={<Loader />}>
      {/* <ErrorBoundary> */}
      <AuthContextProvider>
        <TableRecordsProvider>
          <ModalContextProvider>
            <DrawerContextProvider>
              <BrowserRouter>
                <BrowserRoutes>
                  {BaseRoutes.map(
                    ({ path, Layout, useAuth, component: Component }) =>
                      Layout && useAuth ? (
                        <Route
                          key={path}
                          path={path}
                          element={
                            <PrivateRoute>
                              <Layout key={path}>
                                <Component />
                              </Layout>
                            </PrivateRoute>
                          }
                        />
                      ) : (
                        <Route key={path} path={path} element={<Component />} />
                      )
                  )}
                  <Route path="*" element={<div>Not Found</div>} />
                </BrowserRoutes>
              </BrowserRouter>
            </DrawerContextProvider>
          </ModalContextProvider>
        </TableRecordsProvider>
      </AuthContextProvider>
      {/* </ErrorBoundary> */}
    </Suspense>
  );
}

export default Routes;
