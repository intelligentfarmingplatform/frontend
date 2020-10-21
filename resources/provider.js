import HttpRequest from './request'

class UserProvider extends HttpRequest {
  constructor () {
    // api api
    super('https://it-ifp-auth.herokuapp.com/api/myproducts')
  }

  async getProduct () {
    // example path https://api.myjson.com/bins/17k39m/
    const {data} = await this.get('/')
    return data
  }
  async getProductByid () {
    // example path https://api.myjson.com/bins/17k39m/
    const {data} = await this.get('/:id'+params.id)
    return data
  }
}

export default UserProvider