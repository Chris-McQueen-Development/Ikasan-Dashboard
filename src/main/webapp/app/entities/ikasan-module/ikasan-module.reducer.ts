import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IIkasanModule, defaultValue } from 'app/shared/model/ikasan-module.model';

export const ACTION_TYPES = {
  FETCH_IKASANMODULE_LIST: 'ikasanModule/FETCH_IKASANMODULE_LIST',
  FETCH_IKASANMODULE: 'ikasanModule/FETCH_IKASANMODULE',
  CREATE_IKASANMODULE: 'ikasanModule/CREATE_IKASANMODULE',
  UPDATE_IKASANMODULE: 'ikasanModule/UPDATE_IKASANMODULE',
  DELETE_IKASANMODULE: 'ikasanModule/DELETE_IKASANMODULE',
  RESET: 'ikasanModule/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IIkasanModule>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type IkasanModuleState = Readonly<typeof initialState>;

// Reducer

export default (state: IkasanModuleState = initialState, action): IkasanModuleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_IKASANMODULE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_IKASANMODULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_IKASANMODULE):
    case REQUEST(ACTION_TYPES.UPDATE_IKASANMODULE):
    case REQUEST(ACTION_TYPES.DELETE_IKASANMODULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_IKASANMODULE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IKASANMODULE):
    case FAILURE(ACTION_TYPES.CREATE_IKASANMODULE):
    case FAILURE(ACTION_TYPES.UPDATE_IKASANMODULE):
    case FAILURE(ACTION_TYPES.DELETE_IKASANMODULE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_IKASANMODULE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_IKASANMODULE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_IKASANMODULE):
    case SUCCESS(ACTION_TYPES.UPDATE_IKASANMODULE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_IKASANMODULE):
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

const apiUrl = 'api/ikasan-modules';

// Actions

export const getEntities: ICrudGetAllAction<IIkasanModule> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_IKASANMODULE_LIST,
  payload: axios.get<IIkasanModule>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IIkasanModule> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_IKASANMODULE,
    payload: axios.get<IIkasanModule>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IIkasanModule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_IKASANMODULE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IIkasanModule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_IKASANMODULE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IIkasanModule> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IKASANMODULE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
