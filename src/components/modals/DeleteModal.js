import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Modal, ModalBody, Row } from "reactstrap";

/**
 * Classe responsável por exibir uma janela modal perguntando se o usuário deseja remover algo
 */
class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Método que faz a renderização da janela
   * @returns janela renderizada
   */
  render() {

    //recebe via props as informações sobre o modal como estado (se está ou não aberto, conteúdo da pergunta, evento a ser executado ao clicar em SIM)
    const { isOpen, toggle, question, onDeleteClick } = this.props;

    //faz a renderização da janela modal
    return (
      <React.Fragment>
        <Modal isOpen={isOpen} toggle={toggle} centered={true}>
          <ModalBody className="py-3 px-5">
            <Row>
              <Col lg={12}>
                <div className="text-center">
                  <i
                    className="mdi mdi-alert-circle-outline"
                    style={{ fontSize: "9em", color: "orange" }}
                  />
                  <h2>{question}</h2>
                  <h4>Esta operação não poderá ser revertida</h4>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-center mt-3">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg me-2"
                    onClick={onDeleteClick}>
                    Sim
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg me-2"
                    onClick={toggle}>
                    Cancelar
                  </button>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
DeleteModal.propTypes = {
  toggle: PropTypes.func,
  onDeleteClick: PropTypes.func,
  isOpen: PropTypes.any,
  question: PropTypes.any
};

export default DeleteModal;
