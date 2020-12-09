/* eslint-disable import/prefer-default-export */
import { FAILURE, SUCCESS } from '../../common/util';

const INITIAL_STATE = {
  selfProfile: {},
  profileFetchStatus: '',
};

export const profileReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'FETCH_SELF_PROFILE_SUCCESS':
      return { ...state, selfProfile: payload, profileFetchStatus: SUCCESS };

    case 'FETCH_SELF_PROFILE_FAILED':
      return { ...state, profileFetchStatus: FAILURE };

    default:
      return state;
  }
};
