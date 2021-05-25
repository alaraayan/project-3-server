export class NotFound extends Error {
  constructor() {
    super()
    // ? Set all the custom error properties that I want!!!
    this.name = 'NotFound'
  }
}

export class NotValid extends Error {
  constructor() {
    super()
    this.name = 'NotValid'
  }
}