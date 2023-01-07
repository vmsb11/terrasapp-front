import React, { Component } from "react"
import { Row, Col } from "reactstrap"

/**
 * Classe que renderiza o componente que exibe o rodapé da página
 */
class Footer extends Component {

  /**
   * Método que faz a rendeização do componente
   * @returns componente renderizado
   */
  render() {

    //renderiza o componente
    return (
      <React.Fragment>
        <footer className="footer">
          <div className="container-fluid">
            <Row>
              <Col sm={6}>{new Date().getFullYear()} © Terras App - Gerenciamento.</Col>
              <Col sm={6}>
                <div className="text-sm-end d-none d-sm-block">
                  Desenvolvido por Vinícius Moreira
              </div>
              </Col>
            </Row>
          </div>
        </footer>
      </React.Fragment>
    )
  }
}

export default Footer;