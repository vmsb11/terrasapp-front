import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { authProtectedRoutes, publicRoutes } from './routes';
import AppRoute from './routes/route';
import LoadingModal from './components/modals/LoadingModal';
import VerticalLayout from './components/layout';
import NonAuthLayout from './components/NonAuthLayout';
import {
  hideErrorAlert,
  hideSuccessAlert
} from './store/actions';
import './assets/scss/theme.scss';
import './helpers/date/date';

/**
 * Classe principal por renderizar toda a aplicação
 */
class App extends Component {

  constructor(props) {
    super(props);
  }

  /**
   * Método que renderiza o componente
   * @returns componente renderizado
   */
  render() {

    //obtém as informações e actions de manipulação das interfaces gráficas
    const { interfaceStore, hideErrorAlert, hideSuccessAlert } = this.props;
    const { alerts, modals } = interfaceStore;
    const { showErrors, showSuccess, error, successMessage, title } = alerts;
    
    //renderiza todos os componentes da aplicação
    return (
      <React.Fragment>
        {/** renderiza os modais que exibem mensagens de alerta */}
        <SweetAlert
          title={title}
          error={error.type === 'error'}
          warning={error.type === 'warning'}
          show={showErrors}
          onConfirm={() => hideErrorAlert()}>
          <div> 
            <p>{error.message}</p>
            {
              (error.type === 'error') ?
              <>
                <p><b>Código de erro: </b>{error.code}</p>
                <p><b>Data: </b>{error.date}</p>
              </>
              : ''
            } 
          </div>
        </SweetAlert>
        <SweetAlert
          title={title}
          success
          show={showSuccess}
          onConfirm={() => hideSuccessAlert()}>
          {successMessage}
        </SweetAlert>
        <LoadingModal isOpen={modals.loading.showModal} title={modals.loading.title} message={modals.loading.message} />
        {/** configura as rotas públicas e privadas da aplicação */}
        <Router>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
              />
            ))}

            {authProtectedRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={VerticalLayout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                exact
              />
            ))}
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
App.propTypes = {
  layout: PropTypes.object,
  interfaceStore: PropTypes.object,
  hideErrorAlert: PropTypes.func,
  hideNotificationPanel: PropTypes.func,
  hideSuccessAlert: PropTypes.func
};

/**
 * Mapeia o estado da aplicação controlado pelo redux com o componente
 * @param {*} state estado da aplicação
 * @returns o estado da aplicação
 */
const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
    interfaceStore: state.interfaceStore
  };
};

/**
 * Mapeia com o componente as actions necessárias para o componente
 */
const mapDispatchToProps = {
  hideErrorAlert,
  hideSuccessAlert
}

//conect a página com o redux
export default connect(mapStateToProps, mapDispatchToProps)(App);
