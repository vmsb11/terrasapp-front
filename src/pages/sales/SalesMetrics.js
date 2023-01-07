import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import SaleInfo from "../../components/common/SaleInfo";
import {
  getSalesMetrics
} from '../../store/actions';

/**
 * Classe que renderiza um componente que exibe a quantidade de quadros criados pra cada tipo
 */
class SalesMetrics extends Component {

  constructor(props) {

    super(props);
  }

  /**
   * Método invocado quando o componente é montado
   */
  componentDidMount() {

    //obtém as informações sobre o usuário logado e o token de autenticação
    const { getSalesMetrics, loginStore } = this.props;
    const { token } = loginStore;

    //invoca a action que retorna a quantidade de vendas criados
    getSalesMetrics(token);
  }

  /**
   * Método que faz a renderização das informações das vendas
   * @returns 
   */
  renderSalesMetrics() {

    //obtém as informações sobre a quantidade de vendas criados
    const { metrics } = this.props.saleStore;
    //monta um vetor com as informações sobre o total de vendas criados pra cada tipo
    const metricsData = [
      {
        title: "Total de vendas",
        color: "primary",
        iconClass: "bx bx-list-ul",
        description: `${metrics[0]}`
      },
      {
        title: "Itens vendidos",
        color: "primary",
        iconClass: "bx bx-list-ul",
        description: `${metrics[1]}`
      },
      {
        title: "Receita bruta",
        color: "primary",
        iconClass: "bx bx-list-ul",
        description: `R$ ${metrics[2]}`
      }
    ]

    //pra cada tipo de sale, renderiza o componente que exibe as informações sobre o total criado de cada tipo
    return metricsData.map((metric, index) => (
      <SaleInfo 
        key={index} 
        xl={3} 
        sm={6} 
        color={metric.color} 
        title={metric.title} 
        subtitle={metric.description} 
        icon={`bx ${metric.iconClass}`} 
        urlSale="#"/>
    ));
  }

  /**
   * Método que renderiza o componente 
   * @returns componente renderizado
   */
  render() {
    return (
      <React.Fragment>
        {this.renderSalesMetrics()}
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
SalesMetrics.propTypes = {
  getSalesMetrics: PropTypes.func,
  saleStore: PropTypes.any,
  loginStore: PropTypes.any
}

/**
 * Mapeia o estado das vendas e o usuário logado da aplicação controlado pelo redux com o componente
 * @param {*} state estado das vendas da aplicação
 * @returns o estado das vendas da aplicação
 */
const mapStateToProps = (state) => ({
  saleStore: state.saleStore,
  loginStore: state.loginStore
});

/**
 * Mapeia com a página as actions necessárias para o componente
 */
const mapDispatchToProps = {
  getSalesMetrics
}

//conecta o componente com o redux
export default connect(mapStateToProps, mapDispatchToProps)(SalesMetrics);
