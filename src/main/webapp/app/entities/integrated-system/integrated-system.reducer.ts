import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IIntegratedSystem, defaultValue } from 'app/shared/model/integrated-system.model';

export const ACTION_TYPES = {
  FETCH_INTEGRATEDSYSTEM_LIST: 'integratedSystem/FETCH_INTEGRATEDSYSTEM_LIST',
  FETCH_INTEGRATEDSYSTEM: 'integratedSystem/FETCH_INTEGRATEDSYSTEM',
  CREATE_INTEGRATEDSYSTEM: 'integratedSystem/CREATE_INTEGRATEDSYSTEM',
  UPDATE_INTEGRATEDSYSTEM: 'integratedSystem/UPDATE_INTEGRATEDSYSTEM',
  DELETE_INTEGRATEDSYSTEM: 'integratedSystem/DELETE_INTEGRATEDSYSTEM',
  RESET: 'integratedSystem/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IIntegratedSystem>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type IntegratedSystemState = Readonly<typeof initialState>;

// Reducer

export default (state: IntegratedSystemState = initialState, action): IntegratedSystemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INTEGRATEDSYSTEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INTEGRATEDSYSTEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_INTEGRATEDSYSTEM):
    case REQUEST(ACTION_TYPES.UPDATE_INTEGRATEDSYSTEM):
    case REQUEST(ACTION_TYPES.DELETE_INTEGRATEDSYSTEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_INTEGRATEDSYSTEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INTEGRATEDSYSTEM):
    case FAILURE(ACTION_TYPES.CREATE_INTEGRATEDSYSTEM):
    case FAILURE(ACTION_TYPES.UPDATE_INTEGRATEDSYSTEM):
    case FAILURE(ACTION_TYPES.DELETE_INTEGRATEDSYSTEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_INTEGRATEDSYSTEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_INTEGRATEDSYSTEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_INTEGRATEDSYSTEM):
    case SUCCESS(ACTION_TYPES.UPDATE_INTEGRATEDSYSTEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_INTEGRATEDSYSTEM):
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

const apiUrl = 'api/integrated-systems';

// Actions

export const getEntities: ICrudGetAllAction<IIntegratedSystem> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INTEGRATEDSYSTEM_LIST,
  payload: axios.get<IIntegratedSystem>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IIntegratedSystem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INTEGRATEDSYSTEM,
    payload: axios.get<IIntegratedSystem>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IIntegratedSystem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INTEGRATEDSYSTEM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IIntegratedSystem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INTEGRATEDSYSTEM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IIntegratedSystem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INTEGRATEDSYSTEM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
