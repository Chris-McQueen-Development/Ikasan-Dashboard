import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IIkasanComponent, defaultValue } from 'app/shared/model/ikasan-component.model';

export const ACTION_TYPES = {
  FETCH_IKASANCOMPONENT_LIST: 'ikasanComponent/FETCH_IKASANCOMPONENT_LIST',
  FETCH_IKASANCOMPONENT: 'ikasanComponent/FETCH_IKASANCOMPONENT',
  CREATE_IKASANCOMPONENT: 'ikasanComponent/CREATE_IKASANCOMPONENT',
  UPDATE_IKASANCOMPONENT: 'ikasanComponent/UPDATE_IKASANCOMPONENT',
  DELETE_IKASANCOMPONENT: 'ikasanComponent/DELETE_IKASANCOMPONENT',
  RESET: 'ikasanComponent/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IIkasanComponent>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type IkasanComponentState = Readonly<typeof initialState>;

// Reducer

export default (state: IkasanComponentState = initialState, action): IkasanComponentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_IKASANCOMPONENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_IKASANCOMPONENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_IKASANCOMPONENT):
    case REQUEST(ACTION_TYPES.UPDATE_IKASANCOMPONENT):
    case REQUEST(ACTION_TYPES.DELETE_IKASANCOMPONENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_IKASANCOMPONENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IKASANCOMPONENT):
    case FAILURE(ACTION_TYPES.CREATE_IKASANCOMPONENT):
    case FAILURE(ACTION_TYPES.UPDATE_IKASANCOMPONENT):
    case FAILURE(ACTION_TYPES.DELETE_IKASANCOMPONENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_IKASANCOMPONENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_IKASANCOMPONENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_IKASANCOMPONENT):
    case SUCCESS(ACTION_TYPES.UPDATE_IKASANCOMPONENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_IKASANCOMPONENT):
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

const apiUrl = 'api/ikasan-components';

// Actions

export const getEntities: ICrudGetAllAction<IIkasanComponent> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_IKASANCOMPONENT_LIST,
  payload: axios.get<IIkasanComponent>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IIkasanComponent> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_IKASANCOMPONENT,
    payload: axios.get<IIkasanComponent>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IIkasanComponent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_IKASANCOMPONENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IIkasanComponent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_IKASANCOMPONENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IIkasanComponent> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IKASANCOMPONENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
