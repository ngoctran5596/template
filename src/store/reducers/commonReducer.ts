import * as actions from '@store/actions/commonAction';
import {CommonState} from '@store/types/commonType';
import produce from 'immer';

const INITIAL_STATE = {
  modals: {},
  alerts: {},
  bottomMenu: null,
};

const commonReducer = produce((state: CommonState = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SHOW_ALERT:
      state.alerts[action.payload.id] = {
        ...action.payload,
        isVisible: true,
      };
      return state;

    case actions.CLOSE_ALERT:
      return closeReducer(state.alerts, action.payload);

    case actions.DISMISS_ALERT:
      return dismissReducer(state.alerts, action.payload);

    case actions.SHOW_MODAL:
      state.modals[action.payload.id] = {
        id: action.payload.id,
        isVisible: true,
        customProps: action.payload.customProps || {},
      };
      return state;

    case actions.CLOSE_MODAL:
      return closeReducer(state.modals, action.payload);

    case actions.REMOVE_MODAL:
      return dismissReducer(state.modals, action.payload);

    case actions.SHOW_BOTTOM_MENU:
      state.bottomMenu = {...action.payload, isVisible: true};
      return state;

    case actions.CLOSE_BOTTOM_MENU:
      state.bottomMenu = null;
      return state;

    default:
      return state;
  }
});

export default commonReducer;

const closeReducer = (object: any = {}, payload?: {id: string}) => {
  if (payload) {
    object[payload.id] = {...object[payload.id], isVisible: false};
  } else {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const alert = object[key];
        alert.isVisible = false;
      }
    }
  }
};

const dismissReducer = (object: any = {}, payload?: {id: string}) => {
  if (payload) {
    delete object[payload.id];
  } else {
    object = {};
  }
};
