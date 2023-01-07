import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  Card, 
  CardBody, 
  CardTitle, 
  Container,
  Row
} from "reactstrap";
import SalesPanel from "components/panels/SalesPanel";
import { showSalePanel } from '../../store/actions';

/**
 * Classe responsável por implementar o componente de gerenciamento de vendas
 */
class SalesManagement extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const { showSalePanel } = this.props;

    //showSalePanel('SALES_IMPORT_FORM');
    showSalePanel('SALES_SEARCH');
  }

  /**
   * Método que renderiza o componente
   * @returns componente renderizado
   */
  render() {

    //renderiza o componente
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Row>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4 h4">Painel de vendas</CardTitle>
                  <Row>
                    <SalesPanel/>
                  </Row>
                </CardBody>
              </Card>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
SalesManagement.propTypes = {
  showSalePanel: PropTypes.func
};

/**
 * Mapeia com a página as actions necessárias para o componente
 */
const mapDispatchToProps = {
  showSalePanel
};

//conect o componente com o redux
export default connect(null, mapDispatchToProps)(SalesManagement);
