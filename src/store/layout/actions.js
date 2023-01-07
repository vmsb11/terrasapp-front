/**
 * Arquivo responsável por implementar as actions do reducer
 */
import {
  CHANGE_LAYOUT,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_SIDEBAR_TYPE,
  CHANGE_PRELOADER,
} from './actionTypes';

export const changeLayout = (layout) => ({
  type: CHANGE_LAYOUT,
  payload: layout,
});

export const changePreloader = (layout) => ({
  type: CHANGE_PRELOADER,
  payload: layout,
});

export const changeLayoutWidth = (width) => ({
  type: CHANGE_LAYOUT_WIDTH,
  payload: width,
});

export const changeSidebarType = (sidebarType, isMobile) => {
  return {
    type: CHANGE_SIDEBAR_TYPE,
    payload: { sidebarType, isMobile },
  };
};
