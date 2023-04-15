
const Modal = ({ handleClose, show, children, title }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>

     

      

      <section className="modal-main">
        <div className="modal-header">
          {title}
          <button type="button" onClick={handleClose}>
            x
          </button>
        </div>
        
        {children}        


        <div className="modal-footer">
          &nbsp;
        </div>

      </section>

      

      </div>


  );
};


export default Modal