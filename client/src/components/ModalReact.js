import React from 'react';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Button from './Button';
import Form from './Form';
import Icon from './Icon';

const customStyles = {
  overlay: {
    zIndex: 10,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function ModalReact({ buttonClasses, openModal, closeModal, modalIsOpen, setIsOpen, isEditing, onSave }) {
  let subtitle;

  // const [modalIsOpen, setIsOpen] = React.useState(false);

  // function openModal() {
  //   setIsOpen(true);
  // }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.

    if (isEditing.status === true) {
      subtitle.innerText = 'Editar lançamento';
    };
    subtitle.style.color = '#f00';
  }

  // function closeModal() {
  //   setIsOpen(false);
  // }

  return (
    <>
      <Button
        className={buttonClasses || ''}
        onClick={openModal}
      >
        {/* <Icon>add</Icon> */}
        <b>+</b> Novo lançamento
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit-Insert-Modal"
      >
        <h4
          className=""
          ref={_subtitle => (subtitle = _subtitle)}>
          Adicionar lançamento
        </h4>

        <Button
          className="btn waves-effect waves-light red"
          onClick={closeModal}
        >
          <Icon>close</Icon>
        </Button>

        <Form onSubmit={onSave} isEditing={isEditing} />

      </Modal>
    </>
  );
}

// ReactDOM.render(<ModalReact />, document.getElementById('root'));