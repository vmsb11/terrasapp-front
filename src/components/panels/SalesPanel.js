import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import SalesImportForm from 'components/forms/SalesImportForm';
import SalesSearch from '../searchs/SalesSearch';
import SaleDetail from 'components/details/SaleDetail';
import SaleForm from '../forms/SaleForm';
import { showSalePanel } from '../../store/actions';

/**
 * Classe que renderiza um componente responsável pelo painel das vendas
 */
class SalesPanel extends Component {

  constructor(props) {

    super(props);
  }

  /**
   * Método que renderiza o componente
   * @returns componente renderizado
   */
  render() {

    //obtém as informações da venda a ser renderizado
    const { saleStore, interfaceStore, showSalePanel } = this.props;
    const { selectedSale } = saleStore;
    const { activeTab } = interfaceStore.salePanel;
    
    return (
      <React.Fragment>
        <Container fluid={true}>
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <Nav className='icon-tab nav-justified'>
                    <NavItem>
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          active: activeTab === 'SALES_IMPORT_FORM',
                        })}
                        onClick={() => {

                          showSalePanel('SALES_IMPORT_FORM');
                        }}
                      >
                        <span className='d-none d-sm-block'><i className='bx bx-upload font-size-22'></i> Importar vendas</span>
                        <span className='d-block d-sm-none'><i className='bx bx-upload font-size-22'></i></span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          active: activeTab === 'SALES_SEARCH',
                        })}
                        onClick={() => {

                          showSalePanel('SALES_SEARCH');
                        }}>
                        <span className='d-none d-sm-block'><i className='bx bx-cart font-size-22'></i> Vendas cadastradas</span>
                        <span className='d-block d-sm-none'><i className='bx bx-cart font-size-22'></i></span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        disabled={(selectedSale === null)}
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          active: activeTab === 'SALE_DETAIL',
                        })}
                        onClick={() => {

                          showSalePanel('SALE_DETAIL');
                        }}
                      >
                        <span className='d-none d-sm-block'><i className='bx bx-detail font-size-22'></i> Detalhes da venda</span>
                        <span className='d-block d-sm-none'><i className='bx bx-detail font-size-22'></i></span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          active: activeTab === 'EDIT_SALE',
                        })}
                        onClick={() => {

                          showSalePanel('EDIT_SALE');
                        }}
                      >
                        {
                          (selectedSale === null) ?
                            <div>
                              <span className='d-none d-sm-block'><i className='bx bx-plus font-size-22'></i> Nova Venda</span>
                              <span className='d-block d-sm-none'><i className='bx bx-plus font-size-22'></i></span>
                            </div>
                            :
                            <div>
                              <span className='d-none d-sm-block'><i className='bx bx-edit font-size-22'></i> Editar Venda</span>
                              <span className='d-block d-sm-none'><i className='bx bx-edit font-size-22'></i></span>
                            </div>
                        }
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab} className='text-muted'>
                    <TabPane tabId='SALES_IMPORT_FORM'>
                      <Row>
                        <Col sm='12'>
                          <SalesImportForm/>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId='SALES_SEARCH'>
                      <Row>
                        <Col sm='12'>
                          <SalesSearch/>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId='SALE_DETAIL'>
                      <Row>
                        <Col sm='12'>
                          <SaleDetail/>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId='EDIT_SALE'>
                      <Row>
                        <Col sm='12'>
                          <SaleForm
                            mode={(selectedSale !== null) ? 'edit' : 'new'}/>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

/**
 * Valida as propriedades do componente
 */
SalesPanel.propTypes = {
  saleStore: PropTypes.any,
  interfaceStore: PropTypes.any,
  showSalePanel: PropTypes.func
};

/**
 * Mapeia o estado das vendas da aplicação controlado pelo redux com a página
 * @param {*} state estado das vendas
 * @returns o estado das vendas
 */
const mapStateToProps = (state) => {
  return ({
    saleStore: state.saleStore,
    interfaceStore: state.interfaceStore
  });
};

/**
 * Mapeia com a página as actions necessárias para o componente
 */
const mapDispatchToProps = {
  showSalePanel
};

//conect o componente com o redux
export default connect(mapStateToProps, mapDispatchToProps)(SalesPanel);
