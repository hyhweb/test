import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
export  async function getList(params) {
  return request('http://127.0.0.1:7001/user/pageList',{
    method:'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
