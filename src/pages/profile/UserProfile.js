import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
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
  TabPane,
} from 'reactstrap'
import UserDetail from '../../components/details/UserDetail';
import UserForm from '../../components/forms/UserForm';
import {
  selectUser
} from '../../store/actions';

/**
 * Classe responsável por renderizar um componente que exibe as informações do usuário e o formulário de edição de cadastro
 */
class UserProfile extends Component {
  
  constructor(props) {
    
    super(props);

    //estado que controla qual a tab está sendo exibida
    this.state = {

      activeTab: "1"
    };
  }

  /**
   * Componente invocado quando o componente é montado
   */
  componentDidMount() {

    //obtém as informações do usuário logado
    const { loginStore } = this.props;
    const { user } = loginStore;

    //invoca a action que seleciona o usuário logado
    selectUser(user);

    //define qual a tab a ser exibida (visualização do perfil ou formulário)
    const { tab } = this.props.match.params;

    if(tab && tab === "edit") {

      //ativa a tab a ser exibida
      this.setState({activeTab: "2"});
    }
  }
  
  /**
   * Método que renderiza o componente
   * @returns componente renderizado
   */
  render() {
    
    //obtém as informações do usuário logado
    const { loginStore } = this.props;
    const { activeTab } = this.state;
    const { user } = loginStore;
    
    //renderiza todo o componente
    return (
      <React.Fragment>
        <div className='page-content'>
          <Container fluid>
            <Row>
              <Col sm={12}>
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0 font-size-18">Perfil</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="breadcrumb-item active">Perfil</li>
                    </ol>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xl={12}>
                <Card>
                  <CardBody>
                    <Nav className='icon-tab nav-justified'>
                      <NavItem>
                        <NavLink
                          disabled={(user === null)}
                          style={{ cursor: 'pointer' }}
                          className={classnames({
                            active: activeTab === '1',
                          })}
                          onClick={() => {

                            //muda a tab a ser exibida ao clicar na mesma
                            this.setState({activeTab: "1"});
                          }}>
                          <span className='d-none d-sm-block'><i className='bx bx-face font-size-22'></i> Meu Perfil</span>
                          <span className='d-block d-sm-none'><i className='bx bx-face font-size-22'></i></span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: 'pointer' }}
                          className={classnames({
                            active: activeTab === '2',
                          })}
                          onClick={() => {

                            //muda a tab a ser exibida ao clicar na mesma
                            this.setState({activeTab: "2"});
                          }}>
                          {
                            (user !== null) ?
                            <>
                              <span className='d-none d-sm-block'><i className='bx bx-edit font-size-22'></i> Editar Cadastro</span>
                              <span className='d-block d-sm-none'><i className='bx bx-edit font-size-22'></i></span>
                            </>
                            : <></>
                          }
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab} className='p-3 text-muted'>
                      <TabPane tabId='1'>
                        {/** exibe o componente que mostra os detalhes do usuário */}
                        <UserDetail/>
                      </TabPane>
                      <TabPane tabId='2'>
                        <Row>
                          <Col sm='12'>
                            {/** exibe o formulário de edição do usuário */}
                            <UserForm 
                              mode={(user !== null) ? 'edit' : 'new'}/>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

/**
 * Valida as propriedades do componente
 */
UserProfile.propTypes = {
  loginStore: PropTypes.any,
  interfaceStore: PropTypes.any,
  selectUser: PropTypes.func,
  match: PropTypes.any
};

/**
 * Mapeia o estado do usuário logado da aplicação e do gerenciador de interfaces controlado pelo redux com a página
 * @param {*} state estado do usuário logado da aplicação
 * @returns o estado do usuário logado da aplicação
 */
const mapStateToProps = (state) => {
  return ({
    loginStore: state.loginStore,
    interfaceStore: state.interfaceStore
  });
};

/**
 * Mapeia com o componente as actions necessárias o componente
 */
const mapDispatchToProps = {
  selectUser
};

//conect o componente com o redux
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
