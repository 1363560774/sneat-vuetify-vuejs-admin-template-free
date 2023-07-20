import type { ProjectItem } from './project'
import type { Login } from './type/login'
import { RequestHttpEnum } from '@/enums/httpEnum'
import { request } from '@/plugins/http'

// * 项目列表
export const projectListApi = async (login: Login) => {
  return await request(RequestHttpEnum.POST)<ProjectItem[]>('/user/login', login)
}
