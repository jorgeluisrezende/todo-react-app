
class Storage {
  private static _instance:Storage;

  public static get Instance() {
    return this._instance || (this._instance = new this())
  }

  public get sessionId() {
    return localStorage.getItem('session_id')
  }

  public async getObject(label:string) {
    let object:string = String(await localStorage.getItem(label))
    return JSON.parse(object)
  }

  public setObject(label:string, data:object) {
    return localStorage.setItem(label, JSON.stringify(data))
  }

  public getString(label:string) {
    return localStorage.getItem(label)
  }

  public setString(label:string, data:string) {
    return localStorage.setItem(label, data)
  }
}

const storage = Storage.Instance
export { storage }