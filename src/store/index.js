import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';
import localForage from "localforage";
import rootReducer from './reducers';
import rootSaga from './sagas';

//cria o middleware do redux-saga
const sagaMiddleware = createSagaMiddleware();
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

//configura a persistência dos dados do estado da aplicação na memória para não serem perdidos na atualização da página
const persistConfig = {
    key: 'root',
    storage: localForage,
    stateReconciler: autoMergeLevel2,
    timeout: null
};

//persiste os reducers na memória
const pReducer = persistReducer(persistConfig, rootReducer);
//configura a store
const store = applyMiddleware(sagaMiddleware)(createStore)(pReducer, devTools);
//persiste a store na memória
const persistor = persistStore(store);
//inicializa o middleware saga
sagaMiddleware.run(rootSaga);

export { persistor, store };
