import React, { useRef, useContext, useState, useEffect, createContext } from 'react';
import { createPortal } from 'react-dom';

const Context = createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [context, setContext] = useState();

  // ensures modalRef exists in state after initial render
  useEffect(() => {
    setContext(modalRef.current);
  }, []);

  return (
    <>
      <Context.Provider value={context}>
        {children}
      </Context.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ children }) {
  const modalNode = useContext(Context);

  return modalNode ? createPortal(
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <section className="modal-card-body">
          {children}
        </section>
      </div>
    </div>,
    modalNode
  ) : null;
}

export default Modal;
