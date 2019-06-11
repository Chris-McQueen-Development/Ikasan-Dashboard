import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IIkasanFlow, defaultValue } from 'app/shared/model/ikasan-flow.model';

export const ACTION_TYPES = {
  FETCH_IKASANFLOW_LIST: 'ikasanFlow/FETCH_IKASANFLOW_LIST',
  FETCH_IKASANFLOW: 'ikasanFlow/FETCH_IKASANFLOW',
  CREATE_IKASANFLOW: 'ikasanFlow/CREATE_IKASANFLOW',
  UPDATE_IKASANFLOW: 'ikasanFlow/UPDATE_IKASANFLOW',
  DELETE_IKASANFLOW: 'ikasanFlow/DELETE_IKASANFLOW',
  RESET: 'ikasanFlow/RESET'
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
    case REQUEST(ACTION_TYPES.FETCH_IKASANFLOW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_IKASANFLOW):
    case REQUEST(ACTION_TYPES.UPDATE_IKASANFLOW):
    case REQUEST(ACTION_TYPES.DELETE_IKASANFLOW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_IKASANFLOW_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IKASANFLOW):
    case FAILURE(ACTION_TYPES.CREATE_IKASANFLOW):
    case FAILURE(ACTION_TYPES.UPDATE_IKASANFLOW):
    case FAILURE(ACTION_TYPES.DELETE_IKASANFLOW):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_IKASANFLOW_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_IKASANFLOW):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_IKASANFLOW):
    case SUCCESS(ACTION_TYPES.UPDATE_IKASANFLOW):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_IKASANFLOW):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/ikasan-flows';

// Actions

export const getEntities: ICrudGetAllAction<IIkasanFlow> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_IKASANFLOW_LIST,
  payload: axios.get<IIkasanFlow>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IIkasanFlow> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_IKASANFLOW,
    payload: axios.get<IIkasanFlow>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IIkasanFlow> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_IKASANFLOW,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IIkasanFlow> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_IKASANFLOW,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IIkasanFlow> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IKASANFLOW,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
