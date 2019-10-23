import * as reduxActions from 'redux-actions';
import { stringify } from 'qs';
import request from './request';
import { message } from 'antd';

const { createAction, handleActions } = reduxActions;

/**
 * 创建异步action types
 */
function createAsyncActionTypes(type: string): { pending: string, reject: string, accept: string } {
  return {
    pending: `${type}_PENDING`,
    accept: `${type}_ACCEPT`,
    reject: `${type}_REJECT`
  };
}

/**
 *
 * @param {Object} actionTypes 异步action types对象
 */
const mapAsyncReducers = actionTypes => reducerMap => {
  return {
    [actionTypes.pending]: reducerMap.pending || (state => ({ ...state })),
    [actionTypes.accept]: reducerMap.accept || (state => ({ ...state })),
    [actionTypes.reject]: reducerMap.reject || (state => ({ ...state }))
  };
};

const messageByCode = (code: number) => {
  try {
    const codeLevel = code.toString()[0];
    let msgOut = message.info;
    switch (codeLevel) {
      case '0':
        msgOut = message.success;
        break;
      case '1':
        // use default message out
        break;
      case '2':
        msgOut = message.error;
        break;
      case '3':
        msgOut = message.error;
        break;
      default:
        break;
    }

    return msgOut;
  } catch (error) {
    return msg => msg;
  }
};

const handleJsonData = (jsonData: Object) => {
  const { code, data, message: msg } = jsonData;
  if (code === 0) {
    return data;
  }
  messageByCode(code)(typeof msg === 'string' ? msg : JSON.stringify(msg));
  throw msg;
};

type Options = {
  handleData?: Object => any,
  handleError?: Error => any,
};
/**
 *
 * @param {string} type action type
 */
const asyncActionFactory = (type: string) => (method: string) => {
  const types = createAsyncActionTypes(`${method}_${type}`);

  const createReducers = mapAsyncReducers(types);

  const createActions = (path: string, options: Options = {}) => {
    const [pending, accept, reject] = Object.keys(types).map(item => createAction(types[item]));
    const defaultOptions = {
      handleData: handleJsonData,
      handleError: error => error
    };
    const opts = { ...defaultOptions, ...options };

    return (params: Object) => (dispatch: Dispatch) => {
      dispatch(pending());
      let url = path;
      const reqOptions = { method };
      if (method === ('GET')) {
        if (params) {
          url = `${url}?${stringify(params)}`;
        }
      } else {
        if (params) {
          reqOptions.body = params;
        }
      }

      return request(url, reqOptions)
        .then(data => {
          let procData = {};
          try {
            procData = opts.handleData(data);
            dispatch(accept(procData));
          } catch (error) {
            dispatch(reject(error));
            opts.handleError(error);
          }
          return data;
        })
        .catch(err => {
          dispatch(reject(err));
        });
    };
  };

  return { types, createActions, createReducers };
};

export { createAsyncActionTypes, createAction, handleActions, reduxActions };

export default asyncActionFactory;
