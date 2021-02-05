import React, { useEffect } from 'react';

import { useAuth } from '../providers/AuthProvider';

const Logout = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut]);
  return <div>You have been successfully logged out!</div>;
};

export default Logout;
