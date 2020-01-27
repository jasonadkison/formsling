import React, { useRef, useContext, useState, useEffect, createContext } from 'react';
import { createPortal } from 'react-dom';

const Context = createContext();

export function BreadcrumbProvider({ children }) {
  const breadcrumbRef = useRef();
  const [context, setContext] = useState();

  // ensures breadcrumbRef exists in state after initial render
  useEffect(() => {
    setContext(breadcrumbRef.current);
  }, []);

  return (
    <>
      <div ref={breadcrumbRef} />
      <Context.Provider value={context}>
        {children}
      </Context.Provider>
    </>
  );
}

export function BreadcrumbPortal({ children }) {
  const breadcrumbNode = useContext(Context);

  return breadcrumbNode ? createPortal(
    <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      {children}
    </nav>,
    breadcrumbNode
  ) : null;
}

export default BreadcrumbPortal;
