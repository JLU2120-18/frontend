import React from 'react';
import { useAuth } from '@/hooks';

const PurchaseIdPage = React.memo(() => {
  useAuth(['commission']);
  return (
    <div>Purchase Info page</div>
  );
});

export default PurchaseIdPage;