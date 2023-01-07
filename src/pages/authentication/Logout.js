import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../store/actions';

/**
 * Classe que renderiza um componente vazio responsável por chamar a função de logout
 */
class Logout extends Component {
  
  /**
   * Método invocado quando o componente termina de ser "montado"
   */
  componentDidMount() {
    
    //chama a action que realiza o logout do usuário
    this.props.logoutUser(this.props.history)
  }

  render() {
    return <React.Fragment></React.Fragment>
  }
}

/**
 * Valida as propriedades do componente
 */
Logout.propTypes = {
  history: PropTypes.any,
  logoutUser: PropTypes.func
}

//faz a conexão da interface com o redux
export default withRouter(connect(null, { logoutUser })(Logout));
