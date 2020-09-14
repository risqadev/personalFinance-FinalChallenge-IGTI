import React from 'react';
import ModalF from './ModalF';
import Button from './Button';
import Form from './Form';

export default function ActionNewEntry({ onSaveNew }) {

  return (
    <ModalF
      id="modal1"
      trigger={<Button
        className="modal-trigger"
        dataTarget="modal1"
      >
        + Novo lançamento
      </Button>
      }
    >
      {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
      <div className="modal-content">
        <div
          className="row valign-wrapper"
          style={{ justifyContent: 'space-between' }}
        >
          <div className="col">

            <h4>Inclusão de lançamento</h4>

          </div>

          <Button className="red modal-close right">
            <i className="material-icons">
              close
            </i>
          </Button>
        </div>

        <Form onSave={onSaveNew} />

      </div>

      {/* <div className="modal-footer">
      </div> */}
    </ModalF>
  )
}
