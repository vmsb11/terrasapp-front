import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Col,
  Container,
  Row
} from 'reactstrap';
import UserStats from '../stats/UserStats';

/**
 * Classe responsável por renderizar uma página com informações do usuário logado
 */
class UserDetail extends Component {

  constructor(props) {

    super(props);
  }

  /**
   * Método que faz a rendeização do componente
   * @returns componente renderizado
   */
  render() {

    //obtém as informações do usuário logado através do reducer
    const { loginStore } = this.props;
    const { user } = loginStore;
    
    //nas linhas a seguir faz a renderização da página utilizand o componente criado UsarStats
    return (
      <React.Fragment>
        <Container fluid>
          <Row className='mb-2'>
            {
              (user !== null) ?
                <>
                  <Row>
                    <Col xl='12'>
                      <UserStats
                        user={user} />
                    </Col>
                  </Row>
                </>
                :
                <p className='mb-2 text-center'>
                  <br/><br/>
                  Usuário não encontrado
                </p>
            }
          </Row>
         </Container>
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
UserDetail.propTypes = {
  loginStore: PropTypes.any,
  className: PropTypes.any,
};

/**
 * Faz o mapeamento do estado do usuário logado com a página
 * @param state estado a ser mapeado
 * @returns 
 */
const mapStateToProps = (state) => ({
  loginStore: state.loginStore
});

//conecta a página com o reducer correspondente ao login
export default connect(mapStateToProps, null)(withRouter(UserDetail));