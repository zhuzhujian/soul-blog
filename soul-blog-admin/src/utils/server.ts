import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

class ServerInstance {
  private server: AxiosInstance;

  constructor() {
    this.server = axios.create({
      baseURL: process.env.SERVICE_BASE_URL,
      timeout: 10000,
      withCredentials: true,  // 跨域请求是否需要带上凭证
    })

    this.server.interceptors.request.use(config => {
      // config.headers['Authorization']
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    this.server.interceptors.response.use((response) => {
      return response
    }, (error) => {
      if([404, 401, 500].includes(error.status)) {
        window.$message.error(error.data?.message || '请求出错啦！')
      }
      return Promise.reject(error)
    })
    
  }

  get: <T, U>(url: string, params:U) => Promise<T> = (url, params) => {
    return this.server.get(url, { params })
  };

  post: <T, U>(url: string, data:U, config?: AxiosRequestConfig) => Promise<T> = (url, data, config) => {
    return this.server.post(url, data, config)
  };

  download: <T>(url: string, params:T) => Promise<Blob> = (url, params) => {
    return this.server.get(url, {
      params,
      responseType: 'blob',
      timeout: 20000,
    })
  }
}

const fetch = new ServerInstance()

export default fetch