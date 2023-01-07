import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal
} from "reactstrap";

/**
 * Classe responsável por exibir uma janela modal que exibe algum componente da aplicação, exemplo: formulário de cadastro de sale
 */
class MyModal extends Component {
  
  constructor(props) {
    
    super(props);
  }

  /**
   * Método que faz a renderização da janela
   * @returns janela renderizada
   */
  render() {

    //recebe via props as informações sobre o modal como o ícone, título, tamanho, se está aberto e etc
    const { icon, title, size, isFullScreen, isOpen, toggle } = this.props;
    
    //faz a renderização da janela modal
    return (
      
      <React.Fragment>        
        <Modal
          isOpen={isOpen}
          toggle={toggle}
          className={(isFullScreen) ? "modal-fullscreen" : ''}
          size={size}
          scrollable={true}
          centered={true}
          onEnter={() => this.setState({x: 1})}
          style={{
            padding: 20
          }}>
          <div className="modal-header bg-primary">
            <i className={`${icon} font-size-22 text-white`}/>&nbsp;&nbsp;<h5 className="modal-title text-white" id="staticBackdropLabel">{title}</h5>
            <button type="button" className="btn-close" onClick={toggle} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {this.props.children}
          </div>
        </Modal>    
      </React.Fragment>
    )
  }
}

/**
 * Valida as propriedades do componente
 */
MyModal.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.any,
  title: PropTypes.any,
  message: PropTypes.any,
  isFullScreen: PropTypes.any,
  isOpen: PropTypes.any,
  size: PropTypes.any,
  toggle: PropTypes.func
};

export default MyModal;