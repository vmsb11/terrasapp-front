import { call, takeEvery, put } from 'redux-saga/effects';
import {
  CHANGE_LAYOUT,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_SIDEBAR_TYPE,
} from './actionTypes';
import { changeSidebarType as changeSidebarTypeAction } from './actions';

function changeBodyAttribute(attribute, value) {
  if (document.body) document.body.setAttribute(attribute, value);
  return true;
}

function manageBodyClass(cssClass, action = 'toggle') {
  switch (action) {
    case 'add':
      if (document.body) document.body.classList.add(cssClass);
      break;
    case 'remove':
      if (document.body) document.body.classList.remove(cssClass);
      break;
    default:
      if (document.body) document.body.classList.toggle(cssClass);
      break;
  }

  return true;
}

function* changeLayout({ payload: layout }) {
  try {
    if (layout === 'horizontal') {
       document.body.removeAttribute('data-sidebar');
      document.body.removeAttribute('data-sidebar-image');
      document.body.removeAttribute('data-sidebar-size');
    }
    yield call(changeBodyAttribute, 'data-layout', layout);
  } catch (error) {
    
  }
}

function* changeLayoutWidth({ payload: width }) {
  try {
    if (width === 'boxed') {
      yield put(changeSidebarTypeAction('icon'));
      yield call(changeBodyAttribute, 'data-layout-size', width);
      yield call(changeBodyAttribute, 'data-layout-scrollable', false);
    } else if (width === 'scrollable') {
      yield put(changeSidebarTypeAction('default'));
      yield call(changeBodyAttribute, 'data-layout-scrollable', true);
    } else {
      yield put(changeSidebarTypeAction('default'));
      yield call(changeBodyAttribute, 'data-layout-size', width);
      yield call(changeBodyAttribute, 'data-layout-scrollable', false);
    }
  } catch (error) {
    
  }
}

function* changeLeftSidebarType({ payload: { sidebarType, isMobile } }) {
  try {
    switch (sidebarType) {
      case 'compact':
        yield call(changeBodyAttribute, 'data-sidebar-size', 'small');
        yield call(manageBodyClass, 'sidebar-enable', 'remove');
        yield call(manageBodyClass, 'vertical-collpsed', 'remove');
        break;
      case 'icon':
        yield call(changeBodyAttribute, 'data-sidebar-size', '');
        yield call(changeBodyAttribute, 'data-keep-enlarged', 'true');
        yield call(manageBodyClass, 'vertical-collpsed', 'add');
        break;
      case 'condensed':
        // alert('condensed');
        yield call(manageBodyClass, 'sidebar-enable', 'add');
        if (window.screen.width >= 998) {
          yield call(manageBodyClass, 'vertical-collpsed', 'remove');
          yield call(manageBodyClass, 'sidebar-enable', 'remove');
          yield call(manageBodyClass, 'vertical-collpsed', 'add');
          yield call(manageBodyClass, 'sidebar-enable', 'add');
        } else {
          yield call(manageBodyClass, 'sidebar-enable', 'add');
          yield call(manageBodyClass, 'vertical-collpsed', 'add');
        }
        // if (!isMobile)
        break;
      default:
        yield call(changeBodyAttribute, 'data-sidebar-size', '');
        yield call(manageBodyClass, 'sidebar-enable', 'remove');
        if (!isMobile) yield call(manageBodyClass, 'vertical-collpsed', 'remove');
        break;
    }
  } catch (error) {
    
  }
}

/**
 * Função que configura o redux-saga associando para cada action criada a função responsável por executar de forma assíncrona
 */
function* LayoutSaga() {
  yield takeEvery(CHANGE_LAYOUT, changeLayout);
  yield takeEvery(CHANGE_LAYOUT_WIDTH, changeLayoutWidth);
  yield takeEvery(CHANGE_SIDEBAR_TYPE, changeLeftSidebarType);
}

export default LayoutSaga;
