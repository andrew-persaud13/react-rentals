import React, { useState } from 'react';
import Modal from 'react-responsive-modal';

const BwmModal = ({
  title = 'Modal Window',
  subtitle = 'Confirm your data',
  children,
  openBtn: OpenBtn,
  onSubmit,
  resetError,
}) => {
  const [modalState, setModalState] = useState(false);
  const done = () => setModalState(false);

  return (
    <>
      {!OpenBtn && (
        <button onClick={() => setModalState(true)} className='btn btn-success'>
          Open
        </button>
      )}

      {OpenBtn && (
        <div onClick={() => setModalState(true)}>
          <OpenBtn />
        </div>
      )}

      <Modal
        open={modalState}
        classNames={{ modal: 'bwm-modal' }}
        onClose={() => {
          resetError();
          setModalState(false);
        }}
        focusTrapped={false}
      >
        <h4 className='modal-title title'>{title}</h4>
        <p className='modal-subtitle'>{subtitle}</p>
        <div className='modal-body'>{children}</div>
        <div className='modal-footer'>
          <button
            onClick={() => onSubmit(done)}
            type='button'
            className='btn btn-bwm-main'
          >
            Confirm
          </button>
          <button
            onClick={() => {
              resetError();
              setModalState(false);
            }}
            type='button'
            className='btn btn-danger'
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BwmModal;
