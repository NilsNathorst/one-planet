import React, { useState, useContext, createContext } from "react";

const TreeContext = createContext();

const TreeProvider = ({ children }) => {
  const [treeVectors, setTreeVectors] = useState({});
  return (
    <TreeContext.Provider value={{ treeVectors, setTreeVectors }}>
      {children}
    </TreeContext.Provider>
  );
};

const useTree = () => useContext(TreeContext);

export { TreeProvider, useTree };
