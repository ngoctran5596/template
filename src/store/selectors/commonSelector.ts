import {CommonState} from '@store/types/commonType';
import {createSelector} from 'reselect';

export const getAlertState = (state: {common: CommonState}) =>
  Object.values(state.common.alerts);

export const getBottomMenuState = (state: {common: CommonState}) =>
  state.common.bottomMenu || {isVisible: false, data: []};

export const getModalState = (state: {common: CommonState}) =>
  state.common.modals;

export const getModalById = (id: string) =>
  createSelector(getModalState, modals => {
    return modals[id] || {isVisible: false};
  });
