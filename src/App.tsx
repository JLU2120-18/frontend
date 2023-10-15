import React from 'react';
import { useRouteStore } from '@/models';
import { useRoutes } from 'react-router-dom';

export const App = React.memo(() => {
  const routeModel = useRouteStore();
  return useRoutes(routeModel.routes);
});