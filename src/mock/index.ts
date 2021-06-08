export class Response {
  public data: any = {}

  constructor(data: any = {}) {
    this.data = data
  }
}

if (process.env.NODE_ENV !== 'production') {
  const Mock = require('mockjs2')
  require('./services/auth')

  Mock.setup({
    timeout: 100
  })
}
