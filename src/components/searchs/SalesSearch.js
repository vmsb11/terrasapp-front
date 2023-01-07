import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { 
  Card, 
  CardBody, 
  CardTitle, 
  Row,
  Col,
  Button
} from "reactstrap";
import SalesMetrics from "pages/sales/SalesMetrics";
import SalesSearchBar from "components/searchs/SalesSearchBar";
import SalesTable from "components/tables/SalesTable";
import { 
  searchSales,
  showSalePanel,
  selectSale
} from '../../store/actions';

/**
 * Classe responsável por implementar o componente de busca de vendas
 */
class SearchSales extends Component {

  constructor(props) {
    super(props);

    this.state = {

      currentPage: 1,
      totalPages: 1,
      perPage: 10,
      parameter: ''
    };

    this.onChangeParameter = this.onChangeParameter.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onResetSearch = this.onResetSearch.bind(this);
    this.onNewSale = this.onNewSale.bind(this);
  }

  /**
   * Método que realiza a  busca de vendas
   */
  onSearch() {

    const { searchSales, loginStore } = this.props;
    const { token } = loginStore;
    //obtém os dados da paginação atual e parametro de pesquisa
    const { currentPage, perPage, parameter } = this.state;

    //invoca a action que realiza a busca de vendas
    searchSales(parameter, currentPage, perPage, token);
  };

  /**
   * Método que reseta a pesquisa
   */
  onResetSearch() {
    
    //reseta os dados da pesquisa
    this.setState(
      {
        currentPage: 1,
        totalPages: 0,
        perPage: 10,
      },
      () => {
        //realiza a pesquisa novamente
        this.onSearch();
      }
    );
  };

  /**
   * Método que atualiza o parametro de pesquisa
   * @param {*} e 
   */
  onChangeParameter(e) {
    this.setState({ parameter: e.target.value });
  };

  /**
   * Método invocado quando o componente é montado
   */
  componentDidMount() {

    //obtém as informações do usuário logado
    const { searchSales, loginStore } = this.props;
    const { token } = loginStore;

    //invoca a action que busca as vendas na base de dados
    searchSales('', 1, 10, token);
  }

  onNewSale() {
    const { selectSale, showSalePanel } = this.props;

    selectSale(null);
    showSalePanel('EDIT_SALE');
  };

  /**
   * Método que renderiza o componente
   * @returns componente renderizado
   */
  render() {

    //obtém as vendas encontrados na busca
    const { saleStore } = this.props;
    const { sales } = saleStore;
    const { currentPage } = this.state;
    
    //renderiza o componente
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <CardTitle className="mb-4 h4">Listagem das vendas cadastradas</CardTitle>
              <Row className="mb-2">
                <Col sm="6">
                  <SalesSearchBar 
                    onChangeParameter={this.onChangeParameter} 
                    onSearch={this.onResetSearch} 
                    placeholder="Pesquisar vendas..." />
                </Col>
                <Col sm="6">
                  <div className="text-sm-end">
                    <Button type="button" color="primary" onClick={this.onNewSale}>
                      <i className="bx bx-plus me-1" /> Nova Venda
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row>
                <SalesMetrics/>
              </Row>
              <Row>
                <SalesTable
                  sales={sales}
                  currentPage={currentPage}
                  onChangePage={(page) => {
                    this.setState({ currentPage: page }, () => {
                      this.onSearch();
                    });
                  }}
                  onChangeRowsPerPage={(perPage, page) => {
                    this.setState({ currentPage: page, perPage }, () => {
                      this.onSearch();
                    });
                  }}
                />
              </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
SearchSales.propTypes = {
  loginStore: PropTypes.any,
  saleStore: PropTypes.any,
  loginStore: PropTypes.any,
  searchSales: PropTypes.func,
  showSalePanel: PropTypes.func,
  selectSale: PropTypes.func
};

/**
 * Mapeia o estado das vendas da aplicação controlado pelo redux com a página
 * @param {*} state estado das vendas
 * @returns o estado das vendas
 */
const mapStateToProps = (state) => ({
  saleStore: state.saleStore,
  loginStore: state.loginStore
});

/**
 * Mapeia com a página as actions necessárias para o componente
 */
const mapDispatchToProps = {
  searchSales,
  showSalePanel,
  selectSale
};

//conect o componente com o redux
export default connect(mapStateToProps, mapDispatchToProps)(SearchSales);
