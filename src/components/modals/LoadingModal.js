import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal
} from "reactstrap";

/**
 * Classe responsável por exibir uma janela modal de espera de uma operação
 */
class LoadingModal extends Component {
  
  constructor(props) {
    
    super(props);
  }

  /**
   * Método que faz a renderização da janela
   * @returns janela renderizada
   */
  render() {

    //recebe via props as informações sobre o modal como o status, título e mensagem
    const {title, message, isOpen} = this.props;

    //faz a renderização da janela modal
    return (
      
      <React.Fragment>        
        <Modal
          isOpen={isOpen}
          toggle={null}
          scrollable={true}
          centered={true}
          backdrop={'static'}
          id="staticBackdrop">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">{title}</h5>
          </div>
          <div className="modal-body">
            <div className="mt-3 d-grid text-center">
              <p>{message}</p>
              <div>
                <div className="spinner-border text-primary m-1" role="status">
                  <span className="sr-only">Aguarde...</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>    
      </React.Fragment>
    )
  }
}

/**
 * Valida as propriedades do componente
 */
LoadingModal.propTypes = {
  title: PropTypes.any,
  message: PropTypes.any,
  isOpen: PropTypes.any
};

export default LoadingModal