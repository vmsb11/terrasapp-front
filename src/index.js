import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';

/**
 * Componente que renderiza toda a aplicação
 */
const app = (
  //configura o store do redux
  <Provider store={store}>
    <BrowserRouter>
      {/** configura a persistência dos dados para que não sejam perdidos ao atualizar a página */}
      <PersistGate loading={null} persistor={persistor}>
        {/** renderiza a aplicação */}
        <App/>
      </PersistGate>
    </BrowserRouter>
  </Provider>
);

//renderiza toda a aplicação dentro da div raiz criada por padrão em aplicações React
ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
