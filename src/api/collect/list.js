import request from '@/utils/request'

// 查询监测户成员列表
export function jchlist(query) {
  return request({
    url: '/poor/jch/list',
    method: 'get',
    params: query
  })
}
