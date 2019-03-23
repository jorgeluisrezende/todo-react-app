import { default as axios } from 'axios'
import { storage } from './Storage'
class HttpClient {
  private static _instance: HttpClient;
  private sessionId:string = '';
  private baseUrl:string = 'http://localhost:9000/api';
  private axios:any;
  
  constructor() {
    this.axios = axios.create({ baseURL: this.baseUrl })

    if(storage.sessionId) {
      this.axios.defaults.headers['sessionId'] = storage.sessionId
    }else {
      this.session()
      this.axios.defaults.headers['sessionId'] = this.sessionId
    }
  }

  public get SessionId() : string {
    return this.sessionId
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async session() {
    try {
      const response = await this.axios.post('/session')
      const sessionId = response.data ? response.data.sessionId : ''
      
      this.sessionId = String(sessionId)
      storage.setString('session_id', sessionId)
      return sessionId
    } catch (error) {
      
    }
  }

  public async get(endpoint:string) {
    try {
      const response = await this.axios.get(endpoint)
      return response.data
    } catch (error) {
      console.log(error.response)
    }
  }

  public async post(endpoint:string, data:object) {
    try {
      const response = await this.axios.post(endpoint, data)
      return response.data
    } catch (error) {

      console.log(error.response)
    }
  }

  public async put(endpoint:string, id:string, data:object) {
    try {
      const response = await this.axios.put(`${endpoint}/${id}`, data)
      return response.data
    } catch (error) {
      
    }
  }

  public async delete(endpoint:string, id:string, data:object) {
    try {
      const response = await this.axios.delete(`${endpoint}/${id}`, data)
      return response.data
    } catch (error) {
      
    }
  }
}

const http = HttpClient.Instance

export { http }
