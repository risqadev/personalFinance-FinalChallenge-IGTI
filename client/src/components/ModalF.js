import React from 'react';
import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';
import Button from './Button';

export default function Modal({ children, id, trigger, buttonLabel }) {
  // const { children } = props;

  const [Modal, setModal] = React.useState();

  React.useEffect(() => {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
        myModal.open();
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
        myModal.destroy();
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "15%",
      endingTop: "30%"
    };

    const myModal = M.Modal.init(Modal, options);
    // let instance = myModal.getInstance();
    // instance.open();
    // instance.close();
    // instance.destroy();
  }, [Modal]);

  return (
    <div>

      {trigger}

      {/* <a
        className="waves-effect waves-light btn modal-trigger col"
        data-target="modal1"
      >
      </a> */}

      <div
        ref={Modal => {
          setModal(Modal);
        }}
        id={id || "modal1"}
        className="modal"
      >

        {children}

      </div>
    </div >
  );
}
