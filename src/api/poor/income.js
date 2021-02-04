import request from '@/utils/request'

// 查询收入信息列表
export function listIncome(query) {
  return request({
    url: '/poor/income/list',
    method: 'get',
    params: query
  })
}

// 查询收入信息详细
export function getIncome(pIId) {
  return request({
    url: '/poor/income/' + pIId,
    method: 'get'
  })
}

// 新增收入信息
export function addIncome(data) {
  return request({
    url: '/poor/income',
    method: 'post',
    data: data
  })
}

// 修改收入信息
export function updateIncome(data) {
  return request({
    url: '/poor/income',
    method: 'put',
    data: data
  })
}

// 删除收入信息
export function delIncome(pIId) {
  return request({
    url: '/poor/income/' + pIId,
    method: 'delete'
  })
}
