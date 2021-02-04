import request from '@/utils/request'

// 查询支出信息列表
export function listPay(query) {
  return request({
    url: '/poor/pay/list',
    method: 'get',
    params: query
  })
}

// 查询支出信息详细
export function getPay(pPId) {
  return request({
    url: '/poor/pay/' + pPId,
    method: 'get'
  })
}

// 新增支出信息
export function addPay(data) {
  return request({
    url: '/poor/pay',
    method: 'post',
    data: data
  })
}

// 修改支出信息
export function updatePay(data) {
  return request({
    url: '/poor/pay',
    method: 'put',
    data: data
  })
}

// 删除支出信息
export function delPay(pPId) {
  return request({
    url: '/poor/pay/' + pPId,
    method: 'delete'
  })
}
