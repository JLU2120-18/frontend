import React from 'react';
import { useLocation } from 'react-router-dom';

export function useQuery() {
  const location = useLocation();

  const query = React.useMemo(
    () => {
      const searchParams = new URLSearchParams(location.search);
      const query: Record<string, string> = {};

      searchParams.forEach(([k, v]) => {
        query[k] = v;
      });

      return query;
    },
    [location.search, location.pathname],
  );

  return query;
}