import React, { lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { AuthPaths } from 'constant/paths';

import Auth from 'utils/Auth';

import useAuth from 'hooks/useAuth';

import Roles from 'constant/personnel';
import Index from '.';

const SigninRoute = lazy(() => import('pages/Auth/LoginForm/LoginForm'));
const SignupRoute = lazy(() =>
  import('pages/Auth/CreatePassword/CreatePassword')
);
const ForgotPasswordRoute = lazy(() =>
  import('pages/Auth/ForgotPassword/ForgotPassword')
);
const ResetPasswordRoute = lazy(() =>
  import('pages/Auth/ResetPassword/ResetPassword')
);

function AuthRouter() {
  const isAuthenticated = Auth.isAuthenticated();
  const location = useLocation();
  const verifyLink = location.pathname.startsWith('/verify-user');
  const { auth } = useAuth();

  const NavigationPath = () => {
    if (auth.user === Roles.ADMIN) return '/admin';
    if (auth.user === Roles.CALLGROUPAGENT) return '/call-agent';
    if (auth.user === Roles.CAMPAIGNMANAGER) return '/campaign-manager';
    return '/';
  };

  // const NavigationPath =
  //   // eslint-disable-next-line no-nested-ternary
  //   auth.user === 'Admin'
  //     ? '/admin'
  //     : auth.user === 'CallGroupAgent'
  //     ? '/call-agent'
  //     : auth.user === 'CampaignManager'
  //     ? '/campaign-manager'
  //     : '/';
  if (isAuthenticated && !verifyLink) {
    return <Navigate to={NavigationPath()} replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />}>
        <Route path="" element={<Navigate to="/signin" replace />} />
        <Route path={AuthPaths.SIGNIN} element={<SigninRoute />} />
        <Route path={AuthPaths.SIGNUP} element={<SignupRoute />} />
        <Route
          path={AuthPaths.FORGOT_PASSWORD}
          element={<ForgotPasswordRoute />}
        />
        <Route
          path={AuthPaths.RESET_PASSWORD}
          element={<ResetPasswordRoute />}
        />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default AuthRouter;
