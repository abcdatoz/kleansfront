
const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
   
        <div className="modal-dialog">
            <header className="modal-header">
            The header of the first modal
            

            <button className="close-modal" type="button" onClick={handleClose}>
                X
            </button>


            </header>
            <section className="modal-content">
            
                {children}


            </section>
            <footer className="modal-footer">
            The footer of the first modal
            </footer>
        </div>
  
      </div>
    );
  };
  
  
  export default Modal