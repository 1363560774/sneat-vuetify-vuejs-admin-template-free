import axiosInstance from './axios'
import { ContentTypeEnum, RequestHttpEnum } from '@/enums/httpEnum'

export const get = <T>(url: string, params?: object) => {
  return axiosInstance<T>({
    url,
    method: RequestHttpEnum.GET,
    params,
  })
}

export const post = <T>(url: string, data?: object, headersType?: string) => {
  return axiosInstance<T>({
    url,
    method: RequestHttpEnum.POST,
    data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON,
    },
  })
}

export const patch = <T>(url: string, data?: object, headersType?: string) => {
  return axiosInstance<T>({
    url,
    method: RequestHttpEnum.PATCH,
    data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON,
    },
  })
}

export const put = <T>(url: string, data?: object, headersType?: ContentTypeEnum) => {
  return axiosInstance<T>({
    url,
    method: RequestHttpEnum.PUT,
    data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON,
    },
  })
}

export const del = <T>(url: string, params?: object) => {
  return axiosInstance<T>({
    url,
    method: RequestHttpEnum.DELETE,
    params,
  })
}

const prefix = 'javascript:'

// 对输入字符进行转义处理
export const translateStr = (target: string | Record<any, any>) => {
  if (typeof target === 'string') {
    if (target.startsWith(prefix)) {
      const funcStr = target.split(prefix)[1]
      let result
      try {
        // eslint-disable-next-line no-new-func
        result = new Function(`${funcStr}`)()
      }
      catch (error) {
        console.log(error)
      }

      return result
    }
    else {
      return target
    }
  }
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      const subTarget = target[key]

      target[key] = translateStr(subTarget)
    }
  }

  return target
}

// 获取请求函数，默认get
export const request = (type?: RequestHttpEnum) => {
  if (type === RequestHttpEnum.GET)
    return get
  else if (type === RequestHttpEnum.POST)
    return post
  else if (type === RequestHttpEnum.PATCH)
    return post
  else if (type === RequestHttpEnum.PUT)
    return post
  else if (type === RequestHttpEnum.DELETE)
    return post
  else
    return get
}
