import { default as axios } from 'axios'
import { storage } from './Storage'

class HttpClient {
  private sessionId:string = '';
  private baseUrl:string = 'http://localhost:9000/api' // Apiary end-point was thowing a cors error;
  private axios:any;
  
  constructor() {
    this.axios = axios.create({ baseURL: this.baseUrl })

    if(storage.sessionId) {
      this.axios.defaults.headers['sessionId'] = storage.sessionId
    }else {
      this.session()
      this.axios.defaults.headers['sessionId'] = this.sessionId
    }
    this.axios.defaults.headers['Content-Type'] = 'application/json'
  }

  public get SessionId() : string {
    return this.sessionId
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
      throw error
    }
  }

  public async post(endpoint:string, data:object) {
    try {
      const response = await this.axios.post(endpoint, data)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async patch(endpoint:string, id:string, data:object) {
    try {
      const response = await this.axios.patch(`${endpoint}/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async delete(endpoint:string, id:string) {
    try {
      const response = await this.axios.delete(`${endpoint}/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export { HttpClient as http }
