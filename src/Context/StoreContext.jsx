import React, { createContext, useState } from 'react';

export const Context = createContext(null);

const StoreContext = ({ children }) => {
  const [ShowMap, setShowmap] = useState(false);

  const values = {
    ShowMap, 
    setShowmap
  };

  return (
    <Context.Provider value={values}>
      {children}
    </Context.Provider>
  );
};

export default StoreContext;
