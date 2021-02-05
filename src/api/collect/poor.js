import request from '@/utils/request'

// 查询监测户信息列表
export function listPoor(query) {
  return request({
    url: '/collect/poor/list',
    method: 'get',
    params: query
  })
}

// 查询监测户信息详细
export function getPoor(poorId) {
  return request({
    url: '/collect/poor/' + poorId,
    method: 'get'
  })
}

// 新增监测户信息
export function addPoor(data) {
  return request({
    url: '/collect/poor',
    method: 'post',
    data: data
  })
}

// 修改监测户信息
export function updatePoor(data) {
  return request({
    url: '/collect/poor',
    method: 'put',
    data: data
  })
}

// 删除监测户信息
export function delPoor(poorId) {
  return request({
    url: '/collect/poor/' + poorId,
    method: 'delete'
  })
}
