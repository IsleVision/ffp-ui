import request from '@/utils/request'

// 查询监测户成员列表
export function listMember(query) {
  return request({
    url: '/collect/member/list',
    method: 'get',
    params: query
  })
}

// 查询监测户成员详细
export function getMember(pMId) {
  return request({
    url: '/collect/member/' + pMId,
    method: 'get'
  })
}

// 新增监测户成员
export function addMember(data) {
  return request({
    url: '/collect/member',
    method: 'post',
    data: data
  })
}

// 修改监测户成员
export function updateMember(data) {
  return request({
    url: '/collect/member',
    method: 'put',
    data: data
  })
}

// 删除监测户成员
export function delMember(pMId) {
  return request({
    url: '/collect/member/' + pMId,
    method: 'delete'
  })
}
