import React, { useRef, useContext, useState, useEffect, createContext } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

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

export const Modal = ({ children, onClickOutside }) => {
  const modalNode = useContext(Context);

  return modalNode ? createPortal(
    <div className="modal is-active">
      <div className="modal-background" onClick={onClickOutside} />
      <div className="modal-card">
        <section className="modal-card-body">
          {children}
        </section>
      </div>
    </div>,
    modalNode
  ) : null;
};

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  onClickOutside: PropTypes.func,
};

Modal.defaultProps = {
  onClickOutside: () => {},
};
