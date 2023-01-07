import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

/**
 * Componente que renderiza dentro do roteamento um subcomponente da aplicação
 * @returns 
 */
const AppRoute = ({ component: Component, layout: Layout, isAuthProtected, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthProtected && !localStorage.getItem('authManager')) {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

/**
 * Valida as propriedades do componente
 */
AppRoute.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
};

export default AppRoute;
