import axios from 'axios';
import { ICrudGetAllAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IIkasanFlow, defaultValue } from 'app/shared/model/ikasan-flow.model';

export const ACTION_TYPES = {
  FETCH_IKASANFLOW_LIST: 'ikasanFlow/FETCH_IKASANFLOW_LIST',
  FETCH_VISUALISATION_LIST: 'FETCH_VISUALISATION_LIST',
  CREATE_VISUALISATION_EVENT: 'CREATE_VISUALISATION_EVENT'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IIkasanFlow>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type IkasanFlowState = Readonly<typeof initialState>;

// Reducer

export default (state: IkasanFlowState = initialState, action): IkasanFlowState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_IKASANFLOW_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IKASANFLOW_LIST):
    case SUCCESS(ACTION_TYPES.FETCH_IKASANFLOW_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_VISUALISATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VISUALISATION_EVENT):
    default:
      return state;
  }
};

const apiUrl = 'api/ikasan-flows';
const apiUrlVisualisation = '/api/channel/visualisation';
// Actions

export const getEntities = () => ({
  type: ACTION_TYPES.FETCH_IKASANFLOW_LIST,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getVisualisation = () => ({
  type: ACTION_TYPES.FETCH_VISUALISATION_LIST,
  payload: axios.get(`${apiUrlVisualisation}/`)
});

export const createEvent = event => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VISUALISATION_EVENT,
    payload: axios.post(apiUrl, event)
  });
  dispatch(getVisualisation());
  return result;
};
