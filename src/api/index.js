import { request } from "../utils/request";

export function loginAjax(data) {
  request({
    url: '/login/',
    method: 'post',
    data: Object.assign({}, {
      password: "123456",
      account: "wells"
    }, data)
  })
}
