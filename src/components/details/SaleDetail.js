import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Table } from "reactstrap";
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ItemDetail from './ItemDetail';
import { formatDatetime } from "helpers/dates_helpers";

/**
 * Classe responsável por implementar o componente de que exibe os detalhes de uma venda
 */
class SaleDetail extends Component {
  constructor(props) {
    super(props);

    this.printSale = this.printSale.bind(this);
  }

  /**
   * Método que imprime o conteúdo da página
   */
  printSale() {
    window.print();
  };

   /**
   * Método que faz a renderização do formulário
   * @returns formulário renderizado
   */
  render() {
    //obtém a venda a ser exibida
    const { saleStore } = this.props;
    const { selectedSale } = saleStore;

    //renderiza o formulário de cadastro
    return (
      <React.Fragment>
        <Container fluid>
          {selectedSale !== null ? (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <div>
                      <div>
                        <Grid container alignItems="center">
                          <Grid item xs>
                            <Typography gutterBottom variant="h4">
                              {selectedSale.ecopromosCode}
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                      <Divider variant="middle" />
                    </div>
                    <Row>
                      <div style={{ flex: 10, marginRight: 10 }}>
                        <ItemDetail
                          label="Cliente"
                          value={selectedSale.purchaserName	}/>
                      </div>
                    </Row>
                    <Row>
                      <div style={{ flex: 6, marginRight: 10 }}>
                        <ItemDetail
                          label="Item adquirido"
                          value={selectedSale.itemDescription}
                        />
                      </div>
                      <div style={{ flex: 2, marginRight: 10 }}>
                        <ItemDetail
                          label="Preço"
                          value={`R$ ${selectedSale.itemPrice}`}
                        />
                      </div>
                      <div style={{ flex: 2, marginRight: 10 }}>
                        <ItemDetail
                          label="Quantidade"
                          value={selectedSale.purchaseCount}
                        />
                      </div>
                    </Row>
                    <Row>
                      <div style={{ flex: 2.5, marginRight: 10 }}>
                        <ItemDetail
                          label="Comerciante"
                          value={selectedSale.merchantAddress}
                        />
                      </div>
                      <div style={{ flex: 2.5, marginRight: 10 }}>
                        <ItemDetail
                          label="Endereço"
                          value={selectedSale.merchantName}
                        />
                      </div>
                    </Row>
                    <Row>
                      <div style={{ flex: 2, marginRight: 10 }}>
                        <ItemDetail
                          label="Criado em"
                          value={formatDatetime(selectedSale.createdAt)}
                        />
                      </div>
                      <div style={{ flex: 2, marginRight: 10 }}>
                        <ItemDetail
                          label="Última atualização"
                          value={formatDatetime(selectedSale.updatedAt)}
                        />
                      </div>
                    </Row>
                    <hr />
                    <div className="d-print-none">
                      <div className="float-end">
                        <Link
                          to="#"
                          onClick={this.printSale}
                          className="btn btn-primary me-1"
                        >
                          <i className="fa fa-print" />
                          Imprimir
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ) : (
            <p className="mb-2 text-center">Venda não encontrada</p>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
SaleDetail.propTypes = {
  saleStore: PropTypes.object,
};

/**
 * Mapeia o estado das vendas da aplicação controlado pelo redux com a página
 * @param {*} state estado das vendas
 * @returns o estado das vendas
 */
const mapStateToProps = state => ({
  saleStore: state.saleStore,
});

//conect o componente com o redux
export default connect(mapStateToProps, null)(SaleDetail);
