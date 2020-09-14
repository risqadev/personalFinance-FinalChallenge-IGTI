import React, { Component } from 'react';
import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';
import Button from './Button';


export default class Modal extends Component {
  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);

    // let instance = M.Modal.getInstance(this.Modal);
    // instance.open();
    // instance.close();
    // instance.destroy();
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <a
          className="waves-effect waves-light btn modal-trigger col"
          data-target="modal1"
        >
          {children}
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
          <div className="modal-content">
            <div className="row valign-wrapper" style={{ justifyContent: 'space-between' }} >
              <div className="col">
                <h4>Inclusão de lançamento</h4>
              </div>
              <Button addClasses="red modal-close right">
                <i className="material-icons">
                  close
                </i>
              </Button>
            </div>

            <p>A bunch of text</p>
          </div>
          <div className="modal-footer">
            <Button addClasses="modal-close">
              Salvar
            </Button>
          </div>
        </div>
      </div >
    );
  }
}
