import type { Axios, AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ResultEnum } from '@/enums/httpEnum'

const axiosPre = '/kai'

export interface MyResponseType<T> {
  code: ResultEnum
  data: T
  message: string
}

export interface MyRequestInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): Promise<MyResponseType<T>>
}

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.PROD ? import.meta.env.VITE_PRO_PATH : ''}${axiosPre}`,
  timeout: ResultEnum.TIMEOUT,
}) as unknown as MyRequestInstance

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 白名单校验

    // // 获取 token
    // const info = getLocalStorage(StorageEnum.GO_SYSTEM_STORE)
    //
    // // 重新登录
    // if (!info) {
    //   routerTurnByName(PageEnum.BASE_LOGIN_NAME)
    //
    //   return config
    // }
    // const userInfo = info[SystemStoreEnum.USER_INFO]
    //
    // config.headers[userInfo[SystemStoreUserInfoEnum.TOKEN_NAME] || 'token'] = userInfo[SystemStoreUserInfoEnum.USER_TOKEN] || ''

    return config
  },
  (err: AxiosError) => {
    Promise.reject(err)
  },
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const { code } = res.data as { code: number }

    if (code === undefined || code === null)
      return Promise.resolve(res.data)

    // 成功
    if (code === ResultEnum.SUCCESS)
      return Promise.resolve(res.data)

    // 登录过期
    if (code === ResultEnum.TOKEN_OVERDUE) {
      // window.$message.error(window.$t('http.token_overdue_message'))
      // routerTurnByName(PageEnum.BASE_LOGIN_NAME)

      return Promise.resolve(res.data)
    }

    // 提示错误
    // window.$message.error(window.$t((res.data as any).msg))

    return Promise.resolve(res.data)
  },
  (err: AxiosError) => {
    const status = err.response?.status

    console.log(status)
  },
)

export default axiosInstance
