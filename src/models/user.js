import { query as queryUsers, queryCurrent,getList } from '../services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    data: {
      list: []
    }
  },

  effects: {
    *getList({ payload }, { call, put }) {
      const response = yield  call(getList,payload);
      console.log(response,'response')
      yield put({
        type:'getlist',
        payload:response.data,
      })
    },
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    getlist(state, action) {
      return {
        ...state,
        list: action.payload,
        data:{
          list:action.payload
        }
      };
    },
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
